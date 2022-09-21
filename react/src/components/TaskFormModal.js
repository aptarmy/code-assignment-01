import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Modal, message, Alert, Popconfirm } from 'antd';
import useSWR from 'swr';

import taskEvents from '../helpers/taskEvents';
import { createTask, editTask, getTaskFromBoredAPI } from '../helpers/taskApi';
import { closeModal } from '../store/taskModal';
import fetcher from '../helpers/fetcher';

export default function TaskFormModal({ onChange }) {
  const dispatch = useDispatch();
  const { isOpenModal, task } = useSelector(state => state.taskModal);

  const { data: categories, error } = useSWR('/api/categories', fetcher, {
    // disable automatic revalidation
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  // task form
  const [ formInstance ] = Form.useForm();
  
  const formInitialValue = useMemo(() => ({
    taskName: task?.TaskName || null,
    categoryId: task?.Category.CategoryID || null
  }), [ task ]);

  const randomTask = useCallback(() => {
    getTaskFromBoredAPI(categories)
      .then(({ taskName, categoryId }) => formInstance.setFieldsValue({ taskName, categoryId }))
      .catch(error => message.error(error.message))
  }, [ formInstance, categories ]);
  
  const handleFormFinish = formData => {
    const apiCaller = task ? editTask : createTask;
    const data = task ? { taskId: task.TaskID, payload: { ...formData, isCompleted: task.TaskCompleted } } : { payload: formData };
    apiCaller(data).then(() => {
      onChange(taskEvents.CREATED);
      dispatch(closeModal());
    }).catch(err => {
      console.error('Error while creating new task using API', err);
      message.error('Error occured: ' + err.response?.data?.message || err.message);
    });
  };

  // modal
  const modalTitle = task ? "Edit Task" : "Create new Task";

  const handleModalOk = useCallback(() => {
    formInstance.submit();
  }, [ formInstance ]);

  const handleModalCancel = useCallback(() => {
    dispatch(closeModal());
  }, [ dispatch ]);

  const modalFooter = useMemo(() => ([
    <Button key="random" onClick={randomTask}>Random</Button>,
    <Button key="cancel" onClick={handleModalCancel}>Cancel</Button>,
    <Popconfirm
      key="submit"
      title="Are you sure to submit the form?"
      onConfirm={handleModalOk}
      okText="Yes"
      cancelText="No"
    >
      <Button key="submit" type="primary">Submit</Button>
    </Popconfirm>,
  ]), [ randomTask, handleModalOk, handleModalCancel ]);

  return (
    <Modal title={modalTitle} open={isOpenModal} onOk={handleModalOk} onCancel={handleModalCancel} footer={modalFooter} centered destroyOnClose>
      <Form form={formInstance} initialValues={formInitialValue} onFinish={handleFormFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} preserve={false}>
        <Form.Item
          label="Task Name"
          name="taskName"
          colon={false}
          requiredMark={false}
          rules={[
              { pattern: /^[\x20-\x7E]+$/g, message: 'Only printable characters are permitted!' },
              { validator: async (_, taskName) => {
                  if (!taskName || !taskName.trim()) {
                    return Promise.reject(new Error('Please fill Task name'));
                  }
                  return Promise.resolve();
                }
              },
            ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          disabled={!categories}
          rules={[
            { validator: async (_, categoryId) => {
                if (typeof(categoryId) !== "number") {
                  return Promise.reject(new Error('Please select category'));
                }
                return Promise.resolve();
              }
            }
          ]}
          colon={false}
          
        >
          <Select>
            {(categories || []).map(category => <Select.Option key={category.CategoryID} value={category.CategoryID}>{category.CategoryTitle}</Select.Option>)}
          </Select>
        </Form.Item>
      </Form>
      {error && <Alert message={error.response?.data?.message || error.message} type="error" showIcon />}
    </Modal>
  )
}
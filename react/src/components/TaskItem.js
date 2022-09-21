import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, List, Popconfirm, message } from 'antd';
import { DeleteFilled, EditFilled, CheckCircleFilled } from '@ant-design/icons';

import { editTask } from '../store/taskModal';
import { editTask as taskApiEditTask, deleteTask as taskApiDeleteTask } from '../helpers/taskApi';
import taskEvents from '../helpers/taskEvents';

import styles from './TaskItem.module.css';

export default function TaskItem({ task, onChange }) {
  const dispatch = useDispatch();

  const handleCompletChecked = useCallback(() => {
    const taskId = task.TaskID;
    const payload = {
      taskName: task.TaskName,
      categoryId: task.Category.CategoryID,
      isCompleted: !task.TaskCompleted
    };
    taskApiEditTask({ taskId, payload }).then(() => {
      onChange(taskEvents.UPDATED);
    }).catch(err => {
      console.error('Error while editing task using API', err);
      message.error(err.response?.data?.message || err.message);
    });
    
  }, [ task, onChange ]);

  const handleEdit = useCallback(() => {
    dispatch(editTask(task));
  }, [ task, dispatch ]);

  const handleDelete = useCallback(() => {
    const taskId = task.TaskID;
    taskApiDeleteTask({ taskId }).then(() => {
      onChange(taskEvents.DELETED);
    }).catch(err => {
      console.error('Error while deleting task using API', err);
      message.error(err.response?.data?.message || err.message);
    });
  }, [ task, onChange ]);

  return (
    <List.Item
      actions={[
        <Button onClick={handleEdit} icon={<EditFilled/>}>Edit</Button>,
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button key="delete" icon={<DeleteFilled />} danger type="primary">Delete</Button>
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        className={styles.listItemMeta}
        avatar={task.TaskCompleted ? <CheckCircleFilled className={styles.checkIcon} onClick={handleCompletChecked} /> : <div className={styles.notCheckIcon} onClick={handleCompletChecked}></div>}
        title={<span className={styles.categoryTitle}>{task.Category.CategoryTitle}</span>}
        description={<span className={styles.taskName}>{task.TaskName}</span>}
      />
    </List.Item>
  )
}
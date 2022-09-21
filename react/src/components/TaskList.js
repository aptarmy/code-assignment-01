import useSWR from 'swr';
import { List, Alert } from 'antd';

import TaskItem from './TaskItem';
import TaskModal from './TaskFormModal';
import fetcher from '../helpers/fetcher';
import styles from './TaskList.module.css';

export default function TaskList() {

  const { data: tasks, error, mutate } = useSWR('/api/tasks', fetcher);
  const isLoading = !tasks && !error;
  const errorMsg = error && (error.response?.dadta?.message || error.message);

  return (
    <>
      {errorMsg && <Alert message={`Error occured: ${errorMsg}`} type="error" showIcon closable />}
      <List
        className={styles.taskList}
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={tasks || []}
        renderItem={task => <TaskItem key={task.TaskID} task={task} onChange={e => mutate()} />}
      />
      <TaskModal onChange={e => mutate()} />
    </>
  )
}
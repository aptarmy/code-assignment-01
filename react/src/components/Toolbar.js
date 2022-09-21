import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createTask } from '../store/taskModal';

import styles from './Toolbar.module.css';

export default function Toolbar() {
  const dispatch = useDispatch();
  const openTaskModal = useCallback(() => {
    dispatch(createTask());
  }, [ dispatch ]);
  return (
    <div className={styles.toolbar}>
      <Button onClick={openTaskModal} type="primary" icon={<PlusOutlined />}>Add new Task</Button>
    </div>
  )
}
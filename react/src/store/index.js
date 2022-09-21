import { configureStore } from '@reduxjs/toolkit';
import taskModalSlice from './taskModal';

export default configureStore({
  reducer: {
    taskModal: taskModalSlice
  }
})
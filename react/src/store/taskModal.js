import { createSlice } from '@reduxjs/toolkit'

export const taskModalSlice = createSlice({
  name: 'taskModal',
  initialState: {
    task: null,
    isOpenModal: false,
  },
  reducers: {
    createTask: state => {
      state.task = null
      state.isOpenModal = true;
    },
    editTask: (state, action) => {
      const task = action.payload;
      state.task = task;
      state.isOpenModal = true;
    },
    closeModal: state => {
      state.task = null;
      state.isOpenModal = false;
    },
  }
})

// Action creators are generated for each case reducer function
export const { createTask, editTask, closeModal } = taskModalSlice.actions

export default taskModalSlice.reducer
import axios from 'axios';

export const createTask = ({ payload }) => axios.post(`/api/tasks`, payload);
export const editTask   = ({ taskId, payload }) => axios.put(`/api/tasks/${taskId}`, payload);
export const deleteTask = ({ taskId }) => axios.delete(`/api/tasks/${taskId}`);

export const getTaskFromBoredAPI = async categories => {
  let data = await axios.get('https://www.boredapi.com/api/activity?minaccessibility=0&maxaccessibility=0.9').then(res => res.data);
  const taskName = data.activity;
  // Note: data.accessibility ranging from [0-0.9] (inclusive)
  const categoryIds = categories.map(category => category.CategoryID); // map CategoryID from database
  const categoryIdRange = Math.max(...categoryIds) - Math.min(...categoryIds) + 1;
  const categoryId =  Math.min(...categoryIds) + Math.floor(data.accessibility * categoryIdRange)
  const randomTask = { taskName, categoryId };
  return randomTask;
}
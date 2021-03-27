import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'client/typings';

export type TaskState = {
  formVisible: boolean;
  task?: Task;
};

const initialState: TaskState = {
  formVisible: false,
};

const task = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state: TaskState, action: PayloadAction<{ task?: Task }>) => ({
      ...state,
      task: action.payload.task,
    }),
    showTaskForm: (state): TaskState => ({
      ...state,
      formVisible: true,
    }),
    hideTaskForm: (state): TaskState => ({
      ...state,
      formVisible: false,
    }),
  },
});

export const { setTask, showTaskForm, hideTaskForm } = task.actions;

export default task.reducer;

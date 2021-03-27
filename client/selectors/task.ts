import { path, pathOr } from 'ramda';
import { Task } from 'client/typings';

export const getTask = path<Task>(['task', 'task']);
export const isTaskFormVisible = pathOr(false, ['task', 'formVisible']);

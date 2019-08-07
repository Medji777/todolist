import {createSelector} from 'reselect';
import {filterTask} from "./todoReducer";
import {IInitialState, IStateAll, ITask} from "../DAL/entities/entities";

export const getFilterValue = (state: IStateAll<IInitialState>): string => state.todo.filterValue;
const getTasks = (state: IStateAll<IInitialState>): ITask[] => [...state.todo.tasks];

export const filterTasks = createSelector(
    [getFilterValue,getTasks],
    (filter,task) => {
        let All: boolean = filter === filterTask.ALL;
        let Active: boolean = filter === filterTask.ACTIVE;
        let Done: boolean = filter === filterTask.DONE;
        return task.filter(t => All || (Active && !t.done) || (Done && t.done));
    }
);

export const getStatus = (state: IStateAll<IInitialState>): string => state.todo.status;
export const getMessageError = (state: IStateAll<IInitialState>): string => state.todo.messageError;
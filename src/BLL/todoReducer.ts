import ActionType from './ActionType';
import API from "../DAL/API";
import {ITask} from "../DAL/entities/entities";

const {SET_TASK,ADD_TASK,DELETE_TASK,SET_MESSAGE_ERROR,CHANGE_STATUS_TASK,CHANGE_FILTER,CHANGE_TASK} = ActionType;

export const statuses = {
    INIT: 'init',
    SUCCESS: 'success',
    IN_PROGRESS: 'in_progress',
    ERROR: 'error'
};

export const filterTask = {
    ALL: 'All',
    ACTIVE: 'Active',
    DONE: 'Done'
};

const initialState = {
    tasks: [] as ITask[],
    status: statuses.INIT,
    messageError: '',
    filterValue: filterTask.ALL
};

const widgetId = 86789;

interface IAction<T> {
    tasks: ITask[],
    task: ITask,
    status: string,
    taskId: string,
    obj: T,
    message: string,
    filter: string
    type: string
}

interface IObj {
    done: boolean,
    title: string
}

const todolistReducer = (state = initialState,action: IAction<IObj>) => {
    switch (action.type) {
        case SET_TASK: {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        }
        case CHANGE_STATUS_TASK: {
            return {
                ...state,
                status: action.status
            }
        }
        case CHANGE_TASK: {
            return {
                ...state,
                tasks: state.tasks.map((t: ITask)=> {
                    if(t.id === action.taskId){
                        return {...t,...action.obj}
                    }
                    return t
                })
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter((t: ITask) => t.id !== action.taskId)
            }
        }
        case SET_MESSAGE_ERROR: {
            return {
                ...state,
                messageError: action.message
            }
        }
        case CHANGE_FILTER: {
            return {
                ...state,
                filterValue: action.filter
            }
        }
        default:
            return state
    }
};

export const setTodolist = (tasks: ITask[]): Object => ({type:SET_TASK,tasks});
export const changeStatusTask = (status: string): Object => ({type:CHANGE_STATUS_TASK,status});
export const addTask = (task: ITask): Object => ({type:ADD_TASK,task});
export const deleteTitleTask = (taskId: string): Object => ({type:DELETE_TASK,taskId});
export const changeTask = (taskId: string,obj: IObj): Object => ({type:CHANGE_TASK,taskId,obj});
export const setMessageError = (message: string): Object => ({type:SET_MESSAGE_ERROR,message});
export const changeFilter = (filter: string): Object => ({type: CHANGE_FILTER,filter});

interface IRes {
    data: ITask[]
}

interface IResData {
   data: {
       task: ITask,
       status: string
   }
}

export const getTodoList = (): Function => async (dispatch: Function) => {
    //debugger
    dispatch(changeStatusTask(statuses.IN_PROGRESS));
    let res: IRes = await API.getTasks(widgetId);
    if(res.data){
        dispatch(setTodolist(res.data));
        dispatch(changeStatusTask(statuses.SUCCESS));
    } else {
        dispatch(changeStatusTask(statuses.ERROR));
    }
};

export const setTask = (title: string): Function => async (dispatch: Function) => {
    //debugger
    if(title){
        dispatch(changeStatusTask(statuses.IN_PROGRESS));
        let res: IResData = await API.postTasks(widgetId,title);
        dispatch(addTask(res.data.task));
        //dispatch(getTodoList());
        dispatch(changeStatusTask(statuses.SUCCESS));
    } else {
        dispatch(changeStatusTask(statuses.ERROR));
    }
};

export const updateTask = (taskId: string,obj: IObj): Function => async (dispatch: Function) => {
    dispatch(changeStatusTask(statuses.IN_PROGRESS));
    //debugger
    let res: IResData = await API.putTask(widgetId,taskId,obj);
    if(res.data.status === statuses.SUCCESS){
        dispatch(changeTask(taskId,obj));
        if(obj.hasOwnProperty('title') && !obj.title.trim()){
            dispatch(setMessageError('Поле не может быть пустым'));
            dispatch(changeStatusTask(statuses.ERROR));
        } else {
            dispatch(setMessageError(''));
            dispatch(changeStatusTask(statuses.SUCCESS));
        }
    } else {
        dispatch(setMessageError('Не более 30 символов'));
        dispatch(changeStatusTask(statuses.ERROR));
    }
};

export const deleteTask = (taskId: string): Function => async (dispatch: Function) => {
    //debugger
    dispatch(changeStatusTask(statuses.IN_PROGRESS));
    await API.deleteTasks(widgetId,taskId);
    dispatch(deleteTitleTask(taskId));
    dispatch(changeStatusTask(statuses.SUCCESS));
};

export default todolistReducer;
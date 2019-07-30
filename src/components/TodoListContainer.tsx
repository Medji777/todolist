import React,{useState,useEffect} from 'react';
import {connect} from "react-redux";
import TodoList from "./TodoList";
import {
    deleteTask,
    getTodoList,
    setTask,
    updateTask,
    changeFilter
} from "../BLL/todoReducer";
import {filterTasks, getFilterValue, getMessageError, getStatus} from "../BLL/selector";
import {IInitialState, IStateAll, ITask} from "../DAL/entities/entities";
import {INewTask} from "./TodoListInput/TodoListInput";

// const TodoListContainer1 = ({updateTask,changeTask,setTask,deleteTask,getTodoList,...props}) => {
//
//     const [isActive, setIsActive] = useState(false);
//     const [taskId, setTaskId] = useState('');
//
//     const changeDoneTask = (taskId: string,done: boolean): void => {
//         updateTask(taskId,{done})
//     };
//
//     const setTitleTask = (value: any): void => {
//         setTask(value.taskTitle);
//     };
//
//     const deleteTitleTask = (taskId: string): void => {
//         deleteTask(taskId)
//     };
//
//     const isActiveTask = (taskId: string): void => {
//         setIsActive(true);
//         setTaskId(taskId);
//     };
//
//     const isDeactiveTask = (taskId: string,title: string): void => {
//         setIsActive(false);
//         setTaskId(taskId);
//
//         props.tasks.forEach((t: ITask) => {
//             if(t.title !== title && t.id === taskId){
//                 updateTask(taskId,{title})
//             }
//         });
//     };
//
//     useEffect(() => {
//         getTodoList()
//     },[]);
//
//     return (
//         <TodoList {...props} title={newTaskTitle} changeInputTitle={changeInputTitle} setTitleTask={setTitleTask}
//                   deleteTitleTask={deleteTitleTask} idTask={taskId} isActive={isActive}
//                   isActiveTask={isActiveTask} isDeactiveTask={isDeactiveTask} changeTitleTask={changeTitleTask}
//                   changeDoneTask={changeDoneTask}/>
//     )
// };

interface IProps {
    updateTask: (taskId: string, obj: any) => Function,
    setTask: (title: string) => Function,
    deleteTask: (taskId: string) => Function,
    getTodoList: () => Function,
    changeFilter: (filter: string) => Object,
    tasks: ITask[],
    status: string,
    messageError: string,
    filterValue: string
}

interface IState {
    isActive: boolean,
    taskId: string | null
}

class TodoListContainer extends React.Component<IProps,IState> {

    state = {
        isActive: false,
        taskId: null
    };

    changeDoneTask = (taskId: string,done: boolean): void => {
        this.props.updateTask(taskId,{done})
    };

    setTitleTask = (values: INewTask): void => {
        this.props.setTask(values.taskTitle);
    };

    deleteTitleTask = (taskId: string): void => {
        this.props.deleteTask(taskId)
    };

    isActiveTask = (taskId: string): void => {
        this.setState({isActive: true, taskId})
    };

    isDeactiveTask = (taskId: string,title: string): void => {
        this.setState({isActive: false, taskId});

        this.props.tasks.forEach((t: ITask) => {
            if(t.title !== title && t.id === taskId){
                this.props.updateTask(taskId,{title})
           }
        });
    };

    componentDidMount() {
        this.props.getTodoList()
    }

    render() {
        return (
            <TodoList {...this.props} setTitleTask={this.setTitleTask}
                      deleteTitleTask={this.deleteTitleTask} idTask={this.state.taskId} isActive={this.state.isActive}
                      isActiveTask={this.isActiveTask} isDeactiveTask={this.isDeactiveTask}
                      changeDoneTask={this.changeDoneTask}/>
        )
    }
}

export default connect((state: IStateAll<IInitialState>) => ({
    tasks: filterTasks(state),
    status: getStatus(state),
    messageError: getMessageError(state),
    filterValue: getFilterValue(state)
}), {
    getTodoList,
    setTask,
    deleteTask,
    updateTask,
    changeFilter
})(TodoListContainer);
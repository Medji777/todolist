import React from 'react';
import styled from './TodoList.module.css';
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import TodoListInputContainer from "./TodoListInput/TodoListInputContainer";
import EditTask from "./TodoListTasks/EditTask/EditTask";
import Task from "./TodoListTasks/Task/Task";
import {ITask} from "../DAL/entities/entities";
import {INewTask} from "./TodoListInput/TodoListInput";

interface ITodoList {
    tasks: ITask[],
    status: string,
    changeDoneTask: (taskId: string,done: boolean) => void,
    setTitleTask: (value: INewTask) => void,
    deleteTitleTask: (taskId: string) => void,
    idTask: string | null,
    isActive: boolean,
    isActiveTask: (taskId: string) => void,
    isDeactiveTask: (taskId: string,title: string) => void,
    messageError: string,
    changeFilter: (filter: string) => Object,
    filterValue: string
}

const TodoList: React.FC<ITodoList> = ({tasks, status, changeDoneTask, setTitleTask, deleteTitleTask, idTask, isActive, isActiveTask, isDeactiveTask, messageError,changeFilter,filterValue}) => {
    return (
        <div className={styled.todolist}>
            <h1>To Do List</h1>
            <TodoListInputContainer setTitleTask={setTitleTask} status={status}/>
            <div className={styled.todolist__list}>
                <ul className={styled.todolist__tasks}>
                    {
                        tasks.length ? tasks.map((t: ITask) => (
                            isActive && t.id === idTask ?
                                <EditTask key={t.id} initialValues={t} idTask={idTask}
                                          isDeactiveTask={isDeactiveTask}
                                          deleteTitleTask={deleteTitleTask}
                                          changeDoneTask={changeDoneTask}/> :
                                <Task key={t.id} task={t} idTask={idTask}
                                      status={status} deleteTitleTask={deleteTitleTask}
                                      isActiveTask={isActiveTask} changeDoneTask={changeDoneTask}
                                      messageError={messageError}/>)
                        ) : <li>No Tasks</li>
                    }
                </ul>
            </div>
            <TodoListFooter changeFilter={changeFilter} filterValue={filterValue}/>
        </div>
    );
};

export default TodoList;
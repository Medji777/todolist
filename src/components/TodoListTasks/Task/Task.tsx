import React, {useEffect, useState} from 'react';
import {statuses} from "../../../BLL/todoReducer";
import styled from "../../TodoListTasks/TodoListTasks.module.css";

interface ITasks<T> {
    task: T,
    idTask: string | null,
    status: string,
    deleteTitleTask: (taskId: string) => void,
    isActiveTask: (taskId: string) => void,
    changeDoneTask: (taskId: string,done: boolean) => void,
    messageError: string
}

interface ITask {
    id: string,
    title: string,
    done: boolean
}

const Task: React.FC<ITasks<ITask>> = ({task,idTask,status,deleteTitleTask,isActiveTask,changeDoneTask,messageError}: ITasks<ITask>) => {

    const {id,title,done}: ITask = task;

    const [currentTitle, setCurrentTitle] = useState(title);

    useEffect((): void =>{
        setCurrentTitle(title)
    },[title]);

    const deleteTask = (): void => {
        deleteTitleTask(id)
    };

    return (
        <li className={styled.todolist__task}>
            <input className={styled.todolist__task_flag} name='checkbox' type='checkbox' checked={done}
                   onChange={(e) => {changeDoneTask(id, e.currentTarget.checked)}}/>
            {done ? <p className={styled.todolist__task_done}>{currentTitle}</p> :
                <p className={styled.todolist__task_active} onDoubleClick={() => {isActiveTask(id)}}>{currentTitle}</p>}
            {
                id === idTask && status === statuses.ERROR &&
                <span className={styled.todolist__task_error}>{messageError}</span>
            }
            <span className={styled.todolist__task_close} onClick={deleteTask}>X</span>
        </li>
    );

};

export default Task;
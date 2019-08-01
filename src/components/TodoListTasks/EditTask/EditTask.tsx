import React from 'react';
import styled from '../../TodoListTasks/TodoListTasks.module.css'
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {ITask} from "../../../DAL/entities/entities";

interface IEditTask {
    done: boolean,
    title: string
}

interface IProps {
    initialValues: ITask,
    idTask: string | null,
    isDeactiveTask: (taskId: string,title: string) => void,
    deleteTitleTask: (taskId: string) => void,
    changeDoneTask: (taskId: string,done: boolean) => void
}

const EditTask: React.FC<InjectedFormProps<IEditTask, IProps> & IProps> = ({initialValues, idTask, isDeactiveTask, deleteTitleTask, changeDoneTask}) => {

    const changeDoneStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
        changeDoneTask(initialValues.id, e.currentTarget.checked)
    };

    const changeTitle = (e: React.SyntheticEvent<HTMLInputElement>): void => {
        isDeactiveTask(initialValues.id, e.currentTarget.value);
    };

    const deleteTask = (): void => {
        deleteTitleTask(initialValues.id)
    };

    return (
        <li className={`${styled.todolist__task} ${styled.todolist__task_form}`}>
            <form >
                <Field component={'input'} name='done' type={'checkbox'} className={styled.todolist__task_flag}
                       onChange={changeDoneStatus}/>
                <Field component={'input'} name={'title'} type={'text'} className={styled.todolist__task_title}
                       onBlur={changeTitle} autoFocus/>
            </form>
            <span className={styled.todolist__task_close} onClick={deleteTask}>X</span>
        </li>
    );
};

export default reduxForm<IEditTask, IProps>({
    form: 'editTaskForm'
})(EditTask);
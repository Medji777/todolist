import React from 'react';
import {statuses} from "../../BLL/todoReducer";
import Loading from "../Loading/Loading";
import styled from './TodoListInput.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import InputForm from "./InputForm/InputForm";

const ValidateOnInput = (value: string): string | undefined => {
    if (!value) return 'Поле не может быть пустым';
    return undefined
};

const ValidateOnInputTrim = (value: string): string | undefined => {
    if(!(/^[a-zа-яё0-9_+=():^-]+/i.test(value))) return 'Не корректное название';
    return undefined
};

const ValidateOnInputLength = (value: string): string | undefined => {
    if(value.length > 30) return 'Таска не более 30 символов';
    return undefined
};

export interface INewTask {
    taskTitle: string;
}

interface IProps {
    status: string
}

const TodoListInput: React.FC<InjectedFormProps<INewTask, IProps> & IProps> = ({handleSubmit,status}) => {
    const isRequest: boolean = status === statuses.IN_PROGRESS;

    return (
        <div className={styled.todolist__input}>
            <form onSubmit={handleSubmit} className={styled.todolist__input_form}>
                <Field component={InputForm} name={'taskTitle'} type={'text'} placeholder={'new tasks'}
                       disabled={isRequest || false} validate={[ValidateOnInput,ValidateOnInputTrim,ValidateOnInputLength]}/>
                <button type={'submit'} disabled={isRequest || false}>Add</button>
            </form>
            {isRequest && <Loading wrap={{minHeight: 'auto', gridArea: 'b'}} preload={{
                width: '17px',
                height: '17px',
                border: '2px solid #fff',
                borderTopColor: '#1add05'
            }}/>}
        </div>
    );
};

export default reduxForm<INewTask, IProps>({
    form: 'todoListInput'
})(TodoListInput);
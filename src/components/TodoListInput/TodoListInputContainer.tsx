import React from 'react';
import {reset} from "redux-form";
import TodoListInputReduxForm, {INewTask} from "./TodoListInput";

interface ITodoListInput {
    setTitleTask: (value: INewTask) => void,
    status: string
}

const TodoListInputContainer: React.FC<ITodoListInput> = ({setTitleTask, status}) => {

    const resetInput = (result: Object,dispatch: Function): void => {
        dispatch(reset('todoListInput'));
    };

    return <TodoListInputReduxForm onSubmit={setTitleTask} onSubmitSuccess={resetInput} status={status}/>

};

export default TodoListInputContainer;
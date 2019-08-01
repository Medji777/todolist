import React from 'react';
import styled from './TodoListFooter.module.css';

interface ITodoListFooter {
    changeFilter: (filter: string) => Object,
    filterValue: string
}

const TodoListFooter: React.FC<ITodoListFooter> = ({changeFilter, filterValue}) => {

    return (
        <div className={styled.todolist__filters}>
            {['All', 'Active', 'Done'].map((f: string) => <button key={f}
                                                                  className={filterValue === f ? styled.todolist__filter_active : styled.todolist__filter}
                                                                  onClick={() => changeFilter(f)}>{f}</button>)}
        </div>
    );

};

export default TodoListFooter;
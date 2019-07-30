import React from 'react';
import styled from './Wrapped.module.css'

const Wrapped = (props: any) => {
    return (
        <div className={styled.wrapped}>
            {props.children}
        </div>
    );
};

export default Wrapped;
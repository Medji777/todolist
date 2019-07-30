import React from 'react';
import styled from './Loading.module.css';

interface ILoading {
    wrap: Object,
    preload: Object
}

const Loading = ({wrap,preload}: ILoading) => {
    return (
        <div style={wrap} className={styled.wrap_loading}>
            <div style={preload} className={styled.loading}/>
        </div>
    )
};

export default Loading;
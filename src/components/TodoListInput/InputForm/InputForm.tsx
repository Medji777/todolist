import React from "react";
//import styled from './InputForm.module.css';

interface IInputForm {
    input: string,
    meta: any
}

const InputForm = ({input,meta,...props}: IInputForm) => {
    const s = (meta: any) => {
        if(meta.touched) {
            if(meta.invalid){
                return 'red'
            } else if(meta.warning){
                return 'orange'
            }
            return '#00000045'
        }
    };

    let errorMessage = meta.error || meta.warning;
    return (
        <>
            <input {...props} {...input} style={{border:`1px solid ${s(meta)}`}} autoComplete={'off'}/>
            {meta.touched && errorMessage && <span style={{color:`${s(meta)}`}}>{errorMessage}</span>}
        </>
    )
};

export default InputForm;
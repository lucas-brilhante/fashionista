import React from 'react';
import styled from 'styled-components';

const Dialog = ({component, active, closeDialog}) => {
    const Component = component;
    if(!active)
        return <div/>

    const handleKeyPress = (e) =>{
        console.log('key',e.key);
        if(e.key === 'Escape')
            closeDialog();
    }

    const handleClick = () =>{
        closeDialog();
    }

    return (
        <DialogBackground tabIndex={-1} onKeyDown={handleKeyPress} onClick={handleClick}>
            <Component/>
        </DialogBackground>
    )

}

const DialogBackground = styled.div`
    display: flex;
    justify-content: flex-end;
    background: rgba(0, 0, 0, 0.6);
    color: red;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`;

export default Dialog;
import React, { useEffect, Fragment } from 'react';
import styled from 'styled-components';

const Dialog = ({ component, active, closeDialog }) => {
    const Component = component;

    useEffect(() => {
        const dialog = document.getElementById('dialog');
        if (dialog)
            dialog.focus();
    }, [])

    if (!active)
        return <div />

    const handleKeyPress = (e) => {
        console.log('key', e.key);
        if (e.key === 'Escape')
            closeDialog();
    }

    const handleClick = () => {
        closeDialog();
    }

    return (
        <Fragment>
            <DialogBackground onKeyDown={handleKeyPress} tabIndex={-1} onClick={handleClick} />
            <DialogContainer >
                <DialogContent>
                <DummyContainer/>
                    <Component closeDialog={closeDialog}/>
                </DialogContent>
            </DialogContainer>
        </Fragment>
    )

}

const DialogContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    max-width: 1080px;
    justify-content: flex-end;
    z-index: 10;
`;

const DummyContainer = styled.div`
    display: flex;
    height: 64px;
`;

const DialogBackground = styled.div`
    display: flex;
    justify-content: flex-end;
    background: rgba(0, 0, 0, 0.6);
    color: red;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 5;
`;

const DialogContent = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 10;
    position: absolute;
    background: blue;
`;

export default Dialog;
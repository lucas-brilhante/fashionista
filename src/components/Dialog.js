import React, { useEffect, memo } from 'react';
import styled from 'styled-components';

const Dialog = ({ component, active, closeDialog }) => {
    const Component = component;

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape')
                closeDialog();
        }

        if (active)
            document.addEventListener("keydown", handleKeyPress, false);
        
        return () => document.removeEventListener("keydown", handleKeyPress, false);

    }, [active, closeDialog]);

    useEffect(() => {
        const overflow_type = document.body.style.overflow;
        const position = document.body.style.position;
        if (active){
            document.body.style.overflow = "hidden"
            document.body.style.position = "fixed"
        }
        
        return () => {
            document.body.style.overflow = overflow_type;
            document.body.style.position = position;
        };
    }, [active]);

    if (!active)
        return <div />

    const handleClick = () => {
        closeDialog();
    }

    return (
        <DialogContainer>
            <DialogBackground onClick={handleClick} />
            <DialogContent>
                <DummyContainer />
                <Component closeDialog={closeDialog}/>
            </DialogContent>
        </DialogContainer>
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
    height: 50px;
`;

const DialogBackground = styled.div`
    display: flex;
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
    position: static;
    display: flex;
    flex-direction: column;
    z-index: 10;
    position: absolute;
`;

export default memo(Dialog);
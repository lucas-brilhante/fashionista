import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

const Loading = ({message="Carregando"}) => {
    const [points, setPoints] = useState('');

    useEffect(() => {
        const Point = (points) => {
            if (points === " . . .")
                return "";

            return points + " .";
        }
        const interval = setInterval(() => {
            setPoints(prevState => Point(prevState));
        }, 200);

        return () => clearInterval(interval);
    }, [])

    return (
        <Fragment>
            <DummyContainer height={64} />
            <Container>
                {message}{points}
            </Container>
        </Fragment>
    )

}

const Container = styled.div`
    display: flex;
    max-width: 1080px;
    margin: 0 auto;
    font-weight: bolder;
    justify-content: center;
`;

const DummyContainer = styled.div`
    width: ${({ width }) => width + 'px' || 'auto'};
    height: ${({ height }) => height + 'px' || 'auto'};
`;

export default Loading;
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Animation = ({ children, active, animation = "fade", duration = 1, zIndex=0 }) => {
    const [render, setRender] = useState(active);

    useEffect(() => {
        if (active) setRender(true);
    }, [active])

    const animationEnds = () => {
        if (!active) setRender(false);
    }

    return (render &&
        <EffectContainer
            active={active}
            zIndex={zIndex}
            animation={animation}
            duration={duration}
            onAnimationEnd={animationEnds}>
            {children}
        </EffectContainer>
    );
}

const EffectContainer = styled.div`
    animation:  ${({ active, animation }) => (active ? (animation + "-start") : (animation + "-end"))}
                ${({ duration }) => duration}s;
    z-index: ${({zIndex}) => zIndex};
    @keyframes fade-start {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fade-end {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes drop-start {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0%);
        }
    }
    @keyframes drop-end {
        from {
            transform: translateY(0%);
        }
        to {
            transform: translateY(-100%);
        }
    }

`;

export default Animation;
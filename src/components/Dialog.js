import React, { useEffect, memo } from 'react'
import styled from 'styled-components'
import { Animation } from 'components'
import PropTypes from 'prop-types'

// Create a modal

const Dialog = ({ component, active, closeDialog }) => {
  const Component = component

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') closeDialog()
    }

    if (active) document.addEventListener('keydown', handleKeyPress, false)

    return () => document.removeEventListener('keydown', handleKeyPress, false)
  }, [active, closeDialog])

  useEffect(() => {
    const overflowType = document.body.style.overflow
    const { position } = document.body.style
    if (active) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = overflowType
      document.body.style.position = position
    }
  }, [active])

  const handleClick = () => {
    closeDialog()
  }

  return (
    <Animation active={active} duration={0.6} zIndex={10}>
      <DialogContainer>
        <DialogBackground onClick={handleClick} />
        <DialogContent>
          <DummyContainer />
          <Animation active={active} duration={0.6} animation='drop'>
            <Component closeDialog={closeDialog} />
          </Animation>
        </DialogContent>
      </DialogContainer>
    </Animation>
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
`

const DummyContainer = styled.div`
  display: flex;
  height: 50px;
`

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
`

const DialogContent = styled.div`
  position: static;
  display: flex;
  flex-direction: column;
  z-index: 10;
  position: absolute;
`

Dialog.propTypes = {
  component: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
}

export default memo(Dialog)

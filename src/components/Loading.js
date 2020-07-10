import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// Show 'Loading . . .' message when API is fetching

const Loading = ({ message }) => {
  const [points, setPoints] = useState('')

  useEffect(() => {
    const Point = (value) => {
      if (value === ' . . .') return ''

      return `${value} .`
    }
    const interval = setInterval(() => {
      setPoints((prevState) => Point(prevState))
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <DummyContainer height={64} />
      <Container>
        {message}
        {points}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  font-weight: bolder;
  justify-content: center;
`

const DummyContainer = styled.div`
  width: ${({ width }) => `${width}px` || 'auto'};
  height: ${({ height }) => `${height}px` || 'auto'};
`

Loading.propTypes = {
  message: PropTypes.string,
}

Loading.defaultProps = {
  message: 'Carregando',
}

export default Loading

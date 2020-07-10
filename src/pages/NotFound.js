import React from 'react'
import styled from 'styled-components'

// Not Found - Display a message when some route doesn't match with existents routes

const NotFound = () => (
  <NotFoundContainer>
    <h1>Página não encontrada</h1>
  </NotFoundContainer>
)

const NotFoundContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`

export default NotFound

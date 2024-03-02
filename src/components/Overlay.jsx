import React from 'react'
import { styled } from 'styled-components';

const Overlay = ({children}) => {
  return (
    <OverlayStyles >{children}</OverlayStyles>
  )
}

export default Overlay

const OverlayStyles = styled.div`
  display: block;
  top: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;
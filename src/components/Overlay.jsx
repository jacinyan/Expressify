import React from 'react';
import styled from 'styled-components';

const Overlay = ({ children}) => {
  return <OverlayStyles >{children}</OverlayStyles>;
};

export default Overlay;

const OverlayStyles = styled.div`
  position: relative;
  height: 100%;
`;

import React from 'react'
import { styled } from 'styled-components';

const Overlay = () => {
  return (
    <OverlayStyles />
  )
}

export default Overlay

const OverlayStyles = styled.div`
  position: fixed; // 或使用 absolute，取决于父容器
  top: 0;
  right: 0;
  width: 50%; // 或者根据你的布局需要具体调整
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 半透明，你可以根据需要调整
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
`;

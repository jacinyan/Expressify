import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <StyledLayout>
      <Outlet />
    </StyledLayout>
  );
};

export default Layout;

// 使用 styled-components 创建一个 styled div
const StyledLayout = styled.main`
  background-color: #fff;
  padding: 80px;
  min-height: 100vh;
  overflow: auto;
`;

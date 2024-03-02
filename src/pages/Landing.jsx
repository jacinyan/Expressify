import React, { useState } from 'react';
import styled from 'styled-components';
import AuthForm from '@components/AuthForm';

const Landing = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    // e.g. call Web APIs to switch on/off cameras
  };

  const formProps = {
    type: 'login', // or 'signup'
    title: 'Welcome Back!',
    fields: [
      { label: 'Email', placeholder: 'Enter your email', type: 'email' },
      {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
      },
    ],
    // other props
  };

  return (
    <MainContainer>
      {/*  */}
      <LoginContainer>
        <LoginColumn>
          <GreetingSection>
            <Title>Welcome back!</Title>
            <Subtitle>Enter your Credentials to access your account</Subtitle>
            <AuthForm {...formProps} />
          </GreetingSection>
        </LoginColumn>
      </LoginContainer>
      <>
        <CameraColumn>
          <CameraSection>
            <CameraTitle>Camera Control</CameraTitle>
            <CameraControlButton onClick={toggleCamera}>
              {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
            </CameraControlButton>
          </CameraSection>
        </CameraColumn>
      </>
    </MainContainer>
  );
};

export default Landing;

const MainContainer = styled.main`
  background-color: #fff;
  padding-left: 80px;
  height: 100vh;
  overflow: auto;
  @media (max-width: 991px) {
    padding-left: 20px;
  }

`;

const LoginContainer = styled.section`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const LoginColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 38%;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const GreetingSection = styled.section`
  margin: auto 0;
  padding: 2px 0;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Title = styled.h2`
  font: 32px Poppins, sans-serif;
  color: #000;
`;

const Subtitle = styled.p`
  margin-top: 11px;
  font: 16px Poppins, sans-serif;
  color: #000;
`;

const CameraColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 62%; // 由于LoginColumn占用了38%，此处占其余的部分
  align-items: center; // 水平居中
  justify-content: center; // 垂直居中
`;

const CameraSection = styled.section`
  text-align: center;
`;

const CameraTitle = styled.h2`
  font-size: 24px;
  color: #000;
`;

const CameraControlButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

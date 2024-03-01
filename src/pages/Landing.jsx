import React from 'react';
import styled from 'styled-components';
import AuthForm from '@components/AuthForm';

const Landing = () => {
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
      <LoginContainer>
        <LoginColumn>
          <GreetingSection>
            <Title>Welcome back!</Title>
            <Subtitle>Enter your Credentials to access your account</Subtitle>
            <AuthForm {...formProps} />
          </GreetingSection>
        </LoginColumn>
      </LoginContainer>
    </MainContainer>
  );
};

export default Landing;

const MainContainer = styled.main`
  background-color: #fff;
  padding-left: 80px;
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

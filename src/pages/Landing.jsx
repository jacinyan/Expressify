import { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  loadFaceLandmarkModel,
  loadFaceRecognitionModel,
  loadSsdMobilenetv1Model,
} from 'face-api.js';

import AuthForm from '@components/AuthForm';
import CameraOverlay from '@components/Overlay';
import CameraVideo from '@components/Video';

const MODEL_URL = '/models';

const FACE_MATCHER_THRESHOLD = 0.6;

const loadModels = async () => {
  await loadSsdMobilenetv1Model(MODEL_URL);
  await loadFaceLandmarkModel(MODEL_URL);
  await loadFaceRecognitionModel(MODEL_URL);
};

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

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <LandingContainer>
      {/* Left Column */}
      <AuthColumn>
        <GreetingSection>
          <Title>Welcome back!</Title>
          <Subtitle>Enter your Credentials to access your account</Subtitle>
          <AuthForm {...formProps} />
        </GreetingSection>
        <CamControlSection>
          <CamTitle>Camera Control</CamTitle>
          <CameraControlButton onClick={toggleCamera}>
            {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
          </CameraControlButton>
        </CamControlSection>
      </AuthColumn>
      {/* Right Column */}
      <CameraColumn>
        <CameraSection>
          {isCameraOn && (
            <CameraOverlay show={isCameraOn}>
              {/* <CameraCircle id="cameraCircle"> */}
              <CameraVideo />
              {/* </CameraCircle> */}
            </CameraOverlay>
          )}
        </CameraSection>
      </CameraColumn>
    </LandingContainer>
  );
};

export default Landing;

const LandingContainer = styled.section`
  display: flex;
`;

const AuthColumn = styled.section`
  flex: 1;
  gap: 20px;
  display: flex;
  flex-direction: column;
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

const CamControlSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 62%; // 由于LoginColumn占用了38%，此处占其余的部分
  align-items: center; // 水平居中
  justify-content: center; // 垂直居中
`;

const CameraSection = styled.section`
  text-align: center;
`;

const CamTitle = styled.h2`
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

// Camera Column Section
const CameraColumn = styled.section`
  flex: 1;
  gap: 20px;
  display: flex;
`;

const CameraCircle = styled.canvas`
  border-radius: 50%;
  width: 300px; // 根据需要调整尺寸
  height: 300px;
  // 为了确保圆形效果, width 和 height 应相等
`;

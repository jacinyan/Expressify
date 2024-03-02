import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import * as faceapi from 'face-api.js';

import { useAuth } from '@components/AuthContext';

import AuthForm from '@components/AuthForm';
import Overlay from '@components/Overlay';

const MODEL_URL = process.env.PUBLIC_URL + '/models';

const Landing = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

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

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);

  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // 更新登录状态
    navigate('/', { replace: true }); // 重定向到主页
  };

  // Start video stream from webcam
  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play().then(() => {
          // Initialise canvas and face-api when video starts
          initializeCanvasAndFaceApi();
        });
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  // Initialises canvas and Face API settings
  const initializeCanvasAndFaceApi = () => {
    if (canvasRef.current && videoRef.current) {
      const displaySize = { width: videoWidth, height: videoHeight };

      // Configure face-api related settings, such as size matching, etc.
      faceapi.matchDimensions(canvasRef.current, displaySize);

      // Continue with other settings or calls here
    }
  };

  // Periodically detects faces as video plays
  const handleVideoOnPlay = () => {
    const displaySize = { width: videoWidth, height: videoHeight };

    if (canvasRef.current && videoRef.current) {
      faceapi.matchDimensions(canvasRef.current, displaySize);
    }

    setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef.current
          .getContext('2d')
          .clearRect(0, 0, videoWidth, videoHeight);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }
    }, 100);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  const shootPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, videoWidth, videoHeight);

      const imageDataUrl = canvas.toDataURL('image/jpeg');

      uploadPhoto(imageDataUrl);
    }
  };

  const uploadPhoto = async (imageDataUrl) => {
    // Create a blob from the data URL
    const response = await fetch(imageDataUrl);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, 'photo.jpg');

    try {
      const result = await fetch('YOUR_BACKEND_URL/photos', {
        method: 'POST',
        body: formData,
      });

      const response = await result.json(); // or result.text() if the response is not JSON

      if (response.authenticated === 1) {
        // Assume the response body has an authenticated field
        console.log('Authentication success, navigating to Home');
        handleLoginSuccess();
      } else {
        console.error('Authentication failed');
        //
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/', { replace: true }); // 如果已登录，重定向
    }
  }, [isLoggedIn, navigate]);

  // Effect to load Face API models when Landing mounts
  useEffect(() => {
    const loadModels = async () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  useEffect(() => {
    let intervalId;

    const startFaceDetection = () => {
      const videoEl = videoRef.current;
      if (!videoEl) return;

      const displaySize = { width: videoWidth, height: videoHeight };
      faceapi.matchDimensions(canvasRef.current, displaySize);

      intervalId = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvasRef.current
          .getContext('2d')
          .clearRect(0, 0, videoWidth, videoHeight);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }, 100);
    };

    if (captureVideo && modelsLoaded) {
      startFaceDetection();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [captureVideo, modelsLoaded, videoWidth, videoHeight]); //

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
          {captureVideo && modelsLoaded ? (
            <CameraControlButton onClick={closeWebcam} toggle={false}>
              Turn off Camera
            </CameraControlButton>
          ) : (
            <CameraControlButton onClick={startVideo}>
              Turn on Camera
            </CameraControlButton>
          )}
        </CamControlSection>
      </AuthColumn>
      {/* Right Column */}
      <CameraColumn>
        <CameraSection>
          <Overlay
            style={{
              visibility: captureVideo && modelsLoaded ? 'visible' : 'hidden',
            }}
          >
            <video
              ref={videoRef}
              height={videoHeight}
              width={videoWidth}
              onPlay={handleVideoOnPlay}
              style={{
                borderRadius: '10px',
                visibility: captureVideo && modelsLoaded ? 'visible' : 'hidden',
              }}
            />
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                visibility: captureVideo && modelsLoaded ? 'visible' : 'hidden',
              }}
            />
          </Overlay>
        </CameraSection>
        <PhotoShootSection>
          <ShootControlButton onClick={shootPhoto}>
            Take a photo
          </ShootControlButton>
        </PhotoShootSection>
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
  width: 62%;
  align-items: center;
  justify-content: center;
`;

const CameraSection = styled.section`
  height: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// const CameraCircle = styled.canvas`
//   border-radius: 50%;
//   width: 300px;
//   height: 300px;
//
// `;

const PhotoShootSection = styled.div``;

const ShootControlButton = styled.button`
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

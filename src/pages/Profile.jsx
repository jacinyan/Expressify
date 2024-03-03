import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@components/AuthContext';
import Landing from '@pages/Landing';

const Profile = ({ id, email, name, avatar }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Landing />;
  }

  return <h1> This is Profile! </h1>;
};

export default Profile;

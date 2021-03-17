import React from 'react';
import { useSelector } from 'react-redux';

import Welcome from '../../components/Welcome';
import Landing from '../../components/Landing';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    isAuthenticated ? <Welcome /> : <Landing />
  );
};

export default Home;

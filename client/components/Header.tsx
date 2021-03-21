import { PROJECT_CONFIG } from '#project';
import React, { FunctionComponent } from 'react';
import Profile from './Profile';

interface HeaderPageProps {}

const HeaderPage: FunctionComponent<HeaderPageProps> = ({ children }) => {
  return (
    <div className='flex items-center'>
      <div>
        <h1>{PROJECT_CONFIG.name}</h1>
      </div>
      <div className='flex-grow' />
      <Profile />
    </div>
  );
};

export default HeaderPage;

import React, { FunctionComponent } from 'react';
import { PROJECT_CONFIG } from '../project.config';
import Profile from './Profile';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = ({ children }) => {
  return (
    <div className='container max-w-3xl mb-8 mt-14'>
      <div className='flex items-center'>
        <div>
          <h1>{PROJECT_CONFIG.name}</h1>
        </div>
        <div className='flex-grow' />
        <div>
          <Profile />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Header;

import { useSession } from '@services/auth';
import React, { FunctionComponent } from 'react';

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = ({ children }) => {
  const { auth, user } = useSession();

  if (auth) {
    return (
      <>
        <span className='relative inline-block'>
          {user?.pictureUrl ? (
            <img
              className='w-12 h-12 rounded-full'
              src={user?.pictureUrl}
              alt='Profile Image'
            />
          ) : null}
          <span className='absolute top-0 right-0 block w-2 h-2 bg-green-400 rounded-full ring-2 ring-white'></span>
        </span>
      </>
    );
  }

  return null;
};

export default Profile;

import { FunctionComponent } from 'react';
import Lottie from 'react-lottie';
import animationData from './coffee.json';

interface Props {}

const LoadingScreen: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-light'>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={250}
        width={250}
        isPaused={false}
        isClickToPauseDisabled={true}
      />
    </div>
  );
};

export default LoadingScreen;

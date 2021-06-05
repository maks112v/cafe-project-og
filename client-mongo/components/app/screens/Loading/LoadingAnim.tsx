import { FunctionComponent } from 'react';
import Lottie from 'react-lottie';
import coffeeLoading from './coffee.json';
import frappeLoading from './frappe.json';
import teaLoading from './tea.json';

interface Props {
  anim: 'coffee' | 'tea' | 'icedCoffee';
  size?: number;
}

const LoadingAnim: FunctionComponent<Props> = ({
  anim,
  size = 250,
  children,
}) => {
  let data;

  if (anim === 'coffee') {
    data = coffeeLoading;
  }

  if (anim === 'tea') {
    data = teaLoading;
  }

  if (anim === 'icedCoffee') {
    data = frappeLoading;
  }

  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: data,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={size}
      width={size}
      isClickToPauseDisabled={true}
    />
  );
};

export default LoadingAnim;

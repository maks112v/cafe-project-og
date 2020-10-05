import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import { color_coffee, color_milk } from '../../styles/colors';

interface Props {
  data: any;
}

const PercentageWrapper = styled.div({
  width: '100%',
});

const PercentageBar = styled.div({
  height: 25,
  width: '100%',
  flexGrow: 1,
  backgroundColor: `${color_coffee}33`,
  position: 'relative',
  borderRadius: 10,
  overflow: 'hidden',
  marginBottom: 5,
});

const Percentage = styled.div((props) => ({
  width: `${props?.percentage}%`,
  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: color_coffee,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: color_milk,
}));

const states = {
  ordered: {
    name: 'Ordered',
    value: 20,
  },
  complete: {
    name: 'Complete',
    value: 100,
  },
};

const ProgressBar: FunctionComponent<Props> = ({ data }) => {
  return (
    <PercentageWrapper>
      <PercentageBar>
        <Percentage percentage={states?.[data?.status]?.value}>
          {states?.[data?.status]?.value}%
        </Percentage>
      </PercentageBar>
    </PercentageWrapper>
  );
};

export default ProgressBar;

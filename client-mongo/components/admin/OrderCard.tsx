import _ from 'lodash';
import React, { FunctionComponent } from 'react';
import { AllIcons } from '../../data/Icons';
import * as definitions from '../../ts/definitions';

interface OrderCardProps {
  item: definitions.order;
  variant?: 'small' | 'text' | undefined;
}

const OrderCard: FunctionComponent<OrderCardProps> = ({
  item,
  variant,
  children,
}) => {
  const currentStatus = _.last(item?.status);

  if (variant === 'text') {
    return (
      <>
        <h3>{item?.for}</h3>
        <h1>{item?.itemId?.name}</h1>
      </>
    );
  }

  return (
    <div className='relative h-64 p-4 overflow-hidden border rounded-lg shadow bg-light'>
      <img
        className='absolute -bottom-1 -right-1 opacity-30'
        style={{ maxHeight: 200 }}
        src={AllIcons.find((icon) => icon?.slug === item?.itemId?.icon)?.src}
      />
      <div>
        <h3>{item?.for}</h3>
        <h1>{item?.itemId?.name}</h1>
        <div className='absolute top-4 right-4'>
          <p>{currentStatus?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

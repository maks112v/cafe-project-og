import { withAuth } from '@services/auth';
import React, { FunctionComponent } from 'react';

interface OrderPageProps {}

const OrderPage: FunctionComponent<OrderPageProps> = ({ children }) => {
  return <></>;
};

export default withAuth(OrderPage);

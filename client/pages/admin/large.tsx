import { useQuery } from '@apollo/client';
import React, { FunctionComponent } from 'react';
import OrderCard from '../../components/admin/OrderCard';
import { AllIcons } from '../../data/Icons';
import { ORDERS_QUERY } from '../../graphql/orders';
import { withAdmin } from '../../services/auth';

interface AdminLargeProps {}

const AdminLarge: FunctionComponent<AdminLargeProps> = ({ children }) => {
  const { data, loading, error } = useQuery(ORDERS_QUERY, {
    pollInterval: 3000,
  });

  const nextOrder = data?.orders?.[0];

  console.log(data, loading, error, nextOrder);

  return (
    <>
      <div className='container py-20 max-w-7xl'>
        <div className='grid grid-cols-3 gap-5'>
          <div className='grid col-span-2 gap-5'>
            <h1>Next Order</h1>
            <div>
              <OrderCard item={nextOrder} variant='text' />
            </div>
          </div>
          <div className='grid gap-5'>
            <h1>Orders</h1>
            {data?.orders?.map((item) => (
              <OrderCard item={item} />
            ))}
          </div>
        </div>
      </div>
      <img
        className='fixed -bottom-1 -left-1 opacity-20'
        style={{ height: 750 }}
        src={
          AllIcons.find((icon) => icon?.slug === nextOrder?.itemId?.icon)?.src
        }
      />
    </>
  );
};

export default withAdmin(AdminLarge);

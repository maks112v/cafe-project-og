import { Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

interface OrderSliderProps {}

const OrderSlider: FunctionComponent<OrderSliderProps> = ({ children }) => {
  const router = useRouter();

  const itemId = router?.query?.itemId;

  return (
    <div className='fixed inset-0 overflow-hidden'>
      <div className='absolute inset-0 overflow-hidden'>
        <section
          className='absolute inset-y-0 right-0 flex max-w-full pl-10'
          aria-labelledby='slide-over-heading'
        >
          {/*
      Slide-over panel, show/hide based on slide-over state.

      Entering: "transform transition ease-in-out duration-500 sm:duration-700"
        From: "translate-x-full"
        To: "translate-x-0"
      Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
        From: "translate-x-0"
        To: "translate-x-full"
    */}
          <Transition
            show={!!itemId}
            enter='transform transition ease-in-out duration-500 sm:duration-700'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transform transition ease-in-out duration-500 sm:duration-700'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <div className='w-screen max-w-md'>
              <div className='flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl'>
                <div className='px-4 sm:px-6'>
                  <div className='flex items-start justify-between'>
                    <h2
                      id='slide-over-heading'
                      className='text-lg font-medium text-gray-900'
                    >
                      Panel title
                    </h2>
                    <div className='flex items-center ml-3 h-7'>
                      <button className='text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                        <span className='sr-only'>Close panel</span>
                        {/* Heroicon name: outline/x */}
                        <svg
                          className='w-6 h-6'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M6 18L18 6M6 6l12 12'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className='relative flex-1 px-4 mt-6 sm:px-6'>
                  {/* Replace with your content */}
                  <div className='absolute inset-0 px-4 sm:px-6'>
                    <div
                      className='h-full border-2 border-gray-200 border-dashed'
                      aria-hidden='true'
                    ></div>
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </div>
          </Transition>
        </section>
      </div>
    </div>
  );
};

export default OrderSlider;

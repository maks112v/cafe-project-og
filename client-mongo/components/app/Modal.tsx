import { Transition } from '@headlessui/react';
import { FunctionComponent } from 'react';

interface Props {
  isOpen: boolean;
}

const Modal: FunctionComponent<Props> = ({ isOpen, children }) => {
  return (
    <Transition
      show={isOpen}
      enter='ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <div
            className='inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
            role='dialog'
            aria-modal='true'
            aria-labelledby='modal-headline'
          >
            {children}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Modal;

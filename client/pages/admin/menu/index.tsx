import firebase from 'firebase';
import { Field, Form, Formik } from 'formik';
import { FunctionComponent, useState } from 'react';
import Modal from '../../../components/app/Modal';
import Input from '../../../components/Input';
import Seo from '../../../components/Seo';
import { useSession, withAdmin } from '../../../services/auth';

interface Props {}

const AdminMenuPage: FunctionComponent<Props> = ({ children }) => {
  const { auth } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitHandler = async (values) => {
    try {
      await firebase
        .firestore()
        .collection('items')
        .add({
          ...values,
          createdAt: new Date().valueOf(),
          createBy: auth.uid,
        });
    } catch (err) {
      console.log(err);
    } finally {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <Seo titles={['Menu', 'Admin']} />
      <div className='container'>
        <h1>Menu</h1>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          New Item
        </button>
      </div>
      <Modal isOpen={isOpen}>
        <h3 className='mb-5'>New Item</h3>
        <Formik
          onSubmit={onSubmitHandler}
          initialValues={{
            name: '',
            type: '',
          }}
        >
          <Form className='grid grid-flow-row gap-2'>
            <Field
              name='name'
              label='Name'
              placeholder='Iced Coffee'
              component={Input}
            />
            <Field
              placeholder='Type'
              name='type'
              type='select'
              component={Input}
            >
              <option value='hot-drinks'>Hot Drinks</option>
              <option value='iced-drinks'>Iced Drinks</option>
              <option value='food'>Food</option>
              <option value='bakery'>Bakery</option>
            </Field>
            <Field
              name='desc'
              label='Description'
              placeholder='It really is a serious problem if tea can’t fix it...'
              component={Input}
            />
            <button
              className='link'
              onClick={() => {
                if (window.confirm('Cancel Item')) {
                  setIsOpen(!isOpen);
                }
              }}
            >
              Cancel
            </button>
            <button type='submit' className='btn btn-primary'>
              Create
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default withAdmin(AdminMenuPage);

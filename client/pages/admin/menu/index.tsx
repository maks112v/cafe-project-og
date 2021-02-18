import { Field, Form, Formik } from 'formik';
import { FunctionComponent, useEffect, useState } from 'react';
import { classnames } from 'tailwindcss-classnames';
import * as yup from 'yup';
import Modal from '../../../components/app/Modal';
import Input from '../../../components/Input';
import Seo from '../../../components/Seo';
import Table from '../../../components/Table';
import { useSession, withAdmin } from '../../../services/auth';
import { db } from '../../../services/realm';

interface Props {}

const InitalEditorState = {
  id: null,
  name: '',
  type: '',
  desc: '',
};

const AdminMenuPage: FunctionComponent<Props> = ({ children }) => {
  const { auth } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [initalEditor, setInitalEditor] = useState(InitalEditorState);

  console.log(items);

  useEffect(() => {
    db.collection('items')
      .find({})
      .then((res) => {
        setItems(res);
      });
  }, [isOpen]);

  const onSubmitHandler = async (submittedValue) => {
    try {
      const { id, ...values } = submittedValue;
      if (id) {
        await db.collection('items').updateOne(
          { _id: id },
          {
            ...values,
            createdAt: new Date().valueOf(),
          }
        );
      } else {
        await db.collection('items').insertOne({
          ...values,
          createdAt: new Date().valueOf(),
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsOpen(!isOpen);
      setInitalEditor(InitalEditorState);
    }
  };

  return (
    <>
      <Seo titles={['Menu', 'Admin']} />
      <div className='container py-10'>
        <div className='flex items-center'>
          <div className='flex-grow'>
            <h1>Menu</h1>
            <p>Update or add menu items</p>
          </div>
          <div>
            <button
              className='btn btn-primary'
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              New Item
            </button>
          </div>
        </div>
        <Table
          className={classnames('py-4')}
          cols={[
            {
              name: 'Name',
              key: 'name',
              highlight: true,
            },
            {
              name: 'Description',
              key: 'desc',
            },
            {
              name: 'Category',
              key: 'type',
            },
            {
              name: 'Actions',
              render: (item) => {
                return (
                  <a
                    onClick={() => {
                      setInitalEditor({ ...item, id: item?._id });
                      setIsOpen(!isOpen);
                    }}
                    className='text-indigo-600 cursor-pointer hover:text-indigo-900'
                  >
                    Edit
                  </a>
                );
              },
            },
          ]}
          data={items}
        />
      </div>
      <Modal isOpen={isOpen}>
        <Formik
          onSubmit={onSubmitHandler}
          initialValues={initalEditor}
          validationSchema={yup.object().shape({
            name: yup.string().required('Name is required'),
          })}
        >
          {(props) => (
            <Form className='grid grid-flow-row gap-2'>
              <h3 className='mb-5'>
                {props?.values?.['id'] ? 'Edit Item' : 'New Item'}
              </h3>
              <Field
                name='name'
                label='Name*'
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
                type='textarea'
                placeholder='It really is a serious problem if tea can’t fix it.'
                component={Input}
              />
              <button
                type='button'
                className='link'
                onClick={() => {
                  // if (window.confirm('Cancel Item')) {
                  setIsOpen(!isOpen);
                  setInitalEditor(InitalEditorState);
                  // }
                }}
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={props?.isSubmitting}
                className='btn btn-primary'
              >
                {props?.values?.['id'] ? 'Update' : 'Create'}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default withAdmin(AdminMenuPage);

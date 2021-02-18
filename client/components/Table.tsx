import _ from 'lodash';
import { FunctionComponent, HTMLAttributes } from 'react';
import { classnames, TArg } from 'tailwindcss-classnames';

interface Props {
  cols: {
    name: string;
    key?: string;
    render?: (item) => JSX.Element;
    className?: HTMLAttributes<HTMLTableHeaderCellElement>['className'];
    highlight?: boolean;
  }[];
  data: { [key: string]: any }[];
  className?: TArg;
}

const TableRowCol = classnames(
  'px-6',
  'py-4',
  'text-sm',
  'text-gray-500',
  'whitespace-nowrap',
  'truncate',
  'max-w-md'
);

const Table: FunctionComponent<Props> = ({
  cols,
  data,
  children,
  className,
  ...rest
}) => {
  console.log(cols, 'pick', _.get(data[0], 'name'));
  return (
    <div className={classnames(className, 'flex', 'flex-col')}>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
          <div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  {cols?.map((item) => (
                    <th
                      scope='col'
                      key={item?.key}
                      className={
                        item?.className ||
                        'px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase'
                      }
                    >
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Odd row */}
                {data?.map((item, index) => (
                  <tr className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {cols?.map((col) =>
                      col?.render ? (
                        <td className={classnames(TableRowCol, 'text-right')}>
                          {col.render(item)}
                        </td>
                      ) : (
                        <td
                          className={classnames(TableRowCol, {
                            ['text-gray-500']: !col.highlight,
                            ['text-gray-900']: col?.highlight,
                            ['font-medium']: col?.highlight,
                          })}
                        >
                          {_.get(item, col?.key, '')}
                        </td>
                      )
                    )}
                    {/* <td className='px-6 py-4 text-sm font-medium text-right whitespace-nowrap'>
                      <a
                        href='#'
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

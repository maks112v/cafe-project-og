import { FunctionComponent } from 'react';
import { withAdmin } from '../../services/auth';

interface Props {}

const AdminPage: FunctionComponent<Props> = ({ children }) => {
  return <></>;
};

export default withAdmin(AdminPage);

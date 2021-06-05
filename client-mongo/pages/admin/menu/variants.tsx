import { withAdmin } from '@services/auth';
import React, { FunctionComponent } from 'react';

interface VariantsPageProps {}

const VariantsPage: FunctionComponent<VariantsPageProps> = ({ children }) => {
  return <></>;
};

export default withAdmin(VariantsPage);

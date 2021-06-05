import React, { FunctionComponent } from 'react';
import { withAdmin } from '../../../services/auth';

interface ProjectIndexProps {}

const ProjectIndex: FunctionComponent<ProjectIndexProps> = ({ children }) => {
  return <></>;
};

export default withAdmin(ProjectIndex);

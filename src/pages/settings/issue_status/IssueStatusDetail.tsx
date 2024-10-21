import { FC } from 'react';

import IssueStatusForm from "../../../components/forms/settings/issue_status/IssueStatusForm";
import Layout from '../../../components/layouts/Layout';

const IssueStatusDetail: FC = () => {
  return (
    <Layout>
      <IssueStatusForm />
    </Layout>
  );
};

export default IssueStatusDetail;

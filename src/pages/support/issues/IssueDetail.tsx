import { FC, useEffect } from 'react';

import IssueForm from '../../../components/forms/support/issue/IssueForm';
import Layout from '../../../components/layouts/Layout';
import locationInfoStore from '../../../stores/settings/locationInfoStore';
import issueCommentStore from '../../../stores/support/issueCommentStore';


const IssueDetail: FC = () => {
  const { clearState: clearStateLocation } = locationInfoStore();
  const { clearState: clearStateComment } = issueCommentStore();
  useEffect(() => {
    return () => {
      clearStateLocation?.();
      clearStateComment?.();
    };
  }, [])

  return (
    <Layout>
      <IssueForm />
    </Layout>
  );
};


export default IssueDetail;

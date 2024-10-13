import React, { useEffect } from 'react';

import UserForm from '../../../components/forms/admin/user/UserForm.tsx';
import Layout from '../../../components/layouts/Layout.tsx';
import { usePermission } from '../../../hooks/admin/usePermission.tsx';

const RoleDetail: React.FC = () => {
  const {permissions, fetchPermissions} = usePermission();

  useEffect(()=>{
    fetchPermissions()
  }, [])

  useEffect(()=>{

  }, [permissions])
  return (
    <Layout>
      <UserForm />
    </Layout>
  );
};


export default RoleDetail;

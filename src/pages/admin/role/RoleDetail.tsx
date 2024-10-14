import React, { useEffect } from 'react';

import RoleForm from '../../../components/forms/admin/role/RoleForm.tsx';
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
      <RoleForm />
    </Layout>
  );
};


export default RoleDetail;

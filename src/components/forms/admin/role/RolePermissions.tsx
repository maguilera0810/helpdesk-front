import { FC, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { useRole } from "../../../../hooks/admin/useRole";
import roleStore from "../../../../stores/admin/roleStore";
import Grid from "@mui/material/Grid2";
import useGlobalData from "../../../../hooks/useGlobalData";
import { GroupedPermissionType, SelectedGroupedPermission } from "../../../../types/groupTypes";
import SelectField from "../../fields/SelectField";
import { BaseChangeMethod } from "../../../../types/methodTypes";
import MultipleSelectField from "../../fields/MultipleSelectField";


const gridItemProps = {
  size: {
    xs: 12,
    sm: 6,
    md: 4,
    xl: 3,
  }
};

const RolePermissions: FC = () => {
  const { role, setRole } = roleStore();
  const { role: roleFetched, loading, success, method, updateRole } = useRole();
  const { groupedPermissions } = useGlobalData();
  const [formData, setFormData] = useState<Partial<SelectedGroupedPermission>>({});

  const handleInputChange: BaseChangeMethod<any> = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    console.log("entro 1");
    console.log(role);
    console.log(groupedPermissions);

    if (groupedPermissions) {
      const permissionsSet = new Set(role?.permissions ?? []);
      const res: SelectedGroupedPermission = {} as SelectedGroupedPermission;
      Object.entries(groupedPermissions).forEach(([k, v]) => {
        res[k as GroupedPermissionType] = v.filter(e => permissionsSet.has(e.id)).map(e => e.id);
      });
      setFormData(res);
    }
  }, [role, groupedPermissions]);


  useEffect(() => {
    console.log("formData", formData);

  }, [formData]);

  useEffect(() => {
    roleFetched && setRole(roleFetched);
  }, [roleFetched]);

  useEffect(() => {
    console.log(groupedPermissions);
  }, [groupedPermissions])

  return (

    <Grid container spacing={{ xs: 1 }}>
      <Grid {...gridItemProps} key={"admin_role"} sx={{ borderColor: 'red' }}>
        <MultipleSelectField
          label="Admin Roles"
          name="admin_role"
          value={formData.admin_role ?? []}
          options={groupedPermissions?.admin_role.map(e => ({ value: e.id, label: e.title })) ?? []}
          onChange={(e) => handleInputChange(e)}
          height="56px"
        />
      </Grid>
      <Grid {...gridItemProps} key={"admin_user"}>
        <MultipleSelectField
          label="Admin Usuarios"
          name="admin_user"
          value={formData.admin_user ?? []}
          options={groupedPermissions?.admin_user.map(e => ({ value: e.id, label: e.title })) ?? []}
          onChange={(e) => handleInputChange(e)}
          height="56px"
        />
      </Grid>
    </Grid>

  );
};


export default RolePermissions;
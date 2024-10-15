import { FC, useEffect, useState } from "react";

import { Paper, Typography } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Grid2";
import { useRole } from "../../../../hooks/admin/useRole";
import useGlobalData from "../../../../hooks/useGlobalData";
import roleStore from "../../../../stores/admin/roleStore";
import { GroupedPermissionType, SelectedGroupedPermission } from "../../../../types/groupTypes";
import CheckboxGroup from "../../fields/CheckboxGroup";


const gridItemProps: Grid2Props = {
  size: {
    xs: 12,
    sm: 'auto',
  }
};

type section = { key: GroupedPermissionType, label: string, }[]
const adminSection: section = [
  { key: 'admin_user', label: "Usuarios" },
  { key: 'admin_role', label: "Roles" },
]
const supportSection: section = [
  { key: 'support_task', label: "Tareas" },
  { key: 'support_issue', label: "Problemas" },
  { key: 'support_dashboard', label: "Tablero" },
  { key: 'support_tracking', label: "Seguimiento" },
]
const settingsSection: section = [
  { key: 'settings_profile', label: "Perfil" },
  { key: 'settings_category', label: "Categorias" },
  { key: 'settings_priority', label: "Prioridades" },
]

const RolePermissions: FC = () => {
  const { role, setRole } = roleStore();
  const { role: roleFetched, loading, success, method, updateRole } = useRole();
  const { groupedPermissions } = useGlobalData();
  const [formData, setFormData] = useState<Partial<SelectedGroupedPermission>>({});


  const handleValueChange = (name: string, value: number[]) => {
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  useEffect(() => {
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
    roleFetched && setRole(roleFetched);
  }, [roleFetched]);

  return (
    <Grid container spacing={{ xs: 1 }} direction={"column"} >

      <Grid container spacing={{ xs: 1 }}>
        <Grid size={12} key={"admin"} >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Administración</Typography>
        </Grid>
        {adminSection.map(({ key, label }) => (
          <Grid {...gridItemProps} key={key} >
            <Paper elevation={3} sx={{ pl: 2, borderRadius: 2, width: '100%' }}>
              <CheckboxGroup
                label={label}
                isGroup={true}
                value={formData[key] ?? []}
                options={groupedPermissions?.[key].map(e => ({ value: e.id, label: e.title })) ?? []}
                onChange={(e) => handleValueChange(key, e)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={{ xs: 1 }}>
        <Grid size={12} key={"support"} >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Soporte</Typography>
        </Grid>
        {supportSection.map(({ key, label }) => (
          <Grid {...gridItemProps} key={key} >
            <Paper elevation={3} sx={{ pl: 2, borderRadius: 2, width: '100%' }}>
              <CheckboxGroup
                label={label}
                isGroup={true}
                value={formData[key] ?? []}
                options={groupedPermissions?.[key].map(e => ({ value: e.id, label: e.title })) ?? []}
                onChange={(e) => handleValueChange(key, e)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={{ xs: 1 }}>
        <Grid size={12} key={"admin"} >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Configuraciones</Typography>
        </Grid>
        {settingsSection.map(({ key, label }) => (
          <Grid {...gridItemProps} key={key} >
            <Paper elevation={3} sx={{ pl: 2, borderRadius: 2, width: '100%' }}>
              <CheckboxGroup
                label={label}
                isGroup={true}
                value={formData[key] ?? []}
                options={groupedPermissions?.[key].map(e => ({ value: e.id, label: e.title })) ?? []}
                onChange={(e) => handleValueChange(key, e)}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};


export default RolePermissions;
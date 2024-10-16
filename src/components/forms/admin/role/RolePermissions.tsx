import { FC, useEffect, useState } from "react";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, Paper, Typography } from "@mui/material";
import Grid, { Grid2Props } from "@mui/material/Grid2";
import { useRole } from "../../../../hooks/admin/useRole";
import useGlobalData from "../../../../hooks/useGlobalData";
import { BaseMethodsProps } from "../../../../interfaces/CoreInterfaces";
import { Role } from "../../../../interfaces/ModelInterfaces";
import roleStore from "../../../../stores/admin/roleStore";
import { GroupedPermissionType, SelectedGroupedPermission } from "../../../../types/groupTypes";
import { getSubmitMsg } from "../../../../utils/messageUtils";
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

const RolePermissions: FC<BaseMethodsProps<Role>> = ({ onSuccess }) => {

  const { role, setRole } = roleStore();
  const { role: roleFetched, loading, success, method, updateRole } = useRole();
  const { groupedPermissions } = useGlobalData();
  const [formData, setFormData] = useState<SelectedGroupedPermission>({} as SelectedGroupedPermission);


  const handleValueChange = (name: GroupedPermissionType, value: number[]) => {
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    if (role) {
      updateRole(role.id, { permissions: Object.values(formData).flat() });
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

  useEffect(() => {
    if (onSuccess && success && role && (method === 'createRole' || method === 'updateRole')) {
      onSuccess(role.id);
    }
  }, [role, success, method]);

  if (!role) {
    return <></>;
  }
  return (
    <Grid container spacing={{ xs: 1 }} direction={"column"} >
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
        {getSubmitMsg(loading)}
      </Button>
      <Grid container>
        <Accordion sx={{ width: '100%' }} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="admin-section-header">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Administración</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={{ xs: 1 }} direction={"row"} >
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
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid container>
        <Accordion sx={{ width: '100%' }} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="support-section-header">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Soporte</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={{ xs: 1 }} direction={"row"} >
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
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid container>
        <Accordion sx={{ width: '100%' }} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} id="settings-section-header">
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Configuraciones</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={{ xs: 1 }} direction={"row"} >
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
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};


export default RolePermissions;
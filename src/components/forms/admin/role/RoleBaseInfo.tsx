import { FC, FormEvent, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";

import { useRole } from "../../../../hooks/admin/useRole";
import { BaseMethodsProps } from "../../../../interfaces/CoreInterfaces";
import { Role } from "../../../../interfaces/ModelInterfaces";
import roleStore from "../../../../stores/admin/roleStore";
import { BaseChangeMethod } from "../../../../types/methodTypes";
import { getSubmitMsg } from "../../../../utils/messageUtils";
import TextAreaField from "../../fields/TextAreaField";


const gridItemProps = {
  size: {
    xs: 12,
    sm: 6,
    md: 4,
    xl: 3,
  }
};
Object.freeze(gridItemProps)
const fieldProps = {
  fullWidth: true,
};
Object.freeze(fieldProps)


const RoleBaseIInfo: FC<BaseMethodsProps<Role>> = ({ onSuccess }) => {

  const { role, setRole } = roleStore();
  const { role: roleFetched, loading, success, method, createRole, updateRole } = useRole();
  const [formData, setFormData] = useState<Partial<Role>>({});

  const isUpdate: boolean = Boolean(role);

  const handleInputChange: BaseChangeMethod<any> = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (role) {
      updateRole(role.id, formData);
    } else {
      createRole(formData);
    }
  };

  useEffect(() => {
    if (roleFetched) {
      setRole(roleFetched);
    }
  }, [roleFetched]);

  useEffect(() => {
    if (role) {
      setFormData({ ...role });
    }
  }, [role]);

  useEffect(() => {
    if (onSuccess && success && role && (method === 'createRole' || method === 'updateRole')) {
      onSuccess(role.id);
    }
  }, [role, success, method]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
      <Button onClick={handleSubmit} variant="contained" color="primary" disabled={loading} sx={{ mb: 2 }}>
        {getSubmitMsg(loading, isUpdate)}
      </Button>
      <Grid container spacing={{ xs: 1 }}>

        <Grid {...gridItemProps} key={"title"}>
          <TextField
            label="Título"
            name="title"
            value={formData.title ?? ''}
            onChange={(e) => handleInputChange(e)}
            {...fieldProps}
          />
        </Grid>
        <Grid {...gridItemProps} key={"description"}>
          <TextAreaField
            label="Descrición"
            name="description"
            required={true}
            value={formData.description ?? ''}
            onChange={(e) => handleInputChange(e)}
            {...fieldProps}
          />
        </Grid>
        <Grid {...gridItemProps} key={"key"}>
          <TextField
            label="Key"
            name="key"
            value={formData.key ?? ''}
            disabled={isUpdate}
            onChange={(e) => handleInputChange(e)}// CONTROLAR QUYE SEA SLUG
            {...fieldProps}
          />
        </Grid>
      </Grid>

    </Box>
  );
};


export default RoleBaseIInfo;
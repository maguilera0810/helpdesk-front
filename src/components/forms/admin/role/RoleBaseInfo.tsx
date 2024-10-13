import { FC } from "react";

import Box from "@mui/material/Box";

import { BaseMethodsProps } from "../../../../interfaces/ComponentInterfaces";
import { Role } from "../../../../interfaces/ModelInterfaces";




const RoleBaseIInfo: FC<BaseMethodsProps<Role>> = ({ onSuccess, onSubmit }) => {
  console.log(onSuccess);
  console.log(onSubmit);

  return (
    <Box
      sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
    </Box>
  );
};


export default RoleBaseIInfo;
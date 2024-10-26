import { FC, ReactNode } from "react"

import { InputLabel } from "@mui/material"


const Label: FC<{ children: ReactNode }> = ({ children }) => {
  return (<InputLabel
    sx={(theme) => ({
      backgroundColor: theme.palette.background.paper,  // O usa cualquier color del tema
      px: 1,
      transform: 'translate(14px, -7px) scale(0.75)',
      // pointerEvents: 'none',
    })}
  >
    {children}
  </InputLabel>)
}

export default Label
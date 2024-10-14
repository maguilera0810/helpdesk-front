import { SelectChangeEvent } from "@mui/material/Select"
import { ChangeEvent } from "react"

export type BaseMethod<T> = (data?: Partial<T> | number) => void
export type BaseChangeMethod<T> = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string> | SelectChangeEvent<T[]>) => void

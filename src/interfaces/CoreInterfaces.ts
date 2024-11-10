import { BaseMethod } from "../types/methodTypes";


export interface BaseModel {
  id: number;
}




export interface BaseInfoModel extends BaseModel {
  title: string;
  description: string;
}


export interface BaseMethodsProps<T> {
  onSubmit?: BaseMethod<T>;
  onSuccess?: BaseMethod<T>;
  onFail?: BaseMethod<T>;
  onCancel?: BaseMethod<T>;
}
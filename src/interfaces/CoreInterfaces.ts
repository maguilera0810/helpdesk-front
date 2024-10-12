

export interface BaseModel {
  id?: number;
}


export interface BaseInfoModel extends BaseModel {
  title: string;
  description: string;
}

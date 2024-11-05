export type periodType =
  "today" |
  "yesterday" |
  "last_7_days" |
  "last_14_days" |
  "last_month" |
  "last_3_months" |
  "current_year" |
  "last_5_years";
export type DataStatusType = Record<periodType, number>;

export type IssueStatusEnum =
  "recibido" |
  "tareaCreada" |
  "rechazado" |
  "completado";
export type IssueStatusDataType = Record<IssueStatusEnum, number>;

export type TaskStatusEnum =
  "porHacer" |
  "enEjecucion" |
  "bloqueado" |
  "programado" |
  "reprogramado" |
  "noEjecutable" |
  "completado";
export type TaskStatusDataType = Record<TaskStatusEnum, number>;

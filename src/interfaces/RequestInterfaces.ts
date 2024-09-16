

export interface TaskScheduleRequest {
  responsibleId: number;
  team: number[];
  startAt: Date;
  endAt: Date;
}


export interface TaskScheduleRequest {
  responsibleId: number;
  team: number[];
  startAt: Date;
  endAt: Date;
  currTaskId: number;
}

export interface TrackingTasksRequest {
  team: number[];
  currDate: Date;
}

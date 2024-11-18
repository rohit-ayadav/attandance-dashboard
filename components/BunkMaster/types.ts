// src/components/BunkMaster/types.ts
export interface FormData {
  name: string;
  totalLectures: string;
  presentLectures: string;
}

export interface ResultData {
  message: string;
  status: string;
  emoji: string;
}

export interface DayData {
  day: string;
  date: string;
  willAttend: boolean;
  id: number;
  lecturesAttended: number;
}

export interface AbsentProjection {
  newAttendance: number;
  dropInAttendance: number;
  daysAbsent: number;
  lecturesMissed: number;
}

export interface PresentProjection {
  newAttendance: number;
  increaseInAttendance: number;
  daysPresent: number;
  lecturesAttended: number;
}

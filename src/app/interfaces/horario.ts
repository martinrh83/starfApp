export class Horario {
  constructor(
      public id?: number,
      public day?: string,
      public hour_init?: any,
      public hour_end?: any,
      public course_id?: number,
      public subject_id?: number
   ) {}

}
import { Appointment } from "./Appointment";

export interface ApplicationContextType {
  appointments: Map<string, Appointment>;
  currentDate: moment.Moment;
  currentAppointmentKey: string;
}

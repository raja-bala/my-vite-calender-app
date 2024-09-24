import { appointmentReducer } from "../AppointmentContext";
import { Appointment } from "../types/Appointment";
import { FULL_DATE_FORMAT } from "../calendar/Contants";
import moment from "moment";
describe("Test reducer", () => {
  let initialState: any = {};
  beforeEach(() => {
    initialState = {
      appointments: new Map<string, Appointment>().set("122345", {
        appointmentDate: moment().format(FULL_DATE_FORMAT).toString(),
        appointmentDetails: "Sample details",
        appointmentTime: "15:25",
        appointmentTitle: "Sample meeting",
        appointmentType: "event",
      } as Appointment),
      currentDate: moment(),
      currentAppointmentKey: "",
    };
  });
  test("addAppointment", () => {
    const addAction = {
      type: "addAppointment",
      data: {
        appointmentDate: moment().format(FULL_DATE_FORMAT).toString(),
        appointmentDetails: "Sample details1",
        appointmentTime: "15:25",
        appointmentTitle: "Sample meeting1",
        appointmentType: "event",
      },
    };
    const updatedState = appointmentReducer(initialState, addAction);
    expect(updatedState.appointments.size).toEqual(2);
  });
  test("updateAppointment", () => {
    const addAction = {
      type: "addAppointment",
      data: {
        appointmentDate: moment().format(FULL_DATE_FORMAT).toString(),
        appointmentDetails: "Sample details-updated",
        appointmentTime: "15:25",
        appointmentTitle: "Sample meeting1",
        appointmentType: "event",
      },
    };
    const updatedState = appointmentReducer(
      { ...initialState, currentAppointmentKey: "122345" },
      addAction
    );
    expect(updatedState.appointments.size).toEqual(1);
    expect(updatedState.appointments.get("122345")?.appointmentDetails).toEqual(
      "Sample details-updated"
    );
  });
  test("deleteAppointment", () => {
    const addAction = {
      type: "deleteAppointment",
      data: "122345",
    };
    const updatedState = appointmentReducer(initialState, addAction);
    expect(updatedState.appointments.size).toEqual(0);
  });
  test("setCurrentAppointmentKey", () => {
    const addAction = {
      type: "setCurrentAppointmentKey",
      data: "122345",
    };
    const updatedState = appointmentReducer(initialState, addAction);
    expect(updatedState.currentAppointmentKey).toEqual(addAction.data);
  });
  test("updateCurrentDate", () => {
    const addAction = {
      type: "updateCurrentDate",
      data: moment("2025-01-01"),
    };
    const updatedState = appointmentReducer(initialState, addAction);
    expect(updatedState.currentDate).toEqual(addAction.data);
  });
});

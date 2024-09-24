import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from "../calendar/Sidebar";
// import { Appointment } from "../types/Appointment";q
import { AppointmentContextProvider } from "../AppointmentContext";
import * as AppointmentContext from "../AppointmentContext";
import { Appointment } from "../types/Appointment";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { FULL_DATE_FORMAT } from "../calendar/Contants";

test("Renders the main page", () => {
  const addAppointmentEventHandler = jest.fn();
  const editAppointmentEventHandler = jest.fn();
  const dispatchHandler = jest.fn();
  jest
    .spyOn(AppointmentContext, "useAppointmentContext")
    .mockImplementation(() => ({
      state: {
        appointments: new Map<string, Appointment>().set(uuidv4(), {
          appointmentDate: moment().format(FULL_DATE_FORMAT).toString(),
          appointmentDetails: "",
          appointmentTime: "15:25",
          appointmentTitle: "Sample meeting",
          appointmentType: "event",
        } as Appointment),
        currentDate: moment(),
        currentAppointmentKey: "",
      },
      dispatch: dispatchHandler,
    }));
  // const deleteAppointmentEventHandler = jest.fn();
  // const myAppointments = new Map<string, Appointment>().set("testkey", {
  //   appointmentDate: "2024-09-01",
  //   appointmentDetails: "",
  //   appointmentTime: "15:25",
  //   appointmentTitle: "Sample meeting",
  //   appointmentType: "event",
  // });
  render(
    <AppointmentContextProvider>
      <Sidebar
        addAppointment={addAppointmentEventHandler}
        editAppointment={editAppointmentEventHandler}
        currentDay={"01"}
      />
    </AppointmentContextProvider>
  );
  expect(true).toBeTruthy();
  const addAppointmentLink = screen.getByTestId("add-appointment");
  fireEvent.click(addAppointmentLink);
  expect(addAppointmentEventHandler).toHaveBeenCalled();
  const editAppointmentLink = screen.getByTestId("edit-appointment-0");
  fireEvent.click(editAppointmentLink);
  expect(editAppointmentEventHandler).toHaveBeenCalled();
  const deleteAppointmentLink = screen.getByTestId("delete-appointment-0");
  fireEvent.click(deleteAppointmentLink);
  expect(dispatchHandler).toHaveBeenCalled();
});

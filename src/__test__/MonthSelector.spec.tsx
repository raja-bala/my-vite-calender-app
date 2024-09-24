import { fireEvent, render, screen } from "@testing-library/react";
import { AppointmentContextProvider } from "../AppointmentContext";
import MonthSelector from "../calendar/MonthSelector";
import * as AppointmentContext from "../AppointmentContext";
import moment from "moment";
import { Appointment } from "../types/Appointment";
import { FULL_DATE_FORMAT } from "../calendar/Contants";
import { v4 as uuidv4 } from "uuid";
test("Renders the main page", () => {
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

  render(
    <AppointmentContextProvider>
      <MonthSelector />
    </AppointmentContextProvider>
  );
  const selectPreviousMonthLink = screen.getByTestId("selectPreviousMonth");
  fireEvent.click(selectPreviousMonthLink);
  expect(dispatchHandler).toHaveBeenCalled();
  const selectNextMonthLink = screen.getByTestId("selectNextMonth");
  fireEvent.click(selectNextMonthLink);
  expect(dispatchHandler).toHaveBeenCalled();
});

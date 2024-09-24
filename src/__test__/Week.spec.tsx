import { render } from "@testing-library/react";
import Week from "../calendar/Week";
import moment from "moment";
import { AppointmentContextProvider } from "../AppointmentContext";
import * as AppointmentContext from "../AppointmentContext";
import { Appointment } from "../types/Appointment";
import { v4 as uuidv4 } from "uuid";
import { FULL_DATE_FORMAT } from "../calendar/Contants";
test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the Week Component", () => {
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
      <Week
        key={0}
        current_week={0}
        isFirstWeek={true}
        first_day_of_the_month={moment().startOf("month").format("YYYY-MM-DD")}
      />
    </AppointmentContextProvider>
  );
  expect(true).toBeTruthy();
});

import { fireEvent, screen, render, act } from "@testing-library/react";
import Day from "../calendar/Day";
import moment from "moment";
import * as AppointmentContext from "../AppointmentContext";
import { v4 as uuidv4 } from "uuid";
import { Appointment } from "../types/Appointment";
import { FULL_DATE_FORMAT } from "../calendar/Contants";
import { AppointmentContextProvider } from "../AppointmentContext";
describe("71995270", () => {
  test("it renders the Day with proper day", () => {
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

    const currentDate = moment();

    render(
      <AppointmentContextProvider>
        <Day key={currentDate + ""} input_date={currentDate} input_day={"01"} />
      </AppointmentContextProvider>
    );
    const paragraphTag = screen.getByText("01");
    act(() => {
      fireEvent.click(paragraphTag);
    });
    //expect(dispatchHandler).toHaveBeenCalled();
    expect(dispatchHandler).toHaveBeenCalledWith({
      type: "updateCurrentDate",
      data: currentDate,
    });
  });
  test("it renders the Day with place holder", () => {
    const currentDate = moment();
    render(
      <AppointmentContextProvider>
        <Day key={currentDate + ""} input_date={currentDate} input_day={""} />
      </AppointmentContextProvider>
    );
  });
});

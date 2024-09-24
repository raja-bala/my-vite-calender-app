import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { AppointmentContextProvider } from "../AppointmentContext";
import Calendar from "../calendar/Calendar";
import * as AppointmentContext from "../AppointmentContext";
import { Appointment } from "../types/Appointment";
import { v4 as uuidv4 } from "uuid";
import { FULL_DATE_FORMAT } from "../calendar/Contants";
import moment from "moment";

test("Add Appointment", async () => {
  const dispatchHandler = jest.fn();
  const setState = jest.fn();
  const setIndividualState = jest.fn();
  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: setState,
  }));
  setState.mockImplementation(() => [false, setIndividualState]);
  jest
    .spyOn(AppointmentContext, "useAppointmentContext")
    .mockImplementation(() => ({
      state: {
        appointments: new Map<string, Appointment>().set(uuidv4(), {
          appointmentDate: moment().format(FULL_DATE_FORMAT).toString(),
          appointmentDetails: "Sample details",
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
      <Calendar />
    </AppointmentContextProvider>
  );
  const paragraphTag = screen.getByText(/Add Appointment/i);
  act(() => {
    fireEvent.click(paragraphTag);
  });
  await waitFor(() =>
    expect(screen.getByTestId("modalContainer")).toBeInTheDocument()
  );
});

test("Edit Appointment", async () => {
  const dispatchHandler = jest.fn();
  const setState = jest.fn();
  const setIndividualState = jest.fn();
  jest.mock("react", () => ({
    ...jest.requireActual("react"),
    useState: setState,
  }));
  setState.mockImplementation(() => [false, setIndividualState]);
  jest
    .spyOn(AppointmentContext, "useAppointmentContext")
    .mockImplementation(() => ({
      state: {
        appointments: new Map<string, Appointment>().set(uuidv4(), {
          appointmentDate: moment().format(FULL_DATE_FORMAT).toString(),
          appointmentDetails: "Sample details",
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
      <Calendar />
    </AppointmentContextProvider>
  );

  const editAppointmentLink = screen.getByTestId("edit-appointment-0");
  act(() => {
    fireEvent.click(editAppointmentLink);
  });
  await waitFor(() => {
    expect(screen.getByTestId("modalContainer")).toBeInTheDocument();
    const modalContainer = screen.getByTestId("modalContainer");
    expect(modalContainer.classList.contains("isVisible")).toBe(true);
  });
});

test("Submit Appointment", async () => {
  const dispatchHandler = jest.fn();
  //   const setState = jest.fn();
  //   const setIndividualState = jest.fn();
  //   jest.mock("react", () => ({
  //     ...jest.requireActual("react"),
  //     useState: setState,
  //   }));
  //   setState.mockImplementation(() => [false, setIndividualState]);
  jest
    .spyOn(AppointmentContext, "useAppointmentContext")
    .mockImplementation(() => ({
      state: {
        appointments: new Map<string, Appointment>().set(uuidv4(), {
          appointmentDate: moment().format(FULL_DATE_FORMAT).toString(),
          appointmentDetails: "Sample details",
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
      <Calendar />
    </AppointmentContextProvider>
  );

  const editAppointmentLink = screen.getByTestId("edit-appointment-0");
  act(() => {
    fireEvent.click(editAppointmentLink);
  });
  await waitFor(() => {
    expect(screen.getByTestId("modalContainer")).toBeInTheDocument();
    const modalContainer = screen.getByTestId("modalContainer");
    expect(modalContainer.classList.contains("isVisible")).toBe(true);
    // const appointmentTitle = screen.getByTestId("appointmentTitle");

    // expect(appointmentTitle).toHaveValue("Sample meeting");
  });
});

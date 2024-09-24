import { act, fireEvent, render, screen } from "@testing-library/react";
import AppointmentForm from "../AppointmentForm";
import { Appointment } from "../types/Appointment";
import { AppointmentContextProvider } from "../AppointmentContext";

test("demo", () => {
  expect(true).toBe(true);
});
const handleSubmitMock = jest.fn();
const resetMock = jest.fn();
jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  Controller: () => <></>,
  useForm: () => ({
    control: () => ({}),
    handleSubmit: () => handleSubmitMock,
    reset: resetMock,
    formState: { isSubmitSuccessful: true },
    register: () => ({}),
  }),
}));
test("Renders the Appointment Form", () => {
  const appointmentObject = {} as Appointment;
  const formSubmissionHandler = jest.fn();
  const setIsPopupVisible = jest.fn();
  render(
    <AppointmentContextProvider>
      <AppointmentForm
        initialFormValue={appointmentObject}
        isPopupVisible={true}
        setIsPopupVisible={setIsPopupVisible}
        formSubmissionHandler={formSubmissionHandler}
      />
    </AppointmentContextProvider>
  );
  expect(true).toBeTruthy();
  const appointmentTitleInput = "Meeting with boss";
  const appointmentTimeInput = "13:25";
  const appointmentDetailsInput = "sample details";
  const appointmentTypeInput = "event";
  const modalContainer = screen.getByTestId("modalContainer");

  const appointmentTitle = screen.getByTestId("appointmentTitle");
  expect(modalContainer.classList.contains("isVisible")).toBe(true);
  act(() => {
    fireEvent.change(appointmentTitle, {
      target: { value: appointmentTitleInput },
    });
  });
  fireEvent.blur(appointmentTitle);
  const appointmentTime = screen.getByTestId("appointmentTime");
  act(() => {
    fireEvent.change(appointmentTime, {
      target: { value: appointmentTimeInput },
    });
    fireEvent.blur(appointmentTitle);
  });
  const appointmentDetails = screen.getByTestId("appointmentDetails");
  act(() => {
    fireEvent.change(appointmentDetails, {
      target: { value: appointmentDetailsInput },
    });

    fireEvent.blur(appointmentTitle);
  });
  const appointmentType = screen.getByTestId("appointmentType");
  act(() => {
    fireEvent.change(appointmentType, {
      target: { value: appointmentTypeInput },
    });

    fireEvent.blur(appointmentType);
  });
  expect(appointmentTitle).toHaveValue(appointmentTitleInput);
  expect(appointmentTime).toHaveValue(appointmentTimeInput);
  expect(appointmentDetails).toHaveValue(appointmentDetailsInput);
  expect(appointmentType).toHaveValue(appointmentTypeInput);

  const submitButton = screen.getByTestId("submit-form");

  act(() => {
    fireEvent.click(submitButton);
  });

  expect(handleSubmitMock).toHaveBeenCalled();
  expect(resetMock).toHaveBeenCalled();
  expect(setIsPopupVisible).toHaveBeenCalled();

  const closeButton = screen.getByTestId("close-button");

  act(() => {
    fireEvent.click(closeButton);
  });
  expect(setIsPopupVisible).toHaveBeenCalledWith(false);
});

test("Renders the Appointment Form1", () => {
  const appointmentObject = {} as Appointment;
  const formSubmissionHandler = jest.fn();
  const setIsPopupVisible = jest.fn();
  render(
    <AppointmentContextProvider>
      <AppointmentForm
        initialFormValue={appointmentObject}
        isPopupVisible={false}
        setIsPopupVisible={setIsPopupVisible}
        formSubmissionHandler={formSubmissionHandler}
      />
    </AppointmentContextProvider>
  );
  expect(true).toBeTruthy();

  const modalContainer = screen.getByTestId("modalContainer");

  expect(modalContainer.classList.contains("isVisible")).toBe(false);
});

import { Appointment } from "./types/Appointment";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
const AppointmentForm = ({
  isPopupVisible,
  setIsPopupVisible,
  formSubmissionHandler,
  initialFormValue,
}: {
  isPopupVisible: boolean;
  setIsPopupVisible: Function;
  formSubmissionHandler: SubmitHandler<Appointment>;
  initialFormValue: Appointment | undefined;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<Appointment>({ defaultValues: initialFormValue });

  useEffect(() => {
    if (isSubmitSuccessful) {
      let newAppointment: Appointment | undefined = {} as Appointment;

      if (newAppointment) {
        reset(newAppointment);
      }
      setIsPopupVisible(!isPopupVisible);
    }
  }, [formState, isSubmitSuccessful, reset]);
  return (
    <div
      data-testid="modalContainer"
      className={`c-event__creator c-calendar__style js-event__creator ${
        isPopupVisible ? "isVisible" : ""
      }`}
    >
      <a
        className="o-btn js-event__close"
        data-testid="close-button"
        onClick={() => setIsPopupVisible(!isPopupVisible)}
      >
        CLOSE <span className="fa fa-close"></span>
      </a>
      <form>
        <input
          placeholder="Event name"
          type="text"
          data-testid="appointmentTitle"
          {...register("appointmentTitle", {
            required: true,
            maxLength: 80,
          })}
        />
        <input
          type="time"
          data-testid="appointmentTime"
          {...register("appointmentTime", {
            required: true,
            maxLength: 10,
          })}
        />
        <textarea
          data-testid="appointmentDetails"
          placeholder="Appointment Details"
          cols={30}
          rows={10}
          {...register("appointmentDetails", {
            required: true,
            maxLength: 50,
          })}
        ></textarea>
        <select
          data-testid="appointmentType"
          {...register("appointmentType", { required: true })}
        >
          <option value="event">event</option>
          <option value="important">important</option>
          <option value="birthday">birthday</option>
          <option value="festivity">festivity</option>
        </select>
        <br />
        <a
          className="o-btn js-event__save"
          data-testid="submit-form"
          onClick={() => {
            handleSubmit(formSubmissionHandler)();
          }}
        >
          SAVE
          <span className="fa fa-save"></span>
        </a>
      </form>
    </div>
  );
};

export default AppointmentForm;

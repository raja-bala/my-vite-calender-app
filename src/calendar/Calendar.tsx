import moment from "moment";
import { useState } from "react";
import { Appointment } from "../types/Appointment";
import Week from "./Week";
import AppointmentForm from "../AppointmentForm";
import Header from "./Header";
import Sidebar from "./Sidebar";

import { useAppointmentContext } from "../AppointmentContext";
import { FULL_DATE_FORMAT } from "./Contants";
const Calendar = () => {
  const {
    state: { appointments, currentDate },
    dispatch,
  } = useAppointmentContext();

  const [initialFormValue, setInitialFormValue] = useState<Appointment>();
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  let curretDateString = currentDate.format(FULL_DATE_FORMAT);

  let currentDay = currentDate.format("DD");

  let startOfMonth = moment(curretDateString)
    .startOf("month")
    .format("YYYY-MM-DD");

  const addAppointment = () => {
    let selectedAppointment: Appointment | undefined = {
      appointmentDate: curretDateString,
    } as Appointment;
    setIsPopupVisible(true);
    if (selectedAppointment) {
      setInitialFormValue({ ...selectedAppointment });
    }
  };
  const editAppointment = (appointmentKey: string) => {
    dispatch({ type: "setCurrentAppointmentKey", data: appointmentKey });
    const selectedAppointment: Appointment | undefined =
      appointments.get(appointmentKey);
    setIsPopupVisible(true);
    if (selectedAppointment) {
      console.log("selectedAppointment", selectedAppointment);
      setInitialFormValue({ ...selectedAppointment });
    }
  };

  const formSubmissionHandler = (formData?: Appointment) => {
    let newAppointment: Appointment;
    if (typeof formData !== "undefined") {
      newAppointment = {
        ...formData,
        appointmentDate: curretDateString,
      };
      dispatch({ type: "addAppointment", data: newAppointment });
    }
  };
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="c-calendar">
          <Sidebar
            addAppointment={addAppointment}
            editAppointment={editAppointment}
            currentDay={currentDay}
          />
          <div className="c-cal__container c-calendar__style">
            <div className="c-cal__row">
              <div className="c-cal__col">Sun</div>
              <div className="c-cal__col">Mon</div>
              <div className="c-cal__col">Tue</div>
              <div className="c-cal__col">Wed</div>
              <div className="c-cal__col">Thu</div>
              <div className="c-cal__col">Fri</div>
              <div className="c-cal__col">Sat</div>
            </div>
            {[...Array(5)].map((_, i) => {
              const displayWeek = (
                <Week
                  key={i}
                  current_week={i}
                  isFirstWeek={i === 0}
                  first_day_of_the_month={moment(startOfMonth)}
                />
              );

              return displayWeek;
            })}
          </div>
        </div>
        {isPopupVisible && (
          <AppointmentForm
            initialFormValue={initialFormValue}
            isPopupVisible={isPopupVisible}
            setIsPopupVisible={setIsPopupVisible}
            formSubmissionHandler={formSubmissionHandler}
          />
        )}
      </div>
    </>
  );
};

export default Calendar;

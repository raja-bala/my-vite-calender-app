import { useAppointmentContext } from "../AppointmentContext";
import { FULL_DATE_FORMAT, MONTH_FORMAT } from "./Contants";

const Sidebar = ({
  addAppointment,
  editAppointment,
  currentDay,
}: {
  addAppointment: Function;
  editAppointment: Function;
  currentDay: string;
}) => {
  const {
    state: { appointments, currentDate },
    dispatch,
  } = useAppointmentContext();
  const deleteAppointment = (appointmentKey: string) => {
    dispatch({ type: "deleteAppointment", data: appointmentKey });
  };
  let selectedMonth = currentDate.format(MONTH_FORMAT).toUpperCase();
  return (
    <div className="c-calendar__style c-aside">
      <a
        className="c-add o-btn js-event__add"
        data-testid="add-appointment"
        onClick={() => addAppointment()}
      >
        add Appointment <span className="fa fa-plus"></span>
      </a>
      <div className="c-aside__day">
        <span className="c-aside__num">{currentDay}</span>
        <span className="c-aside__month"> {selectedMonth}</span>
      </div>

      <div className="c-aside__eventList">
        {appointments.size > 0 &&
          Array.from(
            new Map(
              [...appointments].filter(([_, value]) =>
                value.appointmentDate.includes(
                  currentDate.format(FULL_DATE_FORMAT).toString()
                )
              )
            )
          ).map((x, i) => (
            <p className="c-aside__event c-aside__event--birthday" key={x[0]}>
              <span
                onClick={() => editAppointment(x[0])}
                data-testid={`edit-appointment-${i}`}
              >
                {x[1].appointmentTime}, {x[1].appointmentTitle}
              </span>{" "}
              <span
                data-testid={`delete-appointment-${i}`}
                onClick={() => deleteAppointment(x[0])}
                className="fa fa-trash delete-icon"
                aria-hidden="true"
              ></span>
            </p>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;

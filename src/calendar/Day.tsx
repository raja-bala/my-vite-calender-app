import moment from "moment";
import { useAppointmentContext } from "../AppointmentContext";
import { FULL_DATE_FORMAT } from "./Contants";
import { PathString } from "react-hook-form";

const Day = ({
  input_day,
  input_date,
}: {
  input_day: PathString;
  input_date: moment.Moment;
}) => {
  const {
    state: { currentDate },
    dispatch,
  } = useAppointmentContext();

  return input_day ? (
    <div
      key={input_date.format(FULL_DATE_FORMAT)}
      data-day={"" + input_date + ""}
      className={`c-cal__cel ${
        input_date.format(FULL_DATE_FORMAT).toString() ===
        currentDate.format(FULL_DATE_FORMAT).toString()
          ? "isSelected"
          : ""
      }`}
      onClick={() => dispatch({ type: "updateCurrentDate", data: input_date })}
    >
      <p>{input_day}</p>
    </div>
  ) : (
    <div data-day={"" + input_day + ""} className="c-cal__cel"></div>
  );
};

export default Day;

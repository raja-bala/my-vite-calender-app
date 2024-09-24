import moment from "moment";
import { useAppointmentContext } from "../AppointmentContext";

const TodaySelector = () => {
  const { dispatch } = useAppointmentContext();
  return (
    <div
      className="c-sort"
      onClick={() => dispatch({ type: "updateCurrentDate", data: moment() })}
    >
      <a className="o-btn c-today__btn">TODAY</a>
    </div>
  );
};

export default TodaySelector;

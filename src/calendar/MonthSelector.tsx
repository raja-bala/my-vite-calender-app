import moment from "moment";
import { useAppointmentContext } from "../AppointmentContext";
import { MONTH_FORMAT, YEAR_FORMAT } from "./Contants";

const MonthSelector = () => {
  const {
    state: { currentDate },
    dispatch,
  } = useAppointmentContext();
  let selectedMonth = currentDate.format(MONTH_FORMAT).toUpperCase();
  let selectedYear = currentDate.format(YEAR_FORMAT);
  const selectPreviousMonth = () => {
    dispatch({
      type: "updateCurrentDate",
      data: moment(currentDate).add(-1, "month"),
    });
  };
  const selectNextMonth = () => {
    dispatch({
      type: "updateCurrentDate",
      data: moment(currentDate).add(1, "month"),
    });
  };
  return (
    <div className="c-monthyear">
      <div className="c-month">
        <span
          id="prev"
          className="prev fa fa-angle-left"
          aria-hidden="true"
          onClick={selectPreviousMonth}
          data-testid="selectPreviousMonth"
        ></span>
        <div id="c-paginator">
          <span className="c-paginator__month">{selectedMonth}</span>
        </div>
        <span
          id="next"
          className="next fa fa-angle-right"
          aria-hidden="true"
          onClick={selectNextMonth}
          data-testid="selectNextMonth"
        ></span>
      </div>
      <span className="c-paginator__year">{selectedYear}</span>
    </div>
  );
};

export default MonthSelector;

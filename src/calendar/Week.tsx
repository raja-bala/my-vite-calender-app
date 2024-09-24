import { useAppointmentContext } from "../AppointmentContext";
import { FULL_DATE_FORMAT, NO_OF_DATS } from "./Contants";
import Day from "./Day";
import moment from "moment";

const Week = ({
  current_week,

  first_day_of_the_month,
  isFirstWeek,
}: {
  current_week: any;

  first_day_of_the_month: any;
  isFirstWeek: any;
}) => {
  const {
    state: { currentDate },
  } = useAppointmentContext();
  let end_date_of_month_string = moment(first_day_of_the_month)
    .endOf("month")
    .format(FULL_DATE_FORMAT);
  let end_date_of_month = moment(end_date_of_month_string);
  let current_date = moment(first_day_of_the_month).format(FULL_DATE_FORMAT);
  let skip_firstweek_days = moment(first_day_of_the_month)
    .add(0, "weeks")
    .day();
  let noOfDaysInFirstWeek = NO_OF_DATS - skip_firstweek_days;

  return (
    <div className="c-cal__row">
      {[...Array(NO_OF_DATS)].map((_, i) => {
        let current_day =
          current_week * NO_OF_DATS - (NO_OF_DATS - noOfDaysInFirstWeek) + i;

        if (i >= moment(current_date).day() && isFirstWeek) {
          let internal_date = moment(current_date).add(
            i - skip_firstweek_days,
            "days"
          );
          return (
            <Day
              key={currentDate.toString() + i}
              input_date={internal_date}
              input_day={internal_date.format("DD")}
            />
          );
        } else if (isFirstWeek && current_week === 0) {
          return (
            <Day
              key={currentDate.toString() + i}
              input_date={moment()}
              input_day={""}
            />
          );
        } else if (
          current_day < end_date_of_month.daysInMonth() &&
          current_week > 0
        ) {
          let internal_date = moment(current_date).add(current_day, "days");
          return (
            <Day
              key={currentDate.toString() + i}
              input_date={internal_date}
              input_day={internal_date.format("DD")}
            />
          );
        }
      })}
    </div>
  );
};

export default Week;

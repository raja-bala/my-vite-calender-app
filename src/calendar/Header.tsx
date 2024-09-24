import MonthSelector from "./MonthSelector";
import TodaySelector from "./TodaySelector";

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <MonthSelector />
        <TodaySelector />
      </div>
    </header>
  );
};

export default Header;

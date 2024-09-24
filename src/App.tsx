import "./App.css";
import { AppointmentContextProvider } from "./AppointmentContext";
import Calendar from "./calendar/Calendar";

function App() {
  return (
    <AppointmentContextProvider>
      <Calendar />
    </AppointmentContextProvider>
  );
}

export default App;

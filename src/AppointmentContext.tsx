import * as React from "react";
import { Appointment } from "./types/Appointment";
import moment from "moment";
import { ApplicationContextType } from "./types/ApplicationContextType";
import { v4 as uuidv4 } from "uuid";
const AppointmentContext = React.createContext<
  | {
      state: ApplicationContextType;
      dispatch: any;
    }
  | undefined
>(undefined);
const appointmentReducer = (
  state: ApplicationContextType,
  action: { type: any; data: any }
) => {
  switch (action.type) {
    case "addAppointment": {
      if (state.currentAppointmentKey) {
        state.appointments.set(state.currentAppointmentKey, action.data);
      } else {
        state.appointments.set(uuidv4(), action.data);
      }
      state.currentAppointmentKey = "";
      return { ...state };
    }

    case "deleteAppointment": {
      state.appointments.delete(action.data);
      const appointments = new Map([...state.appointments]);
      return { ...state, appointments };
    }
    case "setCurrentAppointmentKey": {
      state.currentAppointmentKey = action.data;
      return state;
    }
    case "updateCurrentDate": {
      state.currentDate = action.data;
      return { ...state };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
function AppointmentContextProvider({ children }: { children: any }) {
  const [state, dispatch] = React.useReducer(appointmentReducer, {
    appointments: new Map<string, Appointment>(),
    currentDate: moment(),
    currentAppointmentKey: "",
  } as ApplicationContextType);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = {
    state,
    dispatch,
  } as { state: ApplicationContextType; dispatch: any };
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
}
function useAppointmentContext(): {
  state: ApplicationContextType;
  dispatch: any;
} {
  const context = React.useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
export {
  AppointmentContextProvider,
  useAppointmentContext,
  appointmentReducer,
};

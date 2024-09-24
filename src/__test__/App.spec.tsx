import { render } from "@testing-library/react";
import App from "../App";
import { AppointmentContextProvider } from "../AppointmentContext";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(
    <AppointmentContextProvider>
      <App />
    </AppointmentContextProvider>
  );
  expect(true).toBeTruthy();
});

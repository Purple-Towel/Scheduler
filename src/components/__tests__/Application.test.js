import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, prettyDOM} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));

    fireEvent.click(getByText(container, "Tuesday"));

    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    
    const input = getByPlaceholderText(appointment, "Enter Student Name");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, /delete this appointment\?/i));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting..."));

    await waitForElement(() => getByAltText(appointment, "Add"))
  
    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Edit"));

    const input = getByPlaceholderText(appointment, "Enter Student Name");
    fireEvent.change(input, { target: { value: "Plato" } });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));
  
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();
    
    
    await waitForElement(() => queryByText(appointment, "Plato"));

    const days = getAllByTestId(container, "day");
    const day = days.find(day => queryByText(day, "Monday"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    
    const input = getByPlaceholderText(appointment, "Enter Student Name");
    fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Error saving."));
  });

  it("shows the delete error when failing to delete an appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments.find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, /delete this appointment\?/i));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting..."));

    await waitForElement(() => queryByText(appointment, "Error deleting."));
  });
});
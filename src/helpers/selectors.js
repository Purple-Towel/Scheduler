export default function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter((filteredDay) => {
   return filteredDay.name === day;
  })
  if (filteredDays.length === 0) {
    return [];
  }
  const filteredAppointments = filteredDays[0].appointments.map(appointment => {
    return state.appointments[appointment];
  })
  return filteredAppointments;
};
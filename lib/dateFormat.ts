export const dateFormat = (from: Date, to: Date) => {
  
  const millSecondsPerDay = 24 * 60 * 60 * 1000;
	const numOfDays = ((treatAsUTC(to) - treatAsUTC(from)) / millSecondsPerDay) + 1

  return `${from.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} - ${to.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} \n Number of Days: ${numOfDays}`;
};

function treatAsUTC(date : Date) {

	const res = new Date(date);

  return res.setMinutes(res.getMinutes() - res.getTimezoneOffset());
	
}
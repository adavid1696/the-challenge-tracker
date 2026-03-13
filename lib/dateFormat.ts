export const dateFormat = (from : Date, to: Date) => {
	const numOfDays = to.getDate() - from.getDate() + 1
	return `${from.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} \n Number of Days: ${numOfDays}`
}
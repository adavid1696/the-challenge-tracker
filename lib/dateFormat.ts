export const dateFormat = (from, to) => {
	const numOfDays = to.getDate() - from.getDate() + 1
	return `${from.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} Number of Days: ${numOfDays}`
}
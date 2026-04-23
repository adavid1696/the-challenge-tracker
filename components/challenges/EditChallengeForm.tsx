"use client"

import { Challenge } from "@/app/dashboard/page"

export default function EditChallengeForm({ challenge } : {challenge: Challenge}) {
	
	const handleSubmit = async () => {

		const res = await fetch(`/api/challenges/${challenge.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				
			})
		})

		return
	}

	return (
    <div>
      <br />
			<form onSubmit={handleSubmit}>
      	<input type="text" defaultValue={challenge.title} />
      		<br />
      	<input type="text" defaultValue={challenge.description} />
      		<br />
      	<input type="text" defaultValue={challenge.goal} />
			</form>
    </div>
  );
}


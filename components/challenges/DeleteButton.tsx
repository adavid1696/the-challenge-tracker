"use client"

import { useRouter } from "next/navigation";

export default function DeleteButton({ id } : {id : string}) {

	const router = useRouter();

	const handleClick = async () => {
		console.log('in handle click')
		const res = await fetch(`/api/challenges/${id}`, {
			method: 'DELETE'
		})
		console.log("this is the deleted one:", res)

		router.push('/dashboard')

		return
	}

	return (
		<button onClick={handleClick}>Delete</button>
	)
}
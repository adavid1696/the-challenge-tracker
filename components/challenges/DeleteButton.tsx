"use client"

import { useRouter } from "next/navigation";

export default function DeleteButton({ id } : {id : string}) {

	const router = useRouter();

	const handleClick = async () => {
		
		const res = await fetch(`/api/challenges/${id}`, {
			method: 'DELETE'
		})
	

		router.push('/dashboard')

		return
	}

	return (
		<button onClick={handleClick}>Delete</button>
	)
}
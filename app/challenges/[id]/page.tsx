import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Challenges() {
	const session = getServerSession(authOptions)
	//  need to add authenticaton to each route to keep code dry through middleware, this will be deleted. 
	if(!session) redirect("/auth/login")

	return (
		<div>Howdy</div>
	)
}
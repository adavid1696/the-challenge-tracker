import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

	const session = await getServerSession(authOptions)
	console.log("this is the session: ", session?.user)

	if(!session) redirect("/auth/login")

	// add logic to show user info once logged in.

  return (
		<div>In the dashboard page</div>
	)
}

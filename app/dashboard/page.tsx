import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

// user will see all their challnges in the dashboard and be able to create a new one from here

export default async function DashboardPage() {

	const session = await getServerSession(authOptions)
	console.log("this is the session: ", session?.user)

	if(!session) redirect("/auth/login")

	// add logic to show user info once logged in.

  return (
		<div>
			in dashboard
			<button>Create New Challenge</button>
		</div>
	)
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import ChallengeList from "@/components/challenges/ChallengeList";

// user will see all their challnges in the dashboard and be able to create a new one from here

export interface Challenge {
	id: string
	completed: boolean
	createdAt: Date
	description: string | null
	goal: string
	title: string
	isActive: boolean
	startDate: Date
	endDate: Date
	userId: string
}

export default async function DashboardPage() {

	let allChallenges: Challenge[] = []
	const session = await getServerSession(authOptions)

	if(!session) redirect("/auth/login")

	// add logic to show user info once logged in.
	try {
		allChallenges = await prisma.challenge.findMany({
					where: {
						userId: session.user.id
					},
				})

				// console.log(allChallenges)

	} catch (error) {
		console.error(error)
	}

  return (
		<div>
			<Link href="/challenges/new-challenge">New Challenge</Link>
			{/* <button>Create New Challenge</button> */}
			<ChallengeList allChallenges={allChallenges}/>
		</div>
	)
}

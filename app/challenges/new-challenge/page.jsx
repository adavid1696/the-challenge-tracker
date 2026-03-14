import ChallengeForm from "@/components/challenges/ChallengeForm"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function NewChallenge() {

	const session = await getServerSession(authOptions);
	if(!session) redirect('/auth/login')

	return (
		<div>
			<ChallengeForm userId={session.user.id}/>
		</div>
	)
}
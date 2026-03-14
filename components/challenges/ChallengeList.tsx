import { Challenge } from "@/app/dashboard/page";
import ChallengeCard from "./ChallengeCard";

export default function ChallengeList({ allChallenges } : {allChallenges : Challenge[]}) {
	return (
		<>
		 <ul>
			{allChallenges.map( challenge => (
				<ChallengeCard key={challenge.id} challenge={ challenge }/>
			))}
		 </ul>
		</>
	)	
}
"use client"

import { Challenge } from "@/app/dashboard/page";
import ChallengeCard from "./ChallengeCard";
import { useRouter } from "next/navigation";

export default function ChallengeList({ allChallenges } : {allChallenges : Challenge[]}) {
	return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "16px",
          padding: "32px",
        }}
      >
        {allChallenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge}/>
        ))}
      </div>
    </>
  );	
}
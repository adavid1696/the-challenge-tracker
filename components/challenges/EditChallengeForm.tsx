"use client"

import { Challenge } from "@/app/dashboard/page"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function EditChallengeForm({ challenge } : {challenge: Challenge}) {

  const router = useRouter();

	const [title, setTitle] = useState(challenge.title);
	const [description, setDescription] = useState(challenge.description);
	const [goal, setGoal] = useState(challenge.goal);
	
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/challenges/${challenge.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        description,
        goal,
      }),
    });

    router.push("/dashboard");
    return;
  };

	return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          defaultValue={title}
        />
        <br />
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          defaultValue={description ?? ""}
        />
        <br />
        <input
          onChange={(e) => setGoal(e.target.value)}
          type="text"
          defaultValue={goal}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}


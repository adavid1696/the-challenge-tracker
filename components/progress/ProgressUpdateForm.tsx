"use client";

import { useState } from "react";

export default function ProgressUpdateForm({ id }: { id: string }) {
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await fetch(`/api/challenges/${id}/progress/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        notes,
      }),
    });

    console.log(resp);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setNotes(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

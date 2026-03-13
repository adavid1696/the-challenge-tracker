"use client";

import { useState } from "react";
import MyDatePicker from "../ui/DatePicker";
import { type DateRange } from "react-day-picker";

export default function ChallengeForm({ userId }: { userId: string }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [range, setRange] = useState<DateRange>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await fetch("/api/challenges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        goal,
        startDate: range?.from,
        endDate: range?.to,
        userId: userId,
      }),
    });

    const dataJSON = await data.json();

    console.log("this is data at challengeForm", data)
  };


  return (
    <div>
      <MyDatePicker range={range} setRange={setRange} />

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="30 Day Push Up Challenge"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          name="goal"
          required
          onChange={(e) => setGoal(e.target.value)}
        />

        <button>Submit</button>
      </form>
    </div>
  );
}

"use client";

import MyDatePicker from "../ui/DatePicker";

export default function ChallengeForm() {
  return (
    <div>
			<MyDatePicker />
      <form>
        <input type="text" name="title" required />
        <input type="text" name="description" placeholder="optional" />
        <input type="text" name="goal" required />
        <input type="text" name="title" required />
        <input type="text" name="title" required />
        <input type="text" name="title" required />
      </form>
    </div>
  );
}

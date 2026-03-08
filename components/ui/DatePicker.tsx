"use client"

import { dateFormat } from "@/lib/dateFormat";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function MyDatePicker() {
  const [range, setRange] = useState<DateRange | undefined>();

  let footer = `Please pick the first day.`;
  // if (range?.from) {
  //   if (!range.to) {
  //     footer = `${format(range.from, "PPP")}—`;
  //   } else if (range.to) {
  //     footer = `${format(range.from, "PPP")}—${format(range.to, "PPP")}`;
  //   }
  // }

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={setRange}
      footer={
        range
          ? dateFormat(range.from, range.to)
          : "Pick a day."
      }
      // footer={
      //   selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      // }
    />
  );
}

export default MyDatePicker
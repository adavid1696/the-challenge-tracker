"use client"

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useEffect, useState } from "react";

function MyDayPicker() {
  const [selected, setSelected] = useState<Date>();

  useEffect(() => {
    
  }, [selected])
  

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={
        selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      }
    />
  );
}


export default MyDayPicker
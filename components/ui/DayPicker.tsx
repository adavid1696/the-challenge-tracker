"use client"

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useEffect, useState } from "react";

function MyDayPicker(id) {
  const [selected, setSelected] = useState<Date>();
  

  // api call to the daily progress table to see if there is an entry based on the dates.
  useEffect(() => {
    if (!selected) return;
    let date = new Date(selected).toISOString
    // date.toISOString()
    console.log(date);

    const fetchData = async () => {
      try {
        const resp = await fetch(`/api/challenges/${id.id}/progress?search=${date}`)
        const respJSON = await resp.json()

        console.log(respJSON)
        return
      } catch (e) {
        console.error(e)
      }
    }

    fetchData()
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
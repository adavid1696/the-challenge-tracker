"use client"

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useEffect, useState } from "react";

function MyDayPicker(id : { id: string}) {
  const [selected, setSelected] = useState<Date>();
  

  // api call to the daily progress table to see if there is an entry based on the dates.
  useEffect(() => {
    if (!selected) return;
    const date = new Date(selected)
    // date.toISOString()

    const fetchData = async () => {
      try {
        const resp = await fetch(
          `/api/challenges/${id.id}/progress/${date.toISOString()}`,
        );
        const respJSON = await resp.json()

        console.log('this is the resp: ', respJSON)
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

// 2026-05-27T23:56:10.519Z
// 2026-05-27T04:00:00.000Z
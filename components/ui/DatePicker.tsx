import { dateFormat } from "@/lib/dateFormat";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface DatePickerProps {
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
}

function MyDatePicker({range, setRange} : DatePickerProps) {

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={setRange}
      footer={range?.from && range?.to ? <p className="whitespace-pre-line">{dateFormat(range.from, range.to)}</p> : "Pick a day."}
      // footer={
      //   selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      // }
    />
  );
}

export default MyDatePicker
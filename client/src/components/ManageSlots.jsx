import React, { useContext, useState } from "react";
import axios from "axios";
import { DoctorContext } from "../context/DoctorContextProvider";

const ManageSlots = () => {
    const [weekdayStart, setWeekdayStart] = useState("09:00");
    const [weekdayEnd, setWeekdayEnd] = useState("17:00");
    const [weekendStart, setWeekendStart] = useState("10:00");
    const [weekendEnd, setWeekendEnd] = useState("14:00");
    const { doctorId } = useContext(DoctorContext)

    const generateSlots = (startTime, endTime, startDate, endDate) => {
        const slots = [];
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const day = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
            const isWeekend = day === 0 || day === 6; // Weekend: Saturday, Sunday
            const currentStartTime = isWeekend ? weekendStart : weekdayStart;
            const currentEndTime = isWeekend ? weekendEnd : weekdayEnd;

            // Convert start and end time to minutes
            const [startHour, startMinute] = currentStartTime.split(":").map(Number);
            const [endHour, endMinute] = currentEndTime.split(":").map(Number);
            const startMinutes = startHour * 60 + startMinute;
            const endMinutes = endHour * 60 + endMinute;

            for (let minutes = startMinutes; minutes < endMinutes; minutes += 30) {
                const hour = Math.floor(minutes / 60);
                const minute = minutes % 60;

                // Format slot time
                const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

                // Add slot with date and time
                slots.push(`${currentDate.toISOString().split("T")[0]}T${time}:00.000Z`);
            }

            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return slots;
    };

    const handleSubmit = async () => {
        try {
            const today = new Date();
            const nextMonth = new Date(today);
            nextMonth.setMonth(today.getMonth() + 1);

            // Generate slots
            const slots = generateSlots(weekdayStart, weekdayEnd, today, nextMonth);
            console.log('Slots:', slots)
            const payload = {
                availableSlots: slots,
            };

            // Update slots in the database
            const response = await axios.put(`http://localhost:5000/api/doctors/${doctorId}/slots`, payload);
            alert("Slots updated successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error updating slots:", error);
            alert("Failed to update slots. Please try again.");
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-lg font-bold mb-4">Manage Slots</h2>
            <br />
            <p className="text-lg font-semibold mb-2">WeekDays</p>
            <div className="mb-4">
                <label className="block font-medium mb-1"> Start Time</label>
                <input
                    type="time"
                    value={weekdayStart}
                    onChange={(e) => setWeekdayStart(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1"> End Time</label>
                <input
                    type="time"
                    value={weekdayEnd}
                    onChange={(e) => setWeekdayEnd(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
            </div>
            <p className="text-lg font-semibold mb-2">Weekends</p>
            <div className="mb-4">
                <label className="block font-medium mb-1">Start Time</label>
                <input
                    type="time"
                    value={weekendStart}
                    onChange={(e) => setWeekendStart(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-1">End Time</label>
                <input
                    type="time"
                    value={weekendEnd}
                    onChange={(e) => setWeekendEnd(e.target.value)}
                    className="border rounded-md p-2 w-full"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Generate and Update Slots
            </button>
        </div>
    );
};

export default ManageSlots;

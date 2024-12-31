import React, { useEffect, useContext, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DoctorContext } from '../context/DoctorContextProvider';
import axios from 'axios';
import ManageAppointmentModal from './ManageAppointmentModal';
import moment from 'moment-timezone';


const DoctorCalendar = () => {

    const [events, setEvents] = useState([]);

    const { selectedEvent, setSelectedEvent, doctorId, modalOpen, setModalOpen } = useContext(DoctorContext)

    // Fetch appointments for the doctor
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/appointments/doctor/${doctorId}`);
                const appointments = response.data;

                // Format the data for FullCalendar
                const formattedEvents = appointments.map((appointment) => {
                    const { date, time } = appointment.slot;
                    console.log('timeIn:', time)
                    const convertTo24HourFormat = (time) => {
                        const [timePart, modifier] = time.split(' ');
                        let [hours, minutes] = timePart.split(':');

                        if (hours === '12') {
                            hours = '00';
                        }

                        if (modifier === 'PM') {
                            hours = parseInt(hours, 10) + 12;
                        }

                        return `${hours}:${minutes}`;
                    };
                    const addMinutesToISO = (isoString, minutes) => {
                        const date = new Date(isoString);
                        date.setMinutes(date.getMinutes() + minutes);
                        return date.toISOString();
                    };

                    const startTime24 = convertTo24HourFormat(time);
                    console.log(startTime24)
                    const endtime = addMinutesToISO(`${date}T${startTime24}:00.000Z`, 30)
                    // const endTime24 = endTime ? convertTo24HourFormat(endTime) : startTime24;
                    const utcTime = (`${date}T${startTime24}:00`);

                    return {
                        id: appointment._id,
                        title: `Patient: ${appointment.patientId.name}`, // Replace with patient name if available
                        start: utcTime,
                        extendedProps: {
                            status: appointment.status,
                        }
                    }
                });

                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, [doctorId]);

    useEffect(() => {
        console.log(events)
    }, [events])

    // Handle date click for adding new events (optional)
    const handleDateClick = (info) => {
        alert(`Clicked on date: ${info.dateStr}`);
    };
    const handleEventClick = (info) => {
        setSelectedEvent(info.event); // Store the clicked event details
        setModalOpen(true); // Open the modal
    };

    // Define colors for each status
    const statusColors = {
        Scheduled: 'green',
        Cancelled: 'red',
        Missed: 'orange',
        Completed: 'blue',
    };

    // Custom event rendering with colored dot
    const renderEventContent = (eventInfo) => {
        const { status } = eventInfo.event.extendedProps; // Access status from extendedProps
        const dotColor = statusColors[status] || 'gray'; // Fallback color for unknown statuses

        return (
            <div className="flex items-center overflow-auto">
                {/* Colored dot (Added customization for the event display) */}
                <span
                    style={{
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: dotColor,
                        marginRight: '5px',
                    }}
                ></span>
                {/* Event title and time */}
                <span>{eventInfo.timeText} {eventInfo.event.title}</span>
            </div>
        );
    };

    return (
        <div className="p-4 overflow-y-auto">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: 'prev,next today',
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={events}
                eventContent={renderEventContent}
                editable={false}
                selectable={true}
                eventClick={handleEventClick}
                height="40rem" // Sets the calendar height automatically
                contentHeight="100px" // Enables scrollable content within a fixed height
                slotMinTime="06:00:00" // Adjust to your desired start time for the day
                slotMaxTime="23:00:00" // Adjust to your desired end time for the day
                nowIndicator={true}
                scrollTime="06:00:00" // Scrolls to the start of the day initially
            />

            {modalOpen && selectedEvent && (<ManageAppointmentModal event={selectedEvent} />)}
        </div>
    );
};

export default DoctorCalendar;

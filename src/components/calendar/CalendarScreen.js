import moment from 'moment';

import React, {useEffect, useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es-mx';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar)
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

    const {uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch]);

    const onDoubleClick = (e) =>{
        dispatch(uiOpenModal());
    }

    const onSelect = (e) =>{
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const eventStyleGetter = (event , start, end, isSelected) =>{



        const style = {
            backgroundColor: (uid === event.user._id)? '#367CF7': '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    };

    const handleSelectSlot = (e) =>{
//opcional 
        activeEvent && dispatch(eventClearActiveEvent());
    }

    return (
        <div className='calendar-screen'>
            <Navbar/>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100vh' }}
                messages={messages}
                eventPropGetter = {eventStyleGetter}
                onDoubleClickEvent = {onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
                onSelectSlot = {handleSelectSlot}
                selectable={true}
            />
            <AddNewFab/>
            {activeEvent && <DeleteEventFab/>}
            <CalendarModal/>
        </div>
    )
}

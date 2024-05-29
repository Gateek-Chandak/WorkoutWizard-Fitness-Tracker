import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timegrid from '@fullcalendar/timegrid'

const Calendar = ( {logs} ) => {
  return (
    <div>
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin, timegrid ]}
        initialView="dayGridMonth"
        headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: ''
        }}
        events={logs}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        />
    </div>
    
  )
}

export default Calendar
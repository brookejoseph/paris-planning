import type React from "react"
import type { Event } from "../types"
import { MapPin, Clock, Heart } from "lucide-react"

interface EventListProps {
  events: Event[]
  onEventClick: (id: string) => void
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => {
  const sortedEvents = [...events].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="space-y-4">
      {sortedEvents.map((event, index) => (
        <div
          key={event.id}
          className="p-4 bg-white shadow-sm rounded-lg cursor-pointer hover:bg-lavender transition-colors duration-200 border border-pink"
          onClick={() => onEventClick(event.id)}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-pink rounded-full flex items-center justify-center text-white font-bold mr-3">
              {index + 1}
            </div>
            <h3 className="font-semibold text-lg text-pink">{event.title}</h3>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <Clock className="w-4 h-4 mr-2 text-pink" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-pink" />
            {`${event.lat.toFixed(4)}, ${event.lng.toFixed(4)}`}
          </div>
          <p className="mt-2 text-gray-700">{event.description}</p>
          <div className="mt-2 flex justify-end">
            <Heart className="w-4 h-4 text-pink" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default EventList


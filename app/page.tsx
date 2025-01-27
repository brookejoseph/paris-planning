"use client"

import React, { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import EventList from "../components/EventList"
import EventForm from "../components/EventForm"
import type { Event } from "../types"
import { Button } from "@/components/ui/button"
import { Heart, Star, Sun, Moon } from "lucide-react"

const Map = dynamic(() => import("../components/Map"), { ssr: false, loading: () => <p>Loading map... 🗺️</p> })

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [showMobileMap, setShowMobileMap] = useState(true)

  const handleEventAdd = (newEvent: Omit<Event, "id">) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
    }
    setEvents([...events, event].sort((a, b) => a.time.localeCompare(b.time)))
    setShowEventForm(false)
  }

  const handleMarkerClick = (id: string) => {
    // Implement marker click action if needed
  }

  const handleEventClick = (id: string) => {
    // Implement event click action if needed
  }

  return (
    <div className="flex flex-col h-screen bg-light-pink">
      <header className="bg-pink p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center text-white">Paris Day Planner 🗼✨</h1>
      </header>
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden p-4">
        <div className="md:w-1/3 p-4 overflow-y-auto girly-card mb-4 md:mb-0 md:mr-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-pink">Your Magical Itinerary 🌟</h2>
            <Button onClick={() => setShowEventForm(!showEventForm)} className="cute-button">
              {showEventForm ? "Cancel ❌" : "Add Event ➕"}
            </Button>
          </div>
          {showEventForm && (
            <div className="mb-6">
              <EventForm onEventAdd={handleEventAdd} />
            </div>
          )}
          <EventList events={events} onEventClick={handleEventClick} />
        </div>
        <div className="flex-grow md:w-2/3 girly-card">
          <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading map... 🗺️</div>}>
            <Map events={events} onMarkerClick={handleMarkerClick} />
          </Suspense>
        </div>
      </div>
      <div className="md:hidden fixed bottom-4 right-4 flex space-x-2">
        <Button onClick={() => setShowMobileMap(!showMobileMap)} className="cute-button rounded-full">
          {showMobileMap ? <Star className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  )
}


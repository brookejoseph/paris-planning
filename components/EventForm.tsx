"use client"

import type React from "react"
import { useState } from "react"
import type { Event } from "../types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface EventFormProps {
  onEventAdd: (event: Omit<Event, "id">) => void
}

const EventForm: React.FC<EventFormProps> = ({ onEventAdd }) => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onEventAdd({
      title,
      time,
      description,
      lat: Number.parseFloat(lat),
      lng: Number.parseFloat(lng),
    })
    setTitle("")
    setTime("")
    setDescription("")
    setLat("")
    setLng("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-lavender p-4 rounded-lg border border-pink">
      <div>
        <Label htmlFor="title" className="text-sm font-medium text-pink">
          Event Title 🎉
        </Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 border-pink focus:border-peach focus:ring-peach"
          placeholder="Enter magical event title"
        />
      </div>
      <div>
        <Label htmlFor="time" className="text-sm font-medium text-pink">
          Time ⏰
        </Label>
        <Input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="mt-1 border-pink focus:border-peach focus:ring-peach"
        />
      </div>
      <div>
        <Label htmlFor="description" className="text-sm font-medium text-pink">
          Description ✨
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 border-pink focus:border-peach focus:ring-peach"
          placeholder="Describe your enchanting event"
        />
      </div>
      <div className="flex space-x-4">
        <div className="flex-1">
          <Label htmlFor="lat" className="text-sm font-medium text-pink">
            Latitude 🌍
          </Label>
          <Input
            type="number"
            id="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
            step="any"
            className="mt-1 border-pink focus:border-peach focus:ring-peach"
            placeholder="e.g. 48.8566"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="lng" className="text-sm font-medium text-pink">
            Longitude 🌎
          </Label>
          <Input
            type="number"
            id="lng"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
            step="any"
            className="mt-1 border-pink focus:border-peach focus:ring-peach"
            placeholder="e.g. 2.3522"
          />
        </div>
      </div>
      <Button type="submit" className="w-full cute-button">
        Add Magical Event ✨
      </Button>
    </form>
  )
}

export default EventForm


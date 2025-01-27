"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Event } from "../types"

interface MapProps {
  events: Event[]
  onMarkerClick: (id: string) => void
}

const Map: React.FC<MapProps> = ({ events, onMarkerClick }) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([48.8566, 2.3522], 13)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)
      setMapReady(true)
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return

    const map = mapRef.current

    // Clear existing markers and path
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer)
      }
    })

    const sortedEvents = [...events].sort((a, b) => a.time.localeCompare(b.time))
    const coordinates: [number, number][] = []

    sortedEvents.forEach((event, index) => {
      const marker = L.marker([event.lat, event.lng], {
        icon: L.divIcon({
          className: "custom-div-icon",
          html: `<div style="background-color: #FFC0CB; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; font-weight: bold; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${index + 1}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
      })
        .addTo(map)
        .bindPopup(`<b>${event.title}</b><br>${event.time}<br>✨`)
        .on("click", () => onMarkerClick(event.id))

      coordinates.push([event.lat, event.lng])
    })

    if (coordinates.length > 1) {
      const path = L.polyline(coordinates, {
        color: "#FFC0CB",
        weight: 3,
        opacity: 0.7,
        dashArray: "5, 10",
        lineCap: "round",
      }).addTo(map)
      map.fitBounds(path.getBounds(), { padding: [50, 50] })
    } else if (coordinates.length === 1) {
      map.setView(coordinates[0], 15)
    }
  }, [events, onMarkerClick, mapReady])

  return <div ref={mapContainerRef} className="w-full h-full rounded-lg overflow-hidden shadow-lg" />
}

export default Map


"use client";
import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import axios from "axios";

interface Airport {
  id: number;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export default function Map(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<Airport[]>([]);
  const zoom = 4.9;

  useEffect(() => {
    if (!mapContainer.current) return;

    const center_map = { lng: 78.9629, lat: 20.5937 }; // Mumbai Airport coordinates

    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY || "";

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: center_map,
      zoom: zoom,
    });

    markers.forEach((marker) => {
      const popup = new maptilersdk.Popup({}).setHTML(`
        <div class="popup-content">
          <h3>${marker.name}</h3>
          <p>${marker.city}, ${marker.country}</p>
        </div>
      `);

      new maptilersdk.Marker({
        color: "#FF0000",
      })
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [markers]);

  const fetchAirportsAndSetMarkers = async (setMarkers: React.Dispatch<React.SetStateAction<Airport[]>>) => {
    try {
      let url = 'http://127.0.0.1:8000/airports/';
      let airports: Airport[] = [];
      
      while (url) {
        const response = await axios.get(url);
        const data = response.data;
        const fetchedAirports: Airport[] = data.results.map((airport: any) => ({
          id: airport.id,
          name: airport.name,
          city: airport.city,
          country: airport.country,
          lat: airport.lat,
          lng: airport.lng,
        }));
        airports = airports.concat(fetchedAirports);
        url = data.next;
      }
      
      setMarkers(airports);
    } catch (error) {
      console.error("Error fetching marker data:", error);
    }
  };

  useEffect(() => {
    fetchAirportsAndSetMarkers(setMarkers);
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: "800px", marginTop: "5px", marginBottom: "5px" }}
    >
      <style>
        {`
          .popup-content {
            background-color: #f6f6f6;
            border: 2px solid #00bcd4;
            border-radius: 8px;
            padding: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: 200px;
            max-width: 100%;
          }

          .popup-content h3 {
            margin: 0;
            color: #00bcd4;
            font-size: 18px;
            margin-bottom: 5px;
          }

          .popup-content p {
            margin: 0;
            color: #333;
          }
        `}
      </style>
    </div>
  );
}

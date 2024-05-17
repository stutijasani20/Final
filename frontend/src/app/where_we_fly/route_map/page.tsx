"use client";
"use client";
import React, { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map(): JSX.Element {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const zoom = 3;

  useEffect(() => {
    if (!mapContainer.current) return;

   
    const center_map = { lng: 78.9629, lat: 20.5937 }; // Mumbai Airport coordinates

    maptilersdk.config.apiKey = "oXA9UAqOuM8L6RQbCgHd";

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [78.9629, 20.5937],
      zoom: zoom,
    });

    // Load custom image and add it as a custom image to the map

    markers.forEach((marker) => {
      const popup = new maptilersdk.Popup({}).setHTML(`
        <div class="popup-content">
          <h3>${marker.name}</h3>
          <p>${marker.city}, ${marker.country}</p>
        </div>
      `);

      // Use the custom image for the marker
      const customMarker = new maptilersdk.Marker({
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

  useEffect(() => {
    // Fetch marker data from backend URL
    fetch("http://127.0.0.1:8000/airports/")
      .then((response) => response.json())
      .then((data) => {
        // Set the received markers data
        setMarkers(data);
      })
      .catch((error) => {
        console.error("Error fetching marker data:", error);
      });
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ height: "800px", marginTop: "5px", marginBottom: "5px" }}
    >
      <style>
        {`
          .popup-content {
            background-color: #fff;
            border: 2px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            background-color: pink;
          }

          .popup-content h3 {
            margin-top: 0;
          }

          .popup-content p {
            margin-bottom: 5px;
          }
        `}
      </style>
    </div>
  );
}
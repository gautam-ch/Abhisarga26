import React from "react";
import { eventCategories } from "../../../lib/content";
import EventDetails from "../../../components/sections/EventsDetails";

// 1. Added 'async' to the function
export default async function EventDetailsPage({ params }) {
  
  // 2. Await the params promise
  const { slug } = await params;

  // Flatten all events
  const allEvents = eventCategories.flatMap((cat) => cat.events);

  // Find the matching event
  const event = allEvents.find(
    (e) => e.name.replace(/\s+/g, "-").toLowerCase() === slug
  );

  if (!event) {
    return (
      <div className="bg-black text-white h-screen flex items-center justify-center italic tracking-widest uppercase font-serif">
        Signal Lost: Event not found
      </div>
    );
  }

  // Pass event to Client Component
  return <EventDetails event={event} />;
}
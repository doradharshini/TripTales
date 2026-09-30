import { useEffect, useMemo, useState } from "react";
import { deleteTimelineEvent, getTimelineEvents } from "../services/tripApi";
import "./Timeline.css";

const eventImages = {
  itinerary: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=85",
  journal: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=85",
  memory: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=85",
};

const eventLabels = { itinerary: "Plan", journal: "Journal", memory: "Memory" };

function formatDate(dateValue) {
  if (!dateValue) return "Unknown date";
  return new Date(`${dateValue}T00:00:00`).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
}

function Timeline() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setEvents(await getTimelineEvents());
      } catch (loadError) {
        console.error("Failed to load timeline:", loadError);
        setError("Unable to load your timeline. Please start the backend.");
      } finally {
        setIsLoading(false);
      }
    };
    void loadEvents();
  }, []);

  const sortedEvents = useMemo(() => {
    const visibleEvents = filter === "all" ? events : events.filter((event) => event.type === filter);
    return [...visibleEvents].sort((first, second) => new Date(`${first.date} ${first.time}`) - new Date(`${second.date} ${second.time}`));
  }, [events, filter]);

  const deleteEvent = async (event) => {
    try {
      await deleteTimelineEvent(event.type, event.id);
      setEvents((current) => current.filter((item) => !(item.id === event.id && item.type === event.type)));
    } catch (deleteError) {
      console.error("Failed to delete timeline event:", deleteError);
      setError("Unable to delete this timeline event.");
    }
  };

  return (
    <main className="timeline-page">
      <header className="timeline-header">
        <div><span>YOUR JOURNEY</span><h1>Your Journey</h1><p>Your entire journey, day by day.</p></div>
        <div className="timeline-header__count"><strong>{events.length}</strong><span>moments collected</span></div>
      </header>

      <div className="timeline-filter-row">
        <div className="timeline-controls" aria-label="Filter timeline events">
          {[{ value: "all", label: "All moments" }, { value: "itinerary", label: "Plans" }, { value: "journal", label: "Journal" }, { value: "memory", label: "Memories" }].map((option) => <button className={filter === option.value ? "active" : ""} type="button" key={option.value} onClick={() => setFilter(option.value)}>{option.label}</button>)}
        </div>
        <span className="timeline-filter-row__result">{sortedEvents.length} shown</span>
      </div>

      {error && <p className="status-message">{error}</p>}
      {isLoading && <p className="status-message">Building your journey...</p>}
      {!isLoading && sortedEvents.length === 0 && <div className="empty-timeline"><span>◌</span><h2>No moments here yet</h2><p>Add a trip, journal entry or memory and it will appear in your story.</p></div>}
      {!isLoading && sortedEvents.length > 0 && <section className="timeline-story-list">
        {sortedEvents.map((event, index) => <article className="timeline-story-item" key={`${event.type}-${event.id}`}>
          <div className="timeline-story-item__date"><strong>{formatDate(event.date)}</strong><span>Day {index + 1}</span></div>
          <div className="timeline-story-item__rail"><span className={`timeline-story-item__dot timeline-story-item__dot--${event.type}`}>{event.icon || "•"}</span></div>
          <div className="timeline-story-card">
            <div className="timeline-story-card__top"><span className="timeline-story-card__type">{eventLabels[event.type] || event.type}</span><time>{event.time || "12:00"}</time></div>
            <div className="timeline-story-card__content"><div><h2>{event.title}</h2><p>{event.description || "A moment worth keeping from your journey."}</p><button className="timeline-delete" type="button" onClick={() => deleteEvent(event)}>Delete moment</button></div><img src={eventImages[event.type] || eventImages.memory} alt="" /></div>
          </div>
        </article>)}
      </section>}
    </main>
  );
}

export default Timeline;
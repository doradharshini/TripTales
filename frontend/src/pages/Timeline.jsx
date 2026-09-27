import { useEffect, useState } from "react";
import {
  deleteTimelineEvent,
  getTimelineEvents,
} from "../services/tripApi";


function Timeline() {

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setError("");
        setEvents(await getTimelineEvents());
      } catch (loadError) {
        console.error("Failed to load timeline:", loadError);
        setError("Unable to load the timeline. Please start the backend.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);


  /*
   * Filter timeline events.
   */

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter(
          (event) =>
            event.type === filter
        );


  /*
   * Sort events by date and time.
   */

  const sortedEvents = [
    ...filteredEvents
  ].sort((a, b) => {

    const first =
      new Date(
        `${a.date} ${a.time}`
      );

    const second =
      new Date(
        `${b.date} ${b.time}`
      );

    return first - second;
  });


  /*
   * Delete an event.
   */

  const deleteEvent = async (event) => {
    try {
      await deleteTimelineEvent(event.type, event.id);
      setEvents((currentEvents) =>
        currentEvents.filter(
          (currentEvent) =>
            !(currentEvent.id === event.id && currentEvent.type === event.type)
        )
      );
    } catch (deleteError) {
      console.error("Failed to delete timeline event:", deleteError);
      setError("Unable to delete this timeline event.");
    }
  };


  /*
   * Return CSS class
   * based on event type.
   */

  const getEventClass = (type) => {

    if (type === "memory") {
      return "timeline-memory";
    }

    if (type === "journal") {
      return "timeline-journal";
    }

    if (type === "expense") {
      return "timeline-expense";
    }

    return "timeline-itinerary";
  };


  return (

    <main className="timeline-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <section className="timeline-header">

        <div>

          <span>
            YOUR JOURNEY
          </span>

          <h1>
            Travel Timeline 🌅
          </h1>

          <p>
            Every place, moment and memory
            of your journey in one story.
          </p>

        </div>

      </section>


      {/* =========================================
          FILTERS
      ========================================= */}

      <section className="timeline-controls">

        {isLoading && <p>Loading timeline...</p>}

        {error && <p className="form-error">{error}</p>}

        <button
          className={
            filter === "all"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("all")
          }
        >
          ✨ All
        </button>


        <button
          className={
            filter === "itinerary"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("itinerary")
          }
        >
          🗺️ Plans
        </button>


        <button
          className={
            filter === "memory"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("memory")
          }
        >
          📸 Memories
        </button>


        <button
          className={
            filter === "journal"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("journal")
          }
        >
          📝 Journal
        </button>


        <button
          className={
            filter === "expense"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("expense")
          }
        >
          💰 Expenses
        </button>

      </section>


      {/* =========================================
          TIMELINE
      ========================================= */}

      <section className="timeline-container">

        {sortedEvents.length === 0 ? (

          <div className="empty-timeline">

            <div>
              🔎
            </div>

            <h2>
              Nothing here yet
            </h2>

            <p>
              There are no events in
              this category.
            </p>

          </div>

        ) : (

          <div className="timeline">

            {sortedEvents.map(
              (event) => (

                <article
                  className="timeline-item"
                  key={event.id}
                >

                  {/* LINE */}

                  <div className="timeline-line">
                  </div>


                  {/* ICON */}

                  <div
                    className={`timeline-icon ${getEventClass(
                      event.type
                    )}`}
                  >
                    {event.icon}
                  </div>


                  {/* CONTENT */}

                  <div className="timeline-card">

                    <div className="timeline-card-header">

                      <div>

                        <span className="timeline-date">
                          📅 {event.date}
                          {" · "}
                          {event.time}
                        </span>

                        <h2>
                          {event.title}
                        </h2>

                      </div>


                      <span
                        className={`timeline-type ${getEventClass(
                          event.type
                        )}`}
                      >
                        {event.type}
                      </span>

                    </div>


                    <p>
                      {event.description}
                    </p>


                    {event.amount && (

                      <strong className="timeline-amount">
                        ₹
                        {event.amount.toLocaleString()}
                      </strong>

                    )}


                    <button
                      className="timeline-delete"
                      onClick={() =>
                        deleteEvent(event)
                      }
                    >
                      🗑️
                    </button>

                  </div>

                </article>

              )
            )}

          </div>

        )}

      </section>


      {/* =========================================
          STORY CTA
      ========================================= */}

      <section className="timeline-story">

        <div>

          <span>
            YOUR COMPLETE STORY
          </span>

          <h2>
            From the first plan
            <br />
            to the last memory. ✨
          </h2>

          <p>
            TripTales turns your journey
            into a story you can revisit
            anytime.
          </p>

        </div>


        <div className="timeline-story-icon">
          ✈️
        </div>

      </section>

    </main>
  );
}

export default Timeline;
import { useState } from "react";


function Timeline() {

  const [events, setEvents] = useState([
    {
      id: 1,
      date: "2026-10-12",
      time: "10:00 AM",
      type: "itinerary",
      icon: "🗺️",
      title: "Arrived in Ooty",
      description:
        "Started the Ooty adventure and checked into the hotel."
    },

    {
      id: 2,
      date: "2026-10-12",
      time: "05:30 PM",
      type: "memory",
      icon: "📸",
      title: "Beautiful Mountain View",
      description:
        "Captured the first beautiful view of the mountains."
    },

    {
      id: 3,
      date: "2026-10-13",
      time: "08:30 AM",
      type: "journal",
      icon: "📝",
      title: "A Peaceful Morning",
      description:
        "Woke up early and enjoyed the peaceful weather."
    },

    {
      id: 4,
      date: "2026-10-13",
      time: "01:00 PM",
      type: "expense",
      icon: "💰",
      title: "Lunch at Local Restaurant",
      description:
        "Tried some delicious local food.",
      amount: 450
    },

    {
      id: 5,
      date: "2026-10-14",
      time: "10:00 AM",
      type: "itinerary",
      icon: "🏔️",
      title: "Explore the Hills",
      description:
        "Spent the day exploring the beautiful hills."
    }
  ]);


  const [filter, setFilter] = useState("all");


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

  const deleteEvent = (eventId) => {

    setEvents(
      events.filter(
        (event) =>
          event.id !== eventId
      )
    );
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
                        deleteEvent(
                          event.id
                        )
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
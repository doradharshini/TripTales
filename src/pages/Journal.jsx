import { useState } from "react";

function Journal() {

  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "A Peaceful Morning",
      date: "2026-10-13",
      location: "Ooty",
      mood: "😊 Happy",
      description:
        "Woke up early and went for a peaceful morning walk. The weather was cool and the mountains looked beautiful."
    },
    {
      id: 2,
      title: "Exploring the Hills",
      date: "2026-10-14",
      location: "Ooty",
      mood: "🤩 Excited",
      description:
        "Spent the day exploring the beautiful hills and trying some local food. It was one of the best moments of the trip."
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const [journal, setJournal] = useState({
    title: "",
    date: "",
    location: "",
    mood: "😊 Happy",
    description: ""
  });


  /*
   * This function runs whenever
   * the user changes an input.
   */

  const handleChange = (event) => {

    const { name, value } = event.target;

    setJournal({
      ...journal,
      [name]: value
    });
  };


  /*
   * This function runs when
   * the journal form is submitted.
   */

  const handleSubmit = (event) => {

    event.preventDefault();

    if (
      !journal.title ||
      !journal.date ||
      !journal.location ||
      !journal.description
    ) {
      alert("Please fill all required fields.");

      return;
    }


    const newEntry = {
      id: Date.now(),
      ...journal
    };


    setEntries([
      newEntry,
      ...entries
    ]);


    setJournal({
      title: "",
      date: "",
      location: "",
      mood: "😊 Happy",
      description: ""
    });


    setShowForm(false);
  };


  /*
   * Delete a journal entry.
   */

  const deleteEntry = (entryId) => {

    setEntries(
      entries.filter(
        (entry) => entry.id !== entryId
      )
    );
  };


  return (

    <main className="journal-page">

      {/* =========================================
          HEADER
      ========================================= */}

      <section className="journal-header">

        <div>

          <span>YOUR TRAVEL DIARY</span>

          <h1>
            Travel Journal 📝
          </h1>

          <p>
            Write down the moments you never
            want to forget.
          </p>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setShowForm(!showForm)
          }
        >
          {showForm
            ? "✕ Close"
            : "+ New Entry"}
        </button>

      </section>


      {/* =========================================
          JOURNAL FORM
      ========================================= */}

      {showForm && (

        <section className="journal-form-section">

          <div className="journal-form-heading">

            <span>NEW JOURNAL ENTRY</span>

            <h2>
              Tell your story ✨
            </h2>

            <p>
              Capture what happened,
              how you felt and where you were.
            </p>

          </div>


          <form
            className="journal-form"
            onSubmit={handleSubmit}
          >

            <div className="journal-form-grid">


              {/* TITLE */}

              <div className="form-group">

                <label>
                  Title *
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="A beautiful morning"
                  value={journal.title}
                  onChange={handleChange}
                />

              </div>


              {/* LOCATION */}

              <div className="form-group">

                <label>
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Ooty"
                  value={journal.location}
                  onChange={handleChange}
                />

              </div>


              {/* DATE */}

              <div className="form-group">

                <label>
                  Date *
                </label>

                <input
                  type="date"
                  name="date"
                  value={journal.date}
                  onChange={handleChange}
                />

              </div>


              {/* MOOD */}

              <div className="form-group">

                <label>
                  Mood
                </label>

                <select
                  name="mood"
                  value={journal.mood}
                  onChange={handleChange}
                >

                  <option>
                    😊 Happy
                  </option>

                  <option>
                    🤩 Excited
                  </option>

                  <option>
                    😌 Peaceful
                  </option>

                  <option>
                    ❤️ Loved
                  </option>

                  <option>
                    😍 Amazing
                  </option>

                  <option>
                    😴 Tired
                  </option>

                </select>

              </div>


              {/* DESCRIPTION */}

              <div className="form-group journal-description">

                <label>
                  Your story *
                </label>

                <textarea
                  name="description"
                  rows="7"
                  placeholder="What happened today? How did you feel?"
                  value={journal.description}
                  onChange={handleChange}
                />

              </div>

            </div>


            <div className="journal-form-actions">

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>


              <button
                type="submit"
                className="primary-button"
              >
                Save Journal Entry →
              </button>

            </div>

          </form>

        </section>

      )}


      {/* =========================================
          JOURNAL STATS
      ========================================= */}

      <section className="journal-stats">

        <div className="journal-stat-card">

          <span>📝</span>

          <div>

            <strong>
              {entries.length}
            </strong>

            <p>
              Journal Entries
            </p>

          </div>

        </div>


        <div className="journal-stat-card">

          <span>📍</span>

          <div>

            <strong>
              {
                new Set(
                  entries.map(
                    (entry) =>
                      entry.location
                  )
                ).size
              }
            </strong>

            <p>
              Places Written About
            </p>

          </div>

        </div>


        <div className="journal-stat-card">

          <span>❤️</span>

          <div>

            <strong>
              {entries.length}
            </strong>

            <p>
              Stories Created
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          JOURNAL ENTRIES
      ========================================= */}

      <section className="journal-section">

        <div className="journal-section-heading">

          <div>

            <span>YOUR STORIES</span>

            <h2>
              Recent journal entries
            </h2>

          </div>

          <span className="journal-count">
            {entries.length} entries
          </span>

        </div>


        {/* EMPTY STATE */}

        {entries.length === 0 ? (

          <div className="empty-journal">

            <div>
              📝
            </div>

            <h2>
              Your journal is empty
            </h2>

            <p>
              Start writing about your
              travel experiences.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                setShowForm(true)
              }
            >
              + Write Your First Entry
            </button>

          </div>

        ) : (

          /* JOURNAL LIST */

          <div className="journal-list">

            {entries.map((entry) => (

              <article
                className="journal-card"
                key={entry.id}
              >

                <div className="journal-card-date">

                  <span>
                    📅
                  </span>

                  <strong>
                    {entry.date}
                  </strong>

                </div>


                <div className="journal-card-content">

                  <div className="journal-card-top">

                    <div>

                      <span className="journal-location">
                        📍 {entry.location}
                      </span>

                      <h3>
                        {entry.title}
                      </h3>

                    </div>


                    <span className="journal-mood">
                      {entry.mood}
                    </span>

                  </div>


                  <p>
                    {entry.description}
                  </p>


                  <div className="journal-card-footer">

                    <span>
                      📖 Travel Journal
                    </span>

                    <button
                      onClick={() =>
                        deleteEntry(entry.id)
                      }
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* =========================================
          BOTTOM CTA
      ========================================= */}

      <section className="journal-cta">

        <div>

          <span>
            YOUR STORY MATTERS
          </span>

          <h2>
            Don't just visit places.
            <br />
            Remember how they felt. ✨
          </h2>

        </div>

        <div className="journal-cta-icon">
          📖
        </div>

      </section>

    </main>
  );
}

export default Journal;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createMemory,
  deleteMemory,
  getMemories,
} from "../services/tripApi";

function MemoryGram() {
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [newMemory, setNewMemory] = useState({
    image: "",
    title: "",
    location: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    const loadMemories = async () => {
      try {
        setError("");
        setMemories(await getMemories());
      } catch (loadError) {
        console.error("Failed to load memories:", loadError);
        setError("Unable to load memories. Please start the backend.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMemories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewMemory({
      ...newMemory,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setNewMemory((currentMemory) => ({
        ...currentMemory,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !newMemory.image ||
      !newMemory.title ||
      !newMemory.location ||
      !newMemory.date
    ) {
      alert(
        "Please add a photo, title, location and date."
      );

      return;
    }

    try {
      const savedMemory = await createMemory(newMemory);
      setMemories((currentMemories) => [savedMemory, ...currentMemories]);
      setNewMemory({
        image: "",
        title: "",
        location: "",
        date: "",
        description: "",
      });
      setShowForm(false);
      setError("");
    } catch (saveError) {
      console.error("Failed to save memory:", saveError);
      setError("Unable to save this memory. Please try again.");
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    try {
      await deleteMemory(memoryId);
      setMemories((currentMemories) =>
        currentMemories.filter((memory) => memory.id !== memoryId)
      );
    } catch (deleteError) {
      console.error("Failed to delete memory:", deleteError);
      setError("Unable to delete this memory. Please try again.");
    }
  };

  return (
    <main className="memorygram-page">

      {/* HEADER */}

      <section className="memorygram-header">

        <div>

          <span>YOUR TRAVEL STORIES</span>

          <h1>
            Memory<span>Gram</span> 📸
          </h1>

          <p>
            Turn your travel moments into
            beautiful memories.
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
            : "+ Add Memory"}
        </button>

      </section>


      {/* ADD MEMORY FORM */}

      {showForm && (

        <section className="memory-form-section">

          <div className="memory-form-header">

            <div>
              <span>NEW MEMORY</span>

              <h2>
                Capture the moment ✨
              </h2>

              <p>
                Add a photo and tell the story
                behind it.
              </p>
            </div>

          </div>


          <form
            className="memory-form"
            onSubmit={handleSubmit}
          >

            {/* PHOTO */}

            <div className="memory-upload">

              {newMemory.image ? (

                <div className="memory-preview">

                  <img
                    src={newMemory.image}
                    alt="Memory preview"
                  />

                  <label className="change-photo">
                    Change photo

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>

                </div>

              ) : (

                <label className="upload-box">

                  <div>
                    📸
                  </div>

                  <strong>
                    Add your photo
                  </strong>

                  <span>
                    Click to choose an image
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                </label>

              )}

            </div>


            {/* DETAILS */}

            <div className="memory-fields">

              <div className="form-group">

                <label>
                  Memory title *
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Sunset at the hills"
                  value={newMemory.title}
                  onChange={handleChange}
                />

              </div>


              <div className="memory-two-column">

                <div className="form-group">

                  <label>
                    Location *
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="Ooty"
                    value={newMemory.location}
                    onChange={handleChange}
                  />

                </div>


                <div className="form-group">

                  <label>
                    Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={newMemory.date}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Your story
                </label>

                <textarea
                  name="description"
                  rows="5"
                  placeholder="What happened in this moment?"
                  value={newMemory.description}
                  onChange={handleChange}
                />

              </div>


              <button
                type="submit"
                className="primary-button save-memory-button"
              >
                📸 Save Memory
              </button>

            </div>

          </form>

        </section>

      )}


      {/* MEMORY COUNT */}

      <section className="memory-stats">

        {isLoading && <p>Loading memories...</p>}

        {error && <p className="form-error">{error}</p>}

        <div className="memory-stat">

          <span>📸</span>

          <div>
            <strong>
              {memories.length}
            </strong>

            <p>
              Memories
            </p>
          </div>

        </div>


        <div className="memory-stat">

          <span>📍</span>

          <div>
            <strong>
              {
                new Set(
                  memories.map(
                    (memory) =>
                      memory.location
                  )
                ).size
              }
            </strong>

            <p>
              Places
            </p>
          </div>

        </div>


        <div className="memory-stat">

          <span>❤️</span>

          <div>
            <strong>
              Travel
            </strong>

            <p>
              Stories
            </p>
          </div>

        </div>

      </section>


      {/* MEMORIES */}

      <section className="memories-section">

        <div className="memory-section-heading">

          <div>

            <span>YOUR COLLECTION</span>

            <h2>
              Recent memories
            </h2>

          </div>

          <span className="memory-count">
            {memories.length} memories
          </span>

        </div>


        {memories.length === 0 ? (

          <div className="empty-memories">

            <div>
              📸
            </div>

            <h2>
              Your story starts here
            </h2>

            <p>
              Add your first travel memory
              and make it unforgettable.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                setShowForm(true)
              }
            >
              + Add First Memory
            </button>

          </div>

        ) : (

          <div className="memory-grid">

            {memories.map((memory) => (

              <article
                className="memory-card"
                key={memory.id}
              >

                <div className="memory-image">

                  <img
                    src={memory.image}
                    alt={memory.title}
                  />

                  <div className="memory-location">
                    📍 {memory.location}
                  </div>

                  <button
                    className="delete-memory"
                    onClick={() => handleDeleteMemory(memory.id)}
                  >
                    🗑️
                  </button>

                </div>


                <div className="memory-content">

                  <div className="memory-date">
                    📅 {memory.date}
                  </div>

                  <h3>
                    {memory.title}
                  </h3>

                  <p>
                    {memory.description ||
                      "A beautiful moment from the journey."}
                  </p>

                  <div className="memory-footer">

                    <span>
                      📍 {memory.location}
                    </span>

                    <span>
                      ✨ Memory
                    </span>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>


      {/* CTA */}

      <section className="memory-cta">

        <div>

          <span>
            YOUR JOURNEY
          </span>

          <h2>
            Every trip deserves
            <br />
            a story. ✨
          </h2>

          <p>
            Keep collecting moments
            you'll want to remember forever.
          </p>

        </div>

        <Link
          to="/trips"
          className="memory-cta-button"
        >
          View My Trips →
        </Link>

      </section>

    </main>
  );
}

export default MemoryGram;
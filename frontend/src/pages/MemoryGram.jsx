import { useEffect, useState } from "react";
import {
  createMemory,
  deleteMemory,
  getMemories,
} from "../services/tripApi";
import "./MemoryGram.css";

const emptyMemory = { image: "", title: "", location: "", date: "", description: "" };

function MemoryGram() {
  const [memories, setMemories] = useState([]);
  const [newMemory, setNewMemory] = useState(emptyMemory);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMemories = async () => {
      try {
        setMemories(await getMemories());
      } catch (loadError) {
        console.error("Failed to load memories:", loadError);
        setError("Unable to load memories. Please start the backend.");
      } finally {
        setIsLoading(false);
      }
    };
    void loadMemories();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMemory((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setNewMemory((current) => ({ ...current, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMemory.image || !newMemory.title || !newMemory.location || !newMemory.date) {
      setError("Please add a photo, title, location and date.");
      return;
    }
    try {
      const savedMemory = await createMemory(newMemory);
      setMemories((current) => [savedMemory, ...current]);
      setNewMemory(emptyMemory);
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
      setMemories((current) => current.filter((memory) => memory.id !== memoryId));
    } catch (deleteError) {
      console.error("Failed to delete memory:", deleteError);
      setError("Unable to delete this memory. Please try again.");
    }
  };

  return (
    <main className="memorygram-page">
      <header className="memorygram-header"><div><span>YOUR TRAVEL STORIES</span><h1>MemoryGram</h1><p>Your journey, captured in moments.</p></div><button className="primary-button" type="button" onClick={() => setShowForm((current) => !current)}>{showForm ? "Close" : "+ Add Memory"}</button></header>
      {error && <p className="status-message">{error}</p>}

      {showForm && <section className="memory-form-section"><div className="memory-form-header"><span>NEW MEMORY</span><h2>Capture the moment</h2><p>Add a photo and tell the story behind it.</p></div><form className="memory-form" onSubmit={handleSubmit}>
        <div className="memory-upload">{newMemory.image ? <div className="memory-preview"><img src={newMemory.image} alt="Memory preview" /><label className="change-photo" htmlFor="memory-file">Change photo<input id="memory-file" type="file" accept="image/*" onChange={handleImageChange} /></label></div> : <label className="upload-box" htmlFor="memory-file"><strong>＋ Add your photo</strong><span>Choose an image from your device</span><input id="memory-file" type="file" accept="image/*" onChange={handleImageChange} /></label>}</div>
        <div className="memory-fields"><div className="form-group"><label htmlFor="memory-title">Memory title *</label><input id="memory-title" name="title" value={newMemory.title} onChange={handleChange} placeholder="Sunset at the hills" /></div><div className="memory-two-column"><div className="form-group"><label htmlFor="memory-location">Location *</label><input id="memory-location" name="location" value={newMemory.location} onChange={handleChange} placeholder="Ooty" /></div><div className="form-group"><label htmlFor="memory-date">Date *</label><input id="memory-date" type="date" name="date" value={newMemory.date} onChange={handleChange} /></div></div><div className="form-group"><label htmlFor="memory-description">Your story</label><textarea id="memory-description" name="description" rows="5" value={newMemory.description} onChange={handleChange} placeholder="What happened in this moment?" /></div><button className="primary-button" type="submit">Save Memory</button></div>
      </form></section>}

      {isLoading ? <p className="status-message">Loading your memories...</p> : <section className="memories-section"><div className="memory-section-heading"><div><span>YOUR COLLECTION</span><h2>Recent memories</h2></div><span>{memories.length} memories</span></div>{memories.length === 0 ? <p className="status-message">Your story starts here. Add your first travel memory.</p> : <div className="memory-grid">{memories.map((memory) => <article className="memory-card" key={memory.id}><div className="memory-image"><img src={memory.image} alt={memory.title} /><span className="memory-location">📍 {memory.location}</span><button className="delete-memory" type="button" onClick={() => handleDeleteMemory(memory.id)} aria-label={`Delete ${memory.title}`}>×</button></div><div className="memory-content"><span className="memory-date">{memory.date}</span><h3>{memory.title}</h3><p>{memory.description || "A beautiful moment from the journey."}</p><div className="memory-footer"><span>{memory.location}</span><span>Memory</span></div></div></article>)}</div>}</section>}
    </main>
  );
}

export default MemoryGram;
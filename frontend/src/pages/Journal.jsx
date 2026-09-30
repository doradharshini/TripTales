import { useEffect, useState } from "react";
import {
  createJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
} from "../services/tripApi";
import "./Journal.css";

const emptyEntry = { title: "", date: "", location: "", mood: "😊 Happy", description: "" };
const journalImages = [
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
];

function Journal() {
  const [entries, setEntries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [journal, setJournal] = useState(emptyEntry);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setEntries(await getJournalEntries());
      } catch (loadError) {
        console.error("Failed to load journal entries:", loadError);
        setError("Unable to load journal entries. Please start the backend.");
      } finally {
        setIsLoading(false);
      }
    };
    void loadEntries();
  }, []);

  const selectedEntry = entries.find((entry) => entry.id === selectedId) || entries[0];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJournal((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!journal.title || !journal.date || !journal.location || !journal.description) {
      setError("Please fill in the title, date, location and story.");
      return;
    }
    try {
      const savedEntry = await createJournalEntry(journal);
      setEntries((current) => [savedEntry, ...current]);
      setSelectedId(savedEntry.id);
      setJournal(emptyEntry);
      setShowForm(false);
      setError("");
    } catch (saveError) {
      console.error("Failed to save journal entry:", saveError);
      setError("Unable to save this entry. Please try again.");
    }
  };

  const deleteEntry = async (entryId) => {
    try {
      await deleteJournalEntry(entryId);
      setEntries((current) => current.filter((entry) => entry.id !== entryId));
      setSelectedId(null);
    } catch (deleteError) {
      console.error("Failed to delete journal entry:", deleteError);
      setError("Unable to delete this entry. Please try again.");
    }
  };

  return (
    <main className="journal-page">
      <header className="journal-header">
        <div><span>YOUR TRAVEL DIARY</span><h1>Travel Journal</h1><p>Write down the moments you never want to forget.</p></div>
        <button className="primary-button" type="button" onClick={() => setShowForm((current) => !current)}>{showForm ? "Close" : "+ New Entry"}</button>
      </header>

      {error && <p className="status-message">{error}</p>}
      {showForm && <section className="journal-form-section"><div className="journal-form-heading"><span>NEW JOURNAL ENTRY</span><h2>Tell your story</h2><p>Capture what happened, how you felt and where you were.</p></div><form onSubmit={handleSubmit}><div className="journal-form-grid">
        <div className="form-group"><label htmlFor="journal-title">Title *</label><input id="journal-title" name="title" value={journal.title} onChange={handleChange} placeholder="A beautiful morning" /></div>
        <div className="form-group"><label htmlFor="journal-location">Location *</label><input id="journal-location" name="location" value={journal.location} onChange={handleChange} placeholder="Ooty" /></div>
        <div className="form-group"><label htmlFor="journal-date">Date *</label><input id="journal-date" type="date" name="date" value={journal.date} onChange={handleChange} /></div>
        <div className="form-group"><label htmlFor="journal-mood">Mood</label><select id="journal-mood" name="mood" value={journal.mood} onChange={handleChange}><option>😊 Happy</option><option>🤩 Excited</option><option>😌 Peaceful</option><option>❤️ Loved</option><option>😴 Tired</option></select></div>
        <div className="form-group journal-description"><label htmlFor="journal-description">Your story *</label><textarea id="journal-description" name="description" rows="5" value={journal.description} onChange={handleChange} placeholder="What happened today?" /></div>
      </div><div className="journal-form-actions"><button className="secondary-button" type="button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" type="submit">Save Journal Entry</button></div></form></section>}

      {isLoading ? <p className="status-message">Loading your journal...</p> : <section className="journal-workspace">
        <div className="journal-list-panel"><div className="journal-section-heading"><div><span>YOUR STORIES</span><h2>Recent entries</h2></div><span>{entries.length} entries</span></div>
          {entries.length === 0 ? <p className="status-message">Your journal is empty. Start writing your first entry.</p> : <div className="journal-list">{entries.map((entry, index) => <button className={`journal-card ${entry.id === selectedId ? "journal-card--active" : ""}`} type="button" key={entry.id} onClick={() => setSelectedId(entry.id)}><img className="journal-card__image" src={journalImages[index % journalImages.length]} alt="" /><span className="journal-card__content"><strong>{entry.title}</strong><small>{entry.date} · {entry.location}</small></span></button>)}</div>}
        </div>
        <article className="journal-detail-panel">{selectedEntry ? <><img className="journal-detail-panel__image" src={journalImages[entries.indexOf(selectedEntry) % journalImages.length]} alt="Travel journal landscape" /><div className="journal-detail-panel__body"><span className="journal-detail-panel__meta">{selectedEntry.date} · {selectedEntry.location}</span><h2>{selectedEntry.title}</h2><p className="journal-detail-panel__mood">{selectedEntry.mood}</p><p>{selectedEntry.description}</p><button className="journal-delete" type="button" onClick={() => deleteEntry(selectedEntry.id)}>Delete entry</button></div></> : <p className="status-message">Select a journal entry to read its story.</p>}</article>
      </section>}
    </main>
  );
}

export default Journal;
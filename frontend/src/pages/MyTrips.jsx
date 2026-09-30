import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getMemories, getTrips } from "../services/tripApi";
import "./MyTrips.css";

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
];

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [memoryCount, setMemoryCount] = useState(0);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const [tripData, memories] = await Promise.all([getTrips(), getMemories()]);
        setTrips(tripData);
        setMemoryCount(memories.length);
      } catch (loadError) {
        console.error("Failed to load trips:", loadError);
        setError("Unable to load your trips. Please make sure the backend is running.");
      } finally {
        setIsLoading(false);
      }
    };
    void loadTrips();
  }, []);

  const filteredTrips = useMemo(() => trips.filter((trip) => {
    const matchesFilter = filter === "All" || trip.status?.toLowerCase() === filter.toLowerCase();
    const query = search.trim().toLowerCase();
    return matchesFilter && (!query || `${trip.tripName} ${trip.destination}`.toLowerCase().includes(query));
  }), [filter, search, trips]);

  const destinations = new Set(trips.map((trip) => trip.destination)).size;

  return (
    <main className="my-trips-page">
      <header className="my-trips-page__header">
        <div><span className="my-trips-page__eyebrow">YOUR JOURNEYS</span><h1>My Trips</h1><p>All your adventures, planned and remembered.</p></div>
        <Link className="my-trips-page__create" to="/create-trip">+ Create Trip</Link>
      </header>

      <section className="my-trips-stats">
        <div className="my-trips-stat"><strong>{trips.length}</strong><span>Total trips</span></div>
        <div className="my-trips-stat"><strong>{destinations}</strong><span>Destinations</span></div>
        <div className="my-trips-stat"><strong>{memoryCount}</strong><span>Memories</span></div>
        <div className="my-trips-stat"><strong>{trips.filter((trip) => trip.status === "Upcoming").length}</strong><span>Upcoming</span></div>
      </section>

      <section className="my-trips-toolbar">
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="⌕  Search trips or destinations..." aria-label="Search trips" />
        <div className="my-trips-filter">
          {["All", "Upcoming", "Ongoing", "Completed"].map((option) => <button className={filter === option ? "active" : ""} key={option} onClick={() => setFilter(option)} type="button">{option}</button>)}
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter trips">
          <option>All</option><option>Upcoming</option><option>Ongoing</option><option>Completed</option>
        </select>
      </section>

      {isLoading && <p className="status-message">Loading your trips...</p>}
      {!isLoading && error && <p className="status-message">{error}</p>}
      {!isLoading && !error && filteredTrips.length === 0 && <div className="status-message"><p>No trips match this view.</p><Link className="my-trips-page__create" to="/create-trip">Create a Trip</Link></div>}
      {!isLoading && !error && filteredTrips.length > 0 && <section className="my-trips-grid">
        {filteredTrips.map((trip, index) => <article className="my-trips-card" key={trip.id}>
          <img className="my-trips-card__image" src={images[index % images.length]} alt={trip.destination} />
          <div className="my-trips-card__body"><h2>{trip.tripName}</h2><p>📍 {trip.destination}</p><p>📅 {trip.startDate} → {trip.endDate}</p><div className="my-trips-card__footer"><span className="my-trips-card__status">{trip.status}</span><Link className="my-trips-card__link" to={`/trip/${trip.id}`}>View trip →</Link></div></div>
        </article>)}
      </section>}
    </main>
  );
}

export default MyTrips;
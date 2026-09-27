import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTrips } from "../services/tripApi";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrips = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getTrips();

        setTrips(data);
      } catch (error) {
        console.error("Failed to load trips:", error);

        setError(
          "Unable to load your trips. Please make sure the backend is running."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTrips();
  }, []);

  const uniqueDestinations = new Set(
    trips.map((trip) => trip.destination)
  ).size;

  return (
    <main className="page-container">
      <div className="page-header">
        <div>
          <span>YOUR JOURNEYS</span>

          <h1>My Trips</h1>

          <p>
            All your adventures, planned and remembered.
          </p>
        </div>

        <Link
          to="/create-trip"
          className="primary-button"
        >
          + Create Trip
        </Link>
      </div>

      <div className="trip-stats">
        <div className="stat-card">
          <span>🧳</span>
          <strong>{trips.length}</strong>
          <p>Total Trips</p>
        </div>

        <div className="stat-card">
          <span>📍</span>
          <strong>{uniqueDestinations}</strong>
          <p>Destinations</p>
        </div>

        <div className="stat-card">
          <span>📸</span>
          <strong>0</strong>
          <p>Memories</p>
        </div>

        <div className="stat-card">
          <span>🌍</span>
          <strong>{trips.length}</strong>
          <p>Journeys</p>
        </div>
      </div>

      <section className="my-trips-section">
        <div className="section-title-row">
          <h2>Your journeys</h2>

          <select>
            <option>All Trips</option>
            <option>Upcoming</option>
            <option>Completed</option>
          </select>
        </div>

        {isLoading && (
          <div className="empty-trips">
            <div>⏳</div>

            <h2>Loading your trips...</h2>

            <p>
              We're getting your adventures from the database.
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="empty-trips">
            <div>⚠️</div>

            <h2>Something went wrong</h2>

            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && trips.length === 0 && (
          <div className="empty-trips">
            <div>🧳</div>

            <h2>No trips yet</h2>

            <p>
              Your next adventure is waiting to be planned.
            </p>

            <Link
              to="/create-trip"
              className="primary-button"
            >
              Create Your First Trip
            </Link>
          </div>
        )}

        {!isLoading && !error && trips.length > 0 && (
          <div className="my-trip-grid">
            {trips.map((trip) => (
              <article
                className="my-trip-card"
                key={trip.id}
              >
                <div className="trip-image">
                  <span>🏔️</span>

                  <div className="status upcoming">
                    {trip.status}
                  </div>
                </div>

                <div className="my-trip-content">
                  <h3>{trip.tripName}</h3>

                  <p>
                    📍 {trip.destination}
                  </p>

                  <p>
                    📅 {trip.startDate}
                    {" → "}
                    {trip.endDate}
                  </p>

                  <div className="trip-details">
                    <span>
                      💰 ₹{trip.budget || "0"}
                    </span>
                  </div>

                  <Link
                    to={`/trip/${trip.id}`}
                    className="view-trip"
                  >
                    View Trip →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyTrips;
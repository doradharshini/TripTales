import { Link } from "react-router-dom";

function MyTrips() {

  const trips =
    JSON.parse(localStorage.getItem("trips")) || [];


  return (

    <main className="page-container">


      {/* Header */}

      <div className="page-header">

        <div>

          <span>
            YOUR JOURNEYS
          </span>

          <h1>
            My Trips
          </h1>

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



      {/* Statistics */}

      <div className="trip-stats">

        <div className="stat-card">

          <span>
            🧳
          </span>

          <strong>
            {trips.length}
          </strong>

          <p>
            Total Trips
          </p>

        </div>


        <div className="stat-card">

          <span>
            📍
          </span>

          <strong>
            {trips.length}
          </strong>

          <p>
            Destinations
          </p>

        </div>


        <div className="stat-card">

          <span>
            📸
          </span>

          <strong>
            0
          </strong>

          <p>
            Memories
          </p>

        </div>


        <div className="stat-card">

          <span>
            🌍
          </span>

          <strong>
            {trips.length}
          </strong>

          <p>
            Journeys
          </p>

        </div>

      </div>



      {/* Trips */}

      <section className="my-trips-section">


        <div className="section-title-row">

          <h2>
            Your journeys
          </h2>

          <select>

            <option>
              All Trips
            </option>

            <option>
              Upcoming
            </option>

            <option>
              Completed
            </option>

          </select>

        </div>



        {trips.length === 0 ? (

          /* Empty state */

          <div className="empty-trips">

            <div>
              🧳
            </div>

            <h2>
              No trips yet
            </h2>

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

        ) : (

          /* Trip cards */

          <div className="my-trip-grid">

            {trips.map((trip) => (

              <article
                className="my-trip-card"
                key={trip.id}
              >


                <div className="trip-image">

                  <span>
                    🏔️
                  </span>

                  <div className="status upcoming">
                    {trip.status}
                  </div>

                </div>



                <div className="my-trip-content">

                  <h3>
                    {trip.tripName}
                  </h3>


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
import { Link } from "react-router-dom";


function Home() {

  const destinations = [
    {
      name: "Goa",
      description: "Beaches · Food · Adventure",
      duration: "3 Days",
      budget: "₹8,000",
      rating: "4.8",
      className: "goa",
    },

    {
      name: "Ooty",
      description: "Nature · Tea · Mountains",
      duration: "3 Days",
      budget: "₹6,500",
      rating: "4.7",
      className: "ooty",
    },

    {
      name: "Varkala",
      description: "Beach · Sunset · Cafés",
      duration: "2 Days",
      budget: "₹5,000",
      rating: "4.9",
      className: "varkala",
    },

    {
      name: "Kerala",
      description: "Backwaters · Nature · Culture",
      duration: "4 Days",
      budget: "₹10,000",
      rating: "4.8",
      className: "kerala",
    },
  ];


  return (

    <main className="home">

      <section className="hero">

        <div className="hero-content">

          <div className="hero-badge">
            ✨ YOUR NEXT ADVENTURE STARTS HERE
          </div>

          <h1>
            Where will your
            <span> story </span>
            take you?
          </h1>

          <p>
            Plan unforgettable trips, discover beautiful places,
            track your budget and keep every memory in one place.
          </p>


          <div className="search-box">

            <span>🔍</span>

            <input
              type="text"
              placeholder="Search a destination..."
            />

            <button>
              Explore
            </button>

          </div>


          <div className="popular">

            <span>
              Popular:
            </span>

            <button>Goa</button>
            <button>Ooty</button>
            <button>Kerala</button>
            <button>Bali</button>

          </div>

        </div>


        <div className="hero-art">

          <div className="floating-card card-one">

            📍

            <div>

              <strong>
                Ooty
              </strong>

              <small>
                Nature escape
              </small>

            </div>

          </div>


          <div className="travel-circle">
            🌴
          </div>


          <div className="floating-card card-two">

            ⭐ 4.9

            <small>
              Trip rating
            </small>

          </div>

        </div>

      </section>


      <section className="trending">

        <div className="section-heading">

          <div>

            <span>
              EXPLORE
            </span>

            <h2>
              Trending Getaways
            </h2>

          </div>

          <button className="view-all">
            View all →
          </button>

        </div>


        <div className="trip-grid">

          {destinations.map((destination) => (

            <div
              className={`trip-card ${destination.className}`}
              key={destination.name}
            >

              <div className="trip-overlay">

                <button className="heart">
                  ♡
                </button>

                <div className="trip-info">

                  <div className="rating">
                    ⭐ {destination.rating}
                  </div>

                  <h3>
                    {destination.name}
                  </h3>

                  <p>
                    {destination.description}
                  </p>

                  <strong>
                    {destination.duration}
                    {" · "}
                    {destination.budget}
                  </strong>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      <section className="features">

        <div className="section-heading centered">

          <span>
            YOUR TRAVEL STORY
          </span>

          <h2>
            Everything about your trip,
            <br />
            in one place.
          </h2>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🗺️
            </div>

            <h3>
              Plan
            </h3>

            <p>
              Create itineraries, save places and
              organize your entire journey.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <h3>
              Track
            </h3>

            <p>
              Keep your travel expenses organized
              and know exactly where your money goes.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📸
            </div>

            <h3>
              Remember
            </h3>

            <p>
              Turn your photos, places and experiences
              into beautiful travel memories.
            </p>

          </div>

        </div>

      </section>


      <section className="create-trip">

        <div>

          <span>
            ✈️ READY TO GO?
          </span>

          <h2>
            Your next story is
            <br />
            waiting to be written.
          </h2>

          <p>
            Start planning your next adventure with TripTales.
          </p>

        </div>


        <Link
          to="/create-trip"
          className="create-trip-button"
        >
          + Create a Trip
        </Link>

      </section>

    </main>
  );
}


export default Home;
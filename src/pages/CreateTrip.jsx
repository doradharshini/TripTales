import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTrip() {

  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    tripName: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
  });


  const handleChange = (event) => {

    const { name, value } = event.target;

    setTrip({
      ...trip,
      [name]: value,
    });

  };


  const handleSubmit = (event) => {

    event.preventDefault();

    if (
      !trip.tripName ||
      !trip.destination ||
      !trip.startDate ||
      !trip.endDate
    ) {
      alert("Please fill all required fields.");
      return;
    }


    const existingTrips =
      JSON.parse(localStorage.getItem("trips")) || [];


    const newTrip = {
      id: Date.now(),
      ...trip,
      status: "Upcoming",
      createdAt: new Date().toISOString(),
    };


    const updatedTrips = [
      ...existingTrips,
      newTrip,
    ];


    localStorage.setItem(
      "trips",
      JSON.stringify(updatedTrips)
    );


    alert("Trip created successfully! ✈️");

    navigate("/trips");

  };


  return (

    <main className="create-page">


      {/* Header */}

      <div className="create-header">

        <span>
          NEW ADVENTURE
        </span>

        <h1>
          Create your trip
        </h1>

        <p>
          Every great journey starts with a plan.
        </p>

      </div>



      {/* Form */}

      <form
        className="trip-form"
        onSubmit={handleSubmit}
      >


        <div className="form-section">

          <h2>
            ✈️ Trip details
          </h2>

          <p>
            Tell us about your next adventure.
          </p>

        </div>



        <div className="form-grid">


          {/* Trip Name */}

          <div className="form-group">

            <label>
              Trip name *
            </label>

            <input
              type="text"
              name="tripName"
              placeholder="My Ooty Adventure"
              value={trip.tripName}
              onChange={handleChange}
            />

          </div>



          {/* Destination */}

          <div className="form-group">

            <label>
              Destination *
            </label>

            <input
              type="text"
              name="destination"
              placeholder="Where are you going?"
              value={trip.destination}
              onChange={handleChange}
            />

          </div>



          {/* Start Date */}

          <div className="form-group">

            <label>
              Start date *
            </label>

            <input
              type="date"
              name="startDate"
              value={trip.startDate}
              onChange={handleChange}
            />

          </div>



          {/* End Date */}

          <div className="form-group">

            <label>
              End date *
            </label>

            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              onChange={handleChange}
            />

          </div>



          {/* Budget */}

          <div className="form-group">

            <label>
              Budget
            </label>

            <input
              type="number"
              name="budget"
              placeholder="10000"
              value={trip.budget}
              onChange={handleChange}
            />

          </div>



          {/* Description */}

          <div className="form-group full">

            <label>
              Trip description
            </label>

            <textarea
              name="description"
              rows="5"
              placeholder="What makes this trip special?"
              value={trip.description}
              onChange={handleChange}
            />

          </div>

        </div>



        {/* Buttons */}

        <div className="form-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/trips")}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="primary-button"
          >
            Create Trip →
          </button>

        </div>

      </form>

    </main>

  );
}

export default CreateTrip;
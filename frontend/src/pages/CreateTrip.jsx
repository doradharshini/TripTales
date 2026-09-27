import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripApi";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTrip({
      ...trip,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !trip.tripName ||
      !trip.destination ||
      !trip.startDate ||
      !trip.endDate
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (trip.endDate < trip.startDate) {
      setError("End date cannot be before start date.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const tripData = {
        tripName: trip.tripName,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget
          ? Number(trip.budget)
          : null,
        description: trip.description,
      };

      await createTrip(tripData);

      alert("Trip created successfully! ✈️");

      navigate("/trips");
    } catch (error) {
      console.error("Create trip error:", error);

      setError(
        "Unable to create trip. Please make sure the backend is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="create-page">
      <div className="create-header">
        <span>NEW ADVENTURE</span>

        <h1>Create your trip</h1>

        <p>
          Every great journey starts with a plan.
        </p>
      </div>

      <form
        className="trip-form"
        onSubmit={handleSubmit}
      >
        <div className="form-section">
          <h2>✈️ Trip details</h2>

          <p>
            Tell us about your next adventure.
          </p>
        </div>

        <div className="form-grid">

          <div className="form-group">
            <label>Trip name *</label>

            <input
              type="text"
              name="tripName"
              placeholder="My Ooty Adventure"
              value={trip.tripName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Destination *</label>

            <input
              type="text"
              name="destination"
              placeholder="Where are you going?"
              value={trip.destination}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Start date *</label>

            <input
              type="date"
              name="startDate"
              value={trip.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>End date *</label>

            <input
              type="date"
              name="endDate"
              value={trip.endDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Budget</label>

            <input
              type="number"
              name="budget"
              placeholder="10000"
              value={trip.budget}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Trip description</label>

            <textarea
              name="description"
              rows="5"
              placeholder="What makes this trip special?"
              value={trip.description}
              onChange={handleChange}
            />
          </div>

        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <div className="form-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/trips")}
            disabled={isSubmitting}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating..."
              : "Create Trip →"}
          </button>

        </div>
      </form>
    </main>
  );
}

export default CreateTrip;
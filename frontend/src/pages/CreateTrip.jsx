import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrip } from "../services/tripApi";
import "./CreateTrip.css";

const initialTrip = { tripName: "", destination: "", startDate: "", endDate: "", budget: "", description: "" };

function CreateTrip() {
  const navigate = useNavigate();
  const [trip, setTrip] = useState(initialTrip);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTrip((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!trip.tripName || !trip.destination || !trip.startDate || !trip.endDate) {
      setError("Please fill in the trip name, destination and dates.");
      return;
    }
    if (trip.endDate < trip.startDate) {
      setError("End date cannot be before the start date.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");
      await createTrip({ ...trip, budget: trip.budget ? Number(trip.budget) : null });
      void navigate("/trips");
    } catch (submitError) {
      console.error("Create trip error:", submitError);
      setError("Unable to create this trip. Please make sure the backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="create-trip-page">
      <header className="create-trip-page__header"><span className="create-trip-page__eyebrow">NEW ADVENTURE</span><h1>Create a New Trip</h1><p>Every great journey starts with a plan.</p></header>
      <div className="create-trip-layout">
        <form className="create-trip-form" onSubmit={handleSubmit}>
          <div className="create-trip-form__steps"><span className="create-trip-form__step create-trip-form__step--active">1 Basic info</span><span className="create-trip-form__step">2 Dates</span><span className="create-trip-form__step">3 Destination</span><span className="create-trip-form__step">4 Notes</span></div>
          <div className="create-trip-form__section"><h2>Tell us about the journey</h2><p>We will keep everything organized in one place.</p></div>
          <div className="create-trip-form__grid">
            <div className="create-trip-form__field"><label htmlFor="tripName">Trip title *</label><input id="tripName" name="tripName" value={trip.tripName} onChange={handleChange} placeholder="e.g. Manali Adventure" /></div>
            <div className="create-trip-form__field"><label htmlFor="destination">Destination *</label><input id="destination" name="destination" value={trip.destination} onChange={handleChange} placeholder="e.g. Manali, India" /></div>
            <div className="create-trip-form__field"><label htmlFor="startDate">Start date *</label><input id="startDate" type="date" name="startDate" value={trip.startDate} onChange={handleChange} /></div>
            <div className="create-trip-form__field"><label htmlFor="endDate">End date *</label><input id="endDate" type="date" name="endDate" value={trip.endDate} onChange={handleChange} /></div>
            <div className="create-trip-form__field"><label htmlFor="budget">Budget</label><input id="budget" type="number" min="0" name="budget" value={trip.budget} onChange={handleChange} placeholder="10000" /></div>
            <div className="create-trip-form__field create-trip-form__field--full"><label htmlFor="description">Trip description</label><textarea id="description" name="description" rows="5" value={trip.description} onChange={handleChange} placeholder="Tell us about your trip..." /></div>
          </div>
          {error && <p className="create-trip-form__error">{error}</p>}
          <div className="create-trip-form__actions"><button className="create-trip-form__cancel" type="button" onClick={() => navigate("/trips")} disabled={isSubmitting}>Cancel</button><button className="create-trip-form__submit" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Create Trip →"}</button></div>
        </form>

        <aside className="create-trip-preview"><img className="create-trip-preview__image" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=85" alt="Mountain destination preview" /><div className="create-trip-preview__body"><h2>{trip.tripName || "Your next story"}</h2><p>{trip.destination || "A beautiful destination"}</p><p>{trip.startDate || "Start date"} {trip.endDate ? `→ ${trip.endDate}` : "→ End date"}</p><div className="create-trip-preview__note">A new story is waiting to be written.</div></div></aside>
      </div>
    </main>
  );
}

export default CreateTrip;
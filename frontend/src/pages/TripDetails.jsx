import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  getTripById,
  getItineraryItems,
  createItineraryItem,
} from "../services/tripApi";
import "./TripDetails.css";

function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [itinerary, setItinerary] = useState([]);

  const [activeTab, setActiveTab] = useState("overview");

  const [isLoading, setIsLoading] = useState(true);
  const [isItineraryLoading, setIsItineraryLoading] =
    useState(false);

  const [error, setError] = useState("");
  const [itineraryError, setItineraryError] =
    useState("");

  const [showActivityModal, setShowActivityModal] =
    useState(false);

  const [isSavingActivity, setIsSavingActivity] =
    useState(false);

  const [activityForm, setActivityForm] = useState({
    dayNumber: 1,
    title: "",
    location: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  useEffect(() => {
    const loadTrip = async () => {
      try {
        setIsLoading(true);
        setError("");

        const tripData = await getTripById(id);

        setTrip(tripData);
      } catch (error) {
        console.error("Failed to load trip:", error);

        setError(
          "Unable to load this trip. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadTrip();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadItinerary = async () => {
      try {
        setIsItineraryLoading(true);
        setItineraryError("");

        const data = await getItineraryItems(id);

        setItinerary(data);
      } catch (error) {
        console.error(
          "Failed to load itinerary:",
          error
        );

        setItineraryError(
          "Unable to load itinerary."
        );
      } finally {
        setIsItineraryLoading(false);
      }
    };

    void loadItinerary();
  }, [id]);

  const groupedItinerary = useMemo(() => {
    return itinerary.reduce((groups, item) => {
      const day = item.dayNumber;

      if (!groups[day]) {
        groups[day] = [];
      }

      groups[day].push(item);

      return groups;
    }, {});
  }, [itinerary]);

  const handleActivityChange = (event) => {
    const { name, value } = event.target;

    setActivityForm({
      ...activityForm,
      [name]: value,
    });
  };

  const openActivityModal = () => {
    setActivityForm({
      dayNumber: 1,
      title: "",
      location: "",
      startTime: "",
      endTime: "",
      description: "",
    });

    setShowActivityModal(true);
  };

  const closeActivityModal = () => {
    if (isSavingActivity) {
      return;
    }

    setShowActivityModal(false);
  };

  const handleActivitySubmit = async (event) => {
    event.preventDefault();

    if (!activityForm.title.trim()) {
      return;
    }

    try {
      setIsSavingActivity(true);

      const newActivity = {
        dayNumber: Number(activityForm.dayNumber),
        title: activityForm.title.trim(),
        location: activityForm.location.trim(),
        startTime: activityForm.startTime,
        endTime: activityForm.endTime,
        description: activityForm.description.trim(),
      };

      const savedActivity =
        await createItineraryItem(
          id,
          newActivity
        );

      setItinerary((current) => [
        ...current,
        savedActivity,
      ]);

      setShowActivityModal(false);

      setActivityForm({
        dayNumber: 1,
        title: "",
        location: "",
        startTime: "",
        endTime: "",
        description: "",
      });
    } catch (error) {
      console.error(
        "Failed to create activity:",
        error
      );

      setItineraryError(
        "Unable to save activity. Please try again."
      );
    } finally {
      setIsSavingActivity(false);
    }
  };

  if (isLoading) {
    return (
      <main className="trip-details-page">
        <div className="page-state">
          <div className="state-icon">✈️</div>
          <h2>Loading your trip...</h2>
          <p>
            We're getting your adventure ready.
          </p>
        </div>
      </main>
    );
  }

  if (error || !trip) {
    return (
      <main className="trip-details-page">
        <div className="page-state">
          <div className="state-icon">⚠️</div>

          <h2>
            {error || "Trip not found"}
          </h2>

          <Link
            to="/trips"
            className="primary-button"
          >
            ← Back to My Trips
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="trip-details-page">

      {/* HERO */}

      <section className="trip-hero">

        <div className="trip-hero-content">

          <Link
            to="/trips"
            className="trip-back-link"
          >
            ← Back to My Trips
          </Link>

          <div className="trip-hero-main">

            <div>
              <span className="trip-status-badge">
                {trip.status}
              </span>

              <h1>{trip.tripName}</h1>

              <div className="trip-hero-meta">
                <span>
                  📍 {trip.destination}
                </span>

                <span>
                  📅 {trip.startDate}
                  {" → "}
                  {trip.endDate}
                </span>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* CONTENT */}

      <section className="trip-details-container">

        {/* SUMMARY CARDS */}

        <div className="trip-summary-grid">

          <div className="trip-summary-card">
            <div className="summary-icon location">
              📍
            </div>

            <div>
              <span>Destination</span>
              <strong>{trip.destination}</strong>
            </div>
          </div>

          <div className="trip-summary-card">
            <div className="summary-icon calendar">
              📅
            </div>

            <div>
              <span>Start date</span>
              <strong>{trip.startDate}</strong>
            </div>
          </div>

          <div className="trip-summary-card">
            <div className="summary-icon money">
              💰
            </div>

            <div>
              <span>Budget</span>
              <strong>
                ₹{trip.budget || "0"}
              </strong>
            </div>
          </div>

          <div className="trip-summary-card">
            <div className="summary-icon status">
              🧳
            </div>

            <div>
              <span>Status</span>
              <strong>{trip.status}</strong>
            </div>
          </div>

        </div>


        {/* TABS */}

        <div className="trip-tabs">

          <button
            className={
              activeTab === "overview"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("overview")
            }
          >
            <span>📋</span>
            {" "}
            Overview
          </button>

          <button
            className={
              activeTab === "itinerary"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab("itinerary")
            }
          >
            <span>🗺️</span>
            {" "}
            Itinerary

            {itinerary.length > 0 && (
              <em>{itinerary.length}</em>
            )}
          </button>

          <button
            type="button"
            className="trip-tab-disabled"
            disabled
            title="Expenses are not available until an expense API is added"
          >
            <span>💰</span>
            {" "}
            Expenses
          </button>

        </div>


        {/* OVERVIEW */}

        {activeTab === "overview" && (
          <section className="trip-panel">

            <div className="panel-heading">
              <div>
                <span className="panel-label">
                  YOUR JOURNEY
                </span>

                <h2>About this trip</h2>

                <p>
                  Everything you need to know
                  about this adventure.
                </p>
              </div>
            </div>

            <div className="trip-description">

              <div className="description-icon">
                ✨
              </div>

              <div>
                <h3>Trip story</h3>

                <p>
                  {trip.description ||
                    "You haven't added a description for this trip yet."}
                </p>
              </div>

            </div>

            <div className="trip-info-grid">

              <div>
                <span>Trip name</span>
                <strong>{trip.tripName}</strong>
              </div>

              <div>
                <span>Destination</span>
                <strong>{trip.destination}</strong>
              </div>

              <div>
                <span>Start date</span>
                <strong>{trip.startDate}</strong>
              </div>

              <div>
                <span>End date</span>
                <strong>{trip.endDate}</strong>
              </div>

              <div>
                <span>Budget</span>
                <strong>
                  ₹{trip.budget || "0"}
                </strong>
              </div>

              <div>
                <span>Created</span>
                <strong>
                  {trip.createdAt
                    ? new Date(
                        trip.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </strong>
              </div>

            </div>

          </section>
        )}


        {/* ITINERARY */}

        {activeTab === "itinerary" && (
          <section className="trip-panel">

            <div className="panel-heading itinerary-heading">

              <div>
                <span className="panel-label">
                  PLAN YOUR JOURNEY
                </span>

                <h2>Itinerary</h2>

                <p>
                  Build your trip day by day.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={openActivityModal}
              >
                + Add Activity
              </button>

            </div>

            {itineraryError && (
              <div className="inline-error">
                ⚠️ {itineraryError}
              </div>
            )}

            {isItineraryLoading && (
              <div className="empty-itinerary">
                <div>⏳</div>

                <h3>
                  Loading itinerary...
                </h3>

                <p>
                  Getting your planned activities.
                </p>
              </div>
            )}

            {!isItineraryLoading && itinerary.length === 0 && (
              <div className="empty-itinerary">

                <div className="empty-itinerary-icon">
                  🗺️
                </div>

                <h3>
                  Your itinerary is empty
                </h3>

                <p>
                  Start planning your adventure
                  by adding your first activity.
                </p>

                <button
                  className="primary-button"
                  onClick={openActivityModal}
                >
                  + Add Your First Activity
                </button>

              </div>
            )}

            {!isItineraryLoading && itinerary.length > 0 && (
              <div className="itinerary-list">

                {Object.entries(
                  groupedItinerary
                )
                  .sort(
                    ([dayA], [dayB]) =>
                      Number(dayA) -
                      Number(dayB)
                  )
                  .map(
                    ([day, activities]) => (
                      <div
                        className="itinerary-day"
                        key={day}
                      >

                        <div className="day-header">
                          <div className="day-number">
                            {day}
                          </div>

                          <div>
                            <span>
                              DAY {day}
                            </span>

                            <h3>
                              Your adventure
                            </h3>
                          </div>
                        </div>

                        <div className="activity-list">

                          {activities
                            .sort(
                              (a, b) =>
                                (
                                  a.startTime ||
                                  ""
                                ).localeCompare(
                                  b.startTime ||
                                    ""
                                )
                            )
                            .map(
                              (activity) => (
                                <article
                                  className="activity-card"
                                  key={
                                    activity.id
                                  }
                                >

                                  <div className="activity-time">

                                    <strong>
                                      {activity.startTime ||
                                        "--:--"}
                                    </strong>

                                    {activity.endTime && (
                                      <span>
                                        to{" "}
                                        {
                                          activity.endTime
                                        }
                                      </span>
                                    )}

                                  </div>

                                  <div className="activity-line">
                                    <div className="activity-dot" />
                                  </div>

                                  <div className="activity-content">

                                    <h3>
                                      {
                                        activity.title
                                      }
                                    </h3>

                                    {activity.location && (
                                      <span className="activity-location">
                                        📍{" "}
                                        {
                                          activity.location
                                        }
                                      </span>
                                    )}

                                    {activity.description && (
                                      <p>
                                        {
                                          activity.description
                                        }
                                      </p>
                                    )}

                                  </div>

                                </article>
                              )
                            )}

                        </div>

                      </div>
                    )
                  )}

              </div>
            )}

          </section>
        )}


      </section>


      {/* ADD ACTIVITY MODAL */}

      {showActivityModal && (
        <div
          className="modal-backdrop"
        >

          <div
            className="activity-modal"
          >

            <div className="modal-header">

              <div>
                <span className="panel-label">
                  NEW ACTIVITY
                </span>

                <h2>Add to itinerary</h2>

                <p>
                  Add something memorable to your trip.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeActivityModal}
                type="button"
              >
                ×
              </button>

            </div>

            <form
              className="activity-form"
              onSubmit={handleActivitySubmit}
            >

              <div className="activity-form-grid">

                <div className="form-group">
                  <label htmlFor="activity-day">Day *</label>

                  <input
                    id="activity-day"
                    type="number"
                    name="dayNumber"
                    min="1"
                    value={activityForm.dayNumber}
                    onChange={handleActivityChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-title">Activity *</label>

                  <input
                    id="activity-title"
                    type="text"
                    name="title"
                    placeholder="Visit Ooty Lake"
                    value={activityForm.title}
                    onChange={handleActivityChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-location">Location</label>

                  <input
                    id="activity-location"
                    type="text"
                    name="location"
                    placeholder="Ooty Lake"
                    value={activityForm.location}
                    onChange={handleActivityChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-start">Start time</label>

                  <input
                    id="activity-start"
                    type="time"
                    name="startTime"
                    value={activityForm.startTime}
                    onChange={handleActivityChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="activity-end">End time</label>

                  <input
                    id="activity-end"
                    type="time"
                    name="endTime"
                    value={activityForm.endTime}
                    onChange={handleActivityChange}
                  />
                </div>

                <div className="form-group full">
                  <label htmlFor="activity-description">Description</label>

                  <textarea
                    id="activity-description"
                    name="description"
                    rows="4"
                    placeholder="What do you want to do here?"
                    value={activityForm.description}
                    onChange={handleActivityChange}
                  />
                </div>

              </div>

              <div className="modal-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeActivityModal}
                  disabled={isSavingActivity}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={isSavingActivity}
                >
                  {isSavingActivity
                    ? "Saving..."
                    : "Add Activity →"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </main>
  );
}

export default TripDetails;
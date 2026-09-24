import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const trips =
    JSON.parse(localStorage.getItem("trips")) || [];

  const trip = trips.find(
    (item) => String(item.id) === String(id)
  );

  const [activeTab, setActiveTab] = useState("overview");

  const [itinerary, setItinerary] = useState([
    {
      id: 1,
      day: "Day 1",
      title: "Arrival & Explore",
      description:
        "Arrive at the destination and explore nearby places.",
      time: "10:00 AM",
    },
    {
      id: 2,
      day: "Day 2",
      title: "Local Sightseeing",
      description:
        "Visit the major attractions and enjoy local food.",
      time: "9:00 AM",
    },
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      category: "Travel",
      description: "Bus / Train",
      amount: 1500,
    },
    {
      id: 2,
      category: "Stay",
      description: "Hotel",
      amount: 2500,
    },
    {
      id: 3,
      category: "Food",
      description: "Meals",
      amount: 800,
    },
  ]);

  const [newExpense, setNewExpense] = useState({
    category: "Food",
    description: "",
    amount: "",
  });

  if (!trip) {
    return (
      <main className="page-container">
        <div className="empty-trips">
          <div>😕</div>

          <h2>Trip not found</h2>

          <p>
            We couldn't find the trip you're looking for.
          </p>

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

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + Number(expense.amount || 0),
    0
  );

  const remainingBudget =
    Number(trip.budget || 0) - totalExpenses;

  const addExpense = (event) => {
    event.preventDefault();

    if (
      !newExpense.description ||
      !newExpense.amount
    ) {
      alert("Please enter expense details.");
      return;
    }

    const expense = {
      id: Date.now(),
      category: newExpense.category,
      description: newExpense.description,
      amount: Number(newExpense.amount),
    };

    setExpenses([
      ...expenses,
      expense,
    ]);

    setNewExpense({
      category: "Food",
      description: "",
      amount: "",
    });
  };

  const deleteExpense = (expenseId) => {
    setExpenses(
      expenses.filter(
        (expense) => expense.id !== expenseId
      )
    );
  };

  const addItineraryItem = () => {
    const newItem = {
      id: Date.now(),
      day: `Day ${itinerary.length + 1}`,
      title: "New Activity",
      description:
        "Add your activity details here.",
      time: "10:00 AM",
    };

    setItinerary([
      ...itinerary,
      newItem,
    ]);
  };

  return (
    <main className="trip-details-page">

      {/* BACK BUTTON */}

      <div className="trip-back">
        <button
          onClick={() => navigate("/trips")}
        >
          ← Back to My Trips
        </button>
      </div>


      {/* HERO */}

      <section className="trip-details-hero">

        <div className="trip-hero-content">

          <span className="trip-status">
            ✈️ {trip.status}
          </span>

          <h1>{trip.tripName}</h1>

          <p className="trip-destination">
            📍 {trip.destination}
          </p>

          <p className="trip-description">
            {trip.description ||
              "Your travel story begins here."}
          </p>

          <div className="trip-meta">

            <div>
              <span>📅</span>
              <div>
                <small>DATES</small>
                <strong>
                  {trip.startDate}
                  {" → "}
                  {trip.endDate}
                </strong>
              </div>
            </div>

            <div>
              <span>💰</span>
              <div>
                <small>BUDGET</small>
                <strong>
                  ₹{Number(trip.budget || 0).toLocaleString()}
                </strong>
              </div>
            </div>

            <div>
              <span>📍</span>
              <div>
                <small>DESTINATION</small>
                <strong>{trip.destination}</strong>
              </div>
            </div>

          </div>

        </div>

        <div className="trip-hero-art">
          🏔️
        </div>

      </section>


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
          🏠 Overview
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
          🗺️ Itinerary
        </button>

        <button
          className={
            activeTab === "expenses"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("expenses")
          }
        >
          💰 Expenses
        </button>

      </div>


      {/* OVERVIEW */}

      {activeTab === "overview" && (

        <section className="trip-tab-content">

          <div className="overview-grid">

            <div className="overview-card">

              <span>🗺️</span>

              <div>
                <strong>
                  {itinerary.length}
                </strong>

                <p>
                  Planned activities
                </p>
              </div>

            </div>


            <div className="overview-card">

              <span>💰</span>

              <div>
                <strong>
                  ₹{totalExpenses.toLocaleString()}
                </strong>

                <p>
                  Total spent
                </p>
              </div>

            </div>


            <div className="overview-card">

              <span>💵</span>

              <div>
                <strong>
                  ₹
                  {Math.max(
                    remainingBudget,
                    0
                  ).toLocaleString()}
                </strong>

                <p>
                  Budget remaining
                </p>

              </div>

            </div>


            <div className="overview-card">

              <span>📸</span>

              <div>

                <strong>
                  0
                </strong>

                <p>
                  Memories
                </p>

              </div>

            </div>

          </div>


          <div className="trip-overview-section">

            <div>
              <span>YOUR JOURNEY</span>

              <h2>
                {trip.destination}
                {" "}
                awaits ✨
              </h2>

              <p>
                Your trip is ready to become
                a beautiful travel story.
                Start adding places,
                activities, expenses and
                memories as you travel.
              </p>

            </div>

            <div className="overview-illustration">
              🌴
            </div>

          </div>

        </section>

      )}


      {/* ITINERARY */}

      {activeTab === "itinerary" && (

        <section className="trip-tab-content">

          <div className="tab-header">

            <div>
              <span>YOUR PLAN</span>

              <h2>
                Trip itinerary
              </h2>

              <p>
                Plan every important moment
                of your journey.
              </p>
            </div>

            <button
              className="primary-button"
              onClick={addItineraryItem}
            >
              + Add Activity
            </button>

          </div>


          <div className="itinerary-list">

            {itinerary.map((item) => (

              <article
                className="itinerary-card"
                key={item.id}
              >

                <div className="day-badge">
                  {item.day}
                </div>

                <div className="itinerary-time">
                  🕐 {item.time}
                </div>

                <div className="itinerary-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                </div>

                <button className="icon-button">
                  ⋮
                </button>

              </article>

            ))}

          </div>

        </section>

      )}


      {/* EXPENSES */}

      {activeTab === "expenses" && (

        <section className="trip-tab-content">

          <div className="tab-header">

            <div>
              <span>TRAVEL BUDGET</span>

              <h2>
                Expenses
              </h2>

              <p>
                Keep track of every rupee
                spent during your trip.
              </p>
            </div>

          </div>


          {/* EXPENSE SUMMARY */}

          <div className="expense-summary">

            <div>
              <span>Total budget</span>

              <strong>
                ₹
                {Number(
                  trip.budget || 0
                ).toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Total spent</span>

              <strong>
                ₹
                {totalExpenses.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Remaining</span>

              <strong>
                ₹
                {Math.max(
                  remainingBudget,
                  0
                ).toLocaleString()}
              </strong>
            </div>

          </div>


          {/* ADD EXPENSE */}

          <form
            className="expense-form"
            onSubmit={addExpense}
          >

            <select
              value={newExpense.category}
              onChange={(event) =>
                setNewExpense({
                  ...newExpense,
                  category:
                    event.target.value,
                })
              }
            >
              <option>Food</option>
              <option>Travel</option>
              <option>Stay</option>
              <option>Shopping</option>
              <option>Activities</option>
              <option>Other</option>
            </select>


            <input
              type="text"
              placeholder="Expense description"
              value={newExpense.description}
              onChange={(event) =>
                setNewExpense({
                  ...newExpense,
                  description:
                    event.target.value,
                })
              }
            />


            <input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(event) =>
                setNewExpense({
                  ...newExpense,
                  amount:
                    event.target.value,
                })
              }
            />


            <button
              type="submit"
              className="primary-button"
            >
              + Add
            </button>

          </form>


          {/* EXPENSE LIST */}

          <div className="expense-list">

            {expenses.map((expense) => (

              <div
                className="expense-row"
                key={expense.id}
              >

                <div className="expense-category">
                  {expense.category === "Food" && "🍴"}
                  {expense.category === "Travel" && "🚆"}
                  {expense.category === "Stay" && "🏨"}
                  {expense.category === "Shopping" && "🛍️"}
                  {expense.category === "Activities" && "🎯"}
                  {expense.category === "Other" && "💳"}
                </div>


                <div className="expense-info">

                  <strong>
                    {expense.description}
                  </strong>

                  <span>
                    {expense.category}
                  </span>

                </div>


                <strong className="expense-amount">
                  ₹
                  {Number(
                    expense.amount
                  ).toLocaleString()}
                </strong>


                <button
                  className="delete-expense"
                  onClick={() =>
                    deleteExpense(
                      expense.id
                    )
                  }
                >
                  🗑️
                </button>

              </div>

            ))}

          </div>

        </section>

      )}

    </main>
  );
}

export default TripDetails;
const API_BASE_URL = "http://localhost:8080/api";

export const createTrip = async (trip) => {
  const response = await fetch(`${API_BASE_URL}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  if (!response.ok) {
    throw new Error("Failed to create trip");
  }

  return response.json();
};

export const getTrips = async () => {
  const response = await fetch(`${API_BASE_URL}/trips`);

  if (!response.ok) {
    throw new Error("Failed to fetch trips");
  }

  return response.json();
};

export const getTripById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/trips/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch trip");
  }

  return response.json();
};

export const getItineraryItems = async (tripId) => {
  const response = await fetch(
    `${API_BASE_URL}/trips/${tripId}/itinerary`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch itinerary");
  }

  return response.json();
};

export const createItineraryItem = async (
  tripId,
  itineraryItem
) => {
  const response = await fetch(
    `${API_BASE_URL}/trips/${tripId}/itinerary`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itineraryItem),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create itinerary item");
  }

  return response.json();
};
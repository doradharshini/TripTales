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

export const updateTrip = async (id, trip) => {
  const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  if (!response.ok) {
    throw new Error("Failed to update trip");
  }

  return response.json();
};

export const deleteTrip = async (id) => {
  const response = await fetch(`${API_BASE_URL}/trips/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete trip");
  }
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

export const deleteItineraryItem = async (tripId, id) => {
  const response = await fetch(
    `${API_BASE_URL}/trips/${tripId}/itinerary/${id}`,
    {
    method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete itinerary item");
  }
};

export const getJournalEntries = async () => {
  const response = await fetch(`${API_BASE_URL}/journal`);

  if (!response.ok) {
    throw new Error("Failed to fetch journal entries");
  }

  return response.json();
};

export const createJournalEntry = async (entry) => {
  const response = await fetch(`${API_BASE_URL}/journal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(entry),
  });

  if (!response.ok) {
    throw new Error("Failed to create journal entry");
  }

  return response.json();
};

export const deleteJournalEntry = async (id) => {
  const response = await fetch(`${API_BASE_URL}/journal/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete journal entry");
  }
};

export const getMemories = async () => {
  const response = await fetch(`${API_BASE_URL}/memories`);

  if (!response.ok) {
    throw new Error("Failed to fetch memories");
  }

  return response.json();
};

export const createMemory = async (memory) => {
  const response = await fetch(`${API_BASE_URL}/memories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memory),
  });

  if (!response.ok) {
    throw new Error("Failed to create memory");
  }

  return response.json();
};

export const deleteMemory = async (id) => {
  const response = await fetch(`${API_BASE_URL}/memories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete memory");
  }
};

export const getTimelineEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/timeline`);

  if (!response.ok) {
    throw new Error("Failed to fetch timeline events");
  }

  return response.json();
};

export const deleteTimelineEvent = async (type, id) => {
  const response = await fetch(`${API_BASE_URL}/timeline/${type}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete timeline event");
  }
};
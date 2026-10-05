import { Platform } from 'react-native';

const defaultHost = Platform.OS === 'android' ? 'http://10.0.2.2:8080' : 'http://localhost:8080';
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || `${defaultHost}/api`;

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

export function getTrips() {
  return request('/trips');
}

export function createTrip(trip) {
  return request('/trips', {
    method: 'POST',
    body: JSON.stringify(trip),
  });
}

export function deleteTrip(id) {
  return request(`/trips/${id}`, { method: 'DELETE' });
}

export function getJournalEntries() {
  return request('/journal');
}

export function createJournalEntry(entry) {
  return request('/journal', { method: 'POST', body: JSON.stringify(entry) });
}

export function deleteJournalEntry(id) {
  return request(`/journal/${id}`, { method: 'DELETE' });
}

export function getMemories() {
  return request('/memories');
}

export function createMemory(memory) {
  return request('/memories', { method: 'POST', body: JSON.stringify(memory) });
}

export function deleteMemory(id) {
  return request(`/memories/${id}`, { method: 'DELETE' });
}

export function getTimelineEvents() {
  return request('/timeline');
}

export function deleteTimelineEvent(type, id) {
  return request(`/timeline/${type}/${id}`, { method: 'DELETE' });
}

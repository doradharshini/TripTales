package com.triptales.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;

import com.triptales.dto.TimelineEvent;
import com.triptales.entity.ItineraryItem;
import com.triptales.entity.JournalEntry;
import com.triptales.entity.Memory;
import com.triptales.repository.ItineraryItemRepository;
import com.triptales.repository.JournalEntryRepository;
import com.triptales.repository.MemoryRepository;

@Service
public class TimelineService {

    private final ItineraryItemRepository itineraryItemRepository;
    private final JournalEntryRepository journalEntryRepository;
    private final MemoryRepository memoryRepository;

    public TimelineService(
            ItineraryItemRepository itineraryItemRepository,
            JournalEntryRepository journalEntryRepository,
            MemoryRepository memoryRepository
    ) {
        this.itineraryItemRepository = itineraryItemRepository;
        this.journalEntryRepository = journalEntryRepository;
        this.memoryRepository = memoryRepository;
    }

    public List<TimelineEvent> getEvents() {
        List<TimelineEvent> events = new ArrayList<>();

        for (ItineraryItem item : itineraryItemRepository.findAll()) {
            events.add(new TimelineEvent(
                    item.getId(),
                    item.getTrip().getStartDate()
                        .plusDays(item.getDayNumber() - 1L)
                        .toString(),
                    item.getStartTime() == null ? "00:00" : item.getStartTime(),
                    "itinerary",
                    "🗺️",
                    item.getTitle(),
                    item.getDescription(),
                    null
            ));
        }

        for (JournalEntry entry : journalEntryRepository.findAll()) {
            events.add(new TimelineEvent(
                    entry.getId(),
                    entry.getDate().toString(),
                    "12:00",
                    "journal",
                    "📝",
                    entry.getTitle(),
                    entry.getDescription(),
                    null
            ));
        }

        for (Memory memory : memoryRepository.findAll()) {
            events.add(new TimelineEvent(
                    memory.getId(),
                    memory.getDate().toString(),
                    "12:00",
                    "memory",
                    "📸",
                    memory.getTitle(),
                    memory.getDescription(),
                    null
            ));
        }

        events.sort(Comparator.comparing(TimelineEvent::getDate)
            .thenComparing(TimelineEvent::getTime));
        return events;
    }

    public void deleteEvent(String type, Long id) {
        switch (type) {
            case "itinerary" -> itineraryItemRepository.deleteById(id);
            case "journal" -> journalEntryRepository.deleteById(id);
            case "memory" -> memoryRepository.deleteById(id);
            default -> throw new IllegalArgumentException(
                    "Unsupported timeline event type: " + type
            );
        }
    }
}

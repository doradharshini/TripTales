package com.triptales.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.triptales.entity.ItineraryItem;
import com.triptales.entity.Trip;
import com.triptales.repository.ItineraryItemRepository;
import com.triptales.repository.TripRepository;

@Service
public class ItineraryItemService {

    private final ItineraryItemRepository itineraryItemRepository;
    private final TripRepository tripRepository;

    public ItineraryItemService(
            ItineraryItemRepository itineraryItemRepository,
            TripRepository tripRepository
    ) {
        this.itineraryItemRepository = itineraryItemRepository;
        this.tripRepository = tripRepository;
    }

    public ItineraryItem createItineraryItem(
            Long tripId,
            ItineraryItem item
    ) {

        Trip trip = tripRepository
                .findById(tripId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Trip not found with id: " + tripId
                        )
                );

        item.setTrip(trip);

        return itineraryItemRepository.save(item);
    }

    public List<ItineraryItem> getItineraryItems(
            Long tripId
    ) {

        if (!tripRepository.existsById(tripId)) {
            throw new RuntimeException(
                    "Trip not found with id: " + tripId
            );
        }

        return itineraryItemRepository
                .findByTripIdOrderByDayNumberAscStartTimeAsc(
                        tripId
                );
    }

    public void deleteItineraryItem(Long id) {

        if (!itineraryItemRepository.existsById(id)) {
            throw new RuntimeException(
                    "Itinerary item not found with id: " + id
            );
        }

        itineraryItemRepository.deleteById(id);
    }
}
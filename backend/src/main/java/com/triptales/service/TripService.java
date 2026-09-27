package com.triptales.service;

import com.triptales.entity.Trip;
import com.triptales.repository.TripRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    private final TripRepository tripRepository;

    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;
    }

    public Trip createTrip(Trip trip) {

        trip.setStatus("Upcoming");
        trip.setCreatedAt(LocalDateTime.now());

        return tripRepository.save(trip);
    }

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public Optional<Trip> getTripById(Long id) {
        return tripRepository.findById(id);
    }

    public Trip updateTrip(Long id, Trip updatedTrip) {

        Trip existingTrip = tripRepository
                .findById(id)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Trip not found with id: " + id
                        )
                );

        existingTrip.setTripName(
                updatedTrip.getTripName()
        );

        existingTrip.setDestination(
                updatedTrip.getDestination()
        );

        existingTrip.setStartDate(
                updatedTrip.getStartDate()
        );

        existingTrip.setEndDate(
                updatedTrip.getEndDate()
        );

        existingTrip.setBudget(
                updatedTrip.getBudget()
        );

        existingTrip.setDescription(
                updatedTrip.getDescription()
        );

        return tripRepository.save(existingTrip);
    }

    public void deleteTrip(Long id) {

        if (!tripRepository.existsById(id)) {
            throw new RuntimeException(
                    "Trip not found with id: " + id
            );
        }

        tripRepository.deleteById(id);
    }
}
package com.triptales.controller;

import com.triptales.entity.Trip;
import com.triptales.service.TripService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:5173")
public class TripController {

    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping
    public ResponseEntity<Trip> createTrip(
            @RequestBody Trip trip
    ) {

        Trip createdTrip =
                tripService.createTrip(trip);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdTrip);
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getAllTrips() {

        return ResponseEntity.ok(
                tripService.getAllTrips()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(
            @PathVariable Long id
    ) {

        return tripService
                .getTripById(id)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(
            @PathVariable Long id,
            @RequestBody Trip trip
    ) {

        return ResponseEntity.ok(
                tripService.updateTrip(id, trip)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(
            @PathVariable Long id
    ) {

        tripService.deleteTrip(id);

        return ResponseEntity.noContent().build();
    }
}
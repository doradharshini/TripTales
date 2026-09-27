package com.triptales.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triptales.entity.ItineraryItem;
import com.triptales.service.ItineraryItemService;

@RestController
@RequestMapping("/api/trips/{tripId}/itinerary")
@CrossOrigin(origins = "http://localhost:5173")
public class ItineraryItemController {

    private final ItineraryItemService itineraryItemService;

    public ItineraryItemController(
            ItineraryItemService itineraryItemService
    ) {
        this.itineraryItemService = itineraryItemService;
    }

    @PostMapping
    public ResponseEntity<ItineraryItem> createItineraryItem(
            @PathVariable Long tripId,
            @RequestBody ItineraryItem item
    ) {

        ItineraryItem createdItem =
                itineraryItemService.createItineraryItem(
                        tripId,
                        item
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdItem);
    }

    @GetMapping
    public ResponseEntity<List<ItineraryItem>> getItineraryItems(
            @PathVariable Long tripId
    ) {

        return ResponseEntity.ok(
                itineraryItemService.getItineraryItems(
                        tripId
                )
        );
    }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteItineraryItem(
                        @PathVariable Long id
        ) {
                itineraryItemService.deleteItineraryItem(id);
                return ResponseEntity.noContent().build();
        }
}
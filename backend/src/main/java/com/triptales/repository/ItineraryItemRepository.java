package com.triptales.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triptales.entity.ItineraryItem;

public interface ItineraryItemRepository
        extends JpaRepository<ItineraryItem, Long> {

    List<ItineraryItem> findByTripIdOrderByDayNumberAscStartTimeAsc(
            Long tripId
    );
}
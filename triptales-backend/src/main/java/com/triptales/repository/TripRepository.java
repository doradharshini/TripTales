package com.triptales.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triptales.entity.Trip;

public interface TripRepository extends JpaRepository<Trip, Long> {
}
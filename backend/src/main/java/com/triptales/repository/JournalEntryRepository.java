package com.triptales.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triptales.entity.JournalEntry;

public interface JournalEntryRepository extends JpaRepository<JournalEntry, Long> {

    List<JournalEntry> findAllByOrderByDateDescCreatedAtDesc();
}

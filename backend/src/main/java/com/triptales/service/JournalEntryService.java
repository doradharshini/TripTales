package com.triptales.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.triptales.entity.JournalEntry;
import com.triptales.repository.JournalEntryRepository;

@Service
public class JournalEntryService {

    private final JournalEntryRepository journalEntryRepository;

    public JournalEntryService(JournalEntryRepository journalEntryRepository) {
        this.journalEntryRepository = journalEntryRepository;
    }

    public List<JournalEntry> getAllEntries() {
        return journalEntryRepository.findAllByOrderByDateDescCreatedAtDesc();
    }

    public JournalEntry createEntry(JournalEntry entry) {
        entry.setCreatedAt(LocalDateTime.now());
        return journalEntryRepository.save(entry);
    }

    public void deleteEntry(Long id) {
        journalEntryRepository.deleteById(id);
    }
}

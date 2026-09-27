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

import com.triptales.entity.JournalEntry;
import com.triptales.service.JournalEntryService;

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "http://localhost:5173")
public class JournalEntryController {

    private final JournalEntryService journalEntryService;

    public JournalEntryController(JournalEntryService journalEntryService) {
        this.journalEntryService = journalEntryService;
    }

    @GetMapping
    public ResponseEntity<List<JournalEntry>> getEntries() {
        return ResponseEntity.ok(journalEntryService.getAllEntries());
    }

    @PostMapping
    public ResponseEntity<JournalEntry> createEntry(
            @RequestBody JournalEntry entry
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(journalEntryService.createEntry(entry));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntry(@PathVariable Long id) {
        journalEntryService.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }
}

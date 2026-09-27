package com.triptales.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.triptales.dto.TimelineEvent;
import com.triptales.service.TimelineService;

@RestController
@RequestMapping("/api/timeline")
@CrossOrigin(origins = "http://localhost:5173")
public class TimelineController {

    private final TimelineService timelineService;

    public TimelineController(TimelineService timelineService) {
        this.timelineService = timelineService;
    }

    @GetMapping
    public ResponseEntity<List<TimelineEvent>> getEvents() {
        return ResponseEntity.ok(timelineService.getEvents());
    }

    @DeleteMapping("/{type}/{id}")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable String type,
            @PathVariable Long id
    ) {
        timelineService.deleteEvent(type, id);
        return ResponseEntity.noContent().build();
    }
}

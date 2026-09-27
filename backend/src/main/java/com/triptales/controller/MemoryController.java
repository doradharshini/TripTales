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

import com.triptales.entity.Memory;
import com.triptales.service.MemoryService;

@RestController
@RequestMapping("/api/memories")
@CrossOrigin(origins = "http://localhost:5173")
public class MemoryController {

    private final MemoryService memoryService;

    public MemoryController(MemoryService memoryService) {
        this.memoryService = memoryService;
    }

    @GetMapping
    public ResponseEntity<List<Memory>> getMemories() {
        return ResponseEntity.ok(memoryService.getAllMemories());
    }

    @PostMapping
    public ResponseEntity<Memory> createMemory(@RequestBody Memory memory) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(memoryService.createMemory(memory));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMemory(@PathVariable Long id) {
        memoryService.deleteMemory(id);
        return ResponseEntity.noContent().build();
    }
}

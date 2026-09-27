package com.triptales.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.triptales.entity.Memory;
import com.triptales.repository.MemoryRepository;

@Service
public class MemoryService {

    private final MemoryRepository memoryRepository;

    public MemoryService(MemoryRepository memoryRepository) {
        this.memoryRepository = memoryRepository;
    }

    public List<Memory> getAllMemories() {
        return memoryRepository.findAllByOrderByDateDescCreatedAtDesc();
    }

    public Memory createMemory(Memory memory) {
        memory.setCreatedAt(LocalDateTime.now());
        return memoryRepository.save(memory);
    }

    public void deleteMemory(Long id) {
        memoryRepository.deleteById(id);
    }
}

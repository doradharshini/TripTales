package com.triptales.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.triptales.entity.Memory;

public interface MemoryRepository extends JpaRepository<Memory, Long> {

    List<Memory> findAllByOrderByDateDescCreatedAtDesc();
}

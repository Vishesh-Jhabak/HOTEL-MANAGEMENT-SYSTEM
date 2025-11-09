package com.meta.hotel.room.repository;

import com.meta.hotel.room.domain.Room;
import com.meta.hotel.room.domain.RoomStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    List<Room> findByStatus(RoomStatus status);
    Optional<Room> findByNumber(String number);
}



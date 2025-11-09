package com.meta.hotel.room.service;

import com.meta.hotel.room.domain.Room;
import com.meta.hotel.room.domain.RoomStatus;
import com.meta.hotel.room.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> listAll() {
        return roomRepository.findAll();
    }

    public List<Room> listAvailable() {
        return roomRepository.findByStatus(RoomStatus.AVAILABLE);
    }

    public Room create(Room room) {
        return roomRepository.save(room);
    }
}



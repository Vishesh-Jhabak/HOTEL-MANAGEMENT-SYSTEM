package com.meta.hotel.room.controller;

import com.meta.hotel.common.dto.ApiResponse;
import com.meta.hotel.room.domain.Room;
import com.meta.hotel.room.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
@CrossOrigin(origins = "*")
@Validated
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Room>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(roomService.listAll()));
    }

    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<Room>>> available() {
        return ResponseEntity.ok(ApiResponse.ok(roomService.listAvailable()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Room>> create(@RequestBody Room room) {
        return ResponseEntity.ok(ApiResponse.ok(roomService.create(room)));
    }
}



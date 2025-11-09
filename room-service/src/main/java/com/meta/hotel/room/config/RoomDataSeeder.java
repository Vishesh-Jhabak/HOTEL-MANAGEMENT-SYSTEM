package com.meta.hotel.room.config;

import com.meta.hotel.room.domain.Room;
import com.meta.hotel.room.domain.RoomStatus;
import com.meta.hotel.room.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RoomDataSeeder implements CommandLineRunner {

    private final RoomRepository roomRepository;

    public RoomDataSeeder(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (roomRepository.count() == 0) {
            seedRooms();
        }
    }

    private void seedRooms() {
        // Standard Rooms (101-120) - $120/night
        for (int i = 101; i <= 120; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Standard");
            room.setBasePrice(120.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Deluxe Rooms (201-220) - $200/night
        for (int i = 201; i <= 220; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Deluxe");
            room.setBasePrice(200.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Executive Suites (301-310) - $350/night
        for (int i = 301; i <= 310; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Executive Suite");
            room.setBasePrice(350.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Presidential Suites (401-405) - $500/night
        for (int i = 401; i <= 405; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Presidential Suite");
            room.setBasePrice(500.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Penthouse Suites (501-503) - $800/night
        for (int i = 501; i <= 503; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Penthouse Suite");
            room.setBasePrice(800.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Family Rooms (601-615) - $180/night
        for (int i = 601; i <= 615; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Family Room");
            room.setBasePrice(180.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Business Rooms (701-720) - $250/night
        for (int i = 701; i <= 720; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Business Room");
            room.setBasePrice(250.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Honeymoon Suites (801-805) - $400/night
        for (int i = 801; i <= 805; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Honeymoon Suite");
            room.setBasePrice(400.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Ocean View Rooms (901-920) - $300/night
        for (int i = 901; i <= 920; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Ocean View");
            room.setBasePrice(300.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Garden View Rooms (1001-1015) - $150/night
        for (int i = 1001; i <= 1015; i++) {
            Room room = new Room();
            room.setNumber(String.valueOf(i));
            room.setType("Garden View");
            room.setBasePrice(150.0);
            room.setStatus(RoomStatus.AVAILABLE);
            roomRepository.save(room);
        }

        // Set some rooms as occupied for demo
        Room room101 = roomRepository.findByNumber("101").orElse(null);
        if (room101 != null) {
            room101.setStatus(RoomStatus.OCCUPIED);
            roomRepository.save(room101);
        }

        Room room201 = roomRepository.findByNumber("201").orElse(null);
        if (room201 != null) {
            room201.setStatus(RoomStatus.OCCUPIED);
            roomRepository.save(room201);
        }

        Room room301 = roomRepository.findByNumber("301").orElse(null);
        if (room301 != null) {
            room301.setStatus(RoomStatus.CLEANING);
            roomRepository.save(room301);
        }

        Room room401 = roomRepository.findByNumber("401").orElse(null);
        if (room401 != null) {
            room401.setStatus(RoomStatus.MAINTENANCE);
            roomRepository.save(room401);
        }

        System.out.println("✅ Seeded " + roomRepository.count() + " rooms successfully!");
    }
}

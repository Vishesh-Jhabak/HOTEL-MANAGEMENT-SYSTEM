package com.meta.hotel.booking.controller;

import com.meta.hotel.booking.domain.Booking;
import com.meta.hotel.booking.service.BookingService;
import com.meta.hotel.common.dto.ApiResponse;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
@Validated
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/availability/{roomId}")
    public ResponseEntity<ApiResponse<Boolean>> checkAvailability(@PathVariable Long roomId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.isRoomAvailable(roomId, start, end)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Booking>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.getAllBookings()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Booking>> create(@RequestBody Booking booking) {
        return ResponseEntity.ok(ApiResponse.ok(bookingService.createBooking(booking)));
    }
}



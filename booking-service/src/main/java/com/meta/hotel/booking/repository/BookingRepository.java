package com.meta.hotel.booking.repository;

import com.meta.hotel.booking.domain.Booking;
import com.meta.hotel.booking.domain.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRoomIdAndStatusInAndCheckOutDateAfterAndCheckInDateBefore(
            Long roomId, List<BookingStatus> statuses, LocalDate start, LocalDate end);
}



package com.meta.hotel.booking.service;

import com.meta.hotel.booking.domain.Booking;
import com.meta.hotel.booking.domain.BookingStatus;
import com.meta.hotel.booking.repository.BookingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.EnumSet;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public boolean isRoomAvailable(Long roomId, LocalDate start, LocalDate end) {
        List<Booking> overlaps = bookingRepository
                .findByRoomIdAndStatusInAndCheckOutDateAfterAndCheckInDateBefore(
                        roomId,
                        List.copyOf(EnumSet.of(BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.CHECKED_IN)),
                        start,
                        end
                );
        return overlaps.isEmpty();
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Transactional
    public Booking createBooking(Booking booking) {
        if (!isRoomAvailable(booking.getRoomId(), booking.getCheckInDate(), booking.getCheckOutDate())) {
            throw new IllegalStateException("Room not available for selected dates");
        }
        booking.setStatus(BookingStatus.CONFIRMED);
        return bookingRepository.save(booking);
    }
}



package com.meta.hotel.booking.config;

import com.meta.hotel.booking.domain.Booking;
import com.meta.hotel.booking.domain.BookingStatus;
import com.meta.hotel.booking.repository.BookingRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class BookingDataSeeder implements CommandLineRunner {

    private final BookingRepository bookingRepository;

    public BookingDataSeeder(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (bookingRepository.count() == 0) {
            seedBookings();
        }
    }

    private void seedBookings() {
        // Sample bookings for different room types
        
        // Standard Room Booking
        Booking booking1 = new Booking();
        booking1.setCustomerId(1L);
        booking1.setRoomId(1L); // Room 101
        booking1.setCheckInDate(LocalDate.now());
        booking1.setCheckOutDate(LocalDate.now().plusDays(2));
        booking1.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking1);

        // Deluxe Room Booking
        Booking booking2 = new Booking();
        booking2.setCustomerId(2L);
        booking2.setRoomId(21L); // Room 201
        booking2.setCheckInDate(LocalDate.now().plusDays(1));
        booking2.setCheckOutDate(LocalDate.now().plusDays(4));
        booking2.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking2);

        // Executive Suite Booking
        Booking booking3 = new Booking();
        booking3.setCustomerId(3L);
        booking3.setRoomId(41L); // Room 301
        booking3.setCheckInDate(LocalDate.now().plusDays(2));
        booking3.setCheckOutDate(LocalDate.now().plusDays(5));
        booking3.setStatus(BookingStatus.PENDING);
        bookingRepository.save(booking3);

        // Presidential Suite Booking
        Booking booking4 = new Booking();
        booking4.setCustomerId(4L);
        booking4.setRoomId(61L); // Room 401
        booking4.setCheckInDate(LocalDate.now().plusDays(3));
        booking4.setCheckOutDate(LocalDate.now().plusDays(7));
        booking4.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking4);

        // Penthouse Suite Booking
        Booking booking5 = new Booking();
        booking5.setCustomerId(5L);
        booking5.setRoomId(81L); // Room 501
        booking5.setCheckInDate(LocalDate.now().plusDays(5));
        booking5.setCheckOutDate(LocalDate.now().plusDays(10));
        booking5.setStatus(BookingStatus.PENDING);
        bookingRepository.save(booking5);

        // Family Room Booking
        Booking booking6 = new Booking();
        booking6.setCustomerId(6L);
        booking6.setRoomId(101L); // Room 601
        booking6.setCheckInDate(LocalDate.now().minusDays(1));
        booking6.setCheckOutDate(LocalDate.now().plusDays(3));
        booking6.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking6);

        // Business Room Booking
        Booking booking7 = new Booking();
        booking7.setCustomerId(7L);
        booking7.setRoomId(121L); // Room 701
        booking7.setCheckInDate(LocalDate.now().plusDays(1));
        booking7.setCheckOutDate(LocalDate.now().plusDays(3));
        booking7.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking7);

        // Honeymoon Suite Booking
        Booking booking8 = new Booking();
        booking8.setCustomerId(8L);
        booking8.setRoomId(141L); // Room 801
        booking8.setCheckInDate(LocalDate.now().plusDays(2));
        booking8.setCheckOutDate(LocalDate.now().plusDays(6));
        booking8.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking8);

        // Ocean View Room Booking
        Booking booking9 = new Booking();
        booking9.setCustomerId(9L);
        booking9.setRoomId(161L); // Room 901
        booking9.setCheckInDate(LocalDate.now().plusDays(4));
        booking9.setCheckOutDate(LocalDate.now().plusDays(8));
        booking9.setStatus(BookingStatus.PENDING);
        bookingRepository.save(booking9);

        // Garden View Room Booking
        Booking booking10 = new Booking();
        booking10.setCustomerId(10L);
        booking10.setRoomId(181L); // Room 1001
        booking10.setCheckInDate(LocalDate.now().plusDays(6));
        booking10.setCheckOutDate(LocalDate.now().plusDays(9));
        booking10.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking10);

        System.out.println("✅ Seeded " + bookingRepository.count() + " bookings successfully!");
    }
}

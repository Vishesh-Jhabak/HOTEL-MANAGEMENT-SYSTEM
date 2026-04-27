package com.meta.hotel.room.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @Column(name = "room_number", nullable = false)
    private String roomNumber;

    @Column(name = "hotel_id")
    private Long hotelId;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "floor_number")
    private Integer floorNumber;

    // Use String instead of Enum to avoid mapping issues with existing MySQL varchar
    @Column(name = "status")
    private String status = "Available";

    @Column(name = "price_per_night")
    private Double basePrice;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getRoomNumber() { return roomNumber; }
    public void setRoomNumber(String roomNumber) { this.roomNumber = roomNumber; }
    
    public Long getHotelId() { return hotelId; }
    public void setHotelId(Long hotelId) { this.hotelId = hotelId; }
    
    public Long getCategoryId() { return categoryId; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    
    public Integer getFloorNumber() { return floorNumber; }
    public void setFloorNumber(Integer floorNumber) { this.floorNumber = floorNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Double getBasePrice() { return basePrice; }
    public void setBasePrice(Double basePrice) { this.basePrice = basePrice; }
}



"""
Hotel Management System — Data Models
======================================
Python dataclasses representing each database table.
These provide a clean, typed way to work with database records.
"""

from dataclasses import dataclass
from typing import Optional
from datetime import date, datetime


@dataclass
class Guest:
    """Represents a row in the 'guests' table."""
    guest_id: Optional[int] = None
    first_name: str = ""
    last_name: str = ""
    email: str = ""
    phone: str = ""
    address: str = ""
    id_proof_type: str = "Aadhar"
    id_proof_number: str = ""
    created_at: Optional[datetime] = None


@dataclass
class Room:
    """Represents a row in the 'rooms' table."""
    room_id: Optional[int] = None
    room_number: str = ""
    room_type: str = ""
    floor: int = 0
    price_per_night: float = 0.0
    status: str = "Available"
    amenities: str = ""
    created_at: Optional[datetime] = None


@dataclass
class Reservation:
    """Represents a row in the 'reservations' table."""
    reservation_id: Optional[int] = None
    guest_id: int = 0
    room_id: int = 0
    check_in_date: Optional[date] = None
    check_out_date: Optional[date] = None
    num_guests: int = 1
    status: str = "Confirmed"
    total_amount: float = 0.0
    created_at: Optional[datetime] = None


@dataclass
class Payment:
    """Represents a row in the 'payments' table."""
    payment_id: Optional[int] = None
    reservation_id: int = 0
    amount: float = 0.0
    payment_method: str = "Cash"
    payment_date: Optional[datetime] = None
    status: str = "Completed"


@dataclass
class RoomService:
    """Represents a row in the 'room_services' table."""
    service_id: Optional[int] = None
    room_id: int = 0
    guest_id: int = 0
    service_type: str = ""
    description: str = ""
    quantity: int = 1
    cost: float = 0.0
    status: str = "Pending"
    requested_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

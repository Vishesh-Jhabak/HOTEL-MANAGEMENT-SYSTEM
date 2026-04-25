"""
Hotel Management System — CRUD Operations
==========================================
Complete Create, Read, Update, Delete functions for all 5 tables.
Each function uses parameterized queries to prevent SQL injection.
"""

from app.db_connection import execute_query


# ================================================================
#  GUESTS — CRUD Operations
# ================================================================

def create_guest(first_name, last_name, email, phone, address, id_proof_type, id_proof_number):
    """INSERT a new guest into the database."""
    query = """
        INSERT INTO guests (first_name, last_name, email, phone, address, id_proof_type, id_proof_number)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    result = execute_query(query, (first_name, last_name, email, phone, address, id_proof_type, id_proof_number))
    if result:
        print(f"  [OK] Guest '{first_name} {last_name}' added with ID: {result}")
    return result


def read_all_guests():
    """SELECT all guests."""
    query = "SELECT guest_id, first_name, last_name, email, phone, id_proof_type FROM guests ORDER BY guest_id"
    return execute_query(query, fetch=True)


def read_guest_by_id(guest_id):
    """SELECT a single guest by ID."""
    query = "SELECT * FROM guests WHERE guest_id = %s"
    return execute_query(query, (guest_id,), fetch=True)


def update_guest(guest_id, phone=None, address=None, email=None):
    """UPDATE guest details."""
    updates, params = [], []
    if phone:
        updates.append("phone = %s")
        params.append(phone)
    if address:
        updates.append("address = %s")
        params.append(address)
    if email:
        updates.append("email = %s")
        params.append(email)
    if not updates:
        print("  [WARN] No fields to update.")
        return None
    params.append(guest_id)
    query = f"UPDATE guests SET {', '.join(updates)} WHERE guest_id = %s"
    result = execute_query(query, tuple(params))
    if result is not None:
        print(f"  [OK] Guest ID {guest_id} updated successfully.")
    return result


def delete_guest(guest_id):
    """DELETE a guest (cascades to reservations, payments, services)."""
    query = "DELETE FROM guests WHERE guest_id = %s"
    result = execute_query(query, (guest_id,))
    if result is not None:
        print(f"  [OK] Guest ID {guest_id} deleted. (Cascade applied)")
    return result


# ================================================================
#  ROOMS — CRUD Operations
# ================================================================

def create_room(room_number, room_type, floor, price_per_night, status, amenities):
    """INSERT a new room."""
    query = """
        INSERT INTO rooms (room_number, room_type, floor, price_per_night, status, amenities)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    result = execute_query(query, (room_number, room_type, floor, price_per_night, status, amenities))
    if result:
        print(f"  [OK] Room '{room_number}' added with ID: {result}")
    return result


def read_all_rooms():
    """SELECT all rooms."""
    query = "SELECT room_id, room_number, room_type, floor, price_per_night, status FROM rooms ORDER BY room_number"
    return execute_query(query, fetch=True)


def read_available_rooms():
    """SELECT only available rooms."""
    query = """
        SELECT room_id, room_number, room_type, floor, price_per_night, amenities
        FROM rooms WHERE status = 'Available' ORDER BY price_per_night
    """
    return execute_query(query, fetch=True)


def update_room_status(room_id, new_status):
    """UPDATE room status."""
    query = "UPDATE rooms SET status = %s WHERE room_id = %s"
    result = execute_query(query, (new_status, room_id))
    if result is not None:
        print(f"  [OK] Room ID {room_id} status changed to '{new_status}'.")
    return result


def delete_room(room_id):
    """DELETE a room."""
    query = "DELETE FROM rooms WHERE room_id = %s"
    result = execute_query(query, (room_id,))
    if result is not None:
        print(f"  [OK] Room ID {room_id} deleted.")
    return result


# ================================================================
#  RESERVATIONS — CRUD Operations
# ================================================================

def create_reservation(guest_id, room_id, check_in, check_out, num_guests, total_amount):
    """INSERT a new reservation."""
    query = """
        INSERT INTO reservations (guest_id, room_id, check_in_date, check_out_date, num_guests, status, total_amount)
        VALUES (%s, %s, %s, %s, %s, 'Confirmed', %s)
    """
    result = execute_query(query, (guest_id, room_id, check_in, check_out, num_guests, total_amount))
    if result:
        print(f"  [OK] Reservation created with ID: {result}")
    return result


def read_all_reservations():
    """SELECT all reservations with guest and room info (JOIN query)."""
    query = """
        SELECT r.reservation_id,
               CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
               rm.room_number, rm.room_type,
               r.check_in_date, r.check_out_date,
               r.status, r.total_amount
        FROM reservations r
        INNER JOIN guests g ON r.guest_id = g.guest_id
        INNER JOIN rooms rm ON r.room_id = rm.room_id
        ORDER BY r.reservation_id
    """
    return execute_query(query, fetch=True)


def update_reservation_status(reservation_id, new_status):
    """UPDATE reservation status."""
    query = "UPDATE reservations SET status = %s WHERE reservation_id = %s"
    result = execute_query(query, (new_status, reservation_id))
    if result is not None:
        print(f"  [OK] Reservation ID {reservation_id} status changed to '{new_status}'.")
    return result


def delete_reservation(reservation_id):
    """DELETE a reservation."""
    query = "DELETE FROM reservations WHERE reservation_id = %s"
    result = execute_query(query, (reservation_id,))
    if result is not None:
        print(f"  [OK] Reservation ID {reservation_id} deleted.")
    return result


# ================================================================
#  PAYMENTS — CRUD Operations
# ================================================================

def create_payment(reservation_id, amount, payment_method):
    """INSERT a new payment."""
    query = """
        INSERT INTO payments (reservation_id, amount, payment_method, status)
        VALUES (%s, %s, %s, 'Completed')
    """
    result = execute_query(query, (reservation_id, amount, payment_method))
    if result:
        print(f"  [OK] Payment of Rs.{amount} recorded with ID: {result}")
    return result


def read_all_payments():
    """SELECT all payments with reservation and guest details."""
    query = """
        SELECT p.payment_id,
               CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
               rm.room_number,
               p.amount, p.payment_method, p.payment_date, p.status
        FROM payments p
        INNER JOIN reservations r ON p.reservation_id = r.reservation_id
        INNER JOIN guests g ON r.guest_id = g.guest_id
        INNER JOIN rooms rm ON r.room_id = rm.room_id
        ORDER BY p.payment_date DESC
    """
    return execute_query(query, fetch=True)


def update_payment_status(payment_id, new_status):
    """UPDATE payment status."""
    query = "UPDATE payments SET status = %s WHERE payment_id = %s"
    result = execute_query(query, (new_status, payment_id))
    if result is not None:
        print(f"  [OK] Payment ID {payment_id} status changed to '{new_status}'.")
    return result


def delete_payment(payment_id):
    """DELETE a payment record."""
    query = "DELETE FROM payments WHERE payment_id = %s"
    result = execute_query(query, (payment_id,))
    if result is not None:
        print(f"  [OK] Payment ID {payment_id} deleted.")
    return result


# ================================================================
#  ROOM SERVICES — CRUD Operations
# ================================================================

def create_room_service(room_id, guest_id, service_type, description, quantity, cost):
    """INSERT a new room service request."""
    query = """
        INSERT INTO room_services (room_id, guest_id, service_type, description, quantity, cost, status)
        VALUES (%s, %s, %s, %s, %s, %s, 'Pending')
    """
    result = execute_query(query, (room_id, guest_id, service_type, description, quantity, cost))
    if result:
        print(f"  [OK] Service request '{service_type}' created with ID: {result}")
    return result


def read_all_room_services():
    """SELECT all room services with guest and room info."""
    query = """
        SELECT rs.service_id,
               CONCAT(g.first_name, ' ', g.last_name) AS guest_name,
               rm.room_number,
               rs.service_type, rs.description, rs.cost,
               rs.status, rs.requested_at
        FROM room_services rs
        INNER JOIN guests g ON rs.guest_id = g.guest_id
        INNER JOIN rooms rm ON rs.room_id = rm.room_id
        ORDER BY rs.requested_at DESC
    """
    return execute_query(query, fetch=True)


def update_room_service_status(service_id, new_status):
    """UPDATE room service status."""
    query = "UPDATE room_services SET status = %s WHERE service_id = %s"
    if new_status == "Completed":
        query = "UPDATE room_services SET status = %s, completed_at = CURRENT_TIMESTAMP WHERE service_id = %s"
    result = execute_query(query, (new_status, service_id))
    if result is not None:
        print(f"  [OK] Service ID {service_id} status changed to '{new_status}'.")
    return result


def delete_room_service(service_id):
    """DELETE a room service record."""
    query = "DELETE FROM room_services WHERE service_id = %s"
    result = execute_query(query, (service_id,))
    if result is not None:
        print(f"  [OK] Service ID {service_id} deleted.")
    return result

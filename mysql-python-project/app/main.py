"""
Hotel Management System — Main Application
============================================
Interactive CLI application that connects to MySQL and performs
CRUD operations on the hotel_management_system database.

Usage:
    python -m app.main
"""

import sys
from app.config import APP_NAME, APP_VERSION
from app.db_connection import test_connection
from app import crud_operations as crud


# ================================================================
#  Display Helpers
# ================================================================

def print_header():
    """Print the application header banner."""
    print("\n" + "=" * 65)
    print(f"  {APP_NAME} v{APP_VERSION}")
    print("  MySQL + Python Integration Project")
    print("=" * 65)


def print_table(headers, rows):
    """Print rows in a formatted table."""
    if not rows:
        print("  (No records found)")
        return

    # Calculate column widths
    widths = [len(str(h)) for h in headers]
    for row in rows:
        for i, val in enumerate(row):
            widths[i] = max(widths[i], len(str(val)))

    # Cap widths at 25 for readability
    widths = [min(w, 25) for w in widths]

    # Print header
    header_line = " | ".join(str(h).ljust(widths[i]) for i, h in enumerate(headers))
    print(f"\n  {header_line}")
    print(f"  {'-+-'.join('-' * w for w in widths)}")

    # Print rows
    for row in rows:
        row_line = " | ".join(str(val)[:widths[i]].ljust(widths[i]) for i, val in enumerate(row))
        print(f"  {row_line}")

    print(f"\n  Total: {len(rows)} record(s)")


def get_input(prompt, required=True, input_type=str):
    """Get validated user input."""
    while True:
        value = input(f"  {prompt}: ").strip()
        if not value and not required:
            return None
        if not value and required:
            print("  [!] This field is required.")
            continue
        try:
            return input_type(value)
        except ValueError:
            print(f"  [!] Invalid input. Expected {input_type.__name__}.")


# ================================================================
#  Menu Functions — Guests
# ================================================================

def guest_menu():
    """Guest management submenu."""
    while True:
        print("\n  --- Guest Management ---")
        print("  1. View All Guests")
        print("  2. View Guest by ID")
        print("  3. Add New Guest")
        print("  4. Update Guest")
        print("  5. Delete Guest")
        print("  0. Back to Main Menu")

        choice = input("\n  Enter choice: ").strip()

        if choice == "1":
            rows = crud.read_all_guests()
            print_table(["ID", "First Name", "Last Name", "Email", "Phone", "ID Proof"], rows)

        elif choice == "2":
            gid = get_input("Enter Guest ID", input_type=int)
            rows = crud.read_guest_by_id(gid)
            if rows:
                print_table(["ID", "First", "Last", "Email", "Phone", "Address", "ID Type", "ID Number", "Created"], rows)
            else:
                print(f"  Guest ID {gid} not found.")

        elif choice == "3":
            print("\n  --- Add New Guest ---")
            fn = get_input("First Name")
            ln = get_input("Last Name")
            em = get_input("Email")
            ph = get_input("Phone")
            addr = get_input("Address", required=False) or ""
            idt = get_input("ID Proof Type (Aadhar/Passport/PAN Card)")
            idn = get_input("ID Proof Number")
            crud.create_guest(fn, ln, em, ph, addr, idt, idn)

        elif choice == "4":
            print("\n  --- Update Guest ---")
            gid = get_input("Guest ID to update", input_type=int)
            ph = get_input("New Phone (press Enter to skip)", required=False)
            addr = get_input("New Address (press Enter to skip)", required=False)
            em = get_input("New Email (press Enter to skip)", required=False)
            crud.update_guest(gid, phone=ph, address=addr, email=em)

        elif choice == "5":
            gid = get_input("Guest ID to delete", input_type=int)
            confirm = input("  Are you sure? (y/n): ").strip().lower()
            if confirm == "y":
                crud.delete_guest(gid)

        elif choice == "0":
            break


# ================================================================
#  Menu Functions — Rooms
# ================================================================

def room_menu():
    """Room management submenu."""
    while True:
        print("\n  --- Room Management ---")
        print("  1. View All Rooms")
        print("  2. View Available Rooms")
        print("  3. Add New Room")
        print("  4. Update Room Status")
        print("  5. Delete Room")
        print("  0. Back to Main Menu")

        choice = input("\n  Enter choice: ").strip()

        if choice == "1":
            rows = crud.read_all_rooms()
            print_table(["ID", "Room No", "Type", "Floor", "Price/Night", "Status"], rows)

        elif choice == "2":
            rows = crud.read_available_rooms()
            print_table(["ID", "Room No", "Type", "Floor", "Price/Night", "Amenities"], rows)

        elif choice == "3":
            print("\n  --- Add New Room ---")
            rn = get_input("Room Number")
            rt = get_input("Room Type (Single/Double/Deluxe/Suite/Presidential)")
            fl = get_input("Floor", input_type=int)
            pr = get_input("Price per Night", input_type=float)
            st = get_input("Status (Available/Occupied/Maintenance)")
            am = get_input("Amenities", required=False) or ""
            crud.create_room(rn, rt, fl, pr, st, am)

        elif choice == "4":
            rid = get_input("Room ID to update", input_type=int)
            ns = get_input("New Status (Available/Occupied/Maintenance/Housekeeping)")
            crud.update_room_status(rid, ns)

        elif choice == "5":
            rid = get_input("Room ID to delete", input_type=int)
            confirm = input("  Are you sure? (y/n): ").strip().lower()
            if confirm == "y":
                crud.delete_room(rid)

        elif choice == "0":
            break


# ================================================================
#  Menu Functions — Reservations
# ================================================================

def reservation_menu():
    """Reservation management submenu."""
    while True:
        print("\n  --- Reservation Management ---")
        print("  1. View All Reservations")
        print("  2. Create New Reservation")
        print("  3. Update Reservation Status")
        print("  4. Delete Reservation")
        print("  0. Back to Main Menu")

        choice = input("\n  Enter choice: ").strip()

        if choice == "1":
            rows = crud.read_all_reservations()
            print_table(["Res ID", "Guest", "Room", "Type", "Check-In", "Check-Out", "Status", "Amount"], rows)

        elif choice == "2":
            print("\n  --- Create Reservation ---")
            gid = get_input("Guest ID", input_type=int)
            rid = get_input("Room ID", input_type=int)
            ci = get_input("Check-In Date (YYYY-MM-DD)")
            co = get_input("Check-Out Date (YYYY-MM-DD)")
            ng = get_input("Number of Guests", input_type=int)
            ta = get_input("Total Amount", input_type=float)
            crud.create_reservation(gid, rid, ci, co, ng, ta)

        elif choice == "3":
            rid = get_input("Reservation ID", input_type=int)
            ns = get_input("New Status (Confirmed/Checked-In/Checked-Out/Cancelled)")
            crud.update_reservation_status(rid, ns)

        elif choice == "4":
            rid = get_input("Reservation ID to delete", input_type=int)
            confirm = input("  Are you sure? (y/n): ").strip().lower()
            if confirm == "y":
                crud.delete_reservation(rid)

        elif choice == "0":
            break


# ================================================================
#  Menu Functions — Payments
# ================================================================

def payment_menu():
    """Payment management submenu."""
    while True:
        print("\n  --- Payment Management ---")
        print("  1. View All Payments")
        print("  2. Record New Payment")
        print("  3. Update Payment Status")
        print("  4. Delete Payment")
        print("  0. Back to Main Menu")

        choice = input("\n  Enter choice: ").strip()

        if choice == "1":
            rows = crud.read_all_payments()
            print_table(["Pay ID", "Guest", "Room", "Amount", "Method", "Date", "Status"], rows)

        elif choice == "2":
            print("\n  --- Record Payment ---")
            rid = get_input("Reservation ID", input_type=int)
            amt = get_input("Amount", input_type=float)
            pm = get_input("Payment Method (Cash/Credit Card/Debit Card/UPI/Net Banking)")
            crud.create_payment(rid, amt, pm)

        elif choice == "3":
            pid = get_input("Payment ID", input_type=int)
            ns = get_input("New Status (Completed/Pending/Refunded/Failed)")
            crud.update_payment_status(pid, ns)

        elif choice == "4":
            pid = get_input("Payment ID to delete", input_type=int)
            confirm = input("  Are you sure? (y/n): ").strip().lower()
            if confirm == "y":
                crud.delete_payment(pid)

        elif choice == "0":
            break


# ================================================================
#  Menu Functions — Room Services
# ================================================================

def service_menu():
    """Room service management submenu."""
    while True:
        print("\n  --- Room Service Management ---")
        print("  1. View All Service Requests")
        print("  2. Create New Service Request")
        print("  3. Update Service Status")
        print("  4. Delete Service Request")
        print("  0. Back to Main Menu")

        choice = input("\n  Enter choice: ").strip()

        if choice == "1":
            rows = crud.read_all_room_services()
            print_table(["Svc ID", "Guest", "Room", "Type", "Description", "Cost", "Status", "Requested"], rows)

        elif choice == "2":
            print("\n  --- Create Service Request ---")
            rid = get_input("Room ID", input_type=int)
            gid = get_input("Guest ID", input_type=int)
            st = get_input("Service Type (Food/Laundry/Housekeeping/Maintenance/Spa)")
            desc = get_input("Description")
            qty = get_input("Quantity", input_type=int)
            cost = get_input("Cost", input_type=float)
            crud.create_room_service(rid, gid, st, desc, qty, cost)

        elif choice == "3":
            sid = get_input("Service ID", input_type=int)
            ns = get_input("New Status (Pending/In-Progress/Completed/Cancelled)")
            crud.update_room_service_status(sid, ns)

        elif choice == "4":
            sid = get_input("Service ID to delete", input_type=int)
            confirm = input("  Are you sure? (y/n): ").strip().lower()
            if confirm == "y":
                crud.delete_room_service(sid)

        elif choice == "0":
            break


# ================================================================
#  Main Menu
# ================================================================

def main():
    """Main application entry point."""
    print_header()

    # Test database connection
    print("\n  Connecting to MySQL database...")
    if not test_connection():
        print("\n  [FATAL] Cannot connect to database. Exiting.")
        sys.exit(1)

    while True:
        print("\n" + "-" * 50)
        print(f"  {APP_NAME} — Main Menu")
        print("-" * 50)
        print("  1. Guest Management")
        print("  2. Room Management")
        print("  3. Reservation Management")
        print("  4. Payment Management")
        print("  5. Room Service Management")
        print("  6. Test Database Connection")
        print("  0. Exit")

        choice = input("\n  Enter choice: ").strip()

        if choice == "1":
            guest_menu()
        elif choice == "2":
            room_menu()
        elif choice == "3":
            reservation_menu()
        elif choice == "4":
            payment_menu()
        elif choice == "5":
            service_menu()
        elif choice == "6":
            test_connection()
        elif choice == "0":
            print("\n  Thank you for using the Hotel Management System!")
            print("  Goodbye!\n")
            sys.exit(0)
        else:
            print("  [!] Invalid choice. Please try again.")


if __name__ == "__main__":
    main()

import mysql.connector

try:
    c = mysql.connector.connect(host='localhost', user='root', password='1234')
    cur = c.cursor()
    cur.execute('CREATE DATABASE IF NOT EXISTS hotel_auth')
    cur.execute('CREATE DATABASE IF NOT EXISTS hotel_booking')
    cur.execute('CREATE DATABASE IF NOT EXISTS hotel_room')
    
    # Try to create user, handle if exists (MySQL 5.5 doesn't support CREATE USER IF NOT EXISTS)
    try:
        cur.execute("CREATE USER 'hotel'@'localhost' IDENTIFIED BY 'hotel'")
    except mysql.connector.Error as err:
        # Ignore if user exists
        pass
        
    cur.execute("GRANT ALL PRIVILEGES ON hotel_auth.* TO 'hotel'@'localhost'")
    cur.execute("GRANT ALL PRIVILEGES ON hotel_booking.* TO 'hotel'@'localhost'")
    cur.execute("GRANT ALL PRIVILEGES ON hotel_room.* TO 'hotel'@'localhost'")
    cur.execute("GRANT ALL PRIVILEGES ON hotel_management.* TO 'hotel'@'localhost'")
    cur.execute('FLUSH PRIVILEGES')
    print('Databases set up successfully.')
except Exception as e:
    print('Error setting up databases:', e)
    import sys
    sys.exit(1)

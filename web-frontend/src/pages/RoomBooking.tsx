import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function RoomBooking() {
  const { user } = useAuth()
  const [bookingData, setBookingData] = useState({
    guestName: user?.username || '',
    roomType: 'Standard',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    amount: 0
  })
  const [showPayment, setShowPayment] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('')

  const roomTypes = [
    { name: 'Standard', price: 10000, description: 'Comfortable room with basic amenities' },
    { name: 'Deluxe', price: 16700, description: 'Spacious room with premium amenities' },
    { name: 'Suite', price: 29200, description: 'Luxury suite with separate living area' },
    { name: 'Penthouse', price: 50000, description: 'Ultimate luxury with panoramic views' }
  ]

  const calculateAmount = () => {
    const selectedRoom = roomTypes.find(room => room.name === bookingData.roomType)
    if (selectedRoom && bookingData.checkInDate && bookingData.checkOutDate) {
      const checkIn = new Date(bookingData.checkInDate)
      const checkOut = new Date(bookingData.checkOutDate)
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      return selectedRoom.price * nights
    }
    return 0
  }

  const handleBooking = () => {
    const amount = calculateAmount()
    if (amount > 0) {
      setBookingData(prev => ({ ...prev, amount }))
      setShowPayment(true)
    }
  }

  const navigate = useNavigate()
  
  const handlePayment = async (method: string) => {
    setPaymentStatus('Processing...')
    try {
      // First, get available rooms to find a room ID
      const roomsRes = await axios.get('/api/rooms/available')
      const availableRooms = roomsRes.data.data || []
      const selectedRoom = availableRooms.find((r: any) => r.type === bookingData.roomType)
      
      if (!selectedRoom) {
        setPaymentStatus('No rooms available for selected type')
        return
      }
      
      // Create booking
      const checkIn = new Date(bookingData.checkInDate)
      const checkOut = new Date(bookingData.checkOutDate)
      const bookingRes = await axios.post('/api/bookings', {
        customerId: 1, // In a real app, get from auth context
        roomId: selectedRoom.id,
        checkInDate: checkIn.toISOString().split('T')[0],
        checkOutDate: checkOut.toISOString().split('T')[0]
      })
      
      setPaymentStatus('Payment successful! Booking confirmed. Redirecting...')
      setTimeout(() => {
        navigate('/guest')
      }, 2000)
    } catch (error: any) {
      console.error('Booking error:', error)
      setPaymentStatus(`Error: ${error.response?.data?.message || 'Booking failed'}`)
    }
  }

  if (showPayment) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 py-8 h-screen overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <h1 className="text-3xl font-bold mb-6 text-center">Payment Gateway</h1>
              
              <div className="mb-6 p-4 bg-white/5 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Guest Name:</span>
                    <span>{bookingData.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room Type:</span>
                    <span>{bookingData.roomType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{bookingData.checkInDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{bookingData.checkOutDate}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-white/20 pt-2">
                    <span>Total Amount:</span>
                    <span>₹{bookingData.amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {paymentStatus ? (
                <div className="text-center">
                  <div className="text-xl font-semibold mb-4">{paymentStatus}</div>
                  {paymentStatus.includes('successful') && (
                    <div className="text-green-400">✓ Payment completed successfully!</div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Choose Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handlePayment('UPI')}
                      className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg transition-colors"
                    >
                      <div className="text-2xl mb-2">📱</div>
                      <div className="font-medium">UPI Payment</div>
                    </button>
                    <button
                      onClick={() => handlePayment('Card')}
                      className="bg-green-600 hover:bg-green-700 p-4 rounded-lg transition-colors"
                    >
                      <div className="text-2xl mb-2">💳</div>
                      <div className="font-medium">Credit/Debit Card</div>
                    </button>
                    <button
                      onClick={() => handlePayment('NetBanking')}
                      className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg transition-colors"
                    >
                      <div className="text-2xl mb-2">🏦</div>
                      <div className="font-medium">Net Banking</div>
                    </button>
                    <button
                      onClick={() => handlePayment('Wallet')}
                      className="bg-orange-600 hover:bg-orange-700 p-4 rounded-lg transition-colors"
                    >
                      <div className="text-2xl mb-2">👛</div>
                      <div className="font-medium">Digital Wallet</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-8 h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Room Booking</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Form */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Guest Name</label>
                  <input
                    type="text"
                    value={bookingData.guestName}
                    onChange={(e) => setBookingData(prev => ({ ...prev, guestName: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/40"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Room Type</label>
                  <select
                    value={bookingData.roomType}
                    onChange={(e) => setBookingData(prev => ({ ...prev, roomType: e.target.value }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/40"
                  >
                    {roomTypes.map(room => (
                      <option key={room.name} value={room.name}>
                        {room.name} - ₹{room.price.toLocaleString('en-IN')}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-in Date</label>
                    <input
                      type="date"
                      value={bookingData.checkInDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, checkInDate: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Check-out Date</label>
                    <input
                      type="date"
                      value={bookingData.checkOutDate}
                      onChange={(e) => setBookingData(prev => ({ ...prev, checkOutDate: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-white/40"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-400">
                      ₹{calculateAmount().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!bookingData.guestName || !bookingData.checkInDate || !bookingData.checkOutDate}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>

            {/* Room Types */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-6">Available Room Types</h2>
              
              <div className="space-y-4">
                {roomTypes.map(room => (
                  <div
                    key={room.name}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      bookingData.roomType === room.name
                        ? 'border-indigo-500 bg-indigo-500/20'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => setBookingData(prev => ({ ...prev, roomType: room.name }))}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">{room.name}</h3>
                      <span className="text-xl font-bold text-green-400">
                        ₹{room.price.toLocaleString('en-IN')}/night
                      </span>
                    </div>
                    <p className="text-sm text-slate-300">{room.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

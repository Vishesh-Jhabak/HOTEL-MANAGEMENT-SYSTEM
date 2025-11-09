import { useState, useEffect } from 'react'
import axios from 'axios'

type Booking = { id: number; customerId: number; roomId: number; checkInDate: string; checkOutDate: string; status: string }
type Room = { id: number; number: string; type: string; status: string; basePrice?: number }

export default function Bookings() {
  const [roomId, setRoomId] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [available, setAvailable] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [newBooking, setNewBooking] = useState({ customerId: 1, roomId: '', checkInDate: '', checkOutDate: '' })

  useEffect(() => {
    loadBookings()
    loadRooms()
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBookings(bookings)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = bookings.filter(booking => {
        const room = rooms.find(r => r.id === booking.roomId)
        return room?.number.toLowerCase().includes(query) || 
               booking.status.toLowerCase().includes(query) ||
               booking.checkInDate.includes(query) ||
               booking.checkOutDate.includes(query)
      })
      setFilteredBookings(filtered)
    }
  }, [searchQuery, bookings, rooms])

  const loadBookings = async () => {
    try {
      const res = await axios.get('/api/bookings')
      setBookings(res.data.data || [])
      setFilteredBookings(res.data.data || [])
    } catch (error) {
      console.error('Error loading bookings:', error)
    }
  }

  const loadRooms = async () => {
    try {
      const res = await axios.get('/api/rooms')
      setRooms(res.data.data || [])
    } catch (error) {
      console.error('Error loading rooms:', error)
    }
  }

  const check = async () => {
    if (!roomNumber || !start || !end) {
      alert('Please fill in room number and dates')
      return
    }

    setLoading(true)
    try {
      const room = rooms.find(r => r.number === roomNumber)
      if (!room) {
        alert('Room not found')
        setLoading(false)
        return
      }

      const res = await axios.get(`/api/bookings/availability/${room.id}`, { 
        params: { start, end } 
      })
      setAvailable(!!res.data.data)
    } catch (error: any) {
      console.error('Availability check error:', error)
      alert(error.response?.data?.message || 'Failed to check availability')
      setAvailable(false)
    } finally { setLoading(false) }
  }

  const handleAddBooking = async () => {
    if (!newBooking.roomId || !newBooking.checkInDate || !newBooking.checkOutDate) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/bookings', {
        customerId: newBooking.customerId,
        roomId: parseInt(newBooking.roomId),
        checkInDate: newBooking.checkInDate,
        checkOutDate: newBooking.checkOutDate
      })
      
      if (response.data.success) {
        alert('Booking created successfully!')
        setShowAddModal(false)
        setNewBooking({ customerId: 1, roomId: '', checkInDate: '', checkOutDate: '' })
        loadBookings()
      }
    } catch (error: any) {
      console.error('Error creating booking:', error)
      alert(error.response?.data?.message || 'Failed to create booking')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-12 h-screen overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Booking Management
          </h1>
          <p className="text-xl text-slate-300">Check availability and manage reservations</p>
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Total Bookings</p>
                <p className="text-3xl font-bold">{bookings.length}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Active Bookings</p>
                <p className="text-3xl font-bold text-green-400">
                  {bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'CHECKED_IN').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {bookings.filter(b => b.status === 'PENDING').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-purple-400">₹37.5L</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">➕</div>
                <div className="font-medium">New Booking</div>
              </button>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-medium">Search Bookings</div>
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg p-4 text-center transition-all transform hover:scale-105">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium">Booking Reports</div>
              </button>
              <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-lg p-4 text-center transition-all transform hover:scale-105">
                <div className="text-2xl mb-2">📈</div>
                <div className="font-medium">Analytics</div>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredBookings.slice(0, 10).map(booking => {
                const room = rooms.find(r => r.id === booking.roomId)
                return (
                  <div key={booking.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      booking.status === 'CONFIRMED' || booking.status === 'CHECKED_IN' ? 'bg-green-500' :
                      booking.status === 'PENDING' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Room {room?.number || booking.roomId} - Booking #{booking.id}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">{booking.status}</p>
                    </div>
                  </div>
                )
              })}
              {filteredBookings.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p>No bookings found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Availability Checker */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold mb-6 text-center">Check Room Availability</h2>
          <div className="max-w-md mx-auto">
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Room Number</label>
                <select
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-indigo-400 text-white"
                  value={roomNumber}
                  onChange={e => setRoomNumber(e.target.value)}
                >
                  <option value="">Select Room</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.number}>
                      Room {room.number} - {room.type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Check-in Date</label>
                <input 
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-indigo-400 text-white" 
                  type="date" 
                  value={start} 
                  onChange={e => setStart(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Check-out Date</label>
                <input 
                  className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-indigo-400 text-white" 
                  type="date" 
                  value={end} 
                  onChange={e => setEnd(e.target.value)} 
                />
              </div>
              <button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg py-3 font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none" 
                disabled={loading || !roomNumber || !start || !end} 
                onClick={check}
              >
                {loading ? 'Checking Availability…' : 'Check Availability'}
              </button>
              {available !== null && (
                <div className={`text-center p-4 rounded-lg ${available ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  <div className="text-2xl mb-2">{available ? '🎉' : '❌'}</div>
                  <div className="font-medium">
                    {available ? 'Room is available!' : 'Room not available'}
                  </div>
                  {available && (
                    <div className="text-sm mt-2 opacity-80">Ready to book this room</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Booking Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/20">
              <h2 className="text-2xl font-bold mb-4">Create New Booking</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Room</label>
                  <select
                    value={newBooking.roomId}
                    onChange={(e) => setNewBooking({ ...newBooking, roomId: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-indigo-400"
                  >
                    <option value="">Select Room</option>
                    {rooms.filter(r => r.status === 'AVAILABLE').map(room => (
                      <option key={room.id} value={room.id}>
                        Room {room.number} - {room.type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in Date</label>
                  <input
                    type="date"
                    value={newBooking.checkInDate}
                    onChange={(e) => setNewBooking({ ...newBooking, checkInDate: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out Date</label>
                  <input
                    type="date"
                    value={newBooking.checkOutDate}
                    onChange={(e) => setNewBooking({ ...newBooking, checkOutDate: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-indigo-400"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddBooking}
                    disabled={loading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg py-3 font-medium transition-colors"
                  >
                    {loading ? 'Creating...' : 'Create Booking'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setNewBooking({ customerId: 1, roomId: '', checkInDate: '', checkOutDate: '' })
                    }}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 rounded-lg py-3 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search Bookings Modal */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/20">
              <h2 className="text-2xl font-bold mb-4">Search Bookings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Search by Room Number, Status, or Date</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-green-400"
                    placeholder="Search bookings..."
                    autoFocus
                  />
                </div>
                <div className="text-sm text-slate-400">
                  Found {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''}
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {filteredBookings.map(booking => {
                    const room = rooms.find(r => r.id === booking.roomId)
                    return (
                      <div key={booking.id} className="p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-medium">Room {room?.number || booking.roomId}</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            booking.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                            booking.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button
                  onClick={() => {
                    setShowSearchModal(false)
                    setSearchQuery('')
                    setFilteredBookings(bookings)
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 rounded-lg py-3 font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
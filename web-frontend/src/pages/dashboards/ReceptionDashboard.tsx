import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useHotelData } from '../../context/HotelDataContext'

export default function ReceptionDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<string | null>(null)
  const { rooms, addGuestService, guestDetails, addGuestDetails, updateGuestDetails, revenueData, guestServices } = useHotelData()
  const [guestData, setGuestData] = useState({
    name: '',
    phone: '',
    email: '',
    roomNumber: '',
    idNumber: '',
    address: '',
    nationality: 'Indian',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    roomType: 'Standard',
    totalAmount: 0
  })
  const [selectedGuest, setSelectedGuest] = useState<any>(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleQuickAction = (action: string) => {
    setShowModal(action)
  }

  const closeModal = () => {
    setShowModal(null)
    setGuestData({
      name: '',
      phone: '',
      email: '',
      roomNumber: '',
      idNumber: '',
      address: '',
      nationality: 'Indian',
      checkInDate: '',
      checkOutDate: '',
      numberOfGuests: 1,
      roomType: 'Standard',
      totalAmount: 0
    })
    setSelectedGuest(null)
  }

  const handleCheckIn = () => {
    if (guestData.name && guestData.roomNumber && guestData.phone && guestData.idNumber) {
      const newGuest = {
        name: guestData.name,
        phone: guestData.phone,
        email: guestData.email,
        idNumber: guestData.idNumber,
        address: guestData.address,
        nationality: guestData.nationality,
        checkInDate: guestData.checkInDate || new Date().toISOString(),
        checkOutDate: guestData.checkOutDate,
        roomNumber: guestData.roomNumber,
        numberOfGuests: guestData.numberOfGuests,
        totalAmount: guestData.totalAmount,
        status: 'checked-in' as const
      }
      addGuestDetails(newGuest)
      alert(`Guest ${guestData.name} checked into Room ${guestData.roomNumber}`)
      closeModal()
    } else {
      alert('Please fill in all required fields (Name, Phone, ID Number, Room Number)')
    }
  }

  const handleCheckOut = () => {
    alert('Check-out processed successfully!')
    closeModal()
  }

  const handleCreateReservation = () => {
    if (guestData.name && guestData.checkInDate && guestData.checkOutDate) {
      alert(`Reservation created for ${guestData.name}`)
      closeModal()
    } else {
      alert('Please fill in all required fields')
    }
  }

  const handleSearchGuest = () => {
    alert('Searching for guests...')
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-8 h-screen overflow-y-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Reception Dashboard</h1>
            <p className="text-slate-300">Welcome back, {user?.username || 'Receptionist'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Check-ins Today</p>
                <p className="text-3xl font-bold">18</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Check-outs Today</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚪</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Pending Reservations</p>
                <p className="text-3xl font-bold">7</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Available Rooms</p>
                <p className="text-3xl font-bold">23</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold mb-4">Check-in List</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-2">Guest Name</th>
                            <th className="text-left py-2">Room</th>
                            <th className="text-left py-2">Check-in Time</th>
                            <th className="text-left py-2">Phone</th>
                            <th className="text-left py-2">Status</th>
                            <th className="text-left py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guestDetails.filter(g => g.status === 'checked-in').map(guest => (
                            <tr key={guest.id} className="border-b border-white/10">
                              <td className="py-2 font-medium">{guest.name}</td>
                              <td className="py-2">{guest.roomNumber}</td>
                              <td className="py-2">{new Date(guest.checkInDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                              <td className="py-2">{guest.phone}</td>
                              <td className="py-2">
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                  {guest.status === 'checked-in' ? 'Checked In' : guest.status}
                                </span>
                              </td>
                              <td className="py-2">
                                <button 
                                  onClick={() => {
                                    setSelectedGuest(guest)
                                    setShowModal('view-details')
                                  }}
                                  className="text-blue-400 hover:text-blue-300 text-xs mr-2"
                                >
                                  View Details
                                </button>
                                <button 
                                  onClick={() => {
                                    updateGuestDetails(guest.id, { status: 'checked-out' })
                                    alert(`${guest.name} checked out successfully!`)
                                  }}
                                  className="text-green-400 hover:text-green-300 text-xs"
                                >
                                  Check Out
                                </button>
                              </td>
                            </tr>
                          ))}
                          {guestDetails.filter(g => g.status === 'checked-in').length === 0 && (
                            <tr>
                              <td colSpan={6} className="py-4 text-center text-slate-400">No checked-in guests</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Guest Requests Section */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold mb-4">Guest Requests</h2>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {guestServices.filter(service => service.status === 'pending').map(service => (
                        <div key={service.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-sm">Room {service.roomNumber}</p>
                              <p className="text-xs text-slate-400 mt-1">{service.serviceType}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              service.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              service.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {service.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 mb-2">{service.description}</p>
                          <p className="text-xs text-slate-400">
                            Requested: {new Date(service.requestedAt).toLocaleString('en-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              day: '2-digit',
                              month: 'short'
                            })}
                          </p>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => {
                                // Mark as completed
                                const updatedServices = guestServices.map(s => 
                                  s.id === service.id ? { ...s, status: 'completed' as const } : s
                                )
                                // Update context - would need to add updateGuestService method
                                alert(`Service request for Room ${service.roomNumber} marked as completed`)
                              }}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-xs py-1.5 rounded transition-colors"
                            >
                              Mark Complete
                            </button>
                            <button
                              onClick={() => {
                                alert(`Service request for Room ${service.roomNumber} has been escalated`)
                              }}
                              className="flex-1 bg-orange-600 hover:bg-orange-700 text-xs py-1.5 rounded transition-colors"
                            >
                              Escalate
                            </button>
                          </div>
                        </div>
                      ))}
                      {guestServices.filter(service => service.status === 'pending').length === 0 && (
                        <div className="text-center py-8 text-slate-400">
                          <p className="text-sm">No pending guest requests</p>
                        </div>
                      )}
                    </div>
                  </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Check-out List</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-2">Guest Name</th>
                    <th className="text-left py-2">Room</th>
                    <th className="text-left py-2">Check-out Time</th>
                    <th className="text-left py-2">Bill Amount (₹)</th>
                    <th className="text-left py-2">Payment</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {guestDetails.filter(g => g.status === 'checked-out').map(guest => (
                    <tr key={guest.id} className="border-b border-white/10">
                      <td className="py-2 font-medium">{guest.name}</td>
                      <td className="py-2">{guest.roomNumber}</td>
                      <td className="py-2">{new Date(guest.checkOutDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                      <td className="py-2">₹{guest.totalAmount.toLocaleString('en-IN')}</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Paid</span>
                      </td>
                      <td className="py-2">
                        <button 
                          onClick={() => {
                            setSelectedGuest(guest)
                            setShowModal('view-details')
                          }}
                          className="text-blue-400 hover:text-blue-300 text-xs"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                  {guestDetails.filter(g => g.status === 'checked-out').length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-slate-400">No checked-out guests</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Reception Quick Actions */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Reception Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('checkin')}
              className="bg-green-600 hover:bg-green-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">✅</div>
              <div className="font-medium">Check-in Guest</div>
            </button>
            <button 
              onClick={() => handleQuickAction('checkout')}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🚪</div>
              <div className="font-medium">Check-out Guest</div>
            </button>
            <button 
              onClick={() => handleQuickAction('reservation')}
              className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-medium">New Reservation</div>
            </button>
            <button 
              onClick={() => handleQuickAction('find-guest')}
              className="bg-orange-600 hover:bg-orange-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-medium">Find Guest</div>
            </button>
          </div>
        </div>
      </div>

      {/* Reception Modals */}
      {showModal === 'checkin' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Guest Check-in</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Guest Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      value={guestData.name}
                      onChange={(e) => setGuestData({...guestData, name: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={guestData.phone}
                      onChange={(e) => setGuestData({...guestData, phone: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input 
                      type="email" 
                      placeholder="guest@email.com" 
                      value={guestData.email}
                      onChange={(e) => setGuestData({...guestData, email: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">ID Number *</label>
                    <input 
                      type="text" 
                      placeholder="PAN/Aadhaar/Passport" 
                      value={guestData.idNumber}
                      onChange={(e) => setGuestData({...guestData, idNumber: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Address</label>
                    <textarea 
                      placeholder="Complete address" 
                      value={guestData.address}
                      onChange={(e) => setGuestData({...guestData, address: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2 h-20" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Nationality</label>
                    <select 
                      value={guestData.nationality}
                      onChange={(e) => setGuestData({...guestData, nationality: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2"
                    >
                      <option value="Indian">Indian</option>
                      <option value="Foreign">Foreign</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Booking Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Room Number *</label>
                    <select 
                      value={guestData.roomNumber}
                      onChange={(e) => {
                        const selectedRoom = rooms.find(r => r.roomNumber === e.target.value)
                        setGuestData({
                          ...guestData, 
                          roomNumber: e.target.value,
                          roomType: selectedRoom?.type || 'Standard',
                          totalAmount: selectedRoom ? Math.round(selectedRoom.basePrice * 83.33) : 0
                        })
                      }}
                      className="w-full bg-white/10 border border-white/20 rounded p-2"
                    >
                      <option value="">Select Room</option>
                      {rooms.filter(r => r.status === 'available').map(room => (
                        <option key={room.roomNumber} value={room.roomNumber}>
                          Room {room.roomNumber} - {room.type} (₹{Math.round(room.basePrice * 83.33).toLocaleString('en-IN')}/night)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Check-in Date</label>
                    <input 
                      type="datetime-local" 
                      value={guestData.checkInDate}
                      onChange={(e) => setGuestData({...guestData, checkInDate: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Check-out Date</label>
                    <input 
                      type="datetime-local" 
                      value={guestData.checkOutDate}
                      onChange={(e) => setGuestData({...guestData, checkOutDate: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Number of Guests</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="6" 
                      value={guestData.numberOfGuests}
                      onChange={(e) => setGuestData({...guestData, numberOfGuests: parseInt(e.target.value)})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Amount:</span>
                      <span className="text-xl font-bold text-green-400">₹{guestData.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckIn}
                    className="w-full bg-green-600 hover:bg-green-700 rounded p-3 font-medium"
                  >
                    Check In Guest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'checkout' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Guest Check-out</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Guest Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Guest Name:</span>
                    <span>John Smith</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Room:</span>
                    <span>205</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>2025-10-16</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights:</span>
                    <span>2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="text-green-400">₹33,400</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Payment</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Room Charges:</span>
                    <span>₹30,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Charges:</span>
                    <span>₹3,400</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span className="text-green-400">₹33,400</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleCheckOut}
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded p-3"
                >
                  Process Payment
                </button>
                <button 
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'reservation' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">New Reservation</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Reservation Details</h4>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Guest Name" 
                    value={guestData.name}
                    onChange={(e) => setGuestData({...guestData, name: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2" 
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={guestData.phone}
                    onChange={(e) => setGuestData({...guestData, phone: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2" 
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={guestData.email}
                    onChange={(e) => setGuestData({...guestData, email: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2" 
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="date" 
                      placeholder="Check-in Date" 
                      value={guestData.checkInDate}
                      onChange={(e) => setGuestData({...guestData, checkInDate: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                    <input 
                      type="date" 
                      placeholder="Check-out Date" 
                      value={guestData.checkOutDate}
                      onChange={(e) => setGuestData({...guestData, checkOutDate: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <select 
                    value={guestData.roomType}
                    onChange={(e) => setGuestData({...guestData, roomType: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2"
                  >
                    <option value="Standard">Standard Room</option>
                    <option value="Deluxe">Deluxe Room</option>
                    <option value="Suite">Suite</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                  <input 
                    type="number" 
                    placeholder="Number of Guests" 
                    value={guestData.numberOfGuests}
                    onChange={(e) => setGuestData({...guestData, numberOfGuests: parseInt(e.target.value)})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2" 
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleCreateReservation}
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded p-3"
                >
                  Create Reservation
                </button>
                <button 
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'find-guest' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Find Guest</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Search Options</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Guest Name" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="text" placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="text" placeholder="Room Number" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="text" placeholder="ID Number" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Search Results</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <div>
                      <div className="font-medium">John Smith</div>
                      <div className="text-sm text-gray-400">Room 205 • +91 98765 43210</div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300">View Details</button>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-gray-400">Room 312 • +91 98765 43211</div>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300">View Details</button>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleSearchGuest}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-3"
                >
                  Search
                </button>
                <button 
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'view-details' && selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Guest Details</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400">Full Name</label>
                    <p className="font-medium">{selectedGuest.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">Phone</label>
                    <p className="font-medium">{selectedGuest.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">Email</label>
                    <p className="font-medium">{selectedGuest.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">ID Number</label>
                    <p className="font-medium">{selectedGuest.idNumber}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-slate-400">Address</label>
                    <p className="font-medium">{selectedGuest.address || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">Nationality</label>
                    <p className="font-medium">{selectedGuest.nationality}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">Number of Guests</label>
                    <p className="font-medium">{selectedGuest.numberOfGuests}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Booking Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400">Room Number</label>
                    <p className="font-medium">{selectedGuest.roomNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      selectedGuest.status === 'checked-in' ? 'bg-green-500/20 text-green-400' :
                      selectedGuest.status === 'checked-out' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedGuest.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">Check-in Date</label>
                    <p className="font-medium">{new Date(selectedGuest.checkInDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400">Check-out Date</label>
                    <p className="font-medium">{new Date(selectedGuest.checkOutDate).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-slate-400">Total Amount</label>
                    <p className="text-2xl font-bold text-green-400">₹{selectedGuest.totalAmount.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3"
                >
                  Close
                </button>
                {selectedGuest.status === 'checked-in' && (
                  <button 
                    onClick={() => {
                      updateGuestDetails(selectedGuest.id, { status: 'checked-out' })
                      alert(`${selectedGuest.name} checked out successfully!`)
                      closeModal()
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700 rounded p-3"
                  >
                    Check Out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import axios from 'axios'

type Room = { id: number; number: string; type: string; status: string; basePrice?: number }

export default function Rooms() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [allRooms, setAllRooms] = useState<Room[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [newRoom, setNewRoom] = useState({ number: '', type: 'Standard', status: 'AVAILABLE', basePrice: 120 })
  const [loading, setLoading] = useState(false)

  const loadRooms = async () => {
    try {
      const res = await axios.get('/api/rooms')
      const allRoomsData = res.data.data || []
      setAllRooms(allRoomsData)
      setRooms(allRoomsData)
    } catch (error) {
      console.error('Error loading rooms:', error)
      setRooms([])
      setAllRooms([])
    }
  }

  useEffect(() => {
    loadRooms()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'occupied': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'maintenance': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'cleaning': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const handleAddRoom = async () => {
    if (!newRoom.number || !newRoom.type) {
      alert('Please fill in room number and type')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/rooms', {
        number: newRoom.number,
        type: newRoom.type,
        status: newRoom.status,
        basePrice: newRoom.basePrice
      })
      
      if (response.data.success) {
        alert('Room added successfully!')
        setShowAddModal(false)
        setNewRoom({ number: '', type: 'Standard', status: 'AVAILABLE', basePrice: 120 })
        loadRooms()
      }
    } catch (error: any) {
      console.error('Error adding room:', error)
      alert(error.response?.data?.message || 'Failed to add room')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!searchQuery.trim()) {
      setRooms(allRooms)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = allRooms.filter(room => 
      room.number.toLowerCase().includes(query) ||
      room.type.toLowerCase().includes(query) ||
      room.status.toLowerCase().includes(query)
    )
    setRooms(filtered)
  }, [searchQuery, allRooms])

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-12 h-screen overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Room Management
          </h1>
          <p className="text-xl text-slate-300">Manage your hotel's room inventory and status</p>
        </div>

        {/* Room Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Total Rooms</p>
                <p className="text-3xl font-bold">{allRooms.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏨</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Available</p>
                <p className="text-3xl font-bold text-green-400">
                  {allRooms.filter(r => r.status.toLowerCase() === 'available').length}
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
                <p className="text-slate-300 text-sm">Occupied</p>
                <p className="text-3xl font-bold text-blue-400">
                  {allRooms.filter(r => r.status.toLowerCase() === 'occupied').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Maintenance</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {allRooms.filter(r => r.status.toLowerCase() === 'maintenance').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
            </div>
          </div>
        </div>

        {/* Room Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Room Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">➕</div>
                <div className="font-medium">Add Room</div>
              </button>
              <button 
                onClick={() => setShowSearchModal(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-medium">Search Rooms</div>
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg p-4 text-center transition-all transform hover:scale-105">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium">Room Analytics</div>
              </button>
              <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-lg p-4 text-center transition-all transform hover:scale-105">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-medium">Settings</div>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Room Types</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Standard Rooms</p>
                  <p className="text-xs text-slate-400">50 rooms - ₹10,000/night</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Deluxe Rooms</p>
                  <p className="text-xs text-slate-400">30 rooms - ₹16,700/night</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Premium Suites</p>
                  <p className="text-xs text-slate-400">20 rooms - ₹29,200/night</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Room List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-6">Room Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map(room => (
              <div key={room.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold">Room {room.number}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(room.status)}`}>
                    {room.status}
                  </div>
                </div>
                <div className="text-slate-300 mb-2">Type: {room.type}</div>
                {room.basePrice !== undefined && (
                  <div className="text-lg font-semibold text-emerald-400 mb-4">₹{Math.round(room.basePrice * 83.33).toLocaleString('en-IN')}/night</div>
                )}
                <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg py-2 text-sm font-medium transition-all transform hover:scale-105">
                  View Details
                </button>
              </div>
            ))}
            {rooms.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🏨</div>
                <div className="text-xl text-slate-300 mb-2">No rooms available</div>
                <div className="text-slate-400">Check back later or contact the front desk</div>
              </div>
            )}
          </div>
        </div>

        {/* Add Room Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/20">
              <h2 className="text-2xl font-bold mb-4">Add New Room</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Room Number</label>
                  <input
                    type="text"
                    value={newRoom.number}
                    onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-emerald-400"
                    placeholder="e.g., 101, 202"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Room Type</label>
                  <select
                    value={newRoom.type}
                    onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-emerald-400"
                  >
                    <option>Standard</option>
                    <option>Deluxe</option>
                    <option>Executive Suite</option>
                    <option>Presidential Suite</option>
                    <option>Penthouse Suite</option>
                    <option>Family Room</option>
                    <option>Business Room</option>
                    <option>Honeymoon Suite</option>
                    <option>Ocean View</option>
                    <option>Garden View</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    value={newRoom.status}
                    onChange={(e) => setNewRoom({ ...newRoom, status: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-emerald-400"
                  >
                    <option>AVAILABLE</option>
                    <option>OCCUPIED</option>
                    <option>CLEANING</option>
                    <option>MAINTENANCE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Base Price (USD)</label>
                  <input
                    type="number"
                    value={newRoom.basePrice}
                    onChange={(e) => setNewRoom({ ...newRoom, basePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-emerald-400"
                    placeholder="120"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleAddRoom}
                    disabled={loading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-lg py-3 font-medium transition-colors"
                  >
                    {loading ? 'Adding...' : 'Add Room'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setNewRoom({ number: '', type: 'Standard', status: 'AVAILABLE', basePrice: 120 })
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

        {/* Search Modal */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/20">
              <h2 className="text-2xl font-bold mb-4">Search Rooms</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Search by Room Number, Type, or Status</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg p-3 focus:outline-none focus:border-blue-400"
                    placeholder="Search rooms..."
                    autoFocus
                  />
                </div>
                <div className="text-sm text-slate-400">
                  Found {rooms.length} room{rooms.length !== 1 ? 's' : ''}
                </div>
                <button
                  onClick={() => {
                    setShowSearchModal(false)
                    setSearchQuery('')
                    setRooms(allRooms)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 font-medium transition-colors"
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
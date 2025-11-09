import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useHotelData } from '../../context/HotelDataContext'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<string | null>(null)
  const { rooms, housekeepingTasks, guestServices, guestDetails, revenueData, guestReviews, staffMembers } = useHotelData()
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'GUEST' })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleQuickAction = (action: string) => {
    setShowModal(action)
  }

  const closeModal = () => {
    setShowModal(null)
    setNewUser({ username: '', password: '', role: 'GUEST' })
  }

  const [settings, setSettings] = useState({
    hotelName: 'JAVA HOTEL MANAGEMENT SYSTEM',
    address: '123 Hotel Street, Mumbai, India',
    phone: '+91 98765 43210',
    notifications: true,
    autoBackup: true,
    maintenanceMode: false
  })

  const handleSaveSettings = () => {
    alert('Settings saved successfully!')
    closeModal()
  }

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings?')) {
      setSettings({
        hotelName: 'JAVA HOTEL MANAGEMENT SYSTEM',
        address: '123 Hotel Street, Mumbai, India',
        phone: '+91 98765 43210',
        notifications: true,
        autoBackup: true,
        maintenanceMode: false
      })
      alert('Settings reset successfully!')
    }
  }

  const handleCreateUser = () => {
    if (newUser.username && newUser.password) {
      // In a real app, this would make an API call
      alert(`User ${newUser.username} created successfully!`)
      closeModal()
    } else {
      alert('Please fill in all fields')
    }
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-8 h-screen overflow-y-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-slate-300">Welcome back, {user?.username || 'Admin'}</p>
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
                        <p className="text-slate-300 text-sm">Total Rooms</p>
                        <p className="text-3xl font-bold">{rooms.length}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Available: {rooms.filter(r => r.status === 'available').length} | 
                          Occupied: {rooms.filter(r => r.status === 'occupied').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🏨</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm">Active Bookings</p>
                        <p className="text-3xl font-bold">{guestDetails.filter(g => g.status === 'checked-in').length}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Check-ins Today: {guestDetails.filter(g => g.status === 'checked-in').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📅</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm">Revenue Today</p>
                        <p className="text-3xl font-bold">₹{revenueData.find(r => r.period === 'daily')?.totalRevenue.toLocaleString('en-IN') || '0'}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Room: ₹{revenueData.find(r => r.period === 'daily')?.roomRevenue.toLocaleString('en-IN') || '0'} | 
                          Service: ₹{revenueData.find(r => r.period === 'daily')?.serviceRevenue.toLocaleString('en-IN') || '0'}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">₹</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm">Staff Online</p>
                        <p className="text-3xl font-bold">{staffMembers.filter(s => s.status === 'active').length}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Housekeeping: {staffMembers.filter(s => s.role === 'housekeeping' && s.status === 'active').length} | 
                          Maintenance: {staffMembers.filter(s => s.role === 'maintenance' && s.status === 'active').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">👥</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rooms Overview */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Rooms Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-green-500/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-400">{rooms.filter(r => r.status === 'available').length}</div>
                      <div className="text-sm text-green-300">Available</div>
                    </div>
                    <div className="bg-blue-500/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-400">{rooms.filter(r => r.status === 'occupied').length}</div>
                      <div className="text-sm text-blue-300">Occupied</div>
                    </div>
                    <div className="bg-yellow-500/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-400">{rooms.filter(r => r.status === 'maintenance').length}</div>
                      <div className="text-sm text-yellow-300">Maintenance</div>
                    </div>
                    <div className="bg-purple-500/20 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-400">{rooms.filter(r => r.status === 'cleaning').length}</div>
                      <div className="text-sm text-purple-300">Cleaning</div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-2">Room</th>
                          <th className="text-left py-2">Type</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Guest</th>
                          <th className="text-left py-2">Staff</th>
                          <th className="text-left py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rooms.slice(0, 10).map(room => (
                          <tr key={room.roomNumber} className="border-b border-white/10">
                            <td className="py-2 font-medium">{room.roomNumber}</td>
                            <td className="py-2">{room.type}</td>
                            <td className="py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                room.status === 'available' ? 'bg-green-500/20 text-green-400' :
                                room.status === 'occupied' ? 'bg-blue-500/20 text-blue-400' :
                                room.status === 'maintenance' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-purple-500/20 text-purple-400'
                              }`}>
                                {room.status}
                              </span>
                            </td>
                            <td className="py-2">
                              {guestDetails.find(g => g.roomNumber === room.roomNumber && g.status === 'checked-in')?.name || '-'}
                            </td>
                            <td className="py-2">{room.assignedStaff || '-'}</td>
                            <td className="py-2">
                              <button 
                                onClick={() => alert(`Room ${room.roomNumber} details`)}
                                className="text-blue-400 hover:text-blue-300 text-xs"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Revenue Analytics */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Revenue Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-green-400">Daily Revenue</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-bold text-green-400">₹{revenueData.find(r => r.period === 'daily')?.totalRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Room:</span>
                          <span className="text-green-400">₹{revenueData.find(r => r.period === 'daily')?.roomRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="text-green-400">₹{revenueData.find(r => r.period === 'daily')?.serviceRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Occupancy:</span>
                          <span className="text-blue-400">{revenueData.find(r => r.period === 'daily')?.occupancyRate || 0}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-blue-400">Weekly Revenue</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-bold text-blue-400">₹{revenueData.find(r => r.period === 'weekly')?.totalRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Room:</span>
                          <span className="text-blue-400">₹{revenueData.find(r => r.period === 'weekly')?.roomRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="text-blue-400">₹{revenueData.find(r => r.period === 'weekly')?.serviceRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Check-ins:</span>
                          <span className="text-blue-400">{revenueData.find(r => r.period === 'weekly')?.checkIns || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold mb-3 text-purple-400">Monthly Revenue</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span className="font-bold text-purple-400">₹{revenueData.find(r => r.period === 'monthly')?.totalRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Room:</span>
                          <span className="text-purple-400">₹{revenueData.find(r => r.period === 'monthly')?.roomRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Service:</span>
                          <span className="text-purple-400">₹{revenueData.find(r => r.period === 'monthly')?.serviceRevenue.toLocaleString('en-IN') || '0'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Occupancy:</span>
                          <span className="text-purple-400">{revenueData.find(r => r.period === 'monthly')?.occupancyRate || 0}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => handleQuickAction('users')}
                        className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition-colors"
                      >
                        <div className="text-2xl mb-2">👤</div>
                        <div className="font-medium">Manage Users</div>
                      </button>
                      <button 
                        onClick={() => handleQuickAction('reports')}
                        className="bg-green-600 hover:bg-green-700 rounded-lg p-4 text-center transition-colors"
                      >
                        <div className="text-2xl mb-2">📊</div>
                        <div className="font-medium">View Reports</div>
                      </button>
                      <button 
                        onClick={() => handleQuickAction('settings')}
                        className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition-colors"
                      >
                        <div className="text-2xl mb-2">⚙️</div>
                        <div className="font-medium">System Settings</div>
                      </button>
                      <button 
                        onClick={() => handleQuickAction('notifications')}
                        className="bg-orange-600 hover:bg-orange-700 rounded-lg p-4 text-center transition-colors"
                      >
                        <div className="text-2xl mb-2">🔔</div>
                        <div className="font-medium">Notifications</div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold mb-4">Guest Satisfaction</h2>
                    <div className="space-y-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Recent Reviews</h4>
                        <div className="space-y-3">
                          {guestReviews.slice(0, 3).map(review => (
                            <div key={review.id} className="border-b border-white/10 pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{review.guestName} - Room {review.roomNumber}</p>
                                  <p className="text-sm text-slate-300">{review.review}</p>
                                  <div className="flex items-center mt-1">
                                    <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                                    <span className="text-xs text-slate-400 ml-2">{review.rating}/5</span>
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  review.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                                  review.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-red-500/20 text-red-400'
                                }`}>
                                  {review.status}
                                </span>
                              </div>
                              {review.complaints.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs text-red-400">Complaints:</p>
                                  <ul className="text-xs text-red-300 ml-2">
                                    {review.complaints.map((complaint, idx) => (
                                      <li key={idx}>• {complaint}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Satisfaction Metrics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Average Rating:</span>
                            <span className="font-bold text-yellow-400">
                              {(guestReviews.reduce((sum, r) => sum + r.rating, 0) / guestReviews.length).toFixed(1)}★
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Reviews:</span>
                            <span className="text-blue-400">{guestReviews.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Pending Complaints:</span>
                            <span className="text-red-400">
                              {guestReviews.filter(r => r.status === 'pending').length}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Resolved Issues:</span>
                            <span className="text-green-400">
                              {guestReviews.filter(r => r.status === 'resolved').length}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
      </div>

      {/* Modals */}
      {showModal === 'users' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">User Management</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Create New User</h4>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                    <select 
                      value={newUser.role}
                      onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="RECEPTIONIST">RECEPTIONIST</option>
                      <option value="HOUSEKEEPING">HOUSEKEEPING</option>
                      <option value="GUEST">GUEST</option>
                    </select>
                    <button 
                      onClick={handleCreateUser}
                      className="w-full bg-blue-600 hover:bg-blue-700 rounded p-2"
                    >
                      Create User
                    </button>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">User List</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {['admin1', 'mgr1', 'rec1', 'hk1', 'guest1'].map(userItem => (
                      <div key={userItem} className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span>{userItem}</span>
                        <div className="space-x-2">
                          <button 
                            onClick={() => alert(`Edit user: ${userItem}`)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete user: ${userItem}?`)) {
                                alert(`User ${userItem} deleted successfully!`)
                              }
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'reports' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Reports & Analytics</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Revenue Report</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Today:</span>
                    <span className="text-green-400">₹1,04,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Week:</span>
                    <span className="text-green-400">₹7,28,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month:</span>
                    <span className="text-green-400">₹37,80,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth:</span>
                    <span className="text-green-400">+12.5%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Occupancy Report</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current:</span>
                    <span className="text-blue-400">78%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Rooms:</span>
                    <span className="text-blue-400">129</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Occupied:</span>
                    <span className="text-blue-400">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance:</span>
                    <span className="text-yellow-400">3</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Guest Satisfaction</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average Rating:</span>
                    <span className="text-yellow-400">4.8★</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reviews Today:</span>
                    <span className="text-yellow-400">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complaints:</span>
                    <span className="text-red-400">2</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Staff Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Active Staff:</span>
                    <span className="text-purple-400">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasks Completed:</span>
                    <span className="text-purple-400">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className="text-green-400">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'settings' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">System Settings</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Hotel Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1">Hotel Name</label>
                    <input 
                      type="text" 
                      value={settings.hotelName}
                      onChange={(e) => setSettings({...settings, hotelName: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Address</label>
                    <input 
                      type="text" 
                      value={settings.address}
                      onChange={(e) => setSettings({...settings, address: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Phone</label>
                    <input 
                      type="text" 
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                      className="w-full bg-white/10 border border-white/20 rounded p-2" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">System Configuration</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Enable Notifications</span>
                    <input 
                      type="checkbox" 
                      checked={settings.notifications}
                      onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                      className="w-4 h-4" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Auto Backup</span>
                    <input 
                      type="checkbox" 
                      checked={settings.autoBackup}
                      onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                      className="w-4 h-4" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Maintenance Mode</span>
                    <input 
                      type="checkbox" 
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                      className="w-4 h-4" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleSaveSettings}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-3"
                >
                  Save Changes
                </button>
                <button 
                  onClick={handleResetSettings}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'notifications' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Notifications</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-green-400">System Update Available</h4>
                    <p className="text-sm text-gray-300">New version 2.1.0 is ready for installation</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                  <button 
                    onClick={() => alert('System update initiated!')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Update
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-yellow-400">Low Inventory Alert</h4>
                    <p className="text-sm text-gray-300">Cleaning supplies running low in Room 106</p>
                    <p className="text-xs text-gray-400">15 minutes ago</p>
                  </div>
                  <button 
                    onClick={() => alert('Restock order placed!')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Restock
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-red-400">Maintenance Required</h4>
                    <p className="text-sm text-gray-300">AC unit in Room 205 needs repair</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                  <button 
                    onClick={() => alert('Maintenance scheduled for Room 205!')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Schedule
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-blue-400">New Guest Check-in</h4>
                    <p className="text-sm text-gray-300">John Smith checked into Room 205</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                  <button 
                    onClick={() => alert('Guest details opened!')}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHotelData } from '../../context/HotelDataContext'
import axios from 'axios'

export default function ManagerDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<string | null>(null)
  const { rooms, housekeepingTasks, guestServices, guestDetails, revenueData, staffMembers } = useHotelData()
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [predictions, setPredictions] = useState<any>(null)
  const [loadingAnalytics, setLoadingAnalytics] = useState(false)

  useEffect(() => {
    if (showModal === 'analytics' || showModal === 'predictions') {
      loadAnalytics()
      loadPredictions()
    }
  }, [showModal])

  const loadAnalytics = async () => {
    setLoadingAnalytics(true)
    try {
      const res = await axios.get('/api/analytics/dashboard')
      setAnalyticsData(res.data.data)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoadingAnalytics(false)
    }
  }

  const loadPredictions = async () => {
    try {
      const res = await axios.get('/api/analytics/predictions')
      setPredictions(res.data.data)
    } catch (error) {
      console.error('Error loading predictions:', error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleQuickAction = (action: string) => {
    setShowModal(action)
  }

  const [selectedRoom, setSelectedRoom] = useState('')
  const [selectedStaff, setSelectedStaff] = useState('')

  const handleAssignRoom = () => {
    if (selectedRoom && selectedStaff) {
      alert(`Room ${selectedRoom} assigned to ${selectedStaff}`)
      setSelectedRoom('')
      setSelectedStaff('')
    } else {
      alert('Please select both room and staff')
    }
  }

  const handleMarkClean = () => {
    if (selectedRoom) {
      alert(`Room ${selectedRoom} marked as clean`)
      setSelectedRoom('')
    } else {
      alert('Please select a room')
    }
  }

  const handleScheduleMaintenance = () => {
    if (selectedRoom) {
      alert(`Maintenance scheduled for Room ${selectedRoom}`)
      setSelectedRoom('')
    } else {
      alert('Please select a room')
    }
  }

  const handleOutOfOrder = () => {
    if (selectedRoom) {
      alert(`Room ${selectedRoom} marked as out of order`)
      setSelectedRoom('')
    } else {
      alert('Please select a room')
    }
  }

  const closeModal = () => {
    setShowModal(null)
    setSelectedRoom('')
    setSelectedStaff('')
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-8 h-screen overflow-y-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manager Dashboard</h1>
            <p className="text-slate-300">Welcome back, {user?.username || 'Manager'}</p>
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
                        <p className="text-slate-300 text-sm">Occupancy Rate</p>
                        <p className="text-3xl font-bold">{revenueData.find(r => r.period === 'daily')?.occupancyRate || 0}%</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Available: {rooms.filter(r => r.status === 'available').length} | 
                          Occupied: {rooms.filter(r => r.status === 'occupied').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📈</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300 text-sm">Check-ins Today</p>
                        <p className="text-3xl font-bold">{revenueData.find(r => r.period === 'daily')?.checkIns || 0}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Check-outs: {revenueData.find(r => r.period === 'daily')?.checkOuts || 0}
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
                        <p className="text-slate-300 text-sm">Staff Performance</p>
                        <p className="text-3xl font-bold">{staffMembers.filter(s => s.status === 'active').length}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Active: {staffMembers.filter(s => s.status === 'active').length} | 
                          Busy: {staffMembers.filter(s => s.status === 'busy').length}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">👥</span>
                      </div>
                    </div>
                  </div>
                </div>

        {/* Management Tools */}
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
                            <th className="text-left py-2">Amount (₹)</th>
                            <th className="text-left py-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {guestDetails.filter(g => g.status === 'checked-in').map(guest => (
                            <tr key={guest.id} className="border-b border-white/10">
                              <td className="py-2 font-medium">{guest.name}</td>
                              <td className="py-2">{guest.roomNumber}</td>
                              <td className="py-2">{new Date(guest.checkInDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</td>
                              <td className="py-2">₹{guest.totalAmount.toLocaleString('en-IN')}</td>
                              <td className="py-2">
                                <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                  {guest.status === 'checked-in' ? 'Checked In' : guest.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <h2 className="text-2xl font-bold mb-4">Revenue Summary</h2>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-sm">Today's Revenue</span>
                        <span className="font-bold text-green-400">₹{revenueData.find(r => r.period === 'daily')?.totalRevenue.toLocaleString('en-IN') || '0'}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-sm">This Week</span>
                        <span className="font-bold text-blue-400">₹{revenueData.find(r => r.period === 'weekly')?.totalRevenue.toLocaleString('en-IN') || '0'}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-sm">This Month</span>
                        <span className="font-bold text-purple-400">₹{revenueData.find(r => r.period === 'monthly')?.totalRevenue.toLocaleString('en-IN') || '0'}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-sm">Occupancy Rate</span>
                        <span className="font-bold text-yellow-400">{revenueData.find(r => r.period === 'daily')?.occupancyRate || 0}%</span>
                      </div>
                    </div>
                  </div>
        </div>

        {/* Manager Quick Actions */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Manager Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button 
              onClick={() => handleQuickAction('room-management')}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🏨</div>
              <div className="font-medium">Room Management</div>
            </button>
            <button 
              onClick={() => handleQuickAction('analytics')}
              className="bg-green-600 hover:bg-green-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">Analytics</div>
            </button>
            <button 
              onClick={() => handleQuickAction('predictions')}
              className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🔮</div>
              <div className="font-medium">Predictive Engine</div>
            </button>
            <button 
              onClick={() => handleQuickAction('staff-management')}
              className="bg-indigo-600 hover:bg-indigo-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">Staff Management</div>
            </button>
            <button 
              onClick={() => handleQuickAction('reports')}
              className="bg-orange-600 hover:bg-orange-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">📈</div>
              <div className="font-medium">Reports</div>
            </button>
          </div>
        </div>
      </div>

      {/* Manager Modals */}
      {showModal === 'room-management' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Room Management</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Room Status Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Available:</span>
                    <span className="text-green-400">{rooms.filter(r => r.status === 'available').length} rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Occupied:</span>
                    <span className="text-blue-400">{rooms.filter(r => r.status === 'occupied').length} rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Maintenance:</span>
                    <span className="text-yellow-400">{rooms.filter(r => r.status === 'maintenance').length} rooms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning:</span>
                    <span className="text-purple-400">{rooms.filter(r => r.status === 'cleaning').length} rooms</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <select 
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded p-2"
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room.roomNumber} value={room.roomNumber}>
                        Room {room.roomNumber} - {room.status}
                      </option>
                    ))}
                  </select>
                  <select 
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded p-2"
                  >
                    <option value="">Select Staff</option>
                    <option value="Staff-001">Staff-001</option>
                    <option value="Staff-002">Staff-002</option>
                    <option value="Staff-003">Staff-003</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                  <button 
                    onClick={handleAssignRoom}
                    className="w-full bg-blue-600 hover:bg-blue-700 rounded p-2"
                  >
                    Assign Room
                  </button>
                  <button 
                    onClick={handleMarkClean}
                    className="w-full bg-green-600 hover:bg-green-700 rounded p-2"
                  >
                    Mark Clean
                  </button>
                  <button 
                    onClick={handleScheduleMaintenance}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 rounded p-2"
                  >
                    Schedule Maintenance
                  </button>
                  <button 
                    onClick={handleOutOfOrder}
                    className="w-full bg-red-600 hover:bg-red-700 rounded p-2"
                  >
                    Out of Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'analytics' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Analytics Dashboard</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            {loadingAnalytics ? (
              <div className="text-center py-8">Loading analytics...</div>
            ) : analyticsData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Revenue Analytics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Today:</span>
                      <span className="text-green-400">₹{analyticsData.revenue?.today?.toLocaleString('en-IN') || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Week:</span>
                      <span className="text-green-400">₹{analyticsData.revenue?.thisWeek?.toLocaleString('en-IN') || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Month:</span>
                      <span className="text-green-400">₹{analyticsData.revenue?.thisMonth?.toLocaleString('en-IN') || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className="text-green-400">+{analyticsData.revenue?.growth || 0}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Occupancy Analytics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Current Rate:</span>
                      <span className="text-blue-400">{analyticsData.occupancy?.current || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available:</span>
                      <span className="text-blue-400">{analyticsData.occupancy?.available || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Occupied:</span>
                      <span className="text-blue-400">{analyticsData.occupancy?.occupied || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance:</span>
                      <span className="text-yellow-400">{analyticsData.occupancy?.maintenance || 0}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Guest Analytics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Satisfaction:</span>
                      <span className="text-yellow-400">{analyticsData.satisfaction?.averageRating || 0}★</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reviews Today:</span>
                      <span className="text-yellow-400">{analyticsData.satisfaction?.reviewsToday || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Complaints:</span>
                      <span className="text-red-400">{analyticsData.satisfaction?.complaints || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Staff Efficiency:</span>
                      <span className="text-green-400">{analyticsData.staff?.efficiency || 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-red-400">Failed to load analytics</div>
            )}
          </div>
        </div>
      )}

      {showModal === 'predictions' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">🔮 Predictive Engine</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            {predictions ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Next Week Forecast</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Predicted Occupancy:</span>
                        <span className="text-blue-400">{predictions.nextWeekOccupancy || 0}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peak Day:</span>
                        <span className="text-green-400">{predictions.peakDay || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Demand Trend:</span>
                        <span className={`${predictions.demandTrend === 'increasing' ? 'text-green-400' : 'text-red-400'}`}>
                          {predictions.demandTrend || 'stable'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-3">Revenue Predictions</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Next Month:</span>
                        <span className="text-green-400">₹{predictions.nextMonthRevenue?.toLocaleString('en-IN') || '0'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recommended Pricing:</span>
                        <span className="text-yellow-400">+{(predictions.recommendedPricing - 1) * 100 || 0}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">7-Day Forecast</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {predictions.forecast?.map((day: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white/5 rounded">
                        <span className="text-sm">{day.date || 'N/A'}</span>
                        <div className="flex gap-4">
                          <span className="text-sm text-blue-400">Occupancy: {day.predictedOccupancy || 0}%</span>
                          <span className="text-sm text-gray-400">Confidence: {day.confidence || 0}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">Loading predictions...</div>
            )}
          </div>
        </div>
      )}

      {showModal === 'staff-management' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Staff Management</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Staff Schedule</h4>
                <div className="space-y-2">
                  {['Reception - 3 staff', 'Housekeeping - 8 staff', 'Maintenance - 2 staff', 'Security - 4 staff'].map(staff => (
                    <div key={staff} className="flex justify-between items-center p-2 bg-white/5 rounded">
                      <span>{staff}</span>
                      <span className="text-green-400">On Duty</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Performance Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tasks Completed:</span>
                    <span className="text-green-400">156/180</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className="text-green-400">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guest Complaints:</span>
                    <span className="text-red-400">3</span>
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
              <h3 className="text-2xl font-bold">Manager Reports</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Daily Report</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Check-ins:</span>
                    <span className="text-blue-400">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-outs:</span>
                    <span className="text-blue-400">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="text-green-400">₹1,93,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Occupancy:</span>
                    <span className="text-green-400">78%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Weekly Report</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Guests:</span>
                    <span className="text-blue-400">287</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="text-green-400">₹12,45,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Occupancy:</span>
                    <span className="text-green-400">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guest Rating:</span>
                    <span className="text-yellow-400">4.8★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

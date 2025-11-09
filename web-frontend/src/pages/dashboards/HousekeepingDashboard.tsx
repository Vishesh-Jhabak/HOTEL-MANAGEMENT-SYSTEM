import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useHotelData } from '../../context/HotelDataContext'

export default function HousekeepingDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<string | null>(null)
  const { rooms, housekeepingTasks, updateRoomStatus, updateHousekeepingTask, addHousekeepingTask, staffMembers, updateStaffMember } = useHotelData()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleQuickAction = (action: string) => {
    setShowModal(action)
  }

  const closeModal = () => {
    setShowModal(null)
  }

  const [supplyRequest, setSupplyRequest] = useState({
    item: '',
    quantity: 0,
    notes: ''
  })

  const handleTaskUpdate = (taskId: string, status: 'pending' | 'in-progress' | 'completed') => {
    updateHousekeepingTask(taskId, { status })
    
    // Update room status based on task completion
    const task = housekeepingTasks.find(t => t.id === taskId)
    if (task && status === 'completed') {
      updateRoomStatus(task.roomNumber, 'available', user?.username)
    } else if (task && status === 'in-progress') {
      updateRoomStatus(task.roomNumber, 'cleaning', user?.username)
    }
  }

  const handleSupplyRequest = () => {
    if (supplyRequest.item && supplyRequest.quantity > 0) {
      alert(`Supply request submitted: ${supplyRequest.quantity} ${supplyRequest.item}`)
      setSupplyRequest({ item: '', quantity: 0, notes: '' })
    } else {
      alert('Please fill in item name and quantity')
    }
  }

  const handleMaintenanceReport = () => {
    const roomNumber = (document.querySelector('input[placeholder="Room Number"]') as HTMLInputElement)?.value
    const issueType = (document.querySelector('select') as HTMLSelectElement)?.value
    const description = (document.querySelector('textarea') as HTMLTextAreaElement)?.value
    
    if (roomNumber && issueType && description) {
      alert(`Maintenance issue reported for Room ${roomNumber}: ${issueType} - ${description}`)
      closeModal()
    } else {
      alert('Please fill in all fields')
    }
  }

  return (
    <>
      <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-6 py-8 h-screen overflow-y-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Housekeeping Dashboard</h1>
              <p className="text-slate-300">Welcome back, {user?.username || 'Housekeeping Staff'}</p>
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
                  <p className="text-slate-300 text-sm">Rooms Cleaned</p>
                  <p className="text-3xl font-bold">{housekeepingTasks.filter(t => t.status === 'completed').length}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Total Tasks: {housekeepingTasks.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm">Pending Cleaning</p>
                  <p className="text-3xl font-bold">{housekeepingTasks.filter(t => t.status === 'pending').length}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Rooms to Clean: {rooms.filter(r => r.status === 'cleaning').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🧹</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm">In Progress</p>
                  <p className="text-3xl font-bold">{housekeepingTasks.filter(t => t.status === 'in-progress').length}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Active Staff: {staffMembers.filter(s => s.status === 'busy').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 text-sm">Staff Online</p>
                  <p className="text-3xl font-bold">{staffMembers.filter(s => s.status === 'active').length}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Housekeeping: {staffMembers.filter(s => s.role === 'housekeeping' && s.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
            </div>
          </div>

          {/* Staff Management */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-2xl font-bold mb-4">Staff Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {staffMembers.filter(s => s.role === 'housekeeping').map(staff => (
                <div key={staff.id} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{staff.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      staff.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      staff.status === 'busy' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {staff.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Tasks Completed:</span>
                      <span className="text-green-400">{staff.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className="text-yellow-400">{staff.rating}★</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Department:</span>
                      <span className="text-blue-400">{staff.department}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button 
                      onClick={() => updateStaffMember(staff.id, { status: staff.status === 'active' ? 'busy' : 'active' })}
                      className={`flex-1 px-3 py-1 rounded text-xs ${
                        staff.status === 'active' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {staff.status === 'active' ? 'Mark Busy' : 'Mark Active'}
                    </button>
                    <button 
                      onClick={() => alert(`View ${staff.name}'s detailed performance`)}
                      className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Task Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-4">Supplies Tracking</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-2">Item Name</th>
                      <th className="text-left py-2">Used Today</th>
                      <th className="text-left py-2">Remaining</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Last Restocked</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Towels</td>
                      <td className="py-2">45</td>
                      <td className="py-2">120</td>
                      <td className="py-2"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">Good</span></td>
                      <td className="py-2">2 days ago</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Soap</td>
                      <td className="py-2">23</td>
                      <td className="py-2">15</td>
                      <td className="py-2"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">Low</span></td>
                      <td className="py-2">1 week ago</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2">Cleaning Spray</td>
                      <td className="py-2">8</td>
                      <td className="py-2">5</td>
                      <td className="py-2"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">Critical</span></td>
                      <td className="py-2">2 weeks ago</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold mb-4">Rooms Not Cleaned</h2>
              <div className="space-y-3">
                {rooms.filter(r => r.status === 'cleaning' || r.status === 'maintenance').map(room => (
                  <div key={room.roomNumber} className="bg-white/5 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Room {room.roomNumber}</p>
                        <p className="text-sm text-slate-400">{room.type}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          room.status === 'cleaning' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {room.status}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                          {room.status === 'cleaning' ? 'Cleaning in progress' : 'Maintenance required'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Housekeeping Quick Actions */}
          <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Housekeeping Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <button 
                onClick={() => handleQuickAction('room-cleaning')}
                className="bg-green-600 hover:bg-green-700 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2">🧹</div>
                <div className="font-medium">Room Cleaning</div>
              </button>
              <button 
                onClick={() => handleQuickAction('supplies')}
                className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2">📦</div>
                <div className="font-medium">Supplies</div>
              </button>
              <button 
                onClick={() => handleQuickAction('maintenance')}
                className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2">🔧</div>
                <div className="font-medium">Maintenance</div>
              </button>
              <button 
                onClick={() => handleQuickAction('schedule')}
                className="bg-orange-600 hover:bg-orange-700 rounded-lg p-4 text-center transition-colors"
              >
                <div className="text-2xl mb-2">📅</div>
                <div className="font-medium">Schedule</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Housekeeping Modals */}
      {showModal === 'room-cleaning' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Room Cleaning</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Select Room to Clean</h4>
                <div className="space-y-2">
                  <select className="w-full bg-white/10 border border-white/20 rounded p-2">
                    <option>Room 101 - Checkout Cleaning</option>
                    <option>Room 102 - Deep Cleaning</option>
                    <option>Room 103 - Regular Cleaning</option>
                    <option>Room 104 - Maintenance Cleaning</option>
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-green-600 hover:bg-green-700 rounded p-2">Start Cleaning</button>
                    <button className="bg-blue-600 hover:bg-blue-700 rounded p-2">Mark Complete</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Cleaning Checklist</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Bathroom Cleaning</span>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bed Making</span>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vacuuming</span>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Window Cleaning</span>
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'supplies' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Supply Request</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Request Supplies</h4>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Item Name" 
                    value={supplyRequest.item}
                    onChange={(e) => setSupplyRequest({...supplyRequest, item: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2" 
                  />
                  <input 
                    type="number" 
                    placeholder="Quantity" 
                    value={supplyRequest.quantity}
                    onChange={(e) => setSupplyRequest({...supplyRequest, quantity: parseInt(e.target.value)})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2" 
                  />
                  <textarea 
                    placeholder="Notes" 
                    value={supplyRequest.notes}
                    onChange={(e) => setSupplyRequest({...supplyRequest, notes: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded p-2 h-20" 
                  />
                  <button 
                    onClick={handleSupplyRequest}
                    className="w-full bg-green-600 hover:bg-green-700 rounded p-3"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'maintenance' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Maintenance Report</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Report Issue</h4>
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Room Number" 
                    className="w-full bg-white/10 border border-white/20 rounded p-2" 
                  />
                  <select className="w-full bg-white/10 border border-white/20 rounded p-2">
                    <option>Electrical</option>
                    <option>Plumbing</option>
                    <option>HVAC</option>
                    <option>Furniture</option>
                    <option>Other</option>
                  </select>
                  <textarea 
                    placeholder="Issue Description" 
                    className="w-full bg-white/10 border border-white/20 rounded p-2 h-20" 
                  />
                  <button 
                    onClick={handleMaintenanceReport}
                    className="w-full bg-red-600 hover:bg-red-700 rounded p-3"
                  >
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
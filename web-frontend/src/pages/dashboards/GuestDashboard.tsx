import { useAuth } from '../../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useHotelData } from '../../context/HotelDataContext'

export default function GuestDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState<string | null>(null)
  const { guestServices, addGuestService, updateGuestService } = useHotelData()

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

  const handleServiceRequest = (serviceType: string, description: string) => {
    addGuestService({
      guestName: user?.username || 'Guest',
      roomNumber: '205', // This would come from user's booking data
      serviceType: serviceType as any,
      status: 'requested',
      description
    })
    closeModal()
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-8 h-screen overflow-y-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome to JAVA HOTEL</h1>
            <p className="text-slate-300">Hello, {user?.username || 'Guest'}! Enjoy your stay</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Guest Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Room Service</p>
                <p className="text-lg font-bold">24/7 Available</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Spa & Wellness</p>
                <p className="text-lg font-bold">Book Now</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🧘</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">Concierge</p>
                <p className="text-lg font-bold">Always Ready</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎩</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-sm">WiFi</p>
                <p className="text-lg font-bold">Free Premium</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📶</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guest Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Hotel Services</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleQuickAction('room-service')}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🍽️</div>
                <div className="font-medium">Room Service</div>
              </button>
              <button 
                onClick={() => handleQuickAction('pool-access')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🏊</div>
                <div className="font-medium">Pool Access</div>
              </button>
              <button 
                onClick={() => handleQuickAction('spa-booking')}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🧘</div>
                <div className="font-medium">Spa Booking</div>
              </button>
              <button 
                onClick={() => handleQuickAction('valet-parking')}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-lg p-4 text-center transition-all transform hover:scale-105"
              >
                <div className="text-2xl mb-2">🚗</div>
                <div className="font-medium">Valet Parking</div>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold mb-4">Your Stay Details</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Check-in: Today</p>
                  <p className="text-xs text-slate-400">3:00 PM - Room 205</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Check-out: Tomorrow</p>
                  <p className="text-xs text-slate-400">11:00 AM - Premium Suite</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Total Stay: 2 nights</p>
                  <p className="text-xs text-slate-400">₹37,800 total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Attractions */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Local Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-lg p-4 border border-pink-500/30">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold mb-1">City Museum</h3>
              <p className="text-sm text-slate-300">5 min walk</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg p-4 border border-blue-500/30">
              <div className="text-2xl mb-2">🌊</div>
              <h3 className="font-bold mb-1">Beach Front</h3>
              <p className="text-sm text-slate-300">10 min drive</p>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl mb-2">🛍️</div>
              <h3 className="font-bold mb-1">Shopping Mall</h3>
              <p className="text-sm text-slate-300">15 min drive</p>
            </div>
          </div>
        </div>

        {/* Real-time Service Status */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Your Service Requests</h2>
          <div className="space-y-3">
            {guestServices.filter(service => service.guestName === user?.username).length > 0 ? (
              guestServices
                .filter(service => service.guestName === user?.username)
                .map(service => (
                  <div key={service.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-blue-400">{service.serviceType.replace('-', ' ').toUpperCase()}</h4>
                        <p className="text-sm text-gray-300">{service.description}</p>
                        <p className="text-xs text-gray-400">Requested: {new Date(service.requestedAt).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          service.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          service.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {service.status.replace('-', ' ').toUpperCase()}
                        </span>
                        {service.completedAt && (
                          <p className="text-xs text-gray-400 mt-1">
                            Completed: {new Date(service.completedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-lg mb-2">No service requests yet</p>
                <p className="text-sm">Use the quick actions below to request services</p>
              </div>
            )}
          </div>
        </div>

        {/* Guest Quick Actions */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">Guest Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('room-service')}
              className="bg-green-600 hover:bg-green-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🛎️</div>
              <div className="font-medium">Room Service</div>
            </button>
            <button 
              onClick={() => handleQuickAction('concierge')}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🎩</div>
              <div className="font-medium">Concierge</div>
            </button>
            <button 
              onClick={() => handleQuickAction('maintenance')}
              className="bg-purple-600 hover:bg-purple-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">🔧</div>
              <div className="font-medium">Maintenance</div>
            </button>
            <button 
              onClick={() => handleQuickAction('feedback')}
              className="bg-orange-600 hover:bg-orange-700 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">⭐</div>
              <div className="font-medium">Feedback</div>
            </button>
          </div>
        </div>
      </div>

      {/* Guest Modals */}
      {showModal === 'room-service' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Room Service</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Food & Beverage</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Continental Breakfast</span>
                    <span className="text-green-400">₹450</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Lunch Special</span>
                    <span className="text-green-400">₹750</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Dinner Buffet</span>
                    <span className="text-green-400">₹1,200</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Room Service Fee</span>
                    <span className="text-green-400">₹150</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Housekeeping Services</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Extra Towels</span>
                    <span className="text-blue-400">Free</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Room Cleaning</span>
                    <span className="text-blue-400">Free</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Laundry Service</span>
                    <span className="text-green-400">₹300</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Ironing Service</span>
                    <span className="text-green-400">₹200</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleServiceRequest('room-service', 'Continental Breakfast')}
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded p-3"
                >
                  Order Breakfast
                </button>
                <button 
                  onClick={() => handleServiceRequest('room-service', 'Extra Towels')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-3"
                >
                  Request Towels
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'concierge' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Concierge Services</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Transportation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Airport Pickup</span>
                    <span className="text-green-400">₹1,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>City Tour</span>
                    <span className="text-green-400">₹2,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Taxi Service</span>
                    <span className="text-green-400">₹300/hour</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Entertainment & Activities</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Spa Appointment</span>
                    <span className="text-green-400">₹3,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Gym Access</span>
                    <span className="text-blue-400">Free</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Pool Access</span>
                    <span className="text-blue-400">Free</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Movie Tickets</span>
                    <span className="text-green-400">₹500</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-3">Book Service</button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'maintenance' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Maintenance Request</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Report Issue</h4>
                <div className="space-y-3">
                  <select className="w-full bg-white/10 border border-white/20 rounded p-2">
                    <option>AC/HVAC Issue</option>
                    <option>Plumbing Problem</option>
                    <option>Electrical Issue</option>
                    <option>Door/Lock Problem</option>
                    <option>Furniture Issue</option>
                    <option>Internet/WiFi</option>
                    <option>TV/Entertainment</option>
                    <option>Other</option>
                  </select>
                  <textarea placeholder="Describe the issue in detail" className="w-full bg-white/10 border border-white/20 rounded p-2 h-20"></textarea>
                  <select className="w-full bg-white/10 border border-white/20 rounded p-2">
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                    <option>High Priority</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="text" placeholder="Room Number" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="text" placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    const issueType = (document.querySelector('select') as HTMLSelectElement)?.value || 'Other'
                    const description = (document.querySelector('textarea') as HTMLTextAreaElement)?.value || 'Maintenance issue'
                    handleServiceRequest('maintenance', `${issueType}: ${description}`)
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 rounded p-3"
                >
                  Submit Request
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'feedback' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Guest Feedback</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Rate Your Experience</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Overall Rating:</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} className="text-yellow-400 hover:text-yellow-300 text-xl">★</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Room Quality:</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} className="text-yellow-400 hover:text-yellow-300 text-xl">★</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Service Quality:</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} className="text-yellow-400 hover:text-yellow-300 text-xl">★</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Cleanliness:</span>
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} className="text-yellow-400 hover:text-yellow-300 text-xl">★</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Comments</h4>
                <div className="space-y-3">
                  <textarea placeholder="Tell us about your experience..." className="w-full bg-white/10 border border-white/20 rounded p-2 h-24"></textarea>
                  <input type="text" placeholder="Your Name (Optional)" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="email" placeholder="Email (Optional)" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-orange-600 hover:bg-orange-700 rounded p-3">Submit Feedback</button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pool Access Modal */}
      {showModal === 'pool-access' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Pool Access</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Pool Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Pool Hours</span>
                    <span className="text-blue-400">6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Pool Temperature</span>
                    <span className="text-blue-400">28°C (Perfect)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Current Occupancy</span>
                    <span className="text-green-400">Low (5/50 people)</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Pool Access</span>
                    <span className="text-green-400">Free for Guests</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Pool Services</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Pool Towels</span>
                    <span className="text-blue-400">Free</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Poolside Drinks</span>
                    <span className="text-green-400">₹200-500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Poolside Snacks</span>
                    <span className="text-green-400">₹150-300</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Swimming Lessons</span>
                    <span className="text-green-400">₹1,000/hour</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleServiceRequest('pool-access', 'Pool access requested')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-3"
                >
                  Request Pool Access
                </button>
                <button 
                  onClick={() => handleServiceRequest('pool-access', 'Poolside drinks order')}
                  className="flex-1 bg-green-600 hover:bg-green-700 rounded p-3"
                >
                  Order Poolside Service
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spa Booking Modal */}
      {showModal === 'spa-booking' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Spa Booking</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Spa Services</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Deep Tissue Massage (60 min)</span>
                    <span className="text-green-400">₹3,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Relaxing Massage (45 min)</span>
                    <span className="text-green-400">₹2,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Facial Treatment</span>
                    <span className="text-green-400">₹2,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Body Scrub</span>
                    <span className="text-green-400">₹1,800</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Available Time Slots</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 rounded p-2 text-sm">9:00 AM</button>
                  <button className="bg-blue-600 hover:bg-blue-700 rounded p-2 text-sm">11:00 AM</button>
                  <button className="bg-blue-600 hover:bg-blue-700 rounded p-2 text-sm">2:00 PM</button>
                  <button className="bg-blue-600 hover:bg-blue-700 rounded p-2 text-sm">4:00 PM</button>
                  <button className="bg-blue-600 hover:bg-blue-700 rounded p-2 text-sm">6:00 PM</button>
                  <button className="bg-blue-600 hover:bg-blue-700 rounded p-2 text-sm">8:00 PM</button>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Spa Packages</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Royal Package (3 hours)</span>
                    <span className="text-purple-400">₹8,500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Couple Package (2 hours)</span>
                    <span className="text-purple-400">₹6,000</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Quick Refresh (1 hour)</span>
                    <span className="text-purple-400">₹2,200</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleServiceRequest('spa-booking', 'Deep Tissue Massage - 60 min')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 rounded p-3"
                >
                  Book Massage
                </button>
                <button 
                  onClick={() => handleServiceRequest('spa-booking', 'Royal Package - 3 hours')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 rounded p-3"
                >
                  Book Package
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Valet Parking Modal */}
      {showModal === 'valet-parking' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Valet Parking</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">✕</button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Parking Services</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Valet Parking (Per Day)</span>
                    <span className="text-green-400">₹500</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Self Parking (Per Day)</span>
                    <span className="text-green-400">₹300</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Car Wash Service</span>
                    <span className="text-green-400">₹800</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Car Detailing</span>
                    <span className="text-green-400">₹2,500</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Vehicle Information</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Vehicle Number" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="text" placeholder="Vehicle Make & Model" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <input type="text" placeholder="Color" className="w-full bg-white/10 border border-white/20 rounded p-2" />
                  <select className="w-full bg-white/10 border border-white/20 rounded p-2">
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Hatchback</option>
                    <option>Luxury Car</option>
                    <option>Motorcycle</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Additional Services</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Express Service (30 min)</span>
                    <span className="text-orange-400">₹200 extra</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Car Pickup/Drop</span>
                    <span className="text-orange-400">₹100</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-white/5 rounded">
                    <span>Emergency Service</span>
                    <span className="text-orange-400">₹500</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleServiceRequest('valet-parking', 'Valet parking service requested')}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 rounded p-3"
                >
                  Request Valet Service
                </button>
                <button 
                  onClick={() => handleServiceRequest('valet-parking', 'Car wash service requested')}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 rounded p-3"
                >
                  Request Car Wash
                </button>
                <button className="flex-1 bg-gray-600 hover:bg-gray-700 rounded p-3">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

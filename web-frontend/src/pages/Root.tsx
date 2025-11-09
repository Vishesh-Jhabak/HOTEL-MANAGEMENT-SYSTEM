import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Tile = ({title, desc, to, icon, gradient}:{title:string, desc:string, to:string, icon:string, gradient?:string}) => (
  <Link to={to} className={`block rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all transform hover:scale-105 p-6 ${gradient || ''}`}>
    <div className="text-3xl mb-3">{icon}</div>
    <div className="text-xl font-bold mb-2">{title}</div>
    <div className="text-sm opacity-70">{desc}</div>
  </Link>
)

export default function Root() {
  const { token, user } = useAuth()

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 py-12 h-screen overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            JAVA HOTEL MANAGEMENT SYSTEM
          </h1>
          <p className="text-xl text-slate-300 mb-8">Next-Generation Hospitality Platform</p>
          
          {token ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-md mx-auto">
              <p className="text-lg mb-2">Welcome back, {user?.username}!</p>
              <p className="text-sm text-slate-300 mb-4">Role: {user?.role}</p>
              <div className="space-x-2">
                <Link to="/booking" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 text-sm">
                  Book Room
                </Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token')
                    window.location.reload()
                  }}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                Sign In
              </Link>
              <Link to="/signup" className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/30">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Feature Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Core Features */}
          <Tile 
            title="Room Management" 
            desc="Advanced room inventory, status tracking, and maintenance scheduling" 
            to="/rooms" 
            icon="🏨"
          />
          
          <Tile 
            title="Booking System" 
            desc="Seamless reservation management with real-time availability" 
            to="/bookings" 
            icon="📅"
          />
          
          <Tile 
            title="Staff Management" 
            desc="Role-based access control and staff coordination tools" 
            to="#" 
            icon="👥"
          />

          {/* AI Features */}
          <Tile 
            title="AI Concierge" 
            desc="Intelligent guest assistance and personalized recommendations" 
            to="#" 
            icon="🤖"
            gradient="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30"
          />
          
          <Tile 
            title="Analytics Dashboard" 
            desc="Real-time insights and predictive analytics for better decisions" 
            to="#" 
            icon="📊"
            gradient="bg-gradient-to-br from-green-500/20 to-blue-500/20 border-green-500/30 hover:from-green-500/30 hover:to-blue-500/30"
          />
          
          <Tile 
            title="Predictive Engine" 
            desc="ML-powered forecasting for occupancy and guest preferences" 
            to="#" 
            icon="🔮"
            gradient="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 hover:from-orange-500/30 hover:to-red-500/30"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-400">
          <p>© 2025 JAVA HOTEL MANAGEMENT SYSTEM - Redefining Hospitality</p>
        </div>
      </div>
    </div>
  )
}
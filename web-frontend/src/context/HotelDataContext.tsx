import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// Types for hotel data
export interface RoomStatus {
  roomNumber: string
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance' | 'out-of-order'
  type: string
  basePrice: number
  assignedStaff?: string
  lastCleaned?: string
  cleaningStaff?: string
  maintenanceIssues?: string[]
}

export interface HousekeepingTask {
  id: string
  roomNumber: string
  taskType: 'cleaning' | 'maintenance' | 'supply-restock'
  status: 'pending' | 'in-progress' | 'completed'
  assignedStaff?: string
  priority: 'low' | 'medium' | 'high' | 'emergency'
  description: string
  createdAt: string
  completedAt?: string
}

export interface GuestService {
  id: string
  guestName: string
  roomNumber: string
  serviceType: 'room-service' | 'concierge' | 'maintenance' | 'housekeeping'
  status: 'requested' | 'in-progress' | 'completed'
  description: string
  requestedAt: string
  completedAt?: string
}

export interface GuestDetails {
  id: string
  name: string
  phone: string
  email: string
  idNumber: string
  address: string
  nationality: string
  checkInDate: string
  checkOutDate: string
  roomNumber: string
  numberOfGuests: number
  totalAmount: number
  status: 'checked-in' | 'checked-out' | 'reserved'
}

export interface RevenueData {
  id: string
  date: string
  roomRevenue: number
  serviceRevenue: number
  totalRevenue: number
  occupancyRate: number
  checkIns: number
  checkOuts: number
  period: 'daily' | 'weekly' | 'monthly'
}

export interface GuestReview {
  id: string
  guestName: string
  roomNumber: string
  rating: number
  review: string
  complaints: string[]
  date: string
  status: 'resolved' | 'pending' | 'escalated'
}

export interface StaffMember {
  id: string
  name: string
  role: 'housekeeping' | 'maintenance' | 'reception' | 'manager'
  department: string
  status: 'active' | 'busy' | 'off-duty'
  tasksCompleted: number
  rating: number
}

export interface HotelDataState {
  rooms: RoomStatus[]
  housekeepingTasks: HousekeepingTask[]
  guestServices: GuestService[]
  guestDetails: GuestDetails[]
  revenueData: RevenueData[]
  guestReviews: GuestReview[]
  staffMembers: StaffMember[]
  updateRoomStatus: (roomNumber: string, status: RoomStatus['status'], staff?: string) => void
  addHousekeepingTask: (task: Omit<HousekeepingTask, 'id' | 'createdAt'>) => void
  updateHousekeepingTask: (taskId: string, updates: Partial<HousekeepingTask>) => void
  addGuestService: (service: Omit<GuestService, 'id' | 'requestedAt'>) => void
  updateGuestService: (serviceId: string, updates: Partial<GuestService>) => void
  addGuestDetails: (guest: Omit<GuestDetails, 'id'>) => void
  updateGuestDetails: (guestId: string, updates: Partial<GuestDetails>) => void
  addRevenueData: (revenue: Omit<RevenueData, 'id'>) => void
  addGuestReview: (review: Omit<GuestReview, 'id'>) => void
  updateGuestReview: (reviewId: string, updates: Partial<GuestReview>) => void
  updateStaffMember: (staffId: string, updates: Partial<StaffMember>) => void
}

const HotelDataContext = createContext<HotelDataState | undefined>(undefined)

export function HotelDataProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<RoomStatus[]>([
    { roomNumber: '101', status: 'available', type: 'Standard', basePrice: 120, lastCleaned: '2025-01-17T09:00:00Z' },
    { roomNumber: '102', status: 'cleaning', type: 'Deluxe', basePrice: 180, cleaningStaff: 'Staff-001', assignedStaff: 'Sunita Devi' },
    { roomNumber: '103', status: 'occupied', type: 'Standard', basePrice: 120 },
    { roomNumber: '104', status: 'maintenance', type: 'Suite', basePrice: 300, maintenanceIssues: ['AC Repair'], assignedStaff: 'Meera Singh' },
    { roomNumber: '105', status: 'available', type: 'Standard', basePrice: 120, lastCleaned: '2025-01-17T10:30:00Z' },
    { roomNumber: '106', status: 'out-of-order', type: 'Deluxe', basePrice: 180, maintenanceIssues: ['Plumbing Issue'] },
    { roomNumber: '201', status: 'occupied', type: 'Deluxe', basePrice: 180 },
    { roomNumber: '202', status: 'available', type: 'Standard', basePrice: 120, lastCleaned: '2025-01-17T11:00:00Z' },
    { roomNumber: '203', status: 'cleaning', type: 'Suite', basePrice: 300, cleaningStaff: 'Staff-002', assignedStaff: 'Ravi Kumar' },
    { roomNumber: '204', status: 'occupied', type: 'Deluxe', basePrice: 180 },
    { roomNumber: '205', status: 'occupied', type: 'Suite', basePrice: 300 },
    { roomNumber: '206', status: 'available', type: 'Standard', basePrice: 120, lastCleaned: '2025-01-17T12:00:00Z' },
    { roomNumber: '301', status: 'available', type: 'Penthouse', basePrice: 600, lastCleaned: '2025-01-17T08:00:00Z' },
    { roomNumber: '302', status: 'occupied', type: 'Suite', basePrice: 300 },
    { roomNumber: '303', status: 'available', type: 'Deluxe', basePrice: 180, lastCleaned: '2025-01-17T07:30:00Z' },
    { roomNumber: '304', status: 'maintenance', type: 'Standard', basePrice: 120, maintenanceIssues: ['WiFi Issue'] },
    { roomNumber: '401', status: 'occupied', type: 'Penthouse', basePrice: 600 },
    { roomNumber: '402', status: 'available', type: 'Suite', basePrice: 300, lastCleaned: '2025-01-17T06:00:00Z' },
    { roomNumber: '403', status: 'cleaning', type: 'Deluxe', basePrice: 180, cleaningStaff: 'Staff-003', assignedStaff: 'Sunita Devi' },
    { roomNumber: '404', status: 'available', type: 'Standard', basePrice: 120, lastCleaned: '2025-01-17T05:30:00Z' },
  ])

  const [housekeepingTasks, setHousekeepingTasks] = useState<HousekeepingTask[]>([
    {
      id: '1',
      roomNumber: '102',
      taskType: 'cleaning',
      status: 'in-progress',
      assignedStaff: 'Staff-001',
      priority: 'medium',
      description: 'Checkout cleaning',
      createdAt: '2025-01-17T10:30:00Z'
    },
    {
      id: '2',
      roomNumber: '203',
      taskType: 'cleaning',
      status: 'in-progress',
      assignedStaff: 'Staff-002',
      priority: 'medium',
      description: 'Regular cleaning',
      createdAt: '2025-01-17T11:00:00Z'
    },
    {
      id: '3',
      roomNumber: '104',
      taskType: 'maintenance',
      status: 'pending',
      priority: 'high',
      description: 'AC Repair',
      createdAt: '2025-01-17T08:00:00Z'
    },
    {
      id: '4',
      roomNumber: '106',
      taskType: 'maintenance',
      status: 'pending',
      priority: 'emergency',
      description: 'Plumbing Issue',
      createdAt: '2025-01-17T07:30:00Z'
    }
  ])

  const [guestServices, setGuestServices] = useState<GuestService[]>([
    {
      id: '1',
      guestName: 'John Smith',
      roomNumber: '205',
      serviceType: 'room-service',
      status: 'completed',
      description: 'Continental Breakfast',
      requestedAt: '2025-01-17T08:00:00Z',
      completedAt: '2025-01-17T08:30:00Z'
    },
    {
      id: '2',
      guestName: 'Sarah Johnson',
      roomNumber: '312',
      serviceType: 'maintenance',
      status: 'in-progress',
      description: 'AC not working properly',
      requestedAt: '2025-01-17T09:15:00Z'
    },
    {
      id: '3',
      guestName: 'Mike Wilson',
      roomNumber: '108',
      serviceType: 'housekeeping',
      status: 'requested',
      description: 'Extra towels needed',
      requestedAt: '2025-01-17T10:00:00Z'
    }
  ])

  const [guestDetails, setGuestDetails] = useState<GuestDetails[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      idNumber: 'PAN123456789',
      address: 'Mumbai, Maharashtra',
      nationality: 'Indian',
      checkInDate: '2025-01-17T14:00:00Z',
      checkOutDate: '2025-01-19T11:00:00Z',
      roomNumber: '205',
      numberOfGuests: 2,
      totalAmount: 33400,
      status: 'checked-in'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya.sharma@email.com',
      idNumber: 'PAN123456790',
      address: 'Delhi, NCR',
      nationality: 'Indian',
      checkInDate: '2025-01-17T15:30:00Z',
      checkOutDate: '2025-01-20T11:00:00Z',
      roomNumber: '312',
      numberOfGuests: 1,
      totalAmount: 50100,
      status: 'checked-in'
    },
    {
      id: '3',
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      email: 'amit.patel@email.com',
      idNumber: 'PAN123456791',
      address: 'Ahmedabad, Gujarat',
      nationality: 'Indian',
      checkInDate: '2025-01-16T16:00:00Z',
      checkOutDate: '2025-01-18T11:00:00Z',
      roomNumber: '108',
      numberOfGuests: 3,
      totalAmount: 20000,
      status: 'checked-out'
    }
  ])

  const [revenueData, setRevenueData] = useState<RevenueData[]>([
    {
      id: '1',
      date: '2025-01-17',
      roomRevenue: 150000,
      serviceRevenue: 25000,
      totalRevenue: 175000,
      occupancyRate: 78,
      checkIns: 23,
      checkOuts: 18,
      period: 'daily'
    },
    {
      id: '2',
      date: '2025-01-10',
      roomRevenue: 1050000,
      serviceRevenue: 195000,
      totalRevenue: 1245000,
      occupancyRate: 82,
      checkIns: 156,
      checkOuts: 142,
      period: 'weekly'
    },
    {
      id: '3',
      date: '2025-01-01',
      roomRevenue: 4500000,
      serviceRevenue: 750000,
      totalRevenue: 5250000,
      occupancyRate: 85,
      checkIns: 687,
      checkOuts: 623,
      period: 'monthly'
    }
  ])

  const [guestReviews, setGuestReviews] = useState<GuestReview[]>([
    {
      id: '1',
      guestName: 'Rajesh Kumar',
      roomNumber: '205',
      rating: 4,
      review: 'Great service and clean room. Staff was very helpful.',
      complaints: ['WiFi was slow'],
      date: '2025-01-17T10:00:00Z',
      status: 'resolved'
    },
    {
      id: '2',
      guestName: 'Priya Sharma',
      roomNumber: '312',
      rating: 3,
      review: 'Room was clean but AC was not working properly.',
      complaints: ['AC not cooling', 'Room service delay'],
      date: '2025-01-17T09:30:00Z',
      status: 'pending'
    },
    {
      id: '3',
      guestName: 'Amit Patel',
      roomNumber: '108',
      rating: 5,
      review: 'Excellent stay! Everything was perfect.',
      complaints: [],
      date: '2025-01-16T11:00:00Z',
      status: 'resolved'
    }
  ])

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'Sunita Devi',
      role: 'housekeeping',
      department: 'Housekeeping',
      status: 'active',
      tasksCompleted: 24,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      role: 'housekeeping',
      department: 'Housekeeping',
      status: 'busy',
      tasksCompleted: 18,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Meera Singh',
      role: 'maintenance',
      department: 'Maintenance',
      status: 'active',
      tasksCompleted: 12,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Arjun Reddy',
      role: 'reception',
      department: 'Reception',
      status: 'active',
      tasksCompleted: 35,
      rating: 4.7
    }
  ])

  // Update room status
  const updateRoomStatus = (roomNumber: string, status: RoomStatus['status'], staff?: string) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.roomNumber === roomNumber 
          ? { 
              ...room, 
              status, 
              cleaningStaff: staff,
              lastCleaned: status === 'available' ? new Date().toISOString() : room.lastCleaned
            }
          : room
      )
    )
  }

  // Add housekeeping task
  const addHousekeepingTask = (task: Omit<HousekeepingTask, 'id' | 'createdAt'>) => {
    const newTask: HousekeepingTask = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setHousekeepingTasks(prev => [...prev, newTask])
  }

  // Update housekeeping task
  const updateHousekeepingTask = (taskId: string, updates: Partial<HousekeepingTask>) => {
    setHousekeepingTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              ...updates,
              completedAt: updates.status === 'completed' ? new Date().toISOString() : task.completedAt
            }
          : task
      )
    )
  }

  // Add guest service
  const addGuestService = (service: Omit<GuestService, 'id' | 'requestedAt'>) => {
    const newService: GuestService = {
      ...service,
      id: Date.now().toString(),
      requestedAt: new Date().toISOString()
    }
    setGuestServices(prev => [...prev, newService])
  }

  // Update guest service
  const updateGuestService = (serviceId: string, updates: Partial<GuestService>) => {
    setGuestServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { 
              ...service, 
              ...updates,
              completedAt: updates.status === 'completed' ? new Date().toISOString() : service.completedAt
            }
          : service
      )
    )
  }

  // Add guest details
  const addGuestDetails = (guest: Omit<GuestDetails, 'id'>) => {
    const newGuest: GuestDetails = {
      ...guest,
      id: Date.now().toString()
    }
    setGuestDetails(prev => [...prev, newGuest])
  }

  // Update guest details
  const updateGuestDetails = (guestId: string, updates: Partial<GuestDetails>) => {
    setGuestDetails(prev => 
      prev.map(guest => 
        guest.id === guestId 
          ? { ...guest, ...updates }
          : guest
      )
    )
  }

  // Add revenue data
  const addRevenueData = (revenue: Omit<RevenueData, 'id'>) => {
    const newRevenue: RevenueData = {
      ...revenue,
      id: Date.now().toString()
    }
    setRevenueData(prev => [...prev, newRevenue])
  }

  // Add guest review
  const addGuestReview = (review: Omit<GuestReview, 'id'>) => {
    const newReview: GuestReview = {
      ...review,
      id: Date.now().toString()
    }
    setGuestReviews(prev => [...prev, newReview])
  }

  // Update guest review
  const updateGuestReview = (reviewId: string, updates: Partial<GuestReview>) => {
    setGuestReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, ...updates }
          : review
      )
    )
  }

  // Update staff member
  const updateStaffMember = (staffId: string, updates: Partial<StaffMember>) => {
    setStaffMembers(prev => 
      prev.map(staff => 
        staff.id === staffId 
          ? { ...staff, ...updates }
          : staff
      )
    )
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random updates
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)]
      if (randomRoom && Math.random() > 0.7) {
        const statuses: RoomStatus['status'][] = ['available', 'occupied', 'cleaning', 'maintenance']
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        updateRoomStatus(randomRoom.roomNumber, randomStatus)
      }
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [rooms])

  const value: HotelDataState = {
    rooms,
    housekeepingTasks,
    guestServices,
    guestDetails,
    revenueData,
    guestReviews,
    staffMembers,
    updateRoomStatus,
    addHousekeepingTask,
    updateHousekeepingTask,
    addGuestService,
    updateGuestService,
    addGuestDetails,
    updateGuestDetails,
    addRevenueData,
    addGuestReview,
    updateGuestReview,
    updateStaffMember
  }

  return (
    <HotelDataContext.Provider value={value}>
      {children}
    </HotelDataContext.Provider>
  )
}

export function useHotelData() {
  const context = useContext(HotelDataContext)
  if (context === undefined) {
    throw new Error('useHotelData must be used within a HotelDataProvider')
  }
  return context
}

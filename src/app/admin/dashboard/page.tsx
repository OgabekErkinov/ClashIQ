'use client'
import { CustomCard } from '@/app/components/CustomCard';
import { Activity, BookOpen, Shield, TrendingUp, Users, Zap } from 'lucide-react';
import { CustomBadge } from './components/CustomBadge';
import { useUsersPersent } from '@/hooks/user.query';

const page = () => {

    const currentYear = new Date().getFullYear()
    console.log(currentYear)
    // const { isLoading, data } = useUsersPersent(currentYear)
    // console.log(data)
     const stats = {
    totalUsers: 12845,
    totalDuels: 45678,
    totalQuestions: 2340,
    activeRooms: 28,
    usersGrowth: '+12.5%',
    duelsGrowth: '+8.3%',
  };

  const liveRooms = [
    { id: 'ABC123', player1: 'Alex Chen', player2: 'Sarah Miller', category: 'Math', status: 'in-progress' },
    { id: 'DEF456', player1: 'Mike Johnson', player2: 'Emma Wilson', category: 'Science', status: 'waiting' },
    { id: 'GHI789', player1: 'John Smith', player2: 'Lisa Anderson', category: 'History', status: 'in-progress' },
    { id: 'JKL012', player1: 'David Brown', player2: 'Maria Garcia', category: 'Random', status: 'in-progress' },
  ];

  const recentUsers = [
    { id: 1, name: 'James Wilson', email: 'james@example.com', joined: '2 min ago', status: 'online' },
    { id: 2, name: 'Emily Davis', email: 'emily@example.com', joined: '15 min ago', status: 'online' },
    { id: 3, name: 'Robert Taylor', email: 'robert@example.com', joined: '1 hour ago', status: 'offline' },
    { id: 4, name: 'Jessica Moore', email: 'jessica@example.com', joined: '2 hours ago', status: 'online' },
  ];

  return (
    <div className="flex-1 p-8 h-auto">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <CustomCard className="card-gradient" variant = "primary">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="opacity-90 mb-1">Total Users</p>
              <h2 className="text-white">{stats.totalUsers.toLocaleString()}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span className="opacity-90">{stats.usersGrowth} this month</span>
          </div>
        </CustomCard>

        <CustomCard className="card-gradient" variant = "accent" hover>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="opacity-90 mb-1">Total Duels</p>
              <h2 className="text-white">{stats.totalDuels.toLocaleString()}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span className="opacity-90">{stats.duelsGrowth} this week</span>
          </div>
        </CustomCard>

        <CustomCard className="card-gradient" variant = "success">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="opacity-90 mb-1">Total Questions</p>
              <h2 className="text-white">{stats.totalQuestions.toLocaleString()}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BookOpen size={24} />
            </div>
          </div>
          <p className="opacity-90">Across all categories</p>
        </CustomCard>

        <CustomCard className="card-gradient" variant = "warning">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="opacity-90 mb-1">Active Rooms</p>
              <h2 className="text-white">{stats.activeRooms}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Activity size={24} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} />
            <span className="opacity-90">Live now</span>
          </div>
        </CustomCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Live Rooms */}
        <CustomCard>
          <h3 className="mb-6">Live Duel Rooms</h3>
          <div className="space-y-3">
            {liveRooms.map((room) => (
              <div key={room.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Shield className="text-primary-600" size={16} />
                    <span>{room.id}</span>
                  </div>
                  <CustomBadge variant={room.status === 'in-progress' ? 'success' : 'warning'} size="sm">
                    {room.status === 'in-progress' ? 'In Progress' : 'Waiting'}
                  </CustomBadge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">{room.player1} vs {room.player2}</p>
                    <p className="text-gray-500">{room.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CustomCard>

        {/* Recent Users */}
        <CustomCard>
          <h3 className="mb-6">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p>{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="text-right">
                  <CustomBadge variant={user.status === 'online' ? 'success' : 'gray'} size="sm">
                    {user.status}
                  </CustomBadge>
                  <p className="text-gray-500 mt-1">{user.joined}</p>
                </div>
              </div>
            ))}
          </div>
        </CustomCard>
      </div>

      {/* Activity Chart Placeholder */}
      <CustomCard className="mt-8">
        <h3 className="mb-6">User Activity (Last 7 Days)</h3>
        <div className="h-64 card-gradient rounded-xl full-center" data-variant = "pri-accent">
          <div className="text-center text-gray-500">
            <Activity size={48} className="mx-auto mb-4 opacity-50" />
            <p>Chart visualization would go here</p>
            <p>(Using recharts library)</p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}

export default page
"use client"
import React, { useState } from 'react';
import { Search, Trash2, Eye, Shield } from 'lucide-react';
import { CustomBadge } from '../dashboard/components/CustomBadge';
import { CustomCard } from '@/app/components/CustomCard';
import { CustomInput } from '@/app/components/CustomInput';
import { CustomButton } from '@/app/components/CustomButton';
import { CustomAvatar } from '../components/CustomAvatar';

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const rooms = [
    {
      id: 'ABC123',
      player1: 'Alex Chen',
      player2: 'Sarah Miller',
      category: 'Math',
      difficulty: 'Medium',
      status: 'in-progress',
      created: '5 min ago',
      currentQuestion: 5,
      totalQuestions: 10,
    },
    {
      id: 'DEF456',
      player1: 'Mike Johnson',
      player2: 'Emma Wilson',
      category: 'Science',
      difficulty: 'Hard',
      status: 'waiting',
      created: '10 min ago',
      currentQuestion: 0,
      totalQuestions: 10,
    },
    {
      id: 'GHI789',
      player1: 'John Smith',
      player2: 'Lisa Anderson',
      category: 'History',
      difficulty: 'Easy',
      status: 'completed',
      created: '1 hour ago',
      currentQuestion: 10,
      totalQuestions: 10,
    },
    {
      id: 'JKL012',
      player1: 'David Brown',
      player2: 'Maria Garcia',
      category: 'Random',
      difficulty: 'Medium',
      status: 'in-progress',
      created: '15 min ago',
      currentQuestion: 3,
      totalQuestions: 10,
    },
    {
      id: 'MNO345',
      player1: 'James Wilson',
      player2: null,
      category: 'Geography',
      difficulty: 'Easy',
      status: 'waiting',
      created: '3 min ago',
      currentQuestion: 0,
      totalQuestions: 10,
    },
    {
      id: 'PQR678',
      player1: 'Emily Davis',
      player2: 'Robert Taylor',
      category: 'Sports',
      difficulty: 'Hard',
      status: 'completed',
      created: '2 hours ago',
      currentQuestion: 10,
      totalQuestions: 10,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <CustomBadge variant="primary">In Progress</CustomBadge>;
      case 'waiting':
        return <CustomBadge variant="warning">Waiting</CustomBadge>;
      case 'completed':
        return <CustomBadge variant="success">Completed</CustomBadge>;
      default:
        return <CustomBadge variant="gray">{status}</CustomBadge>;
    }
  };

  const handleDeleteRoom = (roomId: string) => {
    if (confirm(`Are you sure you want to delete room ${roomId}?`)) {
      alert(`Room ${roomId} deleted`);
    }
  };

  const handleViewDetails = (roomId: string) => {
    alert(`View details for room ${roomId}`);
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <h1>Duel Rooms Management</h1>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <CustomCard>
          <p className="text-gray-600 mb-1">Total Rooms</p>
          <h3>{rooms.length}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">In Progress</p>
          <h3 className="text-primary-600">{rooms.filter(r => r.status === 'in-progress').length}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Waiting</p>
          <h3 className="text-warning-600">{rooms.filter(r => r.status === 'waiting').length}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Completed Today</p>
          <h3 className="text-success-600">{rooms.filter(r => r.status === 'completed').length}</h3>
        </CustomCard>
      </div>

      {/* Search and Filters */}
      <CustomCard className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <CustomInput
              type="text"
              placeholder="Search by Room ID or player name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={20} />}
            />
          </div>
          <div className="flex gap-2">
            <CustomButton
              variant={filterStatus === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilterStatus('all')}
            >
              All
            </CustomButton>
            <CustomButton
              variant={filterStatus === 'in-progress' ? 'primary' : 'outline'}
              onClick={() => setFilterStatus('in-progress')}
            >
              Active
            </CustomButton>
            <CustomButton
              variant={filterStatus === 'waiting' ? 'primary' : 'outline'}
              onClick={() => setFilterStatus('waiting')}
            >
              Waiting
            </CustomButton>
            <CustomButton
              variant={filterStatus === 'completed' ? 'primary' : 'outline'}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </CustomButton>
          </div>
        </div>
      </CustomCard>

      {/* Rooms List */}
      <div className="space-y-4">
        {rooms.map((room) => (
          <CustomCard key={room.id}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="text-primary-600" size={20} />
                    <h4>{room.id}</h4>
                  </div>
                  {getStatusBadge(room.status)}
                  <CustomBadge variant="gray" size="sm">
                    {room.category}
                  </CustomBadge>
                  <CustomBadge
                    variant={room.difficulty === 'Easy' ? 'success' : room.difficulty === 'Medium' ? 'warning' : 'error'}
                    size="sm"
                  >
                    {room.difficulty}
                  </CustomBadge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <CustomAvatar name={room.player1} size="sm" />
                    <div>
                      <p className="text-gray-600">Player 1</p>
                      <p>{room.player1}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    {room.player2 ? (
                      <>
                        <CustomAvatar name={room.player2} size="sm" />
                        <div>
                          <p className="text-gray-600">Player 2</p>
                          <p>{room.player2}</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <p>Waiting for opponent...</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-gray-600">Progress</p>
                    <p>{room.currentQuestion} / {room.totalQuestions}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Created</p>
                    <p>{room.created}</p>
                  </div>
                  <div>
                    {room.status === 'in-progress' && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all"
                          style={{ width: `${(room.currentQuestion / room.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2">
                <button
                  onClick={() => handleViewDetails(room.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteRoom(room.id)}
                  className="p-2 hover:bg-error-50 rounded-lg transition-colors"
                  title="Delete Room"
                >
                  <Trash2 size={18} className="text-error-600" />
                </button>
              </div>
            </div>
          </CustomCard>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-8">
        <div className="flex gap-2">
          <CustomButton variant="outline" size="sm">Previous</CustomButton>
          <CustomButton variant="primary" size="sm">1</CustomButton>
          <CustomButton variant="outline" size="sm">2</CustomButton>
          <CustomButton variant="outline" size="sm">3</CustomButton>
          <CustomButton variant="outline" size="sm">Next</CustomButton>
        </div>
      </div>
    </div>
  );
}

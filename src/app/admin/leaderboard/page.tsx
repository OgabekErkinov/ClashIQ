"use client"
import React, { useState } from 'react';
import { Trophy, RefreshCw, Edit2 } from 'lucide-react';
import { CustomButton } from '@/app/components/CustomButton';
import { CustomCard } from '@/app/components/CustomCard';
import { CustomAvatar } from '../components/CustomAvatar';
import { CustomBadge } from '../dashboard/components/CustomBadge';
import { CustomInput } from '@/app/components/CustomInput';
import { useLeaderboard } from '@/hooks/user.query';
import { IUser } from '../props/props';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import ResetModal from './modals/resetModal';
import EditModal from './modals/editModal';


dayjs.extend(relativeTime)
dayjs.extend(utc)


type LeaderboardUser = {
  rank: number;
  name: string;
  wins: number;
  rating: number;
  country: string;
  lastActive: string;
};

export default function Page() {
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [newRating, setNewRating] = useState('');

  const { data = [], isFetching } = useLeaderboard()

  const handleEditRating = (user: IUser) => {
    setSelectedUser(user);
    setNewRating(user?.rating.toString());
    setShowEditModal(true);
  };

  const handleSaveRating = () => {
    setShowEditModal(false);
  };

  const handleResetLeaderboard = () => {
    alert('Leaderboard reset to default values');
    setShowResetModal(false);
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <h1>Leaderboard Control</h1>
        <CustomButton
          variant="danger"
          icon={<RefreshCw size={18} />}
          onClick={() => setShowResetModal(true)}
        >
          Reset Leaderboard
        </CustomButton>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <CustomCard>
          <p className="text-gray-600 mb-1">Top Player Rating</p>
          <h3 className="text-primary-600">2,456</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Average Rating</p>
          <h3>1,847</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Total Ranked Players</p>
          <h3>12,845</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Last Updated</p>
          <h3>Just now</h3>
        </CustomCard>
      </div>

      {/* Leaderboard Management */}
      <CustomCard className="mb-6">
        <h3 className="mb-6">Leaderboard Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p>Auto-update Rankings</p>
              <p className="text-gray-600">Automatically recalculate rankings after each duel</p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p>Display Country Flags</p>
              <p className="text-gray-600">Show country flags in leaderboard</p>
            </div>
            <input type="checkbox" className="w-5 h-5" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p>Weekly Reset</p>
              <p className="text-gray-600">Reset weekly leaderboard every Monday</p>
            </div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        </div>
      </CustomCard>

      {/* Top Players Table */}
      <CustomCard>
        <h3 className="mb-6">Top Players Management</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left p-4">Rank</th>
                <th className="text-left p-4">Player</th>
                <th className="text-left p-4">Country</th>
                <th className="text-right p-4">Wins</th>
                <th className="text-right p-4">Rating</th>
                <th className="text-left p-4">Last Active</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.message?.map((player : IUser, idx : number) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {idx === 0 && <Trophy className="text-yellow-500" size={20} />}
                      <span>#{ idx + 1 }</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <CustomAvatar name={player?.email} size="sm" />
                      <span>{player.username}</span>
                    </div>
                  </td>
                  <td className="p-4">{player?.email}</td>
                  <td className="p-4 text-right">{player.wins}</td>
                  <td className="p-4 text-right">
                    <CustomBadge variant="primary">
                      {player.rating}
                    </CustomBadge>
                  </td>
                  <td className="p-4 text-gray-600">{dayjs(player.last_active_at).local().fromNow()}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end">
                      <button
                        onClick={() => handleEditRating(player)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Rating"
                      >
                        <Edit2 size={18} className="text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CustomCard>

      {/* Reset Leaderboard Modal */}
      {showResetModal && ResetModal({ setShowResetModal, handleResetLeaderboard })}

      {/* Edit Rating Modal */}
      {showEditModal && selectedUser && <EditModal selectedUser={selectedUser} setNewRating={setNewRating} setShowEditModal={setShowEditModal}/>}
    </div>
  );
}

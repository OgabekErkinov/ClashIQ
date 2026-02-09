"use client"
import { CustomButton } from '@/app/components/CustomButton';
import { CustomCard } from '@/app/components/CustomCard';
import { CustomInput } from '@/app/components/CustomInput';
import { Ban, CheckCircle, Edit, Search } from 'lucide-react';
import { CustomAvatar } from '../components/CustomAvatar';
import { CustomBadge } from '../dashboard/components/CustomBadge';
import { useEffect, useState } from 'react';
import { useDeleteUser, useUserList } from '@/hooks/user.query';
import { IUser } from '../props/props';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
import { useModalStore } from '@/store/modal.store';
import DeleteModal from '../components/ModalRemove';
import Modals from '../components/Modals';
dayjs.extend(relativeTime)

interface StatProps {
  users_count : number,
  active_users : number,
  blocked_users : number
}

const Page = () => {

     // states
     const [searchTerm, setSearchTerm] = useState('');
     const [searchedUsers, setSearchedUsers] = useState<IUser[]>([])
     const [activeUsers, setActiveUsers] = useState<number>()
     const [blockedUsers, setBlockedUsers] = useState<number>()
     const [customFilter, setCustomFilter] = useState<string>('all')
     const [currentPage, setCurrentPage] = useState<number>(1)
     const [startPages, setStartPages] = useState<number>(1)
     const [endPages, setEndPages] = useState<number>(Math.round(searchedUsers.length / 10))

     // datas
     const { data, isFetching } = useUserList()
     const { openModal, isOpen } = useModalStore()

     useEffect(() => {
       if (!Array.isArray(data?.message)) return

       let users = [...data.message]

       //search
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase()
          users = users.filter(
            (user: IUser) =>
              user.username?.toLowerCase().includes(term) ||
              user.email?.toLowerCase().includes(term)
            ) }

        //filter status
        if(customFilter !== 'all'){
          users = users.filter((user : IUser) => user?.status === customFilter)
        }

        setSearchedUsers(users)
        if(searchedUsers.length < 2){
          setEndPages(1)
        }

        //statistics
        const count_actives = data?.message?.filter((user : IUser) => user?.status === 'active')
        const count_blocked = data?.message?.filter((user : IUser) => user?.status === 'blocked')
        setActiveUsers(count_actives?.length)
        setBlockedUsers(count_blocked?.length)

     },[data, searchTerm, customFilter])

    //  handle functions
 const handleSearchUser = (value: string) => {
  setSearchTerm(value)
}

  const handleDeleteUser = (userId: string, type : string) => {
    openModal(type, userId)
  };

  const handleEditUser = (userId: string) => {
    alert(`Edit user ${userId}`);
  };

  const handleNavigation = (direct : string) => {
    if(direct === 'next'){
      if(searchedUsers?.length > currentPage * 10){
        setCurrentPage(prev => prev + 1)
      }  
    }else{
      if(currentPage > 1){
        setCurrentPage(prev => prev-1)
      }  
    }
  }

  return (
     <div className="flex-1 p-8 overflow-auto">
      <div className="flex items-center justify-between mb-8 ">
        <h1 className='text-3xl font-bold'>Users Management</h1>
        <CustomButton variant="primary">Add New User</CustomButton>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <CustomCard>
          <p className="text-gray-600 mb-1">Total Users</p>
          <h3 className='text-2xl font-bold'>{data?.message?.length}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Active</p>
          <h3 className="text-2xl text-success-600 font-bold">{activeUsers}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Blocked</p>
          <h3 className="text-error-600">{blockedUsers}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Online Now</p>
          <h3 className="text-primary-600">...isLoading</h3>
        </CustomCard>
      </div>

      {/* Search and Filters */}
      <CustomCard className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <CustomInput
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => handleSearchUser(e.target.value)}
              icon={<Search size={20} />}
            />
          </div>
          <div className="flex gap-2">
            <CustomButton variant="outline" onClick={() => setCustomFilter('all')}>All</CustomButton>
            <CustomButton variant="outline" onClick={() => setCustomFilter('active')}>Active</CustomButton>
            <CustomButton variant="outline" onClick={() => setCustomFilter('blocked')}>Blocked</CustomButton>
          </div>
        </div>
      </CustomCard>

      {/* Users Table */}
      <CustomCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Rating</th>
                <th className="text-left p-4">Last Active</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchedUsers?.slice((currentPage-1) * 10, currentPage * 10 + 10).map((user, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <CustomAvatar name={user?.username} size="sm" />
                      <span>{user?.username}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <CustomBadge
                      variant={user?.role === 'admin' ? 'error' : user?.role === 'super-admin' ? 'warning' : 'gray'}
                      size="sm"
                    >
                      {user?.role}
                    </CustomBadge>
                  </td>
                  <td className="p-4">
                    <CustomBadge
                      variant={user?.status === 'active' ? 'success' : 'error'}
                      size="sm"
                    >
                      {user?.status}
                    </CustomBadge>
                  </td>
                  <td className="p-4">{user.rating > 0 ? user.rating : '-'}</td>
                  <td className="p-4 text-gray-600">{dayjs(user?.last_active_at).fromNow()}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditUser(user?._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} className="text-gray-600" />
                      </button>
            
                        <button
                          onClick={() => handleDeleteUser(user?.email, 'delete')}
                          className="p-2 hover:bg-error-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Ban size={18} className="text-error-600" />
                        </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          isOpen && <Modals/>
        }

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          
          <p className="text-gray-600">
              Showing {(currentPage-1) + 1}-
                      {data?.message?.length > 10 ? currentPage * 10 : data?.message?.length} of{" "}
                      { data?.message?.length} users</p>
          <div className="flex gap-2">
            <CustomButton variant="outline" 
                          onClick={() => handleNavigation('prev')}
                          size="sm">Previous</CustomButton>
            {
              Array.from({length : endPages}).map((_ : any, idx : number) => {
                return  <CustomButton key={idx} 
                                      variant={currentPage === idx+1 ? "primary" : "outline"} 
                                      onClick={() => setCurrentPage(idx+1)}
                                      size="sm">{idx + 1}</CustomButton>
              })
            }
            <CustomButton variant="outline"
                          onClick={() => handleNavigation('next')}
                          size="sm">Next</CustomButton>
          </div>
        </div>
      </CustomCard>
    </div>
  )
}

export default Page
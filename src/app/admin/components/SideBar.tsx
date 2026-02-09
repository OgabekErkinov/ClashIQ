'use client'
import { LayoutDashboard, Users, BookOpen, FolderOpen, Shield, Trophy, LogOut } from 'lucide-react';
import { SidebarProps } from '../props/props';
import { useAuthActions } from '@/hooks/auth.query';
import { usePathname, useRouter } from 'next/navigation';

export function Sidebar() {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'questions', label: 'Questions', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: FolderOpen },
    { id: 'rooms', label: 'Duel Rooms', icon: Shield },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  //hooks
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuthActions()

  //handle functions
  const handleLogout = () => {
    logout.mutate()
  }

  const handleNavigate = (page : string) => {
    router.push(`/admin/${page}`)
  }

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6">
        <h2 className="text-primary-400">Admin Panel</h2>
      </div>

      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-colors ${
                pathname === item.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

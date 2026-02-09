"use client"
import React, { useState } from 'react';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';
import { CustomButton } from '@/app/components/CustomButton';
import { CustomCard } from '@/app/components/CustomCard';
import { CustomBadge } from '../dashboard/components/CustomBadge';
import { CustomInput } from '@/app/components/CustomInput';

export default function Page() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('primary');

  const categories = [
    { id: 1, name: 'Math', color: 'primary', questions: 450, active: true, icon: '🔢' },
    { id: 2, name: 'Science', color: 'secondary', questions: 380, active: true, icon: '🔬' },
    { id: 3, name: 'History', color: 'success', questions: 320, active: true, icon: '📚' },
    { id: 4, name: 'Geography', color: 'warning', questions: 290, active: true, icon: '🌍' },
    { id: 5, name: 'Sports', color: 'error', questions: 250, active: true, icon: '⚽' },
    { id: 6, name: 'Movies', color: 'secondary', questions: 180, active: true, icon: '🎬' },
    { id: 7, name: 'Music', color: 'primary', questions: 150, active: false, icon: '🎵' },
    { id: 8, name: 'Random', color: 'gray', questions: 650, active: true, icon: '🎲' },
  ];

  const colorOptions = [
    { value: 'primary', label: 'Blue', class: 'bg-primary-500' },
    { value: 'secondary', label: 'Purple', class: 'bg-accent-500' },
    { value: 'success', label: 'Green', class: 'bg-success-500' },
    { value: 'warning', label: 'Yellow', class: 'bg-warning-500' },
    { value: 'error', label: 'Red', class: 'bg-error-500' },
    { value: 'gray', label: 'Gray', class: 'bg-gray-500' },
  ];

  const handleDeleteCategory = (id: number) => {
    if (confirm('Are you sure you want to delete this category? All questions in this category will be moved to "Random".')) {
      alert(`Category ${id} deleted`);
    }
  };

  const handleToggleActive = (id: number) => {
    alert(`Category ${id} status toggled`);
  };

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <h1>Categories Management</h1>
        <CustomButton variant="primary" icon={<Plus size={18} />} onClick={() => setShowAddModal(true)}>
          Add Category
        </CustomButton>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <CustomCard>
          <p className="text-gray-600 mb-1">Total Categories</p>
          <h3>{categories.length}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Active Categories</p>
          <h3 className="text-success-600">{categories.filter(c => c.active).length}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Inactive Categories</p>
          <h3 className="text-error-600">{categories.filter(c => !c.active).length}</h3>
        </CustomCard>
        <CustomCard>
          <p className="text-gray-600 mb-1">Total Questions</p>
          <h3 className="text-primary-600">{categories.reduce((acc, cat) => acc + cat.questions, 0)}</h3>
        </CustomCard>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CustomCard key={category.id} className={!category.active ? 'opacity-60' : ''}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{category.name}</h4>
                    <CustomBadge variant={category.color as any} size="sm">
                      {category.color}
                    </CustomBadge>
                  </div>
                  <p className="text-gray-600">{category.questions} questions</p>
                </div>
              </div>
              <CustomBadge variant={category.active ? 'success' : 'gray'} size="sm">
                {category.active ? 'Active' : 'Inactive'}
              </CustomBadge>
            </div>

            <div className="flex gap-2">
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => handleToggleActive(category.id)}
                className="flex-1"
              >
                {category.active ? 'Deactivate' : 'Activate'}
              </CustomButton>
              <button
                onClick={() => alert(`Edit category ${category.id}`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="p-2 hover:bg-error-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 size={18} className="text-error-600" />
              </button>
            </div>
          </CustomCard>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <CustomCard className="max-w-md w-full bg-white">
            <h2 className="mb-6">Add New Category</h2>
            
            <div className="space-y-4">
              <CustomInput
                label="Category Name"
                type="text"
                placeholder="e.g., Technology, Literature..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                icon={<FolderOpen size={20} />}
              />

              <div>
                <label className="block mb-3 text-gray-700">Category Icon</label>
                <CustomInput
                  type="text"
                  placeholder="Enter emoji (e.g., 📱)"
                  maxLength={2}
                />
              </div>

              <div>
                <label className="block mb-3 text-gray-700">Badge Color</label>
                <div className="grid grid-cols-3 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setCategoryColor(color.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        categoryColor === color.value
                          ? 'border-primary-600 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 ${color.class} rounded-full mx-auto mb-2`}></div>
                      <p>{color.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5" defaultChecked />
                  <span>Set as active category</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <CustomButton
                  variant="outline"
                  fullWidth
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  variant="primary"
                  fullWidth
                  onClick={() => {
                    alert('Category added!');
                    setShowAddModal(false);
                    setCategoryName('');
                  }}
                >
                  Add Category
                </CustomButton>
              </div>
            </div>
          </CustomCard>
        </div>
      )}
    </div>
  );
}

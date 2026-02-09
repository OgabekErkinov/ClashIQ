"use client"
import { CustomButton } from '@/app/components/CustomButton';
import { CustomCard } from '@/app/components/CustomCard';
import { Edit, Plus, Search, Trash2, Upload } from 'lucide-react';
import React, { useState } from 'react'
import { CustomBadge } from '../dashboard/components/CustomBadge';
import { CustomInput } from '@/app/components/CustomInput';

const Page = () => {
    const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories', count: 2340, color: 'gray' },
    { id: 'math', name: 'Math', count: 450, color: 'primary' },
    { id: 'science', name: 'Science', count: 380, color: 'secondary' },
    { id: 'history', name: 'History', count: 320, color: 'success' },
    { id: 'geography', name: 'Geography', count: 290, color: 'warning' },
    { id: 'sports', name: 'Sports', count: 250, color: 'error' },
    { id: 'random', name: 'Random', count: 650, color: 'gray' },
  ];

  const questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correct: 2,
      category: 'Geography',
      difficulty: 'easy',
    },
    {
      id: 2,
      question: 'What is 15 × 12?',
      options: ['180', '175', '190', '165'],
      correct: 0,
      category: 'Math',
      difficulty: 'medium',
    },
    {
      id: 3,
      question: 'Who painted the Mona Lisa?',
      options: ['Van Gogh', 'Da Vinci', 'Picasso', 'Rembrandt'],
      correct: 1,
      category: 'History',
      difficulty: 'easy',
    },
    {
      id: 4,
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correct: 2,
      category: 'Science',
      difficulty: 'medium',
    },
    {
      id: 5,
      question: 'In which year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correct: 2,
      category: 'History',
      difficulty: 'medium',
    },
  ];

  const handleDeleteQuestion = (id: number) => {
    if (confirm('Are you sure you want to delete this question?')) {
      alert(`Question ${id} deleted`);
    }
  };

  const handleEditQuestion = (id: number) => {
    alert(`Edit question ${id}`);
  };
  return (
     <div className="flex-1 p-8 overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <h1>Questions Management</h1>
        <div className="flex gap-3">
          <CustomButton variant="outline" icon={<Upload size={18} />}>
            Bulk Upload
          </CustomButton>
          <CustomButton variant="primary" icon={<Plus size={18} />} onClick={() => setShowAddModal(true)}>
            Add Question
          </CustomButton>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {categories.map((cat) => (
          <CustomCard
            key={cat.id}
            hover
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-center cursor-pointer ${
              selectedCategory === cat.id ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <CustomBadge variant={cat.color as any}>
              {cat.name}
            </CustomBadge>
            <p className="text-gray-600">{cat.count} questions</p>
          </CustomCard>
        ))}
      </div>

      {/* Search */}
      <CustomCard className="mb-6">
        <CustomInput
          type="text"
          placeholder="Search questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={20} />}
        />
      </CustomCard>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q) => (
          <CustomCard key={q.id}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <CustomBadge variant="primary" size="sm">
                    {q.category}
                  </CustomBadge>
                  <CustomBadge
                    variant={q.difficulty === 'easy' ? 'success' : q.difficulty === 'medium' ? 'warning' : 'error'}
                    size="sm"
                  >
                    {q.difficulty}
                  </CustomBadge>
                </div>
                
                <h4 className="mb-4">{q.question}</h4>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {q.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border-2 ${
                        index === q.correct
                          ? 'border-success-500 bg-success-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        {index === q.correct && (
                          <CustomBadge variant="success" size="sm">
                            Correct
                          </CustomBadge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleEditQuestion(q.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={18} className="text-gray-600" />
                </button>
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-2 hover:bg-error-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} className="text-error-600" />
                </button>
              </div>
            </div>
          </CustomCard>
        ))}
      </div>

      {/* Add Question Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <CustomCard className="max-w-2xl w-full max-h-[90vh] overflow-auto">
            <h2 className="mb-6">Add New Question</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">Category</label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-primary-500">
                  <option>Math</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>Geography</option>
                  <option>Sports</option>
                  <option>Random</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Difficulty</label>
                <div className="grid grid-cols-3 gap-3">
                  <CustomButton variant="outline">Easy</CustomButton>
                  <CustomButton variant="primary">Medium</CustomButton>
                  <CustomButton variant="outline">Hard</CustomButton>
                </div>
              </div>

              <CustomInput
                label="Question"
                type="text"
                placeholder="Enter your question..."
              />

              <div>
                <label className="block mb-3 text-gray-700">Options</label>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input type="radio" name="correct" className="w-5 h-5" />
                      <CustomInput
                        type="text"
                        placeholder={`Option ${i}`}
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-gray-600">Select the radio button for the correct answer</p>
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
                    alert('Question added!');
                    setShowAddModal(false);
                  }}
                >
                  Add Question
                </CustomButton>
              </div>
            </div>
          </CustomCard>
        </div>
      )}
    </div>
  )
}

export default Page
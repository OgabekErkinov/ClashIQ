import { CustomButton } from '@/app/components/CustomButton'
import { CustomCard } from '@/app/components/CustomCard'
import { AlertTriangle } from 'lucide-react'

interface ResetModalProps {
  setShowResetModal: (value: boolean) => void;
  handleResetLeaderboard: () => void;
}

const ResetModal = ({ setShowResetModal, handleResetLeaderboard } : ResetModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <CustomCard className="max-w-md w-full bg-white">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="text-error-600" size={32} />
                  </div>
                  <h2 className="mb-2">Reset Leaderboard?</h2>
                  <p className="text-gray-600">
                    This will reset all player ratings and rankings to default values. This action cannot be undone.
                  </p>
                </div>
    
                <div className="space-y-3">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-yellow-800">
                      <strong>Warning:</strong> All historical ranking data will be permanently deleted.
                    </p>
                  </div>
    
                  <div className="flex gap-3">
                    <CustomButton
                      variant="outline"
                      fullWidth
                      onClick={() => setShowResetModal(false)}
                    >
                      Cancel
                    </CustomButton>
                    <CustomButton
                      variant="danger"
                      fullWidth
                      onClick={handleResetLeaderboard}
                    >
                      Reset Leaderboard
                    </CustomButton>
                  </div>
                </div>
              </CustomCard>
            </div>
  )
}

export default ResetModal
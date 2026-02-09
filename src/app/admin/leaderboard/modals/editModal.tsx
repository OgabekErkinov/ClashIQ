import { CustomCard } from "@/app/components/CustomCard"
import { CustomAvatar } from "../../components/CustomAvatar"
import { CustomInput } from "@/app/components/CustomInput"
import { CustomButton } from "@/app/components/CustomButton"
import { IUser } from "../../props/props"

interface EditModalProps {
    selectedUser : IUser,
    newRating : number,
    setNewRating : (value : string) => void,
    setShowEditModal : () => void,
    handleSaveRating : () => void    
}

const EditModal = ({selectedUser, newRating, setNewRating, setShowEditModal, handleSaveRating} : EditModalProps) => {
  return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <CustomCard className="max-w-md w-full">
            <h2 className="mb-6">Edit Player Rating</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <CustomAvatar name={selectedUser?.username} size="md" />
                <div>
                  <p>{selectedUser?.username}</p>
                  <p className="text-gray-600">Rank #{selectedUser?.rating}</p>
                </div>
              </div>

              <CustomInput
                label="New Rating"
                type="number"
                value={newRating}
                onChange={(e) => setNewRating(e.target.value)}
                placeholder="Enter new rating"
              />

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-blue-700">
                  Current rating: <strong>{selectedUser.rating}</strong>
                </p>
              </div>

              <div className="flex gap-3">
                <CustomButton
                  variant="outline"
                  fullWidth
                  onClick={() => setShowEditModal()}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  variant="primary"
                  fullWidth
                  onClick={handleSaveRating}
                >
                  Save Changes
                </CustomButton>
              </div>
            </div>
          </CustomCard>
        </div>
  )
}

export default EditModal
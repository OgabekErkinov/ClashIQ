import { CustomButton } from '@/app/components/CustomButton'
import { CustomCard } from '@/app/components/CustomCard'
import { useModalStore } from '@/store/modal.store'
import { UseMutationResult } from '@tanstack/react-query'

interface DeleteModalProps {
    deleteMutation : UseMutationResult<void, unknown, string>
}

const Delete = ({ deleteMutation } : DeleteModalProps) => {
    
    const { id, closeModal } = useModalStore()
    const { mutate, isPending, isError } = deleteMutation

  return (
    <CustomCard>
                <div className="h-[100px] flex flex-col justify-around items-center">
                    <p className="font-bold text-black">Are you sure to delete : {id} ..?</p>
                    <div className="w-full flex justify-around">
                        {
                            !isPending ?
                                <CustomButton variant="secondary" 
                                              size="md"
                                              onClick={() => { if(!id) return 
                                                               mutate(id) }}>
                                  Yes
                                </CustomButton> : 
                                <CustomButton variant="ghost"
                                              size="md"
                                              disabled = {true}>
                                                deleting...
                                </CustomButton>
                        }
    
                        <CustomButton variant="danger" 
                                      size="md" 
                                      disabled = {isPending} 
                                      onClick={closeModal}>
                            Exit
                        </CustomButton>
                    </div>
    
    
                </div>
            </CustomCard>
  )
}

export default Delete
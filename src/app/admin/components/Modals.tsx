import { CustomCard } from '@/app/components/CustomCard'
import { useModalStore } from '@/store/modal.store'
import Delete from './modals/Delete'
import Add from './modals/Add'
import Edit from './modals/Edit'
import { CustomButton } from '@/app/components/CustomButton'
import { X } from 'lucide-react'

const Modals = () => {
    
    const { closeModal, type, id } = useModalStore()

  return (
    <div className='full-size full-center bg-[rgba(0,0,0,0.7)] fixed top-0 left-0 z-10'>
        <CustomButton className='h-4 w-4 rounded-md full-center'
                      onClick={closeModal}> 
            <X className='text-red-600'/>
        </CustomButton>
        <CustomCard>
            {
                type === 'delete' ? <Delete /> : 
                type === 'add' ? <Add/> : <Edit/>
            }
        </CustomCard>
    </div>
  )
}

export default Modals
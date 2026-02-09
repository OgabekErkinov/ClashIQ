import { Sidebar } from "./components/SideBar"

const AdminLayout = ({ children } : { children : React.ReactNode }) => {
  

  return (
    <div className='flex h-screen w-screen overflow-hidden'>
      <Sidebar/>
      <div className="full-size overflow-y-auto bg-white">
        { children }

      </div>
      
    </div>
  )
}

export default AdminLayout
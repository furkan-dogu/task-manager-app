import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-3'>
      <h3 className='text-black dark:text-white text-7xl font-medium'>404</h3>
      <p className='text-black dark:text-white text-2xl font-medium'>Sayfa Bulunamadı</p>
      <p className='text-black dark:text-white text-lg'>Üzgünüz, aradığınız sayfa mevcut değil</p>
      <button 
        className='text-xs md:text-sm font-medium text-primary whitespace-nowrap bg-blue-50 dark:bg-blue-300 border border-blue-100 rounded-lg px-4 py-2 cursor-pointer'
        onClick={() => navigate(-1)}
      >
        Önceki Sayfaya Dön
        </button>
    </div>  
  )
}

export default NotFound
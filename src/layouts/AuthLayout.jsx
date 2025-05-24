import Result from "../assets/images/result.png"

const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] sm:px-12 px-[5%] pt-8'>
            <h2 className='text-lg font-medium text-black dark:text-white'>Görev Yönetimi</h2>
            {children}
        </div>
        <div className='hidden md:flex w-[40vw] h-screen items-center justify-center bg-cyan-700 overflow-hidden p-8'>
            <img src={Result} alt="Result" className='w-64 lg:w-[90%]' />
        </div>
    </div>
  )
}

export default AuthLayout
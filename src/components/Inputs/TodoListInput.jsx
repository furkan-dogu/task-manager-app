import { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';

const TodoListInput = ({ todoList, setTodoList }) => {
    const [option, setOption] = useState("")

    const handleAddOption = () => {
        setTodoList([...todoList, option.trim()]);
        setOption("");
    }

    const handleDeleteOption = (index) => {
        const updatedArr = todoList.filter((_, idx) => idx !== index);
        setTodoList(updatedArr);
    }

    return (
        <div>
            {todoList.map((item, index) => (
                <div
                    key={index}
                    className='flex justify-between bg-gray-50 dark:bg-gray-500 border border-gray-100 dark:border-gray-400 px-3 py-2 rounded-md mb-3 mt-2'
                >
                    <p className='text-xs text-black dark:text-white'>
                        <span className='text-xs text-gray-400 dark:text-gray-300 font-semibold mr-2'>
                            {index < 9 ? `0${index + 1}` : index + 1}
                        </span>
                        {item}
                    </p>
                    <button
                        className='cursor-pointer'
                        onClick={() => handleDeleteOption(index)}
                    >
                        <HiOutlineTrash className='text-lg text-red-500 dark:text-red-300' />
                    </button>
                </div>
            ))}
            <div className='flex sm:flex-row flex-col sm:items-center items-start gap-5 mt-4'>
                <input 
                    type="text"
                    placeholder='Görev Girin' 
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    className='w-full text-[13px] text-black dark:text-white outline-none bg-white dark:bg-gray-500 border border-gray-100 dark:border-gray-400 px-3 py-2 rounded-md'
                />
                <button
                    className='card-btn text-nowrap'
                    onClick={handleAddOption}
                >
                    <HiMiniPlus className='text-lg' /> Ekle
                </button>
            </div>
        </div>
    )
}

export default TodoListInput
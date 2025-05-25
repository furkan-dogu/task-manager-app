import { useState } from 'react'
import { HiMiniPlus, HiOutlineTrash } from 'react-icons/hi2';
import { LuPaperclip } from 'react-icons/lu';

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (option.trim()) {
            setAttachments([...attachments, option.trim()]);
            setOption("");
        }
    }

    const handleDeleteOption = (index) => {
        const updatedArr = attachments.filter((_, idx) => idx !== index);
        setAttachments(updatedArr);
    }

    return (
        <div>
            {attachments.map((item, index) => (
                <div 
                    key={index}
                    className='flex justify-between bg-gray-50 dark:bg-gray-500 border border-gray-100 dark:border-gray-400 px-3 py-2 rounded-md mb-3 mt-2'
                >
                    <div className='flex-1 flex items-center gap-3'>
                        <LuPaperclip className='text-gray-400 dark:text-gray-200' />
                        <p className='text-xs text-black dark:text-white'>{item}</p>
                    </div>
                    <button
                        className='cursor-pointer'
                        onClick={() => handleDeleteOption(index)}
                    >
                        <HiOutlineTrash className='text-lg text-red-500 dark:text-red-300' />
                    </button>
                </div>
            ))}

            <div className='flex sm:flex-row flex-col sm:items-center items-start gap-5 mt-4'>
                <div className='flex-1 flex items-center gap-3 border border-gray-100 dark:border-gray-400 rounded-md px-3 w-full'>
                    <LuPaperclip className='text-gray-400 dark:text-gray-200' />
                    <input 
                        type="text" 
                        placeholder='Dosya Bağlantısı Ekle'
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                        className='w-full text-[13px] text-black dark:text-white outline-none bg-white dark:bg-gray-500 py-2 dark:placeholder:text-gray-200'
                    />
                </div>
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

export default AddAttachmentsInput
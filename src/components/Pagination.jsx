import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPaginationRange = () => {
    const pages = [];

    const add = (val) => {
      if (!pages.includes(val) && val >= 1 && val <= totalPages) {
        pages.push(val);
      }
    };

    // 1 her zaman başta
    add(1);

    // Sol "..."
    if (currentPage - 2 > 2) {
      pages.push("...");
    } else if (currentPage - 2 === 2) {
      add(2);
    }

    // Ortadaki sayfalar
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) add(i);
    }

    // Sağ "..."
    if (totalPages - (currentPage + 2) > 1) {
      pages.push("...");
    } else if (totalPages - (currentPage + 2) === 1) {
      add(totalPages - 1);
    }

    // Son sayfa
    add(totalPages);

    return pages;
  };

  const paginationRange = getPaginationRange();

  return (
    <nav className="flex justify-center">
      <ul className="inline-flex items-center justify-center flex-wrap space-x-0.5 text-sm">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-500 dark:text-gray-100 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed md:size-10 sm:size-8 size-7 rounded-full flex items-center justify-center"
          >
            <FaAngleLeft />
          </button>
        </li>

        {paginationRange.map((item, index) => (
          <li key={index}>
            {item === "..." ? (
              <div className="md:size-10 sm:size-8 size-7 rounded-full md:text-base sm:text-sm text-xs flex items-center justify-center border-2 bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-100 border-gray-300 dark:border-gray-400">
                <span className="px-1 py-2 leading-tight text-gray-400">...</span>
              </div>
            ) : (
              <button
                onClick={() => onPageChange(item)}
                className={`border-2 cursor-pointer md:size-10 sm:size-8 size-7 rounded-full md:text-base sm:text-sm text-xs flex items-center justify-center ${
                  item === currentPage
                    ? "bg-primary text-white border-blue-500"
                    : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-100 hover:bg-gray-100 hover:text-gray-700 border-gray-300 dark:border-gray-400"
                }`}
              >
                {item}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-gray-500 dark:text-gray-100 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed md:size-10 sm:size-8 size-7 rounded-full flex items-center justify-center"
          >
            <FaAngleRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

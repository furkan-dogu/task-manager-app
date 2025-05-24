const InfoCard = ({ label, value, color }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={` w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`}></div>
      <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
        <span className="text-sm md:text-[15px] text-black dark:text-white font-semibold">
          {value}
        </span>{" "}
        {label}
      </p>
    </div>
  );
};

export default InfoCard;

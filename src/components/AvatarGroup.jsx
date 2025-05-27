const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
  const hiddenAvatars = avatars.slice(maxVisible);

  return (
    <div className="flex items-center relative">
      {avatars.slice(0, maxVisible).map((avatar, index) => (
        <div key={index} className="relative group size-9 -ml-3 first:ml-0">
          <img
            src={avatar.image}
            alt={avatar.name}
            className="size-9 rounded-full object-cover border-2 border-white dark:border-gray-300"
          />

          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[11px] font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
            {avatar.name}
          </div>
        </div>
      ))}

      {hiddenAvatars.length > 0 && (
        <div className="relative group size-9 -ml-3">
          <div className="size-9 flex items-center justify-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white dark:border-gray-300 cursor-pointer">
            +{hiddenAvatars.length}
          </div>

          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[11px] font-medium py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 max-w-40 w-max break-words text-center">
            {hiddenAvatars.map((avatar) => avatar.name).join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;

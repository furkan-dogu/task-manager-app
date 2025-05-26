const tabs = [
  { id: "info", label: "Kullanıcı Bilgileri" },
  { id: "password", label: "Şifre Değiştir" },
];

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="xs:w-full sm:w-auto mt-5">
      <div className="sm:flex sm:flex-row grid grid-cols-2 gap-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-2 text-sm font-medium cursor-pointer ${
              activeTab === tab.id
                ? "text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            }`}
          >
            <div className="flex items-center justify-center sm:text-sm text-xs">
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;

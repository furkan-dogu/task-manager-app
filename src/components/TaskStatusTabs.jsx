const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  const translateLabel = (label) => {
    switch (label) {
      case "All":
        return "Hepsi";
      case "Pending":
        return "Bekleyen";
      case "In Progress":
        return "Devam Eden";
      case "Completed":
        return "Tamamlanan";
      default:
        return label;
    }
  }
  return (
    <div className="my-2 xs:w-full sm:w-auto">
      <div className="sm:flex sm:flex-row xs:grid xs:grid-cols-2 flex flex-col gap-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative py-2 text-sm font-medium cursor-pointer ${
              activeTab === tab.label
                ? "text-primary"
                : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center">
              <span className="sm:text-xs text-[10px]">{translateLabel(tab.label)}</span>
              <span
                className={`sm:text-xs text-[10px] sm:ml-2 ml-1.5 sm:px-2 px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.label
                    ? "bg-primary text-white"
                    : "bg-gray-200/70 text-gray-600 dark:bg-white"
                }`}
              >
                {tab.count}
              </span>
            </div>
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 w-full sm:max-w-28 max-w-24 h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;

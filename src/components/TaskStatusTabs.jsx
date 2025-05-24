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
    <div className="my-2">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`relative px-3 md:px-4 py-2 text-sm font-medium cursor-pointer ${
              activeTab === tab.label
                ? "text-primary"
                : "text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            <div className="flex items-center">
              <span className="text-xs">{translateLabel(tab.label)}</span>
              <span
                className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                  activeTab === tab.label
                    ? "bg-primary text-white"
                    : "bg-gray-200/70 text-gray-600 dark:bg-white"
                }`}
              >
                {tab.count}
              </span>
            </div>
            {activeTab === tab.label && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusTabs;

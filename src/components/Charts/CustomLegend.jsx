const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap xs:justify-center gap-2 mt-4 space-x-6">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2">
          <div className="size-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend
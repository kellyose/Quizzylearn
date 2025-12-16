// Minimal StatCard (alternative)
export default function MinimalStatCard({ icon: Icon, label, value, change }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-purple-600" />
        </div>
        {change && (
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}
const TileCard = ({ name, isBlocked, onToggle, onEdit }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex justify-between items-center">
      <span className="text-lg font-semibold">{name}</span>
      <div className="flex items-center gap-4">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" checked={!isBlocked} onChange={onToggle} />
          <span className="ml-2 text-sm">{isBlocked ? 'Blocked' : 'Active'}</span>
        </label>
        <button onClick={onEdit} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
      </div>
    </div>
  );
};

export default TileCard;

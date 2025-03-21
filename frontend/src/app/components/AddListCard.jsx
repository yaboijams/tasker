const AddListCard = ({ onAddList }) => {
  return (
    <div
      onClick={onAddList}
      className="min-w-[250px] flex items-center justify-center border-dashed border-2 border-gray-300 p-4 rounded-md cursor-pointer hover:bg-gray-100"
    >
      <span className="text-gray-500">+ Add List</span>
    </div>
  );
};
export default AddListCard;

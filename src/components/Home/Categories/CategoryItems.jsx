import { IoIosArrowForward } from "react-icons/io";
const CategoryItems = ({ index, category }) => {
  const gradients = [
    "from-pink-100 to-blue-100",
    "from-blue-100 to-purple-100",
    "from-purple-100 to-pink-100",
    "from-pink-100 to-blue-100",
  ];
  return (
    <div
      className={`bg-gradient-to-br ${
        gradients[index % gradients.length]
      } p-6 rounded-xl space-y-2 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className="bg-pink-500 rounded-full px-3 py-1 text-lg text-white">
          {category.name.charAt(0)}
        </div>
        <div className="bg-white text-gray-500 px-2 py-1 text-sm rounded-full">
          {category.product_count} Items
        </div>
      </div>
      <h2 className="font-semibold text-lg">{category.name}</h2>
      <p className="text-sm text-gray-500"> {category.description}</p>
      <div className="flex justify-start items-center text-pink-500 font-semibold ">
        <span>Explore</span>
        <IoIosArrowForward />
      </div>
    </div>
  );
};

export default CategoryItems;

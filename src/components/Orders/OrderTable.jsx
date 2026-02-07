import OrderItems from "./OrderItems";

const OrderTable = ({ items }) => {
  // Mobile-optimized view
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b-2 border-teal-200">
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-3 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
              <th className="px-3 py-3 text-center text-sm font-semibold text-gray-700">Qty</th>
              <th className="px-3 py-3 text-right text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <OrderItems key={item.id} item={item} isMobile={false} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {items.map((item) => (
          <OrderItems key={item.id} item={item} isMobile={true} />
        ))}
      </div>
    </>
  );
};

export default OrderTable;

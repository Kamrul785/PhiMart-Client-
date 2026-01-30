import { FiTrash2, FiShoppingCart } from "react-icons/fi";

const CartItemList = ({ items, handleUpdateQuantity, handleRemoveItem }) => {
  if (items?.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-lg text-gray-500 font-medium">Your Cart is Empty</p>
        <p className="text-sm text-gray-400 mt-2">Add some items to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
        <FiShoppingCart className="w-6 h-6 text-teal-600" />
        Shopping Cart
      </h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-teal-200">
              <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-4 py-4 text-right text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Quantity</th>
              <th className="px-4 py-4 text-right text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-4 py-4">
                  <p className="font-medium text-gray-800">{item.product.name}</p>
                </td>
                <td className="px-4 py-4 text-right">
                  <p className="text-gray-600 font-medium">${parseFloat(item.product.price).toFixed(2)}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-1 hover:bg-gray-200 rounded transition text-teal-600"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                      }
                      className="w-12 text-center font-semibold border border-gray-200 rounded py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-gray-200 rounded transition text-teal-600"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <p className="font-bold text-teal-600">${item.total_price.toFixed(2)}</p>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition"
                    aria-label={`Remove ${item.product.name} from cart`}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {items?.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
          >
            {/* Header with name and delete */}
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-gray-800 text-sm flex-1 pr-2">{item.product.name}</h3>
              <button
                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition flex-shrink-0"
                aria-label={`Remove ${item.product.name}`}
                onClick={() => handleRemoveItem(item.id)}
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Price and Quantity */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-gray-800">${parseFloat(item.product.price).toFixed(2)}</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Quantity:</span>
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(
                        item.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                    className="p-1 hover:bg-gray-200 rounded transition text-teal-600 text-sm"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    className="w-10 text-center font-semibold text-sm bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="p-1 hover:bg-gray-200 rounded transition text-teal-600 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100 font-bold">
                <span className="text-gray-700">Total:</span>
                <span className="text-teal-600 text-lg">${item.total_price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItemList;

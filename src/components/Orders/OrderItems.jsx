import React from "react";

const OrderItems = ({ item, isMobile = false }) => {
  if (isMobile) {
    // Mobile card view
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">{item.product.name}</p>
              <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-teal-600 whitespace-nowrap">${item.total_price.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
            <span>Unit Price: ${item.price.toFixed(2)}</span>
            <span>Total: {item.quantity} × ${item.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  }

  // Desktop table row
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition">
      <td className="px-3 py-4 text-sm font-medium text-gray-800">{item.product.name}</td>
      <td className="px-3 py-4 text-right text-sm text-gray-600">${item.price.toFixed(2)}</td>
      <td className="px-3 py-4 text-center text-sm text-gray-700 font-medium">{item.quantity}</td>
      <td className="px-3 py-4 text-right text-sm font-bold text-teal-600">${item.total_price.toFixed(2)}</td>
    </tr>
  );
};

export default OrderItems;

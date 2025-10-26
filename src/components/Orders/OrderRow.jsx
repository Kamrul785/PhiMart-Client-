const OrderRow = ({ order }) => {
  // 1. Create a Date object from the ISO 8601 string
  const date = new Date(order.created_at);

  // 2. Define options for the desired output format
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  // 3. Format the date using Intl.DateTimeFormat
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);

  // Custom step for exact formatting (optional, but ensures 'OCT' and comma)
  const [day, month, year] = formattedDate.split(/[ ,]+/); // Split by space or comma
  const finalFormattedDate = `${day} ${month.toUpperCase()}, ${year}`;

  return <div>{finalFormattedDate}</div>;
};

export default OrderRow;

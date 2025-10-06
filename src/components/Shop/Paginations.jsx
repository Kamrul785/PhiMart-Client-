const Paginations = ({ totalPages, currentPage, handleCurrentPage }) => {
  return (
    <div className="flex justify-center my-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handleCurrentPage(i + 1)}
          className={`mx-1 px-3 py-1 rounded cursor-pointer ${
            currentPage === i + 1 ? "bg-secondary text-white" : "bg-gray-200"
          } `}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginations;

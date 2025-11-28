import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import authApiClient from "../services/auth-api-client";
import { FiPackage, FiImage, FiCheck, FiUpload } from "react-icons/fi";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch Categories
  useEffect(() => {
    apiClient.get("/categories/").then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);

  // Submit Product Details
  const handleProductAdd = async (data) => {
    try {
      const productRes = await authApiClient.post("/products/", data);
      setProductId(productRes.data.id);
      setSuccessMsg("Product created successfully! Now upload images.");
    } catch (error) {
      console.log("Error adding product", error);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Handle Image Upload
  const handleUpload = async () => {
    if (!images.length) return alert("Please select images.");
    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append("image", image);
        console.log(formData);
        await authApiClient.post(`/products/${productId}/images/`, formData);
        setLoading(false);
      }
      setSuccessMsg("Images uploaded successfully! Product is now live.");
    } catch (error) {
      console.log(("Error uploading image", error));
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4 animate-fade-in-up">
          <div className="p-3 bg-teal-100 rounded-xl">
            <FiPackage className="w-8 h-8 text-teal-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600">Create a new product listing</p>
          </div>
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-fade-in-up">
            <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-700">{successMsg}</p>
          </div>
        )}

        {!productId ? (
          // Product Details Form
          <form onSubmit={handleSubmit(handleProductAdd)} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-fade-in-up">
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Product Name *
                </label>
                <input
                  {...register("name", { required: "Product name is required" })}
                  className={`w-full px-4 py-2 border-2 rounded-lg transition focus:outline-none ${
                    errors.name
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  }`}
                  placeholder="e.g., Premium Wireless Headphones"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">• {errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  className={`w-full px-4 py-2 border-2 rounded-lg transition focus:outline-none min-h-32 ${
                    errors.description
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  }`}
                  placeholder="Describe your product..."
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">• {errors.description.message}</p>
                )}
              </div>

              {/* Price and Stock Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", {
                      required: "Price is required",
                      validate: (value) => {
                        const parsedValue = parseFloat(value);
                        return !isNaN(parsedValue) && parsedValue > 0 || "Please enter a valid price!";
                      },
                    })}
                    className={`w-full px-4 py-2 border-2 rounded-lg transition focus:outline-none ${
                      errors.price
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="mt-2 text-sm text-red-600">• {errors.price.message}</p>
                  )}
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    {...register("stock", { required: "Stock quantity is required" })}
                    className={`w-full px-4 py-2 border-2 rounded-lg transition focus:outline-none ${
                      errors.stock
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-gray-300 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    }`}
                    placeholder="0"
                  />
                  {errors.stock && (
                    <p className="mt-2 text-sm text-red-600">• {errors.stock.message}</p>
                  )}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Category *
                </label>
                <select
                  {...register("category", { required: "Please select a category" })}
                  className={`w-full px-4 py-2 border-2 rounded-lg transition focus:outline-none bg-white ${
                    errors.category
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">• {errors.category.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 active:scale-100 flex items-center justify-center gap-2"
              >
                <FiPackage className="w-5 h-5" />
                Create Product
              </button>
            </div>
          </form>
        ) : (
          // Image Upload Form
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="p-4 bg-blue-100 rounded-xl w-fit mx-auto mb-4">
                <FiImage className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Upload Product Images</h3>
              <p className="text-gray-600 mt-2">Add photos to showcase your product</p>
            </div>

            {/* File Input */}
            <div className="mb-6">
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition">
                <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-gray-900 font-semibold">Click to upload images</p>
                <p className="text-gray-600 text-sm">or drag and drop</p>
              </label>
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-4">Selected Images ({previewImages.length})</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previewImages.map((src, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-24 rounded-lg object-cover border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 rounded-lg transition flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">Image {idx + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={loading || previewImages.length === 0}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <FiUpload className="w-5 h-5" />
                  Upload Images
                </>
              )}
            </button>

            {/* Info */}
            <p className="text-xs text-gray-600 text-center mt-4">
              Supported formats: JPG, PNG, WebP. Max size: 5MB per image.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AddProduct;

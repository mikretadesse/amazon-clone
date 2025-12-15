export const productUrl = "https://fakestoreapi.com/";

// Helper functions
export const fetchAllProducts = () => `${productUrl}products`;
export const fetchProductById = (id) => `${productUrl}products/${id}`;
export const fetchProductsByCategory = (categoryName) =>
  `${productUrl}products/category/${encodeURIComponent(categoryName)}`;
export const fetchCategories = () => `${productUrl}products/categories`;

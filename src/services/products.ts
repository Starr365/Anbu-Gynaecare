/**
 * Products service - Handles product catalog management
 * Endpoints: POST /api/products, GET /api/products
 */

import api from '../libs/api';
import { CreateProductDto, Product, PaginatedResponse } from '../types/api';
import { getErrorMessage } from '../libs/error-handler';

/**
 * Create a new product
 * Requires valid Bearer token and admin privileges
 * 
 * @param payload - CreateProductDto containing:
 *   - title: Product name
 *   - price: Product price in cents/smallest currency unit
 *   - number_of_pad: Number of pads in package
 *   - description: Product description
 *   - content: Array of additional details
 *   - environmental_impact: Environmental impact statement
 * 
 * @returns Created product object
 * @throws Error if validation fails or user not authorized
 */
export const createProduct = async (
  payload: CreateProductDto
): Promise<Product> => {
  try {
    // Validate required fields
    const requiredFields = [
      'title',
      'price',
      'number_of_pad',
      'description',
      'content',
      'environmental_impact',
    ];

    for (const field of requiredFields) {
      if (!(field in payload)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Validate price is positive
    if (payload.price <= 0) {
      throw new Error('Price must be greater than 0');
    }

    // Validate number of pads is positive
    if (payload.number_of_pad <= 0) {
      throw new Error('Number of pads must be greater than 0');
    }

    const res = await api.post<{ data: Product }>('/products', payload);
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to create product: ${message}`);
  }
};

/**
 * Fetch all available products
 * Requires valid Bearer token
 * 
 * @returns Array of all products in catalog
 * @throws Error if request fails
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await api.get<PaginatedResponse<Product>>('/products');
    return res.data.data;
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    throw new Error(`Failed to fetch products: ${message}`);
  }
};

/**
 * Cache for products catalog
 */
let productsCache: Product[] = [];
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour - products don't change frequently

/**
 * Get products with caching
 * Products are relatively static, so longer cache is appropriate
 */
export const getProductsWithCache = async (
  skipCache = false
): Promise<Product[]> => {
  const now = Date.now();

  if (
    !skipCache &&
    productsCache.length > 0 &&
    now - cacheTimestamp < CACHE_DURATION
  ) {
    return productsCache;
  }

  const products = await getProducts();
  productsCache = products;
  cacheTimestamp = now;

  return products;
};

/**
 * Clear products cache (useful after creating new product)
 */
export const clearProductsCache = (): void => {
  productsCache = [];
  cacheTimestamp = 0;
};

/**
 * Format price for display
 * @param priceInCents - Price in cents
 * @returns Formatted price string
 */
export const formatPrice = (priceInCents: number): string => {
  return `₦${(priceInCents / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Sort products by price
 */
export const sortProductsByPrice = (
  products: Product[],
  ascending = true
): Product[] => {
  return [...products].sort((a, b) => {
    return ascending ? a.price! - b.price! : b.price! - a.price!;
  });
};

/**
 * Filter products by price range
 */
export const filterProductsByPrice = (
  products: Product[],
  minPrice: number,
  maxPrice: number
): Product[] => {
  return products.filter((p) => p.price! >= minPrice && p.price! <= maxPrice);
};

/**
 * Search products by title or description
 */
export const searchProducts = (
  products: Product[],
  searchTerm: string
): Product[] => {
  const term = searchTerm.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term)
  );
};


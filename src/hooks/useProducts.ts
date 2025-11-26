/**
 * Domain-specific hooks for product management
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  getProductsWithCache,
  createProduct,
  clearProductsCache,
  formatPrice,
  sortProductsByPrice,
  filterProductsByPrice,
  searchProducts as searchProductsUtil,
} from '@/services/products';
import { useFetch, useAsyncSubmit, useSearch } from './useApi';
import type { Product, CreateProductDto } from '@/types/api';

/**
 * Hook for managing product catalog
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>(
    'name'
  );
  const [priceFilter, setPriceFilter] = useState<{
    min: number;
    max: number;
  } | null>(null);

  const { loading, error, retry } = useFetch(
    async () => {
      const data = await getProductsWithCache();
      setProducts(data);
      return data;
    },
    { immediate: true }
  );

  // Apply sorting and filtering
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Apply price filter
    if (priceFilter) {
      result = filterProductsByPrice(
        result,
        priceFilter.min,
        priceFilter.max
      );
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      result = sortProductsByPrice(result, true);
    } else if (sortBy === 'price-desc') {
      result = sortProductsByPrice(result, false);
    } else if (sortBy === 'name') {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [products, sortBy, priceFilter]);

  const refreshProducts = useCallback(async () => {
    clearProductsCache();
    await retry();
  }, [retry]);

  return {
    products: filteredAndSortedProducts,
    allProducts: products,
    loading,
    error,
    sortBy,
    setSortBy,
    priceFilter,
    setPriceFilter,
    refreshProducts,
    retry,
  };
}

/**
 * Hook for searching products
 */
export function useProductSearch() {
  const { results, loading, error, search } = useSearch(
    async (query: string) => {
      const products = await getProductsWithCache();
      return searchProductsUtil(products, query);
    },
    300 // 300ms debounce
  );

  return {
    results,
    loading,
    error,
    search,
  };
}

/**
 * Hook for creating products (admin)
 */
export function useCreateProduct() {
  const { loading, error, submit } = useAsyncSubmit({
    onSuccess: () => {
      clearProductsCache();
    },
  });

  const createNewProduct = useCallback(
    async (productData: CreateProductDto) => {
      return await submit(async () => {
        return await createProduct(productData);
      });
    },
    [submit]
  );

  return {
    loading,
    error,
    createProduct: createNewProduct,
  };
}

/**
 * Hook for product shopping cart logic (client-side state)
 */
interface CartItem {
  product: Product;
  quantity: number;
}

export function useShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevCart, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    );
  }, [cart]);

  const itemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const formattedTotal = formatPrice(cartTotal);

  return {
    cart,
    itemCount,
    cartTotal,
    formattedTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

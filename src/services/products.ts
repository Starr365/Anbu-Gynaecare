import api from '../libs/api';
import { CreateProductDto, Product } from '../types/api';

export const createProduct = async (payload: CreateProductDto): Promise<Product> => {
  const res = await api.post<{ data: Product }>('/products', payload);
  return res.data.data;
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<{ data: Product[] }>('/products');
  return res.data.data;
};

const productsService = {
  createProduct,
  getProducts,
};

export default productsService;

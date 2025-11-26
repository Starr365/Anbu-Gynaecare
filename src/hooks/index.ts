/**
 * Central export file for all custom hooks
 * Makes imports cleaner throughout the application
 */

// Generic hooks
export {
  useFetch,
  useAsyncSubmit,
  usePagination,
  useSearch,
  useAuth,
  useForm,
} from './useApi';

// Domain-specific cycle hooks
export {
  useCycleLogs,
  useCyclePredictions,
  useCycleSetup,
} from './useCycle';

// Domain-specific product hooks
export {
  useProducts,
  useProductSearch,
  useCreateProduct,
  useShoppingCart,
} from './useProducts';

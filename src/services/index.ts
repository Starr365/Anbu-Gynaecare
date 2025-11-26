/**
 * Central export file for all services
 * Makes imports cleaner throughout the application
 */

// Auth services
export {
  registerUser,
  loginUser,
  logoutUser,
  isAuthenticated,
  getAccessToken,
} from './auth';

// User services
export { getUser, getUserWithCache, clearUserCache } from './user';

// Cycle services
export {
  setUserCycle,
  isValidCycleLength,
  isValidPeriodLength,
  isValidPastDate,
} from './cycles';

// Predictions services
export {
  getCyclePredictions,
  getLatestPrediction,
  getCyclePredictionsWithCache,
  clearPredictionsCache,
  formatPredictionDate,
  daysUntilPrediction,
} from './predictions';

// Logs services
export {
  createCycleLog,
  getCycleLogs,
  getMonthlyLogs,
  getCycleLogsWithCache,
  getMonthlyLogsWithCache,
  clearLogsCache,
  isValidPeriodFlow,
  isValidFeeling,
} from './logs';

// Products services
export {
  createProduct,
  getProducts,
  getProductsWithCache,
  clearProductsCache,
  formatPrice,
  sortProductsByPrice,
  filterProductsByPrice,
  searchProducts,
} from './products';

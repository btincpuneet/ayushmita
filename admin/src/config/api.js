// Central API base URL configuration
// Uses `REACT_APP_API_BASE_URL` from environment if provided, otherwise falls back to localhost.
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5001';

export default API_BASE;

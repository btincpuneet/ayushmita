export interface Category {
  id: string;
  name: string;
  description: string;
  url: string;
  status: 'active' | 'inactive';
  image: string;
  is_include_top_nav: boolean;
}

// types/content.ts

export interface User {
  id: number | string;
  email: string;
  name?: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token?: string;
}


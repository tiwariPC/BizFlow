import { User } from "@shared/schema";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

class AuthService {
  private token: string | null = null;
  private user: AuthUser | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch {
        this.user = null;
      }
    }
  }

  setAuth(authResponse: AuthResponse) {
    this.token = authResponse.token;
    this.user = authResponse.user;
    localStorage.setItem('auth_token', authResponse.token);
    localStorage.setItem('auth_user', JSON.stringify(authResponse.user));
  }

  clearAuth() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  getToken(): string | null {
    return this.token;
  }

  getUser(): AuthUser | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.token !== null && this.user !== null;
  }

  isAdmin(): boolean {
    return this.user?.role === 'admin';
  }

  getAuthHeaders(): Record<string, string> {
    if (!this.token) return {};
    return {
      'Authorization': `Bearer ${this.token}`,
    };
  }
}

export const authService = new AuthService();

import { TestBed } from '@angular/core/testing';
import { provideRouter, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('authGuard', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });

    authService = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  function runGuard() {
    return TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  }

  it('should return true when user is logged in', () => {
    const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }));
    localStorage.setItem('jwt_token', `header.${payload}.signature`);

    const result = runGuard();
    expect(result).toBe(true);
  });

  it('should return a UrlTree to /login when user is not logged in', () => {
    const result = runGuard();
    expect(result instanceof UrlTree).toBe(true);
    expect(result.toString()).toBe('/login');
  });

  it('should return a UrlTree to /login when token is expired', () => {
    const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 60 }));
    localStorage.setItem('jwt_token', `header.${payload}.signature`);

    const result = runGuard();
    expect(result instanceof UrlTree).toBe(true);
    expect(result.toString()).toBe('/login');
  });
});

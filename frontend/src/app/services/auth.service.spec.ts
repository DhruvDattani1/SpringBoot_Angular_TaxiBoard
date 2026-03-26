import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'login', component: {} as any }])
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token in localStorage on login', () => {
    service.login('testuser', 'testpass').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'testuser', password: 'testpass' });
    req.flush({ token: 'fake-jwt-token' });

    expect(localStorage.getItem('jwt_token')).toBe('fake-jwt-token');
  });

  it('should call register endpoint with correct body', () => {
    service.register('newuser', 'newpass').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: 'newuser', password: 'newpass' });
    req.flush({});
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('jwt_token', 'fake-jwt-token');
    expect(service.getToken()).toBe('fake-jwt-token');
  });

  it('should return null when no token present', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should remove token and navigate to /login on logout', () => {
    localStorage.setItem('jwt_token', 'fake-jwt-token');
    service.logout();
    expect(localStorage.getItem('jwt_token')).toBeNull();
  });

  it('should return false for isLoggedIn when no token', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should return false for isLoggedIn when token is expired', () => {
    const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 60 }));
    const fakeToken = `header.${payload}.signature`;
    localStorage.setItem('jwt_token', fakeToken);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should return true for isLoggedIn when token is valid', () => {
    const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }));
    const fakeToken = `header.${payload}.signature`;
    localStorage.setItem('jwt_token', fakeToken);
    expect(service.isLoggedIn()).toBe(true);
  });
});

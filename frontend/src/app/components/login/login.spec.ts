import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: { login: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    authService = { login: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authService },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'trips', component: Login }, { path: 'register', component: Login }])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when fields are empty', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should have valid form when both fields are filled', () => {
    component.form.setValue({ username: 'testuser', password: 'testpass' });
    expect(component.form.valid).toBe(true);
  });

  it('should call login with correct credentials on submit', () => {
    authService.login.mockReturnValue(of({}));
    component.form.setValue({ username: 'testuser', password: 'testpass' });
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('should navigate to /trips on successful login', () => {
    authService.login.mockReturnValue(of({}));
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.form.setValue({ username: 'testuser', password: 'testpass' });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/trips']);
  });

  it('should not call login if form is invalid', () => {
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should navigate to /register when goToRegister is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.goToRegister();
    expect(navigateSpy).toHaveBeenCalledWith(['/register']);
  });
});

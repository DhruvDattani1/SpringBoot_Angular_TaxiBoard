import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Register } from './register';
import { AuthService } from '../../services/auth.service';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authService: { register: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    authService = { register: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Register],
      providers: [
        { provide: AuthService, useValue: authService },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'login', component: Register }])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
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
    component.form.setValue({ username: 'newuser', password: 'newpass' });
    expect(component.form.valid).toBe(true);
  });

  it('should call register with correct credentials on submit', () => {
    authService.register.mockReturnValue(of({}));
    component.form.setValue({ username: 'newuser', password: 'newpass' });
    component.onSubmit();
    expect(authService.register).toHaveBeenCalledWith('newuser', 'newpass');
  });

  it('should navigate to /login on successful registration', () => {
    authService.register.mockReturnValue(of({}));
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.form.setValue({ username: 'newuser', password: 'newpass' });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should not call register if form is invalid', () => {
    component.onSubmit();
    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should navigate to /login when goToLogin is called', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.goToLogin();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});

import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToTrips() {
    this.router.navigate(['/trips'])
  }

  goToAnalytics() {
    this.router.navigate(['/analytics']);
  }

  logout() {
    this.auth.logout()
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss'],
})
export class UserDisplayComponent implements OnInit {
  user!: User;
  isAdmin = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.authService.user$.subscribe((user) => {
      this.user = user!;
      if (user) {
        this.isAdmin = this.authService.isAdmin();
      }
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser()!;
  }

  logout() {
    this.authService.logout();
  }
}

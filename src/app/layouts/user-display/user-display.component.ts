import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ScreenSizeService } from 'src/app/services/screen-size/screen-size.service';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.scss'],
})
export class UserDisplayComponent implements OnInit {
  user!: User;
  isAdmin = false;
  screenWidth!: number;
  private authService = inject(AuthService);
  private router = inject(Router);
  private screenSizeService = inject(ScreenSizeService);
  public faUser = faUser;
  public faLogout = faRightFromBracket;

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
    if (this.user) {
      this.isAdmin = this.authService.isAdmin();
    }

    this.screenSizeService.screenWidth$.subscribe((width) => {
      this.screenWidth = width;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

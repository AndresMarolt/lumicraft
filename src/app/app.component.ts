import { Component, HostListener, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CrudApp';
  currentRoute!: string;
  isSidebarVisible: boolean = false;
  isMobile: boolean = false;
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  toggleSidebar(value: boolean): void {
    this.isSidebarVisible = value;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 1200;
  }

  @HostListener('window:popstate')
  onPopState(): void {
    this.isSidebarVisible = false;
  }
}

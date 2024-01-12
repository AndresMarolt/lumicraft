import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, AfterViewInit {
  sidebarOptions!: { text: string; link: string }[];
  sidenavTitle!: string;
  @Input() isMobile: boolean = false;
  @Input() isSidebarVisible: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('drawer') drawerElement!: MatDrawer;
  private router = inject(Router);
  private userOptions = [
    { text: 'Móviles', link: 'products/phone' },
    { text: 'Ordenadores', link: 'products/computer' },
    { text: 'Tablets', link: 'products/tablet' },
    { text: 'Smartwatch', link: 'products/smartwatch' },
  ];

  ngOnInit(): void {
    this.sidebarOptions = this.userOptions;
    this.sidenavTitle = 'CATEGORIAS';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sidebarOptions = this.userOptions;
        this.sidenavTitle = 'CATEGORIAS';
        this.toggleSidebar.emit(false);
      }
    });
  }

  ngAfterViewInit(): void {
    this.drawerElement.openedChange.subscribe((status) => {
      this.toggleSidebar.emit(status);
    });
  }
}

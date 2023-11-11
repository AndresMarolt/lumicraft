import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
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
export class SidenavComponent implements AfterViewInit {
  sidebarOptions!: { text: string; link: string }[];
  sidenavTitle!: string;
  @Input() isMobile: boolean = false;
  @Input() isSidebarVisible: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('drawer') drawerElement!: MatDrawer;
  private router = inject(Router);

  ngAfterViewInit(): void {
    this.drawerElement.openedChange.subscribe((status) => {
      this.toggleSidebar.emit(status);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.startsWith('/admin')) {
          this.sidebarOptions = [
            { text: 'Dashboard', link: 'admin' },
            { text: 'Productos', link: 'admin/products' },
          ];
          this.sidenavTitle = 'ADMINISTRADOR';
        } else {
          this.sidebarOptions = [
            { text: 'Móviles', link: 'products/phones' },
            { text: 'Ordenadores', link: 'products/computers' },
            { text: 'Tablets', link: 'products/tablets' },
            { text: 'Smartwatch', link: 'products/smartwatches' },
          ];
          this.sidenavTitle = 'CATEGORIAS';
        }

        this.toggleSidebar.emit(false);
      }
    });
  }
}

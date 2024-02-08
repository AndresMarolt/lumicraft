import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, AfterViewInit, OnDestroy {
  sidebarOptions!: { text: string; link: string }[];
  sidenavTitle!: string;
  @Input() isMobile: boolean = false;
  @Input() isSidebarVisible: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('drawer') drawerElement!: MatDrawer;
  private router = inject(Router);
  private userOptions: { text: string; link: string }[] = [
    { text: 'Móviles', link: 'products/phone' },
    { text: 'Tablets', link: 'products/tablet' },
    { text: 'Portátiles', link: 'products/laptop' },
    { text: 'Ordenadores', link: 'products/computer' },
    { text: 'Televisores', link: 'products/tv' },
    { text: 'Videojuegos', link: 'products/videogame' },
    { text: 'Auriculares', link: 'products/headphones' },
    { text: 'Smartwatch', link: 'products/smartwatch' },
  ];
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.sidebarOptions = this.userOptions;
    this.sidenavTitle = 'CATEGORIAS';

    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.sidebarOptions = this.userOptions;
          this.sidenavTitle = 'CATEGORIAS';
          this.toggleSidebar.emit(false);
        }
      })
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.drawerElement.openedChange.subscribe((status) => {
        this.toggleSidebar.emit(status);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

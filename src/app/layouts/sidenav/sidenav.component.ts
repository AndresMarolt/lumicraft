import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements AfterViewInit {
  @Input() isMobile: boolean = false;
  @Input() isSidebarVisible: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('drawer') drawerElement!: MatDrawer;

  ngAfterViewInit(): void {
    this.drawerElement.openedChange.subscribe((status) => {
      this.toggleSidebar.emit(status);
    });
  }

  sidebarOptions = [
    { text: 'Home', icon: 'home', link: '/' },
    { text: 'Perfil', icon: 'person', link: '/profile' },
    { text: 'Usuarios', icon: 'people', link: '/users' },
    { text: 'Noticias', icon: 'library_books', link: '/news' },
  ];
}

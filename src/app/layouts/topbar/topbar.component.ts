import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  @Input() isMobile: boolean = false;
  @Input() isSidebarVisible: boolean = false;

  emitToggleSidebarEvent(): void {
    this.toggleSidebar.emit(!this.isSidebarVisible);
  }
}

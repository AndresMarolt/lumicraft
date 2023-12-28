import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public sidenavOptions = signal<{ text: string; link: string }[]>([
    { text: '', link: '' },
  ]);
  public sidenavTitle = signal<string>('');

  constructor() {}

  setSidenavOptions(
    sidenavOptions: { text: string; link: string }[],
    sidenavTitle: string
  ) {
    this.sidenavOptions.mutate((currentOptions) => {
      currentOptions = sidenavOptions;
    });
    this.sidenavTitle.mutate((currentTitle) => {
      currentTitle = sidenavTitle;
    });
  }
}

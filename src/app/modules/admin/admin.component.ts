import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error/error.service';
import {
  faChartSimple,
  faBoxesStacked,
  faReceipt,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';

interface AdminOption {
  text: string;
  link: string;
  icon: IconProp;
  highlighted: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public faChart = faChartSimple;
  public faProducts = faBoxesStacked;
  public faOrders = faReceipt;
  public adminOptions: AdminOption[] = [
    {
      text: 'Dashboard',
      link: 'dashboard',
      icon: this.faChart,
      highlighted: false,
    },
    {
      text: 'Productos',
      link: 'products',
      icon: this.faProducts,
      highlighted: false,
    },
  ];
  public currentRoute: string = '';
  public httpResponseError = false;
  private router = inject(Router);
  private errorService = inject(ErrorService);
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateHighlightedOption();
        }
      })
    );
    this.updateHighlightedOption();

    this.subscriptions.push(
      this.errorService.error$.subscribe((isError) => {
        this.httpResponseError = isError;
      })
    );
  }

  private updateHighlightedOption(): void {
    let currentRoute = this.router.url.substring(1).split('/')[1];
    currentRoute = currentRoute.split('?')[0];

    this.adminOptions.forEach((option) => {
      option.highlighted = option.link === currentRoute;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe);
  }
}

import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Order } from 'src/app/models/order.interface';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChildren(BaseChartDirective) charts:
    | QueryList<BaseChartDirective>
    | undefined;
  public loading = true;
  public orders: Order[] = [];
  public amountOfItemsSold!: number;
  public completedOrders: Order[] = [];
  public pendingOrders: Order[] = [];
  public averageSaleAmount: number = 0;
  private shoppingCartService = inject(ShoppingCartService);
  private subscriptions: Subscription[] = [];
  public chartOptions: ChartConfiguration['options'] = {
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public chartType: ChartType = 'bar';
  public chartPlugins = [DataLabelsPlugin];
  public salesQuantityChartData: ChartData<'bar'> = {
    datasets: [],
  };
  public salesAmountChartData: ChartData<'bar'> = {
    datasets: [],
  };

  ngOnInit(): void {
    this.subscriptions.push(
      this.shoppingCartService.getAllOrders().subscribe((res) => {
        this.orders = res;
        this.amountOfItemsSold = this.orders.reduce(
          (sum, order) => order.totalQuantity + sum,
          0
        );

        this.completedOrders = res.filter(
          (order) => order.status === 'DELIVERED'
        );
        this.pendingOrders = res.filter((order) => order.status === 'PENDING');

        const totalAmountSum: number = this.orders.reduce(
          (sum, order) => sum + order.totalAmount,
          0
        );
        this.averageSaleAmount = totalAmountSum / this.orders.length;
        this.salesQuantityChartData.labels = this.salesAmountChartData.labels =
          this.generateLastMonths();

        let { monthAmountValues, monthCountValues } = this.obtainSalesData(res);

        this.salesQuantityChartData.datasets.push({
          data: monthCountValues,
          label: 'Total de ventas',
          backgroundColor: '#2e3e4e',
        });
        this.salesAmountChartData.datasets.push({
          data: monthAmountValues,
          label: 'Ingreso por ventas',
          backgroundColor: '#ec4e20',
        });
        this.loading = false;
        this.charts?.toArray()[0].update();
        this.charts?.toArray()[1].update();
      })
    );
  }

  public generateLastMonths() {
    const currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let aux = currentMonth;

    return Array.from({ length: 7 }, (_, index) => {
      let month;
      let year = currentYear;
      if (aux > 0) {
        month = currentMonth - index;
      } else {
        currentMonth = 12;
        month = 12;
      }
      aux = currentMonth - 1;

      if (month - 1 > 0) {
        year = currentYear - 1;
      }

      return `${month.toString().padStart(2, '0')}/${year}`;
    }).reverse();
  }
  public obtainSalesData(orders: Order[]) {
    const last7Months = this.generateLastMonths();
    const monthCount: { [key: string]: number } = {};
    const monthAmount: { [key: string]: number } = {};

    last7Months.forEach((month) => {
      monthCount[month] = 0;
      monthAmount[month] = 0;
    });

    orders.forEach((order) => {
      const orderKey = this.getOrderMonthKey(order);
      monthCount[orderKey]++;
      monthAmount[orderKey] += order.totalAmount;
    });
    const monthCountValues = Object.values(monthCount);
    const monthAmountValues = Object.values(monthAmount);

    return {
      monthCountValues,
      monthAmountValues,
    };
  }

  private getOrderMonthKey(order: Order) {
    const orderMonth = new Date(order.timestamp).getMonth() + 1;
    const orderYear = new Date(order.timestamp).getFullYear();
    return `${orderMonth.toString().padStart(2, '0')}/${orderYear}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

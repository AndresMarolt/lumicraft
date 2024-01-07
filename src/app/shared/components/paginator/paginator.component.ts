import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  @Input() productsList: Product[] = [];
  @Input() paginationLength: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Output() onPageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
}

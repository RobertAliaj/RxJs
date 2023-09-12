import { Component } from '@angular/core';

import {EMPTY, catchError, of, combineLatest, interval, take} from 'rxjs';
import { ProductCategory } from '../product-categories/product-category';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  products$ = this.productService.products$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }),
    );


  // observable1$ = interval(1000).pipe(take(15));
  // observable2$ = interval(1500).pipe(take(14));

   // combined$ = combineLatest([this.observable1$, this.observable2$]);

constructor(private productService: ProductService) {
}

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }


  // test(){
  //   this.combined$.subscribe(([val1, val2]) => {
  //     console.log(`Wert von observable1$: ${val1}, Wert von observable2$: ${val2}`);
  //   });
  // }


}

import {Component} from '@angular/core';

import {
  EMPTY,
  catchError,
  of,
  combineLatest,
  interval,
  take,
  filter,
  map,
  tap,
  Subject,
  startWith,
  BehaviorSubject
} from 'rxjs';
import {ProductCategory} from '../product-categories/product-category';

import {ProductService} from './product.service';
import {ProductCategoryService} from "../product-categories/product-category.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedActions$ = this.categorySelectedSubject.asObservable();

  products$ = combineLatest([
    this.productService.productsWithAdd$,
    this.categorySelectedActions$
  ])
    .pipe(
      tap(product => console.log(product)),
      map(([products, selectedCategoryId]) =>
        products.filter(product =>
          selectedCategoryId ? product.categoryId === selectedCategoryId : true
        )),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    )

  categories$ = this.productCategoryService.productCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );


  constructor(private productService: ProductService,
              private productCategoryService: ProductCategoryService) {
  }

  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }
}

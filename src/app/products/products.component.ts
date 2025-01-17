import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price'];
  data: Product[] = [];
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProducts()
      .subscribe((res: any) => {
        //console.log('res', res);
        this.data = res.products;
        //console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        //console.log(err);
        this.isLoadingResults = false;
      });
  }

}

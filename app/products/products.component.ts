import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products:any=[];
  filteredProducts=[];
  query;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) { }


  ngOnInit() {
    this.productService.getAll().subscribe(p => {
      this.products=p
             //the way to deal with multiple asynchronuos
      this.route.queryParamMap.subscribe(param => {
        this.query = param.get('category');
        
        this.filteredProducts = (this.query) ?
        this.products.filter(p => p.category.toLowerCase() === this.query.toLowerCase()) : this.products;
      })
    });
  }

}

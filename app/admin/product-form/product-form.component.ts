import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  categories$;
  product:Product;
  id;
  constructor(
    private route: ActivatedRoute,
    private catogoryService: CategoryService, 
    private productService: ProductService,
    private router: Router) { 
    catogoryService.getCategories().subscribe(x => this.categories$ = x);
    this.id= this.route.snapshot.paramMap.get('id');
    if(this.id) productService.get(this.id)
    .subscribe((item:Product) => this.product=item );
    
  }

  ngOnInit() {
  }
  
  save(product){
    if(this.id) this.productService.update(this.id , product);
    else this.productService.save(product);

    this.router.navigate(['/admin/products']);
  }
  delete(){
    if(confirm("Are you sure you want to delete this product?")){
      this.productService.remove(this.id);
      this.router.navigate(['/admin/products']);
    }
    else return;
  }

 
}

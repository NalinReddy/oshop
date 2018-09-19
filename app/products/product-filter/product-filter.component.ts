import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') query;
  categories$;

  constructor(private category:CategoryService) { 
    this.categories$=category.getCategories()
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  productMasterData: any[] = [];

 constructor(
  private productService: ProductService,
  private formBuilder: FormBuilder,
  private toastr: ToastrService, 

) { }

  ngOnInit() {

    this.getAllProductMasterData();
  }
  
  getAllProductMasterData() {
    this.productService.getAllProductMasterData().subscribe(data => {
      this.productMasterData = data['data']['productMasterList'];
     // this.rerender();
    })
  }

}

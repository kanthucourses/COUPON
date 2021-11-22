import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {
  productMasterKeys: any = ['Sl.No', 'Product Id', 'Product Name', 'Product Description', 'Product Price',
  'Units In stock', 'Product Category', 'Product Image Url' ,'Action'];

  //dtOptions: DataTables.Settings = {};
  //dtTrigger: Subject<any> = new Subject();
  //@ViewChild(DataTableDirective)
  //dtElement: DataTableDirective;
  
  productMasterData: any[] = [];
  productMasterForm: FormGroup;
 actionButton = 'SAVE';
 focusedElement: any;
 actionHidden = false;
 viewToggle = false;
 allCond: any;
 isReadMode = false;

 constructor(
  private productService: ProductService,
  private formBuilder: FormBuilder,
  private toastr: ToastrService, 

) { }

ngOnInit() {
  // this.dtOptions = {
  //   pagingType: 'full_numbers',
  //   pageLength: 5,
  // };
  this.actionButton = 'SAVE';
  this.createForm();
  this.getAllProductMasterData();
}
 
getAllProductMasterData() {
  this.productService.getAllProductMasterData().subscribe(data => {
    this.productMasterData = data['data']['productMasterList'];
   // this.rerender();
  })
}


saveProductMasterForm() {
  if (this.actionButton === 'SAVE') {
    this.productService.saveProductMasterData(this.productMasterForm.value).subscribe(data => {
      if (data['status'] == 0) {
        this.toastr.success('ProductMaster Details Saved Successfully');
      }
      this.getAllProductMasterData();
      this.resetProductMasterForm();
    }, err => {
      this.toastr.warning('Error..');
    })
  } else {
    this.productService.updateProductMasterData(this.productMasterForm.getRawValue()).subscribe(data => {
      if (data['status'] == 0) {
        this.toastr.success(data['ProductMaster Details Updated Successfully']);
        this.productMasterForm.controls.productCode.enable();
      }
      this.getAllProductMasterData();
      this.resetProductMasterForm();
      this.actionButton = 'SAVE';
    })
  }
}

resetProductMasterForm() {
  this.productMasterForm.reset();
  this.actionButton = 'SAVE';
  this.productMasterForm.controls.productCode.enable();
}

updateProductMasterForm(productMaster) {
  this.productMasterForm.reset();
  this.viewToggle = false;
  this.isReadMode = false;
  this.productMasterForm.setValue(productMaster);
  this.productMasterForm.controls.productId.disable();
  this.actionButton = 'UPDATE'

}
deleteProductMasterData(id) {
  if (confirm(`Are you sure you want to delete ?`)) {
    this.productService.deleteProductMasterDataById(id).subscribe(data => {
      if (data['status'] == 0) {
        this.toastr.success('Deleted Successfully')
        this.getAllProductMasterData();
      }
    })
  }
}


createForm() { 
  this.productMasterForm = this.formBuilder.group({
    _id: [null],
    productId: [null],
    productName: [null],
    productDescription: [null],
    productPrice: [null],
    productImageUrl: [null], 
    unitsInstock: [null], 
    productCategory: [null],
    createdDate: [null],
    lastUpdatedDate: [null]
  });
}

// ngAfterViewInit(): void {
//   this.dtTrigger.next();
// }
// rerender(): void {
//   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//     this.dtTrigger.next();
//     dtInstance.destroy();
//   });
// }
// ngOnDestroy(): void {
//   this.dtTrigger.unsubscribe();
// }

}

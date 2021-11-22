import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
//import { Subject } from 'rxjs';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon-master',
  templateUrl: './coupon-master.component.html',
  styleUrls: ['./coupon-master.component.css']
})
export class CouponMasterComponent implements OnInit {

  couponMasterKeys: any = ['Sl.No', 'Coupon Code', 'Coupon Name', 'Coupon Description', 'Coupon Type',
   'Coupo Value', 'ValidFrom', 'ValidTo', 'Coupon Usage Limit', 'Status', 'Minimum Spend Value',
   'Maximum Spend Value','Action'];
 
   //dtOptions: DataTables.Settings = {};
   //dtTrigger: Subject<any> = new Subject();
   //@ViewChild(DataTableDirective)
   //dtElement: DataTableDirective;
   
  couponMasterData: any[] = [];
  couponMasterForm: FormGroup;
  actionButton = 'SAVE';
  focusedElement: any;
  actionHidden = false;
  viewToggle = false;
  allCond: any;
  isReadMode = false;

  constructor(
    private couponService: CouponService,
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
    this.getAllCouponMasterData();
  }
  
  getAllCouponMasterData() {
    this.couponService.getAllCouponMasterData().subscribe(data => {
      this.couponMasterData = data['data']['couponMasterList'];
     // this.rerender();
    })
  }

 
  saveCouponMasterForm() {
    if (this.actionButton === 'SAVE') {
      this.couponService.saveCouponMasterData(this.couponMasterForm.value).subscribe(data => {
        if (data['status'] == 0) {
          this.toastr.success('CouponMaster Details Saved Successfully');
        }
        this.getAllCouponMasterData();
        this.resetCouponMasterForm();
      }, err => {
        this.toastr.warning('Error..');
      })
    } else {
      this.couponService.updateCouponMasterData(this.couponMasterForm.getRawValue()).subscribe(data => {
        if (data['status'] == 0) {
          this.toastr.success(data['CouponMaster Details Updated Successfully']);
          this.couponMasterForm.controls.couponCode.enable();
        }
        this.getAllCouponMasterData();
        this.resetCouponMasterForm();
        this.actionButton = 'SAVE';
      })
    }
  }

  resetCouponMasterForm() {
    this.couponMasterForm.reset();
    this.actionButton = 'SAVE';
    this.couponMasterForm.controls.couponCode.enable();
  }

  updateCouponMasterForm(couponMaster) {
    this.couponMasterForm.reset();
    this.viewToggle = false;
    this.isReadMode = false;
    this.couponMasterForm.setValue(couponMaster);
    this.couponMasterForm.controls.couponCode.disable();
    this.actionButton = 'UPDATE'

  }
  deleteCouponMasterData(id) {
    if (confirm(`Are you sure you want to delete ?`)) {
      this.couponService.deleteCouponMasterDataById(id).subscribe(data => {
        if (data['status'] == 0) {
          this.toastr.success('Deleted Successfully')
          this.getAllCouponMasterData();
        }
      })
    }
  }
  
  createForm() { 
    this.couponMasterForm = this.formBuilder.group({
      _id: [null],
      couponCode: [null],
      couponName: [null],
      couponDescription: [null],
      couponType: [null],
      couponValue: [null],
      validFromDateTime: [null], 
      validToDateTime: [null], 
      couponUsageLimit: [null],
      couponStatus: [null],
      minimumSpendValue: [null],
      maximumSpendValue: [null],
      usedCount: [null],

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

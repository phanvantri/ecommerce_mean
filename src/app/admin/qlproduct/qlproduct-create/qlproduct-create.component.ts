import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../api/auth.service';
// import custom validator to validate that password and confirm password fields match
//import { MustMatch } from './_helpers/must-match.validator';
@Component({
  selector: 'app-qlproduct-create',
  templateUrl: './qlproduct-create.component.html',
  styleUrls: ['./qlproduct-create.component.css']
})
export class QlproductCreateComponent implements OnInit {

  productFrom: FormGroup;
    submitted = false;

    constructor(private auth: AuthService,private router: Router, private api: ApiService,private formBuilder: FormBuilder) { }

    logout() {
      this.auth.logout();
      this.router.navigateByUrl('/login');
    }
    ngOnInit() {
        this.productFrom = this.formBuilder.group({
          name: ['', Validators.required],
          code: ['', Validators.required],
          price: ['', Validators.required],
          color: ['Mặc định', Validators.required],
          linkimage: ['', Validators.required],
          description: ['', Validators.required],
        
     
          
        }, {
         // validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.productFrom.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.productFrom.invalid) {
            return;
        }
        this.api.addProduct(JSON.stringify(this.productFrom.value))
        .subscribe(res => {
            alert('Đã thêm Sản phẩm thành công')
            this.router.navigateByUrl('/admin/qlproduct');
           
        },(err)=>{
            alert('Đã thêm Sản phẩm thất bại vui lòng kiểm tra lại!!!')
        });

       // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.productFrom.value))
    }
 

}

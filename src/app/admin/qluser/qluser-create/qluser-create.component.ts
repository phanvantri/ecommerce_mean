import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../api/auth.service';
// import custom validator to validate that password and confirm password fields match
//import { MustMatch } from './_helpers/must-match.validator';

@Component({
  selector: 'app-qluser-create',
  templateUrl: './qluser-create.component.html',
  styleUrls: ['./qluser-create.component.css']
})
export class QluserCreateComponent implements OnInit {


  registerForm: FormGroup;
    submitted = false;

    constructor(private auth: AuthService,private router: Router, private api: ApiService,private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            role: ['user', Validators.required],
            

        }, {
         // validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
     get f() { return this.registerForm.controls; }

     logout() {
        this.auth.logout();
        this.router.navigateByUrl('/login');
      }
    onSubmit(form:NgForm) {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log(JSON.stringify(this.registerForm.value));
        this.api.addUser(JSON.stringify(this.registerForm.value))
            .subscribe(res => {
                alert('Đã thêm User thành công')
                this.router.navigateByUrl('/admin/qluser');
               
            },(err)=>{
                alert('Đã thêm User thất bại vui lòng kiểm tra lại!!!')
            });

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }

   

 
}

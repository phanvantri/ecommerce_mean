import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../../../api/auth.service';
@Component({
  selector: 'app-qluser-edit',
  templateUrl: './qluser-edit.component.html',
  styleUrls: ['./qluser-edit.component.css']
})
export class QluserEditComponent implements OnInit {


  registerForm: FormGroup;
  submitted = false;
  name:"s";
  email="";
  address="";
  phone="";

  constructor(private auth: AuthService,private router: Router, private api: ApiService,private formBuilder: FormBuilder) { }

  ngOnInit() {
  this.api.getUserDetails()
      .subscribe(data => {
        console.log(data.name);
        this.name=data.name;
        this.email=data.email;
        this.address=data.address;
        this.phone=data.phone;
      });
      this.registerForm = this.formBuilder.group({
        firstName: [this.name, Validators.required],
        lastName: [this.name, Validators.required],
        email: [this.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        address: [this.address, Validators.required],
        phone: [this.phone, Validators.required],
        role: ['user', Validators.required],
        

    }, {
     //validator: MustMatch('password', 'confirmPassword')
    });
      
    
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}

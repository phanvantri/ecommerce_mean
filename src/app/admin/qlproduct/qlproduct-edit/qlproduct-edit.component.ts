import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qlproduct-edit',
  templateUrl: './qlproduct-edit.component.html',
  styleUrls: ['./qlproduct-edit.component.css']
})
export class QlproductEditComponent implements OnInit {

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}

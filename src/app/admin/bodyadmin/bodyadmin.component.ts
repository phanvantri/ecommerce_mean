import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../api/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bodyadmin',
  templateUrl: './bodyadmin.component.html',
  styleUrls: ['./bodyadmin.component.css']
})
export class BodyadminComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  resindex(){
    this.router.navigateByUrl('');
  }
  ngOnInit() {
  }

}

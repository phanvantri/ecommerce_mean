import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  info={};
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.getInforUser();
  }
  getInforUser() {
        if(this.auth.loggedIn){
        this.auth.getInforUser()
        .subscribe(data => {
          this.info=data;
          console.log(data);

        });
      }
  }

}

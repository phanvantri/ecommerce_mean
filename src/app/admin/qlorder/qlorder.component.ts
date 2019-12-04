import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { AuthService } from '../../api/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qlorder',
  templateUrl: './qlorder.component.html',
  styleUrls: ['./qlorder.component.css']
})
export class QlorderComponent implements OnInit {

  orders :any = []; 
  config: any;
  collection = { data: [] };

  dataSource = new OrderDataSource(this.api);

  constructor(private api: ApiService,private auth: AuthService, private router: Router) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length//bat buoc phai = nhau
    };
   }
   pageChanged(event) {
    this.config.currentPage = event;
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }

  ngOnInit() {
    this.api.getOrderSuccess()
    .subscribe(res => {
      this.collection.data = res;
      console.log(this.collection.data);
    }, err => {
      console.log(err);
    });
  }

}
export class OrderDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getOrderSuccess();
  }

  disconnect() {

  }
}

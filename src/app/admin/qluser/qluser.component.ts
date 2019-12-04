import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
@Component({
  selector: 'app-qluser',
  templateUrl: './qluser.component.html',
  styleUrls: ['./qluser.component.css']
})
export class QluserComponent implements OnInit {

  users :any = []; 
  config: any;
  collection = { data: [] };

  dataSource = new UserDataSource(this.api);

  constructor(private api: ApiService,private router: Router,private auth: AuthService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length//bat buoc phai = nhau
    };
    
   }
   logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
   pageChanged(event) {
    this.config.currentPage = event;
  }
  deleteUser(id){
    this.api.deleteuser(id)
    .subscribe(res => {
        alert("Đã xóa User thành công!!!")  
      }, (err) => {
        console.log(err);
      }
    );
    this.api.getUser()
    .subscribe(res => {
      console.log(res);
      this.collection.data = res;
    }, err => {
      console.log(err);
    });
  }
  updateUser(data){
    this.router.navigateByUrl('/admin/qluser/edit');
    
  }

  ngOnInit() {
    this.api.getUser()
    .subscribe(res => {
      console.log(res);
      this.collection.data = res;
    }, err => {
      console.log(err);
    });
  }

}
export class UserDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getUser();
  }

  disconnect() {

  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
@Component({
  selector: 'app-qlproduct',
  templateUrl: './qlproduct.component.html',
  styleUrls: ['./qlproduct.component.css']
})
export class QlproductComponent implements OnInit {

  products: any = [];

  dataSource = new QLProductDataSource(this.api);
  config: any;
  collection = { data: [] };

  constructor(private api: ApiService, private router: Router,private auth: AuthService) {
    
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
  updateProduct(data){
    this.router.navigateByUrl('/admin/qlproduct/edit');
    
  }

  deleteproduct(id){
    this.api.deleteproduct(id)
    .subscribe(res => {
        alert("Đã xóa sản phẩm thành công!!!")  
      }, (err) => {
        console.log(err);
      }
    );
    this.api.getProduct()
      .subscribe(res => {
       
        this.collection.data = res;
    
       
      }, err => {
        console.log(err);
      });
  }
  ngOnInit() {
   
    this.api.getProduct()
      .subscribe(res => {
       
        this.collection.data = res;
    
       
      }, err => {
        console.log(err);
      });
  }
  


}
export class QLProductDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getProduct();
  }

  disconnect() {

  }
}

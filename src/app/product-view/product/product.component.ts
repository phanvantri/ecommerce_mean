import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:any = []; 
  config: any;
  collection = { data: [] };

  dataSource = new ProductDataSource(this.api);
  constructor(private api: ApiService, private router: Router) {
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.collection.data.length//bat buoc phai = nhau
    };
   }
   pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.api.getProduct()
    .subscribe(res => {
      
      this.collection.data = res;
    }, err => {
      console.log(err);
    });
  }
  addcart(data){
    console.log(data);
    this.api.addcart(data)
    .subscribe(res => {
       
      alert("Đã thêm giỏ hàng thành công! Vui lòng vào giỏ hàng để tiến hành đặt mua!!!")
      }, (err) => {
        console.log(err);
      });
  }

}
export class ProductDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getProduct();
  }

  disconnect() {

  }
}


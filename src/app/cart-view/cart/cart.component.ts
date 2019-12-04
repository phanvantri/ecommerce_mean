import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orders:any = []; 
  sum_price=+"0";
  checkcart: boolean = false;
 
  dataSource = new OrdersDataSource(this.api);
  constructor(private api: ApiService,private router: Router) { }

  ngOnInit() {
    this.api.getCarts()
    .subscribe(res => {
      this.orders = res;  
      console.log(this.orders);  
      let i=0;
      for(let item in this.orders){
        this.sum_price+=Number(this.orders[i].price);
        i++;
      }
      if (this.orders && this.orders.length >0){this.checkcart = true;}
      console.log(this.sum_price);
    }, err => {
      console.log(err);
    });
    
  }
  myfunc(sum_price){
    alert("Thành công!!!!");
    this.api.orderproduct(sum_price)
    .subscribe(data => {
    });
    this.router.navigateByUrl('/success');
  }
  deletecart(id){
   
  
    this.api.deletecart(id)
    .subscribe(res => {
        alert("Đã xóa sản phẩm ra giỏ hàng thành công!!!")

        this.router.navigate(['/mycart']);
      }, (err) => {
        console.log(err);
      }
    );
    this.sum_price=+"0";
    this.api.getCarts()
    .subscribe(res => {
      this.orders = res;  
      console.log(this.orders);  
      let i=0;
      for(let item in this.orders){
        this.sum_price+=Number(this.orders[i].price);
        i++;
      }
      if (this.orders && this.orders.length >0){this.checkcart = true;}
      else{
        this.checkcart = false;
      }
      console.log(this.sum_price);
    }, err => {
      console.log(err);
    });
  }

}
export class OrdersDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getCarts();
  }

  disconnect() {

  }
}

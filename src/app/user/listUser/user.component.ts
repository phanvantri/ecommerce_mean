import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../api/user/user.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-listUser',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new UserDataSource(this.api);

  constructor(private api: UserService) { }

  ngOnInit() {
    this.api.getUsers()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
  }
}

export class UserDataSource extends DataSource<any> {
  constructor(private api: UserService) {
    super()
  }

  connect() {
    return this.api.getUsers();
  }

  disconnect() {

  }
}

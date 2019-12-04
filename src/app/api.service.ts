import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api";
const apicategory="/apicategory";
const apiproduct="/apiproduct";
const apicart="/apicart";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  //category
  getCategory(): Observable<any>{
    return this.http.get(apicategory,httpOptions).pipe(map(this.extractData),catchError(this.handleError));
  }

  //user
  getUser(): Observable<any>{
    return this.http.get("/apiuser/admin/alluser",httpOptions).pipe(map(this.extractData),catchError(this.handleError));
  }

  //ordersuccess
  getOrderSuccess(): Observable<any>{
    return this.http.get("/apiordersuccess/admin/allorder",httpOptions).pipe(map(this.extractData),catchError(this.handleError));
  }  


  //product
  getProduct(): Observable<any>{
    return this.http.get(apiproduct,httpOptions).pipe(map(this.extractData),catchError(this.handleError));
  }

  //product_detail
  getProduct_Detail(id: string):Observable<any>{
    const url = `${apiproduct}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  addUser(data):Observable<any>{
    return this.http.post('apiuser/adduser',data,httpOptions)
    .pipe(
      catchError(this.handleError)
      );
  }
  addProduct(data):Observable<any>{
    return this.http.post('apiproduct/admin/addproduct',data,httpOptions)
    .pipe(
      catchError(this.handleError)
      );
  }


  
  getCarts(): Observable<any> {
    return this.http.post<{}>(apicart, {id: localStorage.getItem('id')}, httpOptions)
     .pipe(
       map(result => {
         console.log(result);
         return result;
       })
     );
  }
  
  addcart(data): Observable<any> {
    return this.http.post("/apicart/addcart", {id: localStorage.getItem('id'),data}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  orderproduct(sum_price): Observable<any> {
    return this.http.post<{}>("/apiorder/send", {id: localStorage.getItem('id'),sum_price}, httpOptions)
     .pipe(
       map(result => {
         console.log(result);
         return result;
       })
     );
  }
  deletecart(id: string): Observable<{}> {
    const url = `apicart/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteproduct(id: string): Observable<{}> {
    const url = `apiproduct/admin/deleteproduct/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  deleteuser(id: string): Observable<{}> {
    const url = `apiuser/admin/deleteuser/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getUserDetails(): Observable<any> {
    
    return this.http.post<{}>('/auth/infor', {id: localStorage.getItem('id')})
     .pipe(
       map(result => {
         console.log(result);
         return result;
       })
     );
 }
  
}

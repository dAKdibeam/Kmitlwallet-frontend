import { Injectable } from '@angular/core';
import { Transfer } from './transfer.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Topup } from './topup.model';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

const BACKEND_URL = 'https://api-wallet.superder.me/api/func/';

@Injectable({ providedIn: 'root'})
export class FunctionService {
  private oldAcc = this.authService.getAcc();
  private oldBalance = this.authService.getBalance();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}


  transFer( typeT: string, Account: string, amount: string) {
    const oldBalance = this.authService.getBalance();
    const oldAcc = this.authService.getAcc();
    let transFer = {
      typeT: typeT,
      Account: Account,
      amount: ''+amount+'',
      accountts: oldAcc};
      console.log(transFer)
    // tslint:disable-next-line: radix
    this.http
    .post<{balance: any, message: string,payload:any}>(BACKEND_URL + 'transfer' , transFer).subscribe(responsedata => {
      console.log(responsedata)
      if (responsedata.message === 'Account invalid' || responsedata.message === 'Unable to perform transactions'
      || responsedata.message === 'Not enough money in the account' ) {
        console.log(responsedata.message);
        location.reload();
        // this.router.navigate(['/transfer']);
      }else{
        alert('TRANSFER SUCCESS')
      //localStorage.setItem('balance', responsedata.payload.balance.toString());
      this.router.navigate(['/balance']);}
    });
  }

  topup(typeT: string, code: string) {
    const oldAcc = this.authService.getAcc();
    const topup: any = {
      code: code,
      Account: oldAcc
    };
   
    this.http.post<{balanced: any , message: string,payload:any,statusCode:any}>(BACKEND_URL + 'topup' , topup).subscribe( responseData => {
      console.log(responseData)
     // localStorage.setItem('balance', responseData.payload.user.balanced.toString());
      if (responseData.statusCode !== 200) {
        location.reload();
      }
      alert('TOPUP SUCCESS')
      this.router.navigate(['/balance']);
    },
    err =>{
      if (err.statusCode !== 200) {
        alert('This code can\'t use')
        location.reload();
      }
    });
  }

}

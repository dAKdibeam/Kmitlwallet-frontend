import { Injectable } from '@angular/core';
import { Profile } from './balance/profile.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Transaction } from './transaction.model';

const BACKEND_URL = 'https://api-wallet.superder.me/api/user/';
@Injectable({ providedIn: 'root' })
// tslint:disable-next-line: class-name
export class profileService {
  private profile: Profile[] = [];
  private transac: Transaction[] = [];
  private postsUpdated = new Subject<Transaction[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getProfile(account: string) {
    return this.http.get<{
      account: string,
      username: string ,
      balance: string,
      firstname: string,
      lastname: string
      email: string,
      payload:any}>(BACKEND_URL + account);
  }

  getTransaction(accountts: string) {
    return this.http.get<{ transac: any ,payload:any}>(BACKEND_URL + 'transac/' + accountts)
    .pipe(
      map(transData => {
        console.log(transData)
        return { transac: transData.payload.user.map(transaction => {
          return {
            typeT: transaction.typeT,
            Account: transaction.account,
            amount: transaction.amount,
            accountts: transaction.accountts,
            datetime: transaction.createdAt
          };
        })
      };
      })
    )
    .subscribe(transformedPosts => {
      this.transac = transformedPosts.transac;
      this.postsUpdated.next([...this.transac]);
    });
  }



  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }



}

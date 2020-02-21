import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, from } from 'rxjs';


import { AuthService } from '../auth/auth.service';

import { Profile } from '../balance/profile.model';
import { profileService } from '../profile.service';

@Component ({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

// tslint:disable-next-line: class-name
export class profileComponent implements OnInit, OnDestroy {
  private balanceSub: Subscription;
  profile: Profile;
  getAcc: string;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(public profileService: profileService, private auth: AuthService) {}
  ngOnInit() {
    this.getAcc = localStorage.getItem('account');
    console.log(this.getAcc);
    this.profileService.getProfile(this.getAcc).subscribe(profileData => {
      console.log(this.getAcc)
      console.log(this.profile.last)
      this.profile = {
        account: profileData.payload.user.account,
        username: profileData.payload.user.username,
        balance: profileData.payload.user.balance,
        first: profileData.payload.user.firstname,
        last: profileData.payload.user.lastname ,
        email: profileData.payload.user.email};
    });
  }
  ngOnDestroy() {}
}

import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone:false
})
export class HeaderComponent implements OnInit, OnDestroy{
isAuthenticated = false;
    constructor(
    private dataStorageService:DataStorageService,
    private authService:AuthService, 
    private userSub : Subscription) {
      
    }

    ngOnInit(){
    this.userSub = this.authService.user.subscribe( user =>{
      this.isAuthenticated = !!this.userSub;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

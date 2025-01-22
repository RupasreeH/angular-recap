import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone:false
})
export class HeaderComponent implements OnInit {
  // private userSub : Subscription;
    constructor(
    private dataStorageService:DataStorageService,
    private authService:AuthService) {}
  
    ngOnInit(){
    this.authService.user.subscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}

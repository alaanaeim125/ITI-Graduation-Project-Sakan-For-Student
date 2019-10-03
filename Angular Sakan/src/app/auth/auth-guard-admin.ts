import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from "@angular/router";
import { AdminPageService } from '../service/admin-page.service';



@Injectable({
    providedIn: 'root'
  })
  
  export class AuthGuardAdmin implements CanActivate {

    constructor(private AdminPageService : AdminPageService,private router : Router){}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        if (!this.AdminPageService.isLoggedIn()) {
                  this.router.navigate(['/loginAdmin']);
                  this.AdminPageService.deleteToken();
          return false;
        }
      return true;
    }
  }
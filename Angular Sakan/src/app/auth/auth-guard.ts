import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormLoginService } from "src/app/service/form-login.service";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
  })

  export class AuthGuard implements CanActivate {

    constructor(private FormLoginService : FormLoginService,private router : Router){}
  
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        if (!this.FormLoginService.isLoggedIn()) {
                  this.router.navigate(['/loginUser']);
                  this.FormLoginService.deleteToken();
          return false;
        }
      return true;
    }
  }
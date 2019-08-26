import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';
import {MainService} from '../services/main.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(public _router :Router, public _mainService : MainService){}

  canActivate(){
    this._mainService.checkLogin();
    if(this._mainService.isLogged === true){
      return true
      } else {
        this._mainService.isLogged = false;
         this._router.navigateByUrl('/login')}

    }

}

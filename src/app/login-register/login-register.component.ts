import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../services/main.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(public _routeActive : ActivatedRoute, public _mainService : MainService) { }

  container = document.getElementById('container');

  flag:boolean= false
  

  singUp(){
    this.flag = true
  }

  singIn(){
    this.flag  = false
  }

  regUser:string;
  regPass:string;

  userLogin:string;
  passLogin:string;

  register(){
    this._mainService.register(this.regUser,this.regPass)
  }

  login(){
    this._mainService.login(this.userLogin,this.passLogin)
  }


  ngOnInit() {
    

    


  }


}

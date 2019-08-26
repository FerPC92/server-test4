import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { getLocaleTimeFormat } from '@angular/common';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit {

  constructor(public _mainService : MainService) {
    
    
   }

  ngOnInit() {
    this._mainService.getCategories()
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../services/main.service'
import {ApiService} from '../services/api.service'

@Component({
  selector: 'app-subcat-view',
  templateUrl: './subcat-view.component.html',
  styleUrls: ['./subcat-view.component.css']
})
export class SubcatViewComponent implements OnInit {

  constructor(public _routeActive : ActivatedRoute, public _apiService : ApiService  ,public _mainService : MainService) { }

  ngOnInit() {
   
  }

}

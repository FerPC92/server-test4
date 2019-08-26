import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import {MainService} from './services/main.service'
import {ApiService} from './services/api.service'
import { HttpClientModule, HttpClient} from '@angular/common/http'; 
import {RouterModule , Routes } from '@angular/router';

import {AuthGuard} from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SubcatViewComponent } from './subcat-view/subcat-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { OrderComponent } from './order/order.component';

let appRoutes : Routes = [
  {"path" : "", "component" :HomeComponent , "canActivate": [AuthGuard]},
  {"path" : "home", "component" : HomeComponent, "canActivate": [AuthGuard]},
  {"path" : "login", "component" : LoginRegisterComponent},
  {"path" : "subcat/:id", "component" : SubcatViewComponent, "canActivate": [AuthGuard]},
  {"path" : "list/:subcatprods", "component" : ListViewComponent, "canActivate": [AuthGuard]},
  {"path" : "detail/:id", "component" : DetailViewComponent, "canActivate": [AuthGuard]},
  {"path" : "cart", "component" : OrderComponent, "canActivate": [AuthGuard]},
  {"path" : "**", "component" : ErrorComponent, "canActivate": [AuthGuard]}
  
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginRegisterComponent,
    HeaderNavComponent,
    SubcatViewComponent,
    ListViewComponent,
    DetailViewComponent,
    FooterComponent,
    ErrorComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [ApiService,
              MainService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

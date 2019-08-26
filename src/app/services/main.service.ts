import { Injectable } from '@angular/core';
import{ApiService} from '../services/api.service'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  isLogged:boolean = false;

  registerMsg:object;

  loginCorrect:object;

  loginIncorrect:object;

  categoriesList:object[] = [];

  subCategoriesList:object[] = [];

  subProdList:object[] = [];

  constructor(public _apiService : ApiService, public _router :Router) { 
    
  }

  register(userNameReg:string,passwordReg:string){
    this._apiService.post(`http://localhost:8000/register`,{"username": userNameReg, "password": passwordReg}).subscribe((response)=>{
      //console.log(response) 
      this.registerMsg = response["message"]
      //console.log(this.registerMsg)
    })
  }

  checkLogin(){
    if(localStorage.getItem('token') === null){
      return (this.isLogged = false)
    } else {
      return (this.isLogged = true)
    }
  }

  login(userLog:string,passLog:string){
    this._apiService.post(`http://localhost:8000/login`,{"username": userLog, "password": passLog}).subscribe((response)=>{
      //console.log(response)
      if(localStorage.getItem('token') === null && response["message"] === "Login correct"){
        this.isLogged = true
        this.loginIncorrect = {};
        localStorage.setItem('token', response["token"]);
        this.loginCorrect = response;
        //console.log(this.loginCorrect)
        this._router.navigateByUrl('/home');
      } else {
        this.loginIncorrect = response["message"]
      }
      //console.log(this.isLogged)

    })
  }

    getCategories(){

      this._apiService.get(`http://localhost:8000/categories`).subscribe(response => { 

        
  
        for(let i=0 ; i < response.length ; i++){
        
           this.categoriesList.push({"name" : response[i]["name"],
                                      "id" : response[i]["id"] }) 
        }
        //console.log(this.categoriesList)
      })
      this.categoriesList = []
    }

    getSubCategories(id:number){
      this._apiService.get(`http://localhost:8000/subcategories/${id}`).subscribe(response => {
        this.subCategoriesList = []

        for(let i=0 ; i < response.length ; i++){

        this.subCategoriesList.push({"name" : response[i]["name"],
                                      "id" : response[i]["id"],
                                      "categoryReferenceId" : response[i]["categoryReferenceId"] }) 
        }
        
        //console.log(this.subCategoriesList)

      })

    }

    getSubProducts(id){
      this._apiService.get(`http://localhost:8000/products/subcategory/${id}`).subscribe(response => {
        /* this.subProdList = [] */
        console.log(response)
        for(let i=0 ; i < response.length ; i++){

        this.subProdList.push(response[i]) 
        }
        
        

      })

    }
  


}

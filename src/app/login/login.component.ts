import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { DashBoard } from '../models/dashboard.model';
import { NgxSpinnerService } from "ngx-spinner";
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  empId: string;
  empPwd: string;
  dashboard: DashBoard;
  constructor(private r: Router,private ss: SharedService,private spinner: NgxSpinnerService) {
    this.empId= "";
    this.empPwd="";
   }

  ngOnInit() {
  }

  login(): void{
    //console.log("Employee id "+ this.empId);
    this.spinner.show();
    this.ss.login(this.empId,this.empPwd)
    .subscribe((response) =>{
     // console.log(response);
      if(response.responseCode == '100000'){
        this.r.navigate(['dashboard']);
        localStorage.setItem("empId",response.wrappedList[0].empId);
        localStorage.setItem("empName", response.wrappedList[0].empName);
        localStorage.setItem("empRole", response.wrappedList[0].roleId);   
        localStorage.setItem("empAddress",response.wrappedList[0].address);
        localStorage.setItem("empCompName",response.wrappedList[0].compName);
        localStorage.setItem("countryCode",response.wrappedList[0].countryCode);
        localStorage.setItem("empCompId",response.wrappedList[0].compId);
      }
      else if(response.responseCode == '100001'){
       
        alert("No Record found");
      }
      else{
        alert("Server Error");
      }
      this.spinner.hide();
    },
    (error) =>{
     // console.log("Network Error");
      alert("Network Error");
      this.spinner.hide();
    }
  )
 //
  }
}

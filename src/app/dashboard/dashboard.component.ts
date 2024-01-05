import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { DashBoard } from '../models/dashboard.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

declare var jQuery;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileName = localStorage.getItem("empName");
  menulist = [];
  constructor(private ss: SharedService,private spinner: NgxSpinnerService,private r:Router) {
    jQuery('#quotationCreation').removeClass("tabClass").addClass("tabColorClass");
   }

  ngOnInit() {
    this.spinner.show();
      this.ss.getDashBaordMenu(localStorage.getItem("empRole"))
      .subscribe((response) =>{
          if(response.responseCode == '100000'){
            this.menulist = response.wrappedList;
           // console.log(this.menulist);
            this.spinner.hide();
            this.defaultComponent();
          }
          else if(response.responseCode == '100001'){
            alert("No Record Found");
            this.spinner.hide();
          }
          else {
            alert("Server Error");
            this.spinner.hide();
          }
          
        },
        (error) =>{
          alert("Network Error");
          this.spinner.hide();
        }
      )
      
  }

  logOut(){
    localStorage.clear();
    this.r.navigate(['login']);
  }

  defaultComponent(){
    jQuery('#quotationCreation').removeClass("tabClass").addClass("tabColorClass");
  }
  changeComponent(s: string){
    jQuery(".dashboardClass").removeClass("tabColorClass").addClass("tabClass");
    jQuery('#'+s).removeClass("tabClass").addClass("tabColorClass");

    //alert(s);
  }

}

import { Component, OnInit } from '@angular/core';
import { LoginCreationModel } from '../../models/loginCreation.model';
import { SharedService } from '../../shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery;

@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.component.html',
  styleUrls: ['./create-login.component.css']
})
export class CreateLoginComponent implements OnInit {

  loginCreationList: LoginCreationModel[] = [];
  viewLoginList = [];
  dealerList = [];
  compName: string;
  compAbbr: string;
  validCompanyName = false;
  //createdBy = localStorage.getItem("empId");
  settings = {
    edit: {
      editButtonContent: '<i class="fa fa-pencil">&nbsp;&nbsp;',
      //name: "Edit",
      saveButtonContent: 'Update',
      mode: 'external',
      confirmSave: true
    },
    delete: {
      //name: "Delete",
      //title: "Delete sku",
      deleteButtonContent: '<i class="fa fa-trash">',
      mode: 'external',
      confirmDelete: true
    },

   // mode: 'external',
    actions: {
      add: false,
      edit: true,
      delete: true
    },

    columns: {
      companyName: {
        title: 'COMPANY NAME',
        editable: false
        //  width: '10%'
      },
      compAbbr: {
        title: 'COMPANY ABBR',
        editable: false
        //  width: '10%'
      },
      emailId: {
        title: 'EMAIL ID',
        editable: true
        //  width: '10%'
      },

      userName: {
        title: 'EMPLOYEE NAME'
        //  width: '10%'
      },
      mobile: {
        title: 'CONTACT NUMBER'
        //  width: '10%'
      },
      empAbbr: {
        title: 'EMP ABBR'
        //  width: '10%'
      },
      createdDate: {
        title: 'CREATED DATE',
        editable: false
        // width: '20%'
      },
      updatedDate: {
        title: 'UPDATED DATE',
        editable: false
        // width: '20%'
      }
      
    }
  };
 
  
  constructor(private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getDealerListForLogin();
    this.viewCreatedLogin();
  }

  addLoginCreation() {
    let loginCreation: LoginCreationModel = {
      emailId: "",
      userName: "",
      mobile: "",
      empAbbr: ""
     // address: "",
      //role: ""
    }
    this.loginCreationList.push(loginCreation);

  }

  removeLoginCreation(event) {
    if (confirm("want to delete login creation")) {
      this.loginCreationList.splice(event, 1); // first arg = start position, second arg = no. of item
    }
  }
  companyAbbrValidation(event){
    var x = event.key;
    if (/^[a-z0-9\s]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
    }
    empAbbrValidation(event){
      var x = event.key;
      if (/^[a-z]+$/i.test(x)) {
        return true;
      }
      else {
        return false;
      }
    }
  
  emailIdValidation(event){
    var x = event.key;
    if (/^[a-z0-9\@\.]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }
  userNameValidation(event){
    var x = event.key;
    if (/^[a-z\s]+$/i.test(x)) {
      return true;
     }
     else{
       return false;
     }
}
  mobileValidation(event){
    var x = event.key;
    if (/^\d*$/.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }
  addressValidation(event){
    var x = event.key;
    //alert(x);
    if (/^[a-z0-9\s]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }

  getDealerListForLogin(){
    this.ss.getDealerListForLogin()
    .subscribe((response) => {
      if (response.responseCode == '100000') {
        this.dealerList = response.wrappedList;
        this.spinner.hide();
      }
      else if (response.responseCode == '100001') {
        alert("No Record Found");
        this.spinner.hide();
      }
      else {
        alert("Server Error");
        this.spinner.hide();
      }

    },
      (error) => {
        alert("Network Error");
        this.spinner.hide();
      }
    )
  }

  viewCreatedLogin(){
    this.ss.viewCreatedLogin()
    .subscribe((response) => {
      if (response.responseCode == '100000') {
        this.viewLoginList = response.wrappedList;
       // console.log(this.viewLoginList);
        this.spinner.hide();
      }
      else if (response.responseCode == '100001') {
        alert("No Record Found");
        this.spinner.hide();
      }
      else {
        alert("Server Error");
        this.spinner.hide();
      }

    },
      (error) => {
        alert("Network Error");
        this.spinner.hide();
      }
    )
  }

  submitCreateLogin(){
    this. validCompanyName = false;
    for(var i=0;i<this.loginCreationList.length;i++){
      let lc: LoginCreationModel = this.loginCreationList[i];
      if(lc.emailId == null || lc.emailId.trim() == ""){
        alert("Please fill emailId");
        return false;
      }
      else if(lc.userName == null || lc.userName.trim() == ""){
        alert("Please fill userName");
        return false;
      }
      else if(lc.mobile == null || lc.mobile.trim() == ""){
        alert("Please fill mobile");
        return false;
      }
      else if(lc.empAbbr == null || lc.empAbbr.trim() == ""){
        alert("Please fill Emp Abbr");
        return false;
      }
     
    }
    if(this.compAbbr == null || this.compAbbr.trim() == ""){
      alert("Please fill Company Abbr");
      return false;
    }
    if(jQuery("#myInput").val()==null || jQuery("#myInput").val().trim() == ""){
      alert("Please select company name");
      return false;
    }
    else{
      for(var cr=0;cr<this.dealerList.length;cr++){
        if(this.dealerList[cr].dealerName == jQuery("#myInput").val()){
         this. validCompanyName = true;
         break;
        }
      }
      if(this.validCompanyName == false){
        alert("Please Select a valid Company");
        return false;
      }
    }
    this.ss.submitCreateLogin(this.loginCreationList,jQuery("#myInput").val(),this.compAbbr)
    .subscribe((response) => {
      if (response.responseCode == '100000') {
        if(response.count != null){
          alert(response.count + " already exist");
        }
        else{
          alert("Created Successfully");
        }
       
        this.spinner.hide();
      //  this.viewCreatedLogin();
        location.reload();
            }
      else if (response.responseCode == '100001') {
        alert("No Record Found");
        this.spinner.hide();
      }
      else {
        alert("Server Error");
        this.spinner.hide();
      }

    },
      (error) => {
        alert("Network Error");
        this.spinner.hide();
      }
    )
   // console.log(JSON.stringify(this.loginCreationList));
  }

  updateDataValidation(e){
    if(e.newData.emailId == null ||e.newData.emailId.trim() == ""){
      alert(" Fill Email Id");
      return false;
    }
    if(e.newData.empName == null ||e.newData.empName.trim() == ""){
      alert(" Fill Emp Name");
      return false;
    }
    if(e.newData.mobile == null ||e.newData.mobile.trim() == ""){
      alert(" Fill Mobile No");
      return false;
    }
    if(e.newData.empAbbr == null ||e.newData.empAbbr.trim() == ""){
      alert(" Fill Emp Abbr");
      return false;
    }
    return true;
  }
  onEdit(event){
  var isValid:boolean = this.updateDataValidation(event);
  if(isValid){
    if(window.confirm("Do you want to update?")){
      this.ss.updateCreatedLogin(event.newData)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          alert("Update Successfully");
          this.spinner.hide();
          this.viewCreatedLogin();
        //  location.reload();
        }
        else if (response.responseCode == '100001') {
          alert("No Record Found");
          this.spinner.hide();
        }
        else if (response.responseCode == '100002') {
          alert("Email Id is duplicate");
          this.spinner.hide();
        }
        else {
          alert("Server Error");
          this.spinner.hide();
        }
    
      },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )
     }
     else {
    //  event.confirm.reject();
     // event.newData = event.data;
    }
  }
 

 }
  
  onDelete(event){
  
 //   alert("edit");
 if(window.confirm("Do you want to delete?")){
  this.ss.deleteCreatedLogin(event.data.id)
  .subscribe((response) => {
    if (response.responseCode == '100000') {
      alert("Delete Successfully");
      this.spinner.hide();
      this.viewCreatedLogin();
    //  location.reload();
    }
    else if (response.responseCode == '100001') {
      alert("No Record Found");
      this.spinner.hide();
    }
    
    else {
      alert("Server Error");
      this.spinner.hide();
    }

  },
    (error) => {
      alert("Network Error");
      this.spinner.hide();
    }
  )
 }
 else {
//  event.confirm.reject();
 // event.newData = event.data;
}

  }

  setInputValue(value) {
    jQuery("#myInput").val(value);
    jQuery(".dropdown-content").css("display", "none");
  }

  filterFunction() {
    let filter: string;
    filter = jQuery("#myInput").val();
    if (filter.length != 0) {
      jQuery(".dropdown-content").css("display", "block");
      var input, ul, li, a, i;
      // let filter: string;
      //filter1 = filter.toUpperCase();
      //alert(filter);
      //filter = input.value.toUpperCase();
      a = jQuery(".dropdown-content a");
      //alert(a);
      //a = div.getElementsByTagName("a");
      for (i = 0; i < a.length; i++) {
        var txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          a[i].style.display = "";
        } else {
          a[i].style.display = "none";
        }
      }
    }
    else {
      jQuery(".dropdown-content").css("display", "none");
    }

  }

}
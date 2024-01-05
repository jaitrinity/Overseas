import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Dealer } from '../../models/dealer.model';
import { NgForm, FormBuilder, FormGroup } from '@angular/forms';
import * as alasql from 'alasql';

declare var jQuery;

@Component({
  selector: 'app-dealer-view',
  templateUrl: './dealer-view.component.html',
  styleUrls: ['./dealer-view.component.css']
})
export class DealerViewComponent implements OnInit {

  fileName: File;
  fileN: FileReader;

  countrylist = [];
  contactSpanVar: boolean = true;
  empRole: string = localStorage.getItem('empRole');
  dealer: Dealer = {
    id: null,
    name: null,
    contactNumber: null,
    faxNumber: null,
    code: null,
    country: "",
    type: null,
    houseNo: null,
    state: null,
    city: null,
    emailId: null,
    address1: null,
    address2: null,
    zipCode: null,
    loginRequired: null,
    oldName: null,
    countryCode: null,
    createdBy: localStorage.getItem('empId')

  };
  //const dealerId: sttring;
  dealerlist = [];
  config: any;
  pageNo: number;
  pageSize: number;
  totalCount: number;
  updateButtonStatus: boolean;
  submitButtonStatus: boolean;
  // uploadForm: FormGroup;
  settings = {

    delete: {
      deleteButtonContent: '<i class="fa fa-trash">',
      //mode: 'external',
      confirmDelete: false
    },
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: true,
      columnTitle: "ACTIONS",
      custom: [{
        name: 'editDealer',
        title: '<i class="fa fa-pencil">&nbsp;&nbsp;'

      }]

    },

    columns: {

      // srNo: {
      //   title: 'ID',
      //   width: '6%',
      //   filter:false
      // },
      dealerName: {
        title: 'COMPANY NAME'
        //width: '300px'
        //  width: '10%'
      },

      phoneNo: {
        title: 'CONTACT NUMBER'
        //  width: '10%'
      },
      faxNo: {
        title: 'FAX NUMBER'
        //  width: '10%'
      },
      emailId: {
        title: 'EMAIL ID'
        // width: '20%'
      },
      dealerCode: {
        title: 'DEALER CODE'
        // width: '20%'
      },
      dealerType: {
        title: 'DEALER TYPE'
        // width: '20%'
      },
      address: {
        title: 'ADDRESS'
          //width: '300px'
      },
      city: {
        title: 'CITY'
        // width: '20%'
      },
      state: {
        title: 'STATE'
        // width: '20%'
      },
      country: {
        title: 'COUNTRY'
        // width: '10%'
      },
      zipCode: {
        title: 'ZIP CODE'
        //width: '8%'
      }
      // isLogin: {
      //   title: 'Login Required'
      //   //width: '8%'
      // }
    }
  };
  constructor(private ss: SharedService, private spinner: NgxSpinnerService) {
    this.pageNo = 1;
    this.pageSize = 5;
    this.totalCount = 0;
    this.config = {
      itemsPerPage: this.pageSize,
      currentPage: this.pageNo,
      totalItems: this.totalCount
    };
  }

  ngOnInit() {
    this.updateButtonStatus = false;
    this.submitButtonStatus = true;
    this.getTableData();
    this.getCountryList();
    // this.uploadForm = this.formBuilder.group({
    //   profile: ['']
    // });

  }
  
  validatelogo(event){
   // this.spinner.show();
   //alert(event.target.files[0].name);
   var fname: String = String (event.target.files[0].name);
    var isUpload = false;
    if (event.target.files[0].type === 'image/jpeg' && fname.indexOf(' ') == -1) {
      if (event.target.files[0].size < 30000) {
        
        var fileUpload = document.getElementById("logoId");
        var reader = new FileReader();
        //Read the contents of Image File.
        reader.readAsDataURL((<HTMLInputElement>fileUpload).files[0]);  
        reader.onload =  function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = (<FileReader>e.target).result.toString();
            //Validate the File Height and Width.
           image.onload = function () {
            var height = (<HTMLInputElement>this).height;
            var width = (<HTMLInputElement>this).width;
            if (height > 200 || width > 200) {
                alert("Height and Width must not exceed 200px.");
                jQuery("#logoId").val(null); 
                return false;
            }
            isUpload = true;
           
            return true;
            } ;
        }
       // this.spinner.hide();
      }
      else {
       // this.spinner.hide();
        alert("image size exceeded! less than 30kb")
        jQuery("#logoId").val(null);
        return false;
      }
      jQuery('#submitBtn').prop('disabled',true);
      setTimeout(() => {
        this.updateLogoImage(event,isUpload);
        jQuery('#submitBtn').prop('disabled',false);
        
      },2500);
    }
    else{
      this.spinner.hide();
      alert("Image should be in jpg format without space in filename");
      jQuery("#logoId").val(null);
      return false;
    }
    
  }

  updateLogoImage(event,upld){
    if(upld){
      this.fileName = event.target.files[0];
    }
    else{
      this.fileName = null;
    }
  }
  // getFiles(event) {
  //   if (event.target.files[0].type === 'image/jpeg') {
  //     if (event.target.files[0].size < 200 * 100) {
  //       if (event.target.files[0].size < 20000) {
  //         this.fileName = event.target.files[0];
  //       }
  //       else {
  //         alert("image size exceeded! less than 20kb")
  //         jQuery("#logoId").val(null);
  //         return false;
  //       }
  //     }
  //     else {
  //       alert("image height width should be less than or equal to 200*100");
  //       jQuery("#logoId").val(null);
  //       return false;
  //     }
  //   }
  //   else {
  //     alert("Please select image/jpeg");
  //     jQuery("#logoId").val(null);
  //     return false;
  //   }

  //   // this.uploadForm.get('profile').setValue(this.fileName[0]);
  // }

  async saveDealer() {
    this.dealer.countryCode = jQuery(".country").children("option:selected").children("input").val();
    //alert("Save Dealer");
    //console.log(this.dealer);
    
    if (this.fileName != null) {
      //alert("filename added");
      const dealerId1 = await this.addDealer();
      //console.log(dealerId1);
      //console.log(this.fileName);
      if(dealerId1 != ""){
        this.spinner.show();
        this.ss.saveLogoImage(this.fileName, dealerId1)
          .subscribe(
            (response) => {
              if (response.responseCode == '100000') {
                alert("Logo Successfuly created");
                this.spinner.hide();
                this.getTableData();
              }
              else if (response.responseCode == '100001') {
                alert("No Record Found");
                this.spinner.hide();
              }
  
              else {
                alert("Server Error1");
                this.spinner.hide();
              }
              //  jQuery("#cancelBtnId").click();
            },
            (error) => {
              alert("Network Error");
              this.spinner.hide();
              // jQuery("#cancelBtnId").click();
            }
  
          )
      }
    }
    else {
      if (confirm("Are you sure to submit data without logo")) {
        const dealerId2 = await this.addDealer();
        //console.log(dealerId2);
        if(dealerId2 !=""){
          this.getTableData();
        }
        
        //  jQuery("#cancelBtnId").click();
      }

    }
  }
  public addDealer() {
    return new Promise(resolve => {
      setTimeout(() => {
        let dId: string = "";
        this.spinner.show();
        this.ss.saveDealer(this.dealer)
          .subscribe((response) => {
            if (response.responseCode == '100000') {
              dId = response.wrappedList[0].srNo;
              this.spinner.hide();
              jQuery("#cancelBtnId").click();

            }
            else if (response.responseCode == '100001') {
              alert("No Record Found");
              this.spinner.hide();
            }
            else if (response.responseCode == '100002') {
              alert("Data Already Exist ");
              this.spinner.hide();
            }
            else {
              alert("Server Error1");
              this.spinner.hide();
            }
            resolve(dId);
          },
            (error) => {
              alert("Network Error");
              this.spinner.hide();
            }

          )

      }, 3000);
    });
  }

  pageChanged(event) {
    this.pageNo = event;
    this.getTableData();
  }


  onCancel() {
    this.updateButtonStatus = false;
    this.submitButtonStatus = true;
  }
  onDelete(event) {
   // alert(event.data.srNo);
    if (confirm("Are you sure you want to delete")) {
      let json = {
        "dId": event.data.srNo,
        "dealerMail": event.data.emailId,
        "dealerName": event.data.dealerName,
        "isDealerLogin":event.data.isDealerLogin
      }

      this.spinner.show();
      this.ss.deleteDealer(json)
        .subscribe((response) => {
          if (response.responseCode == '100000') {
            this.getTableData();
            alert("Delete successfully");
            this.spinner.hide();
          }

          else {
            alert("Server Error1");
            this.spinner.hide();
          }

        },
          (error) => {
            alert("Network Error");
            this.spinner.hide();
          }

        )
      //this.spinner.hide();

    }
  }
  onEdit(event) {

    this.updateButtonStatus = true;
    this.submitButtonStatus = false;
    this.dealer.id = event.data.srNo;
    this.dealer.oldName = event.data.dealerName;
    this.dealer.name = event.data.dealerName;
    this.dealer.contactNumber = event.data.phoneNo;
    this.dealer.faxNumber = event.data.faxNo;
    this.dealer.emailId = event.data.emailId;
    this.dealer.code = event.data.dealerCode;
    this.dealer.type = event.data.dealerType;
    this.dealer.loginRequired = event.data.isLogin;
    this.dealer.address1 = event.data.address1;
    this.dealer.address2 = event.data.address2;
    this.dealer.city = event.data.city;
    this.dealer.state = event.data.state;
    this.dealer.country = event.data.country;
    this.dealer.zipCode = event.data.zipCode;

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  getCountryList(){
    this.ss.getCountryList()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.countrylist = response.wrappedList;
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
    jQuery('.loaderClass').hide();
  }
  
  getTableData() {
     this.spinner.show();
    //jQuery('.loaderClass').show();
    this.ss.getDealerDetails(this.pageSize, this.pageNo)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.dealerlist = response.wrappedList;
          //console.log(this.dealerlist);
          this.totalCount = response.count;
          this.config = {
            itemsPerPage: this.pageSize,
            currentPage: this.pageNo,
            totalItems: this.totalCount
          };
           this.spinner.hide();
          //jQuery('.loaderClass').hide();

        }
        else if (response.responseCode == '100001') {
      //    alert("No Record Found");
          this.spinner.hide();
        }
        else {
        //  alert("Server Error");
          this.spinner.hide();
        }

      },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )
    //jQuery('.loaderClass').hide();
  }

  exportDealer() {
    if(this.dealerlist.length ==0){
      alert("no data to export");
    }
    else{
      this.spinner.show();
      alasql('Select dealerName as DealerName,country as Country,phoneNo as PhoneNumber,emailId as EmailId,address as Address,state as State,city as City,dealerCode as DealerCode,dealerType as DealerType,faxNo as FaxNumber into xlsxml("CreatedDealer.xls",{headers:true}) FROM ?', [this.dealerlist]);
      // this.ss.exportDealer();
      this.spinner.hide();
    }
 
  }

  nameValidation(event) {
    var x = event.key;
    if (/^[!%'"`]+$/i.test(x)) {
      return false;
    }
    else {
      return true;
    }
  }
  contactNumberValidation(event) {
    var x = event.key;
    //if (/^\d*$/.test(x)) {
      if (/^[0-9\,+/]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }
  houseNoValidation(event) {
    var x = event.key;
    //alert(x);
    // if (/^[a-z0-9\s]+$/i.test(x)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
    if (/^[!%'"`]+$/i.test(x)) {
      return false;
    }
    else {
      return true;
    }
  }
  stateValidation(event) {
    var x = event.key;
    if (/^[a-z0-9\s]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }
  cityValidation(event) {
    var x = event.key;
    if (/^[a-z0-9\s]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }
  emailValidation(event) {
    var x = event.key;
    // if (/^[a-z0-9\@\.]+$/i.test(x)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
    if (/^[!%'"`]+$/i.test(x)) {
      return false;
    }
    else {
      return true;
    }
  }
  addressValidation(event) {
    var x = event.key;

    // if (/^[a-z0-9\s]+$/i.test(x)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
    if (/^[!%'"`]+$/i.test(x)) {
      return false;
    }
    else {
      return true;
    }
  }
  zipCodeValidation(event) {
    var x = event.key;
    if (/^[a-z0-9\s]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }
}

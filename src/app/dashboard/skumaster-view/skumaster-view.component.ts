import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as alasql from 'alasql';

declare var jQuery;

@Component({
  selector: 'app-skumaster-view',
  templateUrl: './skumaster-view.component.html',
  styleUrls: ['./skumaster-view.component.css']
})
export class SkumasterViewComponent implements OnInit {

  skuTableCol = [];
  skulist = [];
  config: any;
  pageNo: number;
  pageSize: number;
  totalCount: number;
  skuColString: string;
  skuFileName: File;
  productFileName: File;
  productFile: File;
  lineFileName: File;
  settings1;
  mySettings = {
    // mode: 'external',
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
    //actions: true,
    actions: {
      add: false,
      edit: true,
      delete: true,
      columnTitle: "ACTIONS"
    },

    columns: {

    }
  };
  
  constructor(private ss: SharedService, private spinner: NgxSpinnerService) {
    this.pageNo = 1;
    this.pageSize = 20;
    this.totalCount = 0;
    this.config = {
      itemsPerPage: this.pageSize,
      currentPage: this.pageNo,
      totalItems: this.totalCount
    };
    this.skuColString = "";
  }

  ngOnInit() {
    // this.spinner.show();
    this.settings1 = Object.assign({}, this.mySettings);
    jQuery('.loaderClass').show();
    this.getSkuTableColumns();
  }

  pageChanged(event) {
    this.pageNo = event;
    // this.config.currentPage = event;
    this.getTableData();
  }


  getSkuTableColumns() {
    this.ss.getSkuTableColumns()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.skuTableCol = response.wrappedList;
         // console.log(this.skuTableCol);

          for (var j = 0; j < this.skuTableCol.length; j++) {
            this.skuColString = this.skuColString + this.skuTableCol[j].colKey + ",";
            if (j == 0) {
              // this.mySettings.columns['id'] =
              //   { title: this.skuTableCol[j].colName 
              //   };
              ;
            }
            else if (j == 1) {
              this.mySettings.columns['catCode'] =
                { title: this.skuTableCol[j].colName };
            }
            else {
              if (this.skuTableCol[j].isImage == 'Y') {
                this.mySettings.columns['item' + j] =
                  {
                    editable: false,
                    title: this.skuTableCol[j].colName,
                    filter: false,
                    type: 'html',
                    valuePrepareFunction: (item: string) => { return `<img src="${item}" width="30px" height="30px"/ >` }
                  };
              }
              else {
                this.mySettings.columns['item' + j] =
                {
                  title: this.skuTableCol[j].colName,
                };
              }

            }
            this.settings1 = Object.assign({}, this.mySettings);
          }
          this.getTableData1();
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

  getTableData1() {
    // this.spinner.show();
    jQuery('.loaderClass').show();
    let json = {
      'skuColString': this.skuColString.substring(0, this.skuColString.length - 1),
      'pageNo': this.pageNo,
      'pageSize': this.pageSize
    }
    this.ss.getSkuData1(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.skulist = response.wrappedList;
          //console.log(this.skulist);
          // this.totalCount = response.count;
          // this.config = {
          //   itemsPerPage: this.pageSize,
          //   currentPage: this.pageNo,
          //   totalItems: this.totalCount
          // };
          //    this.spinner.hide();
          jQuery('.loaderClass').hide();
        }
        else if (response.responseCode == '100001') {
          alert("No Record Found");
          //this.spinner.hide();
          jQuery('.loaderClass').hide();
        }
        else {
          alert("Server Error");
          //this.spinner.hide();
          jQuery('.loaderClass').hide();
        }

      },
        (error) => {
          alert("Network Error");
          //this.spinner.hide();
          jQuery('.loaderClass').hide();
        }
      )
  }

  getTableData() {
    // this.spinner.show();
    jQuery('.loaderClass').show();
    this.ss.getSkuDetails(this.pageSize, this.pageNo)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.skulist = response.wrappedList;
         // console.log(this.skulist);
          this.totalCount = response.count;
          this.config = {
            itemsPerPage: this.pageSize,
            currentPage: this.pageNo,
            totalItems: this.totalCount
          };
          //    this.spinner.hide();
          jQuery('.loaderClass').hide();
        }
        else if (response.responseCode == '100001') {
          alert("No Record Found");
          //this.spinner.hide();
          jQuery('.loaderClass').hide();
        }
        else {
          alert("Server Error");
          //this.spinner.hide();
          jQuery('.loaderClass').hide();
        }

      },
        (error) => {
          alert("Network Error");
          //this.spinner.hide();
          jQuery('.loaderClass').hide();
        }
      )
  }

  onEdit(event) {
    //alert(event.data);
    //alert(event.newData);
    if (window.confirm('Are you sure you want to update?')) {
      //call to remote api, remember that you have to await this
      //alert(event.newData.catCode);
      this.ss.updateSku(event.newData, this.skuColString)
        .subscribe((response) => {
          if (response.responseCode == '100000') {
            location.reload();
            alert("update successfully");
            //location.reload();  
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
            this.spinner.hide();
          }
          else if (response.responseCode == '100002') {
            alert("Data Already Exist with same Cat Code");
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
      event.confirm.reject();
     // event.newData = event.data;
    }


  }
  onDelete(event) {
    if (window.confirm('Are you sure you want to delete?')) {

      this.ss.deleteSku(event.data.id)
        .subscribe((response) => {
          if (response.responseCode == '100000') {
            location.reload();
            alert("record deleted");
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
    else {
      event.confirm.reject();
    }
  }
  exportSku() {
    if(this.skulist.length==0){
      alert("No data to export");
    }
    else{
      this.spinner.show();

      //alasql('Select * into xlsxml("SkuMaster.xls",{headers:true}) FROM ?', [this.skulist]);
       this.ss.exportSku();
      this.spinner.hide();
    }
    
  }

  downloadSkuFormat() {
    this.ss.downloadSkuFormat();
    //   .subscribe((response) =>{
    //     if(response.responseCode == '100000'){
    //      alert("Successfully uploaded");
    //       this.spinner.hide();
    //     }
    //     else if(response.responseCode == '100001'){
    //       alert("No Record Found");
    //       this.spinner.hide();
    //     }
    //     else {
    //       alert("Server Error");
    //       this.spinner.hide();
    //     }

    //   },
    //   (error) =>{
    //     alert("Network Error");
    //     this.spinner.hide();
    //   }
    // )
  }
  getProductFile(event){
    var fname: String = String (event.target.files[0].name); 
    var filename: String = String (this.productFile.name);
    console.log(filename);
    console.log(fname);
    console.log(this.productFile);
    var isUpload = false;
    if (event.target.files[0].type === 'image/jpeg' && fname.indexOf(' ') == -1) {
      if (event.target.files[0].size < 102400) {
        this.productFileName = event.target.files[0];
        var reader = new FileReader();
        //reader.readAsDataURL((<HTMLInputElement>fileUpload).files[0]); 
        reader.readAsDataURL(this.productFileName);  
        reader.onload =  function (e) {
          var image = new Image();
          //Set the Base64 string return from FileReader as source.
          image.src = (<FileReader>e.target).result.toString();
          //Validate the File Height and Width.
         image.onload = function () {
          var height = (<HTMLInputElement>this).height;
          var width = (<HTMLInputElement>this).width;
          if (height > 200 || width > 200) {
              alert("Height and Width must not exceed 200px.");
              //jQuery("#logoId").val(null); 
              return false;
          }
          isUpload = true;
          return true;
        };
      }
    }
    else {
      // this.spinner.hide();
       alert("image size exceeded! less than 30kb")
       //jQuery("#logoId").val(null);
       return false;
     }
     jQuery('#submitBtn').prop('disabled',true);
      setTimeout(() => {
        //this.updateLogoImage(event,isUpload);
        //jQuery('#submitBtn').prop('disabled',false);
        
      },2500);
  }
  else{
    this.spinner.hide();
    alert("Image should be in jpg format without space in filename");
    //jQuery("#logoId").val(null);
    this.productFile = null;
    return false;
  }
}
  getLineFile(event){
    this.lineFileName = event.target.files[0];
  }
  getFiles(event) {
    this.skuFileName = event.target.files[0];
  }
  uploadSkuMaster() {
    if(this.skuFileName !=null){
      //console.log(JSON.stringify(this.skuFileName));
      //alert(this.skuFileName.name);
      if(this.skuFileName.name == 'SkuMasterExcel.xls'){
        this.ss.uploadSku(this.skuFileName)
        .subscribe((response) => {
        //  console.log(JSON.stringify(response));
          if (response.responseCode == '100000') {
            // alert(response.count);
            // var carr = response.count.split('&');
            // var str = "";
            // str = str + carr[0] + " successfully uploaded \n";
            // if (carr[1] != "") {
            //   str = str + "row - " + carr[1] + " not uploaded\n";
            // }
            // if (carr[2] != "") {
            //   str = str + "row - " + carr[2] + "already exist";
            // }
            // alert(str);
            alert("Sku Upload Successfully");
            this.spinner.hide();
            this.getTableData1();
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
      else{
        alert("File name should be SkuMasterExcel.xls")
      }
      
    }
    else{
      alert("Please choose file");
    }
  }
}

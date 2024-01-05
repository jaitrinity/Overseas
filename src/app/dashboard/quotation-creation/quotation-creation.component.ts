import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
//import { ImageRenderComponent } from '../../image-render/image-render.component';
import { DomSanitizer } from '@angular/platform-browser';
import { QuotationItem } from '../../models/quotationItem.model';
declare var jQuery;
import * as xlsx from 'xlsx';
import * as alasql from 'alasql';
import { BulkUploadReturnModel } from '../../models/returnBulkUpload.model';
import { ExcelService } from '../../shared/excel.service';
import { BillingValue } from '../../models/billingValue.model';
import { TermAndCondition } from '../../models/termAndCondition.model';
import { OptionalField } from '../../models/optionalField.model';
import { TermCondition } from '../../models/termCondition.model';
import { ProjectStatus } from '../../models/projectStatus.model';
import { Currency } from '../../models/currency.model';
import { QuotationItemDetail } from '../../models/quotationItemDetail.model';
import { DraftQuotation } from '../../models/draftQuotation.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';

@Component({
  selector: 'app-quotation-creation',
  templateUrl: './quotation-creation.component.html',
  styleUrls: ['./quotation-creation.component.css']
})
export class QuotationCreationComponent implements OnInit {
  compId = localStorage.getItem("empCompId");
  toDealerId = "";
  compToDealerId = "";
  datePickerConfig: Partial<BsDatepickerConfig>;
  dealerQuotationCol: string;
  searchBy: string = "";
  searchProd: string = "";
  dealerSkuDetails = [];
  dealerSkuCol = [];
  dealerSkuCol1 = [];
  dealerSkuSelectedCol = [];
  dealerSkuColSize: number = 0;
  selectedItems: QuotationItem[] = [];
  termConditionList: TermCondition[] = [];
  constantValue: any = [];
  projectStatusList: ProjectStatus[] = [];
  currencyList: Currency[] = [];
  cfrPosition: any;
  dealerList: any = [];
  quotationHistory = [];
  bulkUploadFile: File;
  arrayBuffer: any;
  exportData = [];
  returnBulkUploadFile: BulkUploadReturnModel[] = [];
  returnBulkUploadRemark: any = "";
  baseAmount: number;
  billingValueList: BillingValue[] = [];
  billingAmount: number;
  tclist: TermAndCondition[] = [];
  userFilter: any = { toName: '' };
  fieldConfigComb: any = [];
  optionalFieldList = [];
  selectedBudgetaryPdfItem: string;
  selectedPdfItem: string;
  optionalFieldModelList: OptionalField[] = [];
  quantityFlag: boolean = true;
  isDate: any = 'Y';
  projectEndDate: any;
  currName: any;
  term: any;
  p: number;
  validToField = false;
  validCurrency = false;
  qtyspanClass = true;
  pricespanClass = true;
  quotationId: string;
  c1: string = "COMB1";
  c2: string = "COMB2";
  c3: string = "COMB3";
  c4: string = "COMB4";
  c5: string = "COMB5";
  comb: string = "";
  optionalCount: number = 0;
  detailPdfQId: string;
  roleId: string;
  currencyId: string;
  cfrFlag: boolean = true;
  settings;
  mySettings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [{
        name: 'checkCol',
        title: '<i class="fa fa-plus">',
        // valuePrepareFunction:(cell,row)=>{
        //   //return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`
        //   return `<input type="checkbox"/>`
        // },
      }]
      // position: 'right'
    },
    // rowClassFunction: (row) =>{
    //   return "customActionClass";
    // },
    //   actions: {
    //     title: 'Action',
    //     type: 'html',
    //     valuePrepareFunction: (value) => { return this._sanitizer.bypassSecurityTrustHtml('<input type="checkbox" (change)= "isCheckedRow()"></input>'); },
    //     filter: false
    //   },

    //actions: false,
    // actions: {
    //      delete:false,
    //   },
    //  add: {
    //  confirmCreate: true,
    //  },
    // delete: {
    // confirmDelete: true,
    // },
    //  edit: {
    //  confirmSave: true,
    //  },
    columns: {
      //   button:{
      //     title: "ADD" ,
      //     filter: false,
      //     type: 'html',
      //     valuePrepareFunction:(cell,row)=>{
      //     return `<a title="See Detail Product "href="Your api key or something/${row.Id}"> <i class="ion-edit"></i></a>`;
      //   }
      // }
      // button: {
      //   title: 'Button',
      //   filter: false,
      //   type: 'custom',
      //   renderComponent: ImageRenderComponent,
      //   onComponentInitFunction(instance) {
      //     instance.save.subscribe();
      //     }
      //   //valueprepareFunction: (button) => { return `<button (click)="alert()">Click me</button>`; }
      // }
    }
  };

  qhsettings = {
    mode: 'external',
    actions: {
      add: false,
      edit: {
        editButtonContent: '<i class="ion-edit"></i>',
        saveButtonContent: '<i class="ion-checkmark"></i>',
        cancelButtonContent: '<i class="ion-close"></i>',
        confirmSave: true
      },
      delete: false,

    },
    columns: {
      qId: { title: 'QuotationId' },
      fromName: { title: 'From' },
      toName: { title: 'To' },
      issuedBy: { title: 'IssuedBy' },
      datetime: { title: 'DateTime' },
      status: { title: 'Status' }
    }
  };




  constructor(private ss: SharedService, private spinner: NgxSpinnerService, private _sanitizer: DomSanitizer, private excelService: ExcelService) 
  {
    this.datePickerConfig = Object.assign({},
      {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'YYYY-MM-DD',
    });
  }
  

  ngOnInit() {
    
    jQuery("#toId").val(localStorage.getItem("empAddress"));
    this.roleId = localStorage.getItem("empRole");
    this.settings = Object.assign({}, this.mySettings);
    this.getDealerQuotationColumns();
    this.getConstantValues();
    //this.getTermsAndConditions();
    this.getDealerList();
    this.baseAmount = 0;
    this.billingAmount = this.baseAmount;
    this.getQuotationHistory();
  }
  removeDate(e){
    jQuery("#"+e).val("");
  }
  onCustomAction(event) {
    if (this.selectedItems.length != 0) {
      //alert("method call");
      // for(var a=0;a<this.selectedItems.length;a++){
      //   if(event.data.item0==this.selectedItems[a].item0){
      //     alert("item already exist with sku no "+ event.data.item1);
      //     return false;
      //   }
      // }
      // alert(event.data.item0);
      this.addSelectedItem(event);
    }
    else {
      // alert(event.data.item0);
      this.addSelectedItem(event);
    }
  }

  removeSelectedItem(event) {
    // alert("remove item "+event);
    //jQuery("."+event).remove();
    if (confirm("want to delete this item")) {
      this.selectedItems.splice(event, 1); // first arg = start position, second arg = no. of item
      // console.log(this.selectedItems);
      //jQuery(".quant_" + event).val("");
      //jQuery(".amount_" + event).val("");
      this.baseAmount = 0;
      for (var b = 0; b < this.selectedItems.length; b++) {
        this.baseAmount = this.baseAmount + this.selectedItems[b].price;
      }
      this.billingAmount = +this.baseAmount;
    }

    // for(var a; a< this.selectedItems.length;a++){
    //   if(event == this.selectedItems[a].item1){
    //     this.selectedItems.splice(a,1);
    //     return false;
    //   }
    // }
  }
  contactValidation(event) {
    var x = event.key;
    //if (/^\d*$/.test(x)) {
    if (/^[0-9\,+/]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }
  validatecfrAmount(event) {
    //alert(event);
    var x = event.key;
    if (/^[0-9.]+$/i.test(x)) {
      //if (/^\d*$/.test(x)) {
      this.cfrFlag = true;
      return true;
    }
    else {
      this.cfrFlag = false;
      return false;
    }
  }

  validateQuantity(event) {
    var x = event.key;
    //if (/^[0-9./]+$/i.test(x)){ 
    if (/^\d*$/.test(x)) {
      this.quantityFlag = true;
      return true;
    }
    else {
      this.quantityFlag = false;
      return false;
    }
  }
  calculateAmount(pos) {
    //alert(pos);
    //if(this.dealerSkuSelectedCol)
    //for(var j=0;j<this.dealerSkuCol.length;j++){
    //if(this.dealerSkuCol[j].fieldKey == 'CFR'){
    // alert(this.quantityFlag);
    //alert();
    //var q: string = parseInt(jQuery(".quant_" + pos).val())+"";
    var q: string = this.selectedItems[pos].qty;
    var cfr: string;
    //  if(this.roleId =='3'){
    //   cfr = this.selectedItems[pos].cfrAmountManual+"";
    // }
    // else{
    //   cfr = this.selectedItems[pos].cfrAmount+"";
    // }
    cfr = this.selectedItems[pos].cfrAmountManual + "";
    if (this.cfrFlag == true && cfr != "NaN" && this.quantityFlag == true && q != "NaN") {
      //alert(q);

      //alert(parseFloat(cfr));
      //this.selectedItems[pos].qty = q;
      //var a = parseInt(this.selectedItems[pos].qty);
      var itemAmount: any = parseInt(q) * parseFloat(cfr);
      //jQuery(".amount_" + pos).html(itemAmount);
      this.selectedItems[pos].price = itemAmount;
      // }
      //}
      this.baseAmount = 0;
      for (var b = 0; b < this.selectedItems.length; b++) {
        this.baseAmount = +this.baseAmount + +this.selectedItems[b].price;
      }
      this.billingAmount = +this.baseAmount;
    }

  }
  calculateAmountOnCfrManual(pos) {
    //alert(pos);
    var q: string = this.selectedItems[pos].qty;
    var cfr: string;
    //  if(this.roleId =='3'){
    //   cfr = this.selectedItems[pos].cfrAmountManual+"";
    // }
    // else{
    //   cfr = this.selectedItems[pos].cfrAmount+"";
    // }
    cfr = this.selectedItems[pos].cfrAmountManual + "";
    if (this.cfrFlag == true && cfr != "NaN" && this.quantityFlag == true && q != "NaN") {
      var itemAmount: any = parseInt(q) * parseFloat(cfr);
      this.selectedItems[pos].price = itemAmount;
      this.baseAmount = 0;
      for (var b = 0; b < this.selectedItems.length; b++) {
        this.baseAmount = +this.baseAmount + +this.selectedItems[b].price;
      }
      this.billingAmount = +this.baseAmount;
    }

  }
  addBillingValue() {
    let billingvalue: BillingValue = {
      billingName: "",
      billingValue: "",
      billingType: ""
    }
    this.billingValueList.push(billingvalue);

  }
  removeBillingValue(event) {
    if (confirm("want to delete this item")) {
      this.billingValueList.splice(event, 1); // first arg = start position, second arg = no. of item
      this.billingAmount = this.baseAmount;
      for (var b = 0; b < this.billingValueList.length; b++) {
        var val = this.billingValueList[b].billingValue;
        if (this.billingValueList[b].billingType == 'add') {
          if (val.endsWith('%')) {

            this.billingAmount = this.billingAmount + this.baseAmount * parseFloat(val.substring(0, val.length - 1)) / 100;
          }
          else {
            this.billingAmount = this.billingAmount + parseFloat(val);
          }

        }
        else if (this.billingValueList[b].billingType == 'subtract') {
          if (val.endsWith('%')) {

            this.billingAmount = this.billingAmount - this.baseAmount * parseFloat(val.substring(0, val.length - 1)) / 100;
          }
          else {
            this.billingAmount = this.billingAmount - parseFloat(val);
          }

        }
      }
    }
  }
  billingNameValidation(event, pos) {
    var x = event.key;
    //if (/^[a-z0-9/,\s]+$/i.test(x)) {
      if (/^[&:%]+$/i.test(x)) {
      // jQuery("#add_"+pos). prop("checked", false);
      // jQuery("#subtract_"+pos). prop("checked", false);
      // this.billingAmount = 0;
      return false;
    }
    else {
      return true;
    }
  }
  billingValueValidation(event, pos) {
    var x = event.key;
    if (/^[0-9\%\.]+$/i.test(x)) {
      this.billingValueList[pos].billingType = "";
      jQuery("#add_" + pos).prop("checked", false);
      jQuery("#subtract_" + pos).prop("checked", false);
      this.billingAmount = 0;
      return true;
    }
    else {
      return false;
    }
  }
  billingValueValidation1(event, pos) {

    jQuery("#add_" + pos).prop("checked", false);
    jQuery("#subtract_" + pos).prop("checked", false);
    this.billingAmount = 0;
    return true;

  }
  calculateBillingAmount(bv: BillingValue, billingtype) {
    //alert(billingtype);
    bv.billingType = billingtype;
    this.billingAmount = this.baseAmount;
    for (var b = 0; b < this.billingValueList.length; b++) {
      var val = this.billingValueList[b].billingValue;
      if (this.billingValueList[b].billingType == 'add') {
        if (val.endsWith('%')) {

          this.billingAmount = this.billingAmount + this.baseAmount * parseFloat(val.substring(0, val.length - 1)) / 100;
        }
        else {
          this.billingAmount = this.billingAmount + parseFloat(val);
        }

      }
      else if (this.billingValueList[b].billingType == 'subtract') {
        if (val.endsWith('%')) {

          this.billingAmount = this.billingAmount - this.baseAmount * parseFloat(val.substring(0, val.length - 1)) / 100;
        }
        else {
          this.billingAmount = this.billingAmount - parseFloat(val);
        }

      }
    }
  }

  chooseDate() {
    //alert(this.isDate);
  }
  deleteCreatedQuotation(id){
    this.spinner.show();
    this.ss.deleteCreatedQuotation(id)
    .subscribe((response) => {
      if (response.responseCode == '100000') {
        this.spinner.hide();
        alert("Deleted Successfully");
        this.getQuotationHistory();
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
  deleteQuotation(id){
    if(confirm("Do you want to delete this quotation ?")){
     this.deleteCreatedQuotation(id); 
    }
  }
  viewPendingQuotation(id) {

    this.quotationId = id + "";
    this.getDealerDraftQuotation(id);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  addTermAndCondition() {
    let tc: TermAndCondition = {
      tcCheck: "",
      tcValue: ""
    }
    this.tclist.push(tc);
  }
  removeTermAndCondition(pos) {
    this.tclist.splice(pos, 1);
  }

  downloadFormatQuotation() {
    this.ss.downloadFormatQuotation();
  }


  getBulkUploadFile(event) {
    this.bulkUploadFile = event.target.files[0];
  }
  bulkUploadQuotation() {
    //jQuery("#bulkUploadQId");
    if (this.bulkUploadFile == null) {
      alert("Please choose file");
      return false;
    }

    this.returnBulkUploadFile = [];
    this.exportData = [];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.bulkUploadFile);
    var flag: boolean = true;
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = xlsx.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.exportData = xlsx.utils.sheet_to_json(worksheet, { raw: true });
      //console.log("quotation upload " + JSON.stringify(this.exportData));

      loop1:
      for (var j = 0; j < this.exportData.length; j++) {
        flag = true;
        // for (var l = 0; l < this.selectedItems.length; l++) {
        //   if (this.exportData[j].CatCode == this.selectedItems[l].item1) {
        //     //continue loop1;
        //     flag = false;
        //     console.log("selected item " + this.exportData[j].SL);
        //   }
        // }
        // console.log(" flag value " + flag);
        if (flag) {
          //console.log("not selected item " + this.exportData[j].CATCODE);
          for (var k = 0; k < this.dealerSkuDetails.length; k++) {
            //console.log("insert item1 " + JSON.stringify(this.dealerSkuDetails[k].item1));
            if (this.exportData[j].CATCODE == this.dealerSkuDetails[k].item1) {
              //console.log("insert item " + JSON.stringify(this.dealerSkuDetails[k]));
              let item: QuotationItem = {
                item0: "",
                item1: "",
                item2: "",
                item3: "",
                item4: "",
                item5: "",
                item6: "",
                item7: "",
                item8: "",
                item9: "",
                item10: "",
                item11: "",
                item12: "",
                item13: "",
                item14: "",
                item15: "",
                item16: "",
                item17: "",
                item18: "",
                item19: "",
                item20: "",
                item21: "",
                item22: "",
                item23: "",
                item24: "",
                item25: "",
                isImgItem0: 'N',
                isImgItem1: 'N',
                isImgItem2: 'N',
                isImgItem3: 'N',
                isImgItem4: 'N',
                isImgItem5: 'N',
                isImgItem6: 'N',
                isImgItem7: 'N',
                isImgItem8: 'N',
                isImgItem9: 'N',
                isImgItem10: 'N',
                isImgItem11: 'N',
                isImgItem12: 'N',
                isImgItem13: 'N',
                isImgItem14: 'N',
                isImgItem15: 'N',
                isImgItem16: 'N',
                isImgItem17: 'N',
                isImgItem18: 'N',
                isImgItem19: 'N',
                isImgItem20: 'N',
                isImgItem21: 'N',
                isImgItem22: 'N',
                isImgItem23: 'N',
                isImgItem24: 'N',
                isImgItem25: 'N',
                isQuotationSelected0: 'N',
                isQuotationSelected1: 'N',
                isQuotationSelected2: 'N',
                isQuotationSelected3: 'N',
                isQuotationSelected4: 'N',
                isQuotationSelected5: 'N',
                isQuotationSelected6: 'N',
                isQuotationSelected7: 'N',
                isQuotationSelected8: 'N',
                isQuotationSelected9: 'N',
                isQuotationSelected10: 'N',
                isQuotationSelected11: 'N',
                isQuotationSelected12: 'N',
                isQuotationSelected13: 'N',
                isQuotationSelected14: 'N',
                isQuotationSelected15: 'N',
                isQuotationSelected16: 'N',
                isQuotationSelected17: 'N',
                isQuotationSelected18: 'N',
                isQuotationSelected19: 'N',
                isQuotationSelected20: 'N',
                isQuotationSelected21: 'N',
                isQuotationSelected22: 'N',
                isQuotationSelected23: 'N',
                isQuotationSelected24: 'N',
                isQuotationSelected25: 'N',
                isCfr0: 'N',
                isCfr1: 'N',
                isCfr2: 'N',
                isCfr3: 'N',
                isCfr4: 'N',
                isCfr5: 'N',
                isCfr6: 'N',
                isCfr7: 'N',
                isCfr8: 'N',
                isCfr9: 'N',
                isCfr10: 'N',
                isCfr11: 'N',
                isCfr12: 'N',
                isCfr13: 'N',
                isCfr14: 'N',
                isCfr15: 'N',
                isCfr16: 'N',
                isCfr17: 'N',
                isCfr18: 'N',
                isCfr19: 'N',
                isCfr20: 'N',
                isCfr21: 'N',
                isCfr22: 'N',
                isCfr23: 'N',
                isCfr24: 'N',
                isCfr25: 'N',
                cfrAmount: 0,
                cfrAmountManual: 0,
                ref: '',
                qty: '1',
                price: 0
              }


              if (0 < this.dealerSkuColSize) {
                item.item0 = this.dealerSkuDetails[k].item0;
              }
              if (1 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[1].isQuotationSelected == 'Y') {
                  item.item1 = this.dealerSkuDetails[k].item1;
                  if (this.dealerSkuCol[1].isImage == 'Y') {
                    item.isImgItem1 = 'Y';
                  }
                  item.isQuotationSelected1 = 'Y';
                  if (this.dealerSkuCol[1].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item1;
                    item.isCfr1 = 'Y';
                  }
                }
              }
              if (2 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[2].isQuotationSelected == 'Y') {
                  item.isQuotationSelected2 = 'Y';
                  item.item2 = this.dealerSkuDetails[k].item2;
                  if (this.dealerSkuCol[2].isImage == 'Y') {
                    item.isImgItem2 = 'Y';
                  }
                  if (this.dealerSkuCol[2].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item2;
                    item.isCfr2 = 'Y';
                  }
                }

              }
              if (3 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[3].isQuotationSelected == 'Y') {
                  item.item3 = this.dealerSkuDetails[k].item3;
                  if (this.dealerSkuCol[3].isImage == 'Y') {
                    item.isImgItem3 = 'Y';
                  }
                  item.isQuotationSelected3 = 'Y';
                  if (this.dealerSkuCol[3].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item3;
                    item.isCfr3 = 'Y';
                  }
                }

              }
              if (4 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[4].isQuotationSelected == 'Y') {
                  item.item4 = this.dealerSkuDetails[k].item4;
                  if (this.dealerSkuCol[4].isImage == 'Y') {
                    item.isImgItem4 = 'Y';
                  }
                  item.isQuotationSelected4 = 'Y';
                  if (this.dealerSkuCol[4].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item4;
                    item.isCfr4 = 'Y';
                  }
                }

              }
              if (5 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[5].isQuotationSelected == 'Y') {
                  item.item5 = this.dealerSkuDetails[k].item5;
                  if (this.dealerSkuCol[5].isImage == 'Y') {
                    item.isImgItem5 = 'Y';
                  }
                  item.isQuotationSelected5 = 'Y';
                  if (this.dealerSkuCol[5].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item5;
                    item.isCfr5 = 'Y';
                  }
                }

              }
              if (6 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[6].isQuotationSelected == 'Y') {
                  item.item6 = this.dealerSkuDetails[k].item6;
                  if (this.dealerSkuCol[6].isImage == 'Y') {
                    item.isImgItem6 = 'Y';
                  }
                  item.isQuotationSelected6 = 'Y';
                  if (this.dealerSkuCol[6].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item6;
                    item.isCfr6 = 'Y';
                  }
                }

              }
              if (7 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[7].isQuotationSelected == 'Y') {
                  item.item7 = this.dealerSkuDetails[k].item7;
                  if (this.dealerSkuCol[7].isImage == 'Y') {
                    item.isImgItem7 = 'Y';
                  }
                  item.isQuotationSelected7 = 'Y';
                  if (this.dealerSkuCol[7].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item7;
                    item.isCfr7 = 'Y';
                  }
                }

              }
              if (8 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[8].isQuotationSelected == 'Y') {
                  item.item8 = this.dealerSkuDetails[k].item8;
                  if (this.dealerSkuCol[8].isImage == 'Y') {
                    item.isImgItem8 = 'Y';
                  }
                  item.isQuotationSelected8 = 'Y';
                  if (this.dealerSkuCol[8].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item8;
                    item.isCfr8 = 'Y';
                  }
                }

              }
              if (9 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[9].isQuotationSelected == 'Y') {
                  item.item9 = this.dealerSkuDetails[k].item9;
                  if (this.dealerSkuCol[9].isImage == 'Y') {
                    item.isImgItem9 = 'Y';
                  }
                  item.isQuotationSelected9 = 'Y';
                  if (this.dealerSkuCol[9].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item9;
                    item.isCfr9 = 'Y';
                  }
                }

              }
              if (10 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[10].isQuotationSelected == 'Y') {
                  item.item10 = this.dealerSkuDetails[k].item10;
                  if (this.dealerSkuCol[10].isImage == 'Y') {
                    item.isImgItem10 = 'Y';
                  }
                  item.isQuotationSelected10 = 'Y';
                  if (this.dealerSkuCol[10].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item10;
                    item.isCfr10 = 'Y';
                  }
                }

              }
              if (11 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[11].isQuotationSelected == 'Y') {
                  item.item11 = this.dealerSkuDetails[k].item11;
                  if (this.dealerSkuCol[11].isImage == 'Y') {
                    item.isImgItem11 = 'Y';
                  }
                  item.isQuotationSelected11 = 'Y';
                  if (this.dealerSkuCol[11].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item11;
                    item.isCfr11 = 'Y';
                  }
                }

              }
              if (12 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[12].isQuotationSelected == 'Y') {
                  item.item12 = this.dealerSkuDetails[k].item12;
                  if (this.dealerSkuCol[12].isImage == 'Y') {
                    item.isImgItem12 = 'Y';
                  }
                  item.isQuotationSelected12 = 'Y';
                  if (this.dealerSkuCol[12].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item12;
                    item.isCfr12 = 'Y';
                  }
                }

              }
              if (13 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[13].isQuotationSelected == 'Y') {
                  item.item13 = this.dealerSkuDetails[k].item13;
                  if (this.dealerSkuCol[13].isImage == 'Y') {
                    item.isImgItem13 = 'Y';
                  }
                  item.isQuotationSelected13 = 'Y';
                  if (this.dealerSkuCol[13].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item13;
                    item.isCfr13 = 'Y';
                  }
                }

              }
              if (14 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[14].isQuotationSelected == 'Y') {
                  item.item14 = this.dealerSkuDetails[k].item14;
                  if (this.dealerSkuCol[14].isImage == 'Y') {
                    item.isImgItem14 = 'Y';
                  }
                  item.isQuotationSelected14 = 'Y';
                  if (this.dealerSkuCol[14].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item14;
                    item.isCfr14 = 'Y';
                  }
                }

              }
              if (15 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[15].isQuotationSelected == 'Y') {
                  item.item15 = this.dealerSkuDetails[k].item15;
                  if (this.dealerSkuCol[15].isImage == 'Y') {
                    item.isImgItem15 = 'Y';
                  }
                  item.isQuotationSelected15 = 'Y';
                  if (this.dealerSkuCol[15].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item15;
                    item.isCfr15 = 'Y';
                  }
                }

              }
              if (16 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[16].isQuotationSelected == 'Y') {
                  item.item16 = this.dealerSkuDetails[k].item16;
                  if (this.dealerSkuCol[16].isImage == 'Y') {
                    item.isImgItem16 = 'Y';
                  }
                  item.isQuotationSelected16 = 'Y';
                  if (this.dealerSkuCol[16].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item16;
                    item.isCfr16 = 'Y';
                  }
                }

              }
              if (17 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[17].isQuotationSelected == 'Y') {
                  item.item17 = this.dealerSkuDetails[k].item17;
                  if (this.dealerSkuCol[17].isImage == 'Y') {
                    item.isImgItem17 = 'Y';
                  }
                  item.isQuotationSelected17 = 'Y';
                  if (this.dealerSkuCol[17].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item17;
                    item.isCfr17 = 'Y';
                  }
                }

              }
              if (18 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[18].isQuotationSelected == 'Y') {
                  item.item18 = this.dealerSkuDetails[k].item18;
                  if (this.dealerSkuCol[18].isImage == 'Y') {
                    item.isImgItem18 = 'Y';
                  }
                  item.isQuotationSelected18 = 'Y';
                  if (this.dealerSkuCol[18].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item18;
                    item.isCfr18 = 'Y';
                  }
                }

              }
              if (19 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[19].isQuotationSelected == 'Y') {
                  item.item19 = this.dealerSkuDetails[k].item19;
                  if (this.dealerSkuCol[19].isImage == 'Y') {
                    item.isImgItem19 = 'Y';
                  }
                  item.isQuotationSelected19 = 'Y';
                  if (this.dealerSkuCol[19].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item19;
                    item.isCfr19 = 'Y';
                  }
                }

              }
              if (20 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[20].isQuotationSelected == 'Y') {
                  item.item20 = this.dealerSkuDetails[k].item20;
                  if (this.dealerSkuCol[20].isImage == 'Y') {
                    item.isImgItem20 = 'Y';
                  }
                  item.isQuotationSelected20 = 'Y';
                  if (this.dealerSkuCol[20].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item20;
                    item.isCfr20 = 'Y';
                  }
                }

              }
              if (21 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[21].isQuotationSelected == 'Y') {
                  item.item20 = this.dealerSkuDetails[k].item21;
                  if (this.dealerSkuCol[21].isImage == 'Y') {
                    item.isImgItem21 = 'Y';
                  }
                  item.isQuotationSelected21 = 'Y';
                  if (this.dealerSkuCol[21].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item21;
                    item.isCfr21 = 'Y';
                  }
                }

              }
              if (22 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[22].isQuotationSelected == 'Y') {
                  item.item22 = this.dealerSkuDetails[k].item22;
                  if (this.dealerSkuCol[22].isImage == 'Y') {
                    item.isImgItem22 = 'Y';
                  }
                  item.isQuotationSelected22 = 'Y';
                  if (this.dealerSkuCol[22].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item22;
                    item.isCfr22 = 'Y';
                  }
                }

              }
              if (23 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[23].isQuotationSelected == 'Y') {
                  item.item23 = this.dealerSkuDetails[k].item23;
                  if (this.dealerSkuCol[23].isImage == 'Y') {
                    item.isImgItem23 = 'Y';
                  }
                  item.isQuotationSelected23 = 'Y';
                  if (this.dealerSkuCol[23].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item23;
                    item.isCfr23 = 'Y';
                  }
                }

              }
              if (24 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[24].isQuotationSelected == 'Y') {
                  item.item24 = this.dealerSkuDetails[k].item24;
                  if (this.dealerSkuCol[24].isImage == 'Y') {
                    item.isImgItem24 = 'Y';
                  }
                  item.isQuotationSelected24 = 'Y';
                  if (this.dealerSkuCol[24].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item24;
                    item.isCfr24 = 'Y';
                  }
                }

              }
              if (25 < this.dealerSkuColSize) {
                if (this.dealerSkuCol[25].isQuotationSelected == 'Y') {
                  item.item25 = this.dealerSkuDetails[k].item25;
                  if (this.dealerSkuCol[25].isImage == 'Y') {
                    item.isImgItem25 = 'Y';
                  }
                  item.isQuotationSelected25 = 'Y';
                  if (this.dealerSkuCol[25].isCfr == 'Y') {
                    item.cfrAmount = this.dealerSkuDetails[k].item25;
                    item.isCfr25 = 'Y';
                  }
                }

              }
              if(this.exportData[j].REF != null && this.exportData[j].REF != ''){
                item.ref = this.exportData[j].REF;
              }
             if(this.exportData[j].QTY != null && this.exportData[j].QTY != ''){
                item.qty = this.exportData[j].QTY;
             }
            if(this.exportData[j].PRICE != null && this.exportData[j].PRICE != ''){
                item.cfrAmountManual = this.exportData[j].PRICE;
                
            }
            else{
                if (this.roleId != '3') {
                   item.cfrAmountManual = item.cfrAmount;
                }
             } 
             item.price = parseInt(item.qty) * parseFloat(item.cfrAmountManual + "");
              

              this.selectedItems.push(item);
              this.baseAmount = this.baseAmount + parseFloat(item.price + "");
              continue loop1;
            }

            //this.billingAmount = +this.baseAmount;

          }

          let f1: BulkUploadReturnModel = {
            catCode: "",
            remark: ""
          };
          f1.catCode = this.exportData[j].CATCODE;
          f1.remark = "CATCODE not found";
          this.returnBulkUploadFile.push(f1);
          // this.returnBulkUploadRemark = this.returnBulkUploadRemark + f1.SL + f1.remark + "\n";
        }
        else {
          let f2: BulkUploadReturnModel = {
            catCode: "",
            remark: ""
          };
          f2.catCode = this.exportData[j].CATCODE;
          f2.remark = "CATCODE aready selected";
          this.returnBulkUploadFile.push(f2);
          // this.returnBulkUploadRemark = this.returnBulkUploadRemark + f.SL + f.remark + "\n";
        }

        // console.log("loop "+this.exportData[j]);
      }

      this.billingAmount = +this.baseAmount;
      if (this.returnBulkUploadFile.length != 0) {
        alasql('Select * into xlsxml("BulkUploadRemark.xls",{headers:true}) FROM ?', [this.returnBulkUploadFile]);
        // this.excelService.exportAsExcelFile(this.returnBulkUploadFile, 'BulkUploadRemark');
        // alert(this.returnBulkUploadRemark);
      }
    }

    this.bulkUploadFile = null;
    this.returnBulkUploadFile = [];
    jQuery("#bulkUploadQId").val(null);
  }

  getTermsAndConditions() {
    //console.log("terms & condition");
    this.ss.getTermsAndConditions()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.termConditionList = response.wrappedList;
          // console.log(response.wrappedList);
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

  getConstantValues() {
    this.ss.getConstantValues()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.constantValue = response.wrappedList;
          for (var cv = 0; cv < this.constantValue.length; cv++) {
            if (this.roleId != "3"){
              if (this.constantValue[cv].termCondition != null && this.constantValue[cv].termCondition != "") {
                let tc: TermCondition = {
                  id: "",
                  value: "",
                  chkId: ""
                }
                tc.id = this.constantValue[cv].id;
                tc.value = this.constantValue[cv].termCondition;
                this.termConditionList.push(tc);
                
              }
            }
            
            if (this.constantValue[cv].projectStatus != null && this.constantValue[cv].projectStatus != "") {
              let ps: ProjectStatus = {
                id: "",
                value: ""
              }
              ps.id = this.constantValue[cv].id;
              ps.value = this.constantValue[cv].projectStatus;
              this.projectStatusList.push(ps);
            }
            if (this.constantValue[cv].currency != null && this.constantValue[cv].currency != "") {
              let cur: Currency = {
                id: "",
                value: "",
                abbr: ""
              }
              cur.id = this.constantValue[cv].id;
              cur.value = this.constantValue[cv].currency;
              cur.abbr = this.constantValue[cv].currencyAbbr;
              this.currencyList.push(cur);
            }
          }
          //  console.log(response.wrappedList);
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

  getDealerList() {
    this.ss.getDealerList()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.dealerList = response.wrappedList;
          // console.log(response.wrappedList);

        }
        else if (response.responseCode == '100001') {
          //alert("No Record Found");
          this.spinner.hide();
        }
        else {
          //alert("Server Error");
          this.spinner.hide();
        }

      },
        (error) => {
          //alert("Network Error");
          this.spinner.hide();
        }
      )
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

  setInputValue(value,dealerId) {
    jQuery("#myInput").val(value);
    this.toDealerId = dealerId;
    jQuery(".dropdown-content").css("display", "none");
  }

  filterFunction1() {
    let filter: string;
    filter = jQuery("#currId").val();
    if (filter.length != 0) {
      jQuery(".dropdown-content1").css("display", "block");
      var input, ul, li, a, i;
      a = jQuery(".dropdown-content1 a");
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
      jQuery(".dropdown-content1").css("display", "none");
    }

  }

  setInputValue1(id, value) {
    jQuery("#currId").val(value);
    this.currencyId = id;
    jQuery(".dropdown-content1").css("display", "none");
  }

  addSelectedItem(event) {
    let item: QuotationItem = {
      item0: "",
      item1: "",
      item2: "",
      item3: "",
      item4: "",
      item5: "",
      item6: "",
      item7: "",
      item8: "",
      item9: "",
      item10: "",
      item11: "",
      item12: "",
      item13: "",
      item14: "",
      item15: "",
      item16: "",
      item17: "",
      item18: "",
      item19: "",
      item20: "",
      item21: "",
      item22: "",
      item23: "",
      item24: "",
      item25: "",
      isImgItem0: 'N',
      isImgItem1: 'N',
      isImgItem2: 'N',
      isImgItem3: 'N',
      isImgItem4: 'N',
      isImgItem5: 'N',
      isImgItem6: 'N',
      isImgItem7: 'N',
      isImgItem8: 'N',
      isImgItem9: 'N',
      isImgItem10: 'N',
      isImgItem11: 'N',
      isImgItem12: 'N',
      isImgItem13: 'N',
      isImgItem14: 'N',
      isImgItem15: 'N',
      isImgItem16: 'N',
      isImgItem17: 'N',
      isImgItem18: 'N',
      isImgItem19: 'N',
      isImgItem20: 'N',
      isImgItem21: 'N',
      isImgItem22: 'N',
      isImgItem23: 'N',
      isImgItem24: 'N',
      isImgItem25: 'N',
      isQuotationSelected0: 'N',
      isQuotationSelected1: 'N',
      isQuotationSelected2: 'N',
      isQuotationSelected3: 'N',
      isQuotationSelected4: 'N',
      isQuotationSelected5: 'N',
      isQuotationSelected6: 'N',
      isQuotationSelected7: 'N',
      isQuotationSelected8: 'N',
      isQuotationSelected9: 'N',
      isQuotationSelected10: 'N',
      isQuotationSelected11: 'N',
      isQuotationSelected12: 'N',
      isQuotationSelected13: 'N',
      isQuotationSelected14: 'N',
      isQuotationSelected15: 'N',
      isQuotationSelected16: 'N',
      isQuotationSelected17: 'N',
      isQuotationSelected18: 'N',
      isQuotationSelected19: 'N',
      isQuotationSelected20: 'N',
      isQuotationSelected21: 'N',
      isQuotationSelected22: 'N',
      isQuotationSelected23: 'N',
      isQuotationSelected24: 'N',
      isQuotationSelected25: 'N',
      isCfr0: 'N',
      isCfr1: 'N',
      isCfr2: 'N',
      isCfr3: 'N',
      isCfr4: 'N',
      isCfr5: 'N',
      isCfr6: 'N',
      isCfr7: 'N',
      isCfr8: 'N',
      isCfr9: 'N',
      isCfr10: 'N',
      isCfr11: 'N',
      isCfr12: 'N',
      isCfr13: 'N',
      isCfr14: 'N',
      isCfr15: 'N',
      isCfr16: 'N',
      isCfr17: 'N',
      isCfr18: 'N',
      isCfr19: 'N',
      isCfr20: 'N',
      isCfr21: 'N',
      isCfr22: 'N',
      isCfr23: 'N',
      isCfr24: 'N',
      isCfr25: 'N',
      cfrAmount: 0,
      cfrAmountManual: 0,
      ref: '',
      qty: '1',
      price: 0
    }
    // console.log(event.data.item5);


    if (0 < this.dealerSkuColSize) {
      // if (this.dealerSkuCol[0].isQuotationSelected == 'Y') {
      //   // alert(this.dealerSkuCol[0].fieldKey);
      //   item.item0 = event.data.item0;

      //   if (this.dealerSkuCol[0].isImage == 'Y') {
      //     item.isImgItem0 = 'Y';
      //   }
      //   item.isQuotationSelected0 = 'Y';
      //   if (this.dealerSkuCol[0].isCfr == 'Y') {
      //     item.cfrAmount = event.data.item0;
      //   }
      // }
      item.item0 = event.data.item0;
    }
    if (1 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[1].isQuotationSelected == 'Y') {
        // alert(this.dealerSkuCol[0].fieldKey);
        item.item1 = event.data.item1;
        if (this.dealerSkuCol[1].isImage == 'Y') {
          item.isImgItem1 = 'Y';
        }
        item.isQuotationSelected1 = 'Y';
        if (this.dealerSkuCol[1].isCfr == 'Y') {
          item.cfrAmount = event.data.item1;
          item.isCfr1 = 'Y';
        }
      }

    }
    if (2 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[2].isQuotationSelected == 'Y') {
        item.isQuotationSelected2 = 'Y';
        item.item2 = event.data.item2;
        if (this.dealerSkuCol[2].isImage == 'Y') {
          item.isImgItem2 = 'Y';
        }
        if (this.dealerSkuCol[2].isCfr == 'Y') {
          item.cfrAmount = event.data.item2;
          item.isCfr2 = 'Y';
        }
      }

    }
    if (3 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[3].isQuotationSelected == 'Y') {
        item.item3 = event.data.item3;
        if (this.dealerSkuCol[3].isImage == 'Y') {
          item.isImgItem3 = 'Y';
        }
        item.isQuotationSelected3 = 'Y';
        if (this.dealerSkuCol[3].isCfr == 'Y') {
          item.cfrAmount = event.data.item3;
          item.isCfr3 = 'Y';
        }
      }

    }
    if (4 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[4].isQuotationSelected == 'Y') {
        item.item4 = event.data.item4;
        if (this.dealerSkuCol[4].isImage == 'Y') {
          item.isImgItem4 = 'Y';
        }
        item.isQuotationSelected4 = 'Y';
        if (this.dealerSkuCol[4].isCfr == 'Y') {
          item.cfrAmount = event.data.item4;
          item.isCfr4 = 'Y';
        }
      }

    }
    if (5 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[5].isQuotationSelected == 'Y') {
        item.item5 = event.data.item5;
        if (this.dealerSkuCol[5].isImage == 'Y') {
          item.isImgItem5 = 'Y';
        }
        item.isQuotationSelected5 = 'Y';
        if (this.dealerSkuCol[5].isCfr == 'Y') {
          item.cfrAmount = event.data.item5;
          item.isCfr5 = 'Y';
        }
      }

    }
    if (6 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[6].isQuotationSelected == 'Y') {
        item.item6 = event.data.item6;
        if (this.dealerSkuCol[6].isImage == 'Y') {
          item.isImgItem6 = 'Y';
        }
        item.isQuotationSelected6 = 'Y';
        if (this.dealerSkuCol[6].isCfr == 'Y') {
          item.cfrAmount = event.data.item6;
          item.isCfr6 = 'Y';
        }
      }

    }
    if (7 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[7].isQuotationSelected == 'Y') {
        item.item7 = event.data.item7;
        if (this.dealerSkuCol[7].isImage == 'Y') {
          item.isImgItem7 = 'Y';
        }
        item.isQuotationSelected7 = 'Y';
        if (this.dealerSkuCol[7].isCfr == 'Y') {
          item.cfrAmount = event.data.item7;
          item.isCfr7 = 'Y';
        }
      }

    }
    if (8 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[8].isQuotationSelected == 'Y') {
        item.item8 = event.data.item8;
        if (this.dealerSkuCol[8].isImage == 'Y') {
          item.isImgItem8 = 'Y';
        }
        item.isQuotationSelected8 = 'Y';
        if (this.dealerSkuCol[8].isCfr == 'Y') {
          item.cfrAmount = event.data.item8;
          item.isCfr8 = 'Y';
        }
      }

    }
    if (9 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[9].isQuotationSelected == 'Y') {
        item.item9 = event.data.item9;
        if (this.dealerSkuCol[9].isImage == 'Y') {
          item.isImgItem9 = 'Y';
        }
        item.isQuotationSelected9 = 'Y';
        if (this.dealerSkuCol[9].isCfr == 'Y') {
          item.cfrAmount = event.data.item9;
          item.isCfr9 = 'Y';
        }
      }

    }
    if (10 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[10].isQuotationSelected == 'Y') {
        item.item10 = event.data.item10;
        if (this.dealerSkuCol[10].isImage == 'Y') {
          item.isImgItem10 = 'Y';
        }
        item.isQuotationSelected10 = 'Y';
        if (this.dealerSkuCol[10].isCfr == 'Y') {
          item.cfrAmount = event.data.item10;
          item.isCfr10 = 'Y';
        }
      }

    }
    if (11 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[11].isQuotationSelected == 'Y') {
        item.item11 = event.data.item11;
        if (this.dealerSkuCol[11].isImage == 'Y') {
          item.isImgItem11 = 'Y';
        }
        item.isQuotationSelected11 = 'Y';
        if (this.dealerSkuCol[11].isCfr == 'Y') {
          item.cfrAmount = event.data.item11;
          item.isCfr11 = 'Y';
        }
      }

    }
    if (12 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[12].isQuotationSelected == 'Y') {
        item.item12 = event.data.item12;
        if (this.dealerSkuCol[12].isImage == 'Y') {
          item.isImgItem12 = 'Y';
        }
        item.isQuotationSelected12 = 'Y';
        if (this.dealerSkuCol[12].isCfr == 'Y') {
          item.cfrAmount = event.data.item12;
          item.isCfr12 = 'Y';
        }
      }

    }
    if (13 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[13].isQuotationSelected == 'Y') {
        item.item13 = event.data.item13;
        if (this.dealerSkuCol[13].isImage == 'Y') {
          item.isImgItem13 = 'Y';
        }
        item.isQuotationSelected13 = 'Y';
        if (this.dealerSkuCol[13].isCfr == 'Y') {
          item.cfrAmount = event.data.item13;
          item.isCfr13 = 'Y';
        }
      }

    }
    if (14 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[14].isQuotationSelected == 'Y') {
        item.item14 = event.data.item14;
        if (this.dealerSkuCol[14].isImage == 'Y') {
          item.isImgItem14 = 'Y';
        }
        item.isQuotationSelected14 = 'Y';
        if (this.dealerSkuCol[14].isCfr == 'Y') {
          item.cfrAmount = event.data.item14;
          item.isCfr14 = 'Y';
        }
      }

    }
    if (15 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[15].isQuotationSelected == 'Y') {
        item.item15 = event.data.item15;
        if (this.dealerSkuCol[15].isImage == 'Y') {
          item.isImgItem15 = 'Y';
        }
        item.isQuotationSelected15 = 'Y';
        if (this.dealerSkuCol[15].isCfr == 'Y') {
          item.cfrAmount = event.data.item15;
          item.isCfr15 = 'Y';
        }
      }

    }
    if (16 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[16].isQuotationSelected == 'Y') {
        item.item16 = event.data.item16;
        if (this.dealerSkuCol[16].isImage == 'Y') {
          item.isImgItem16 = 'Y';
        }
        item.isQuotationSelected16 = 'Y';
        if (this.dealerSkuCol[16].isCfr == 'Y') {
          item.cfrAmount = event.data.item16;
          item.isCfr16 = 'Y';
        }
      }

    }
    if (17 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[17].isQuotationSelected == 'Y') {
        item.item17 = event.data.item17;
        if (this.dealerSkuCol[17].isImage == 'Y') {
          item.isImgItem17 = 'Y';
        }
        item.isQuotationSelected17 = 'Y';
        if (this.dealerSkuCol[17].isCfr == 'Y') {
          item.cfrAmount = event.data.item17;
          item.isCfr17 = 'Y';
        }
      }

    }
    if (18 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[18].isQuotationSelected == 'Y') {
        item.item18 = event.data.item18;
        if (this.dealerSkuCol[18].isImage == 'Y') {
          item.isImgItem18 = 'Y';
        }
        item.isQuotationSelected18 = 'Y';
        if (this.dealerSkuCol[18].isCfr == 'Y') {
          item.cfrAmount = event.data.item18;
          item.isCfr18 = 'Y';
        }
      }

    }
    if (19 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[19].isQuotationSelected == 'Y') {
        item.item19 = event.data.item19;
        if (this.dealerSkuCol[19].isImage == 'Y') {
          item.isImgItem19 = 'Y';
        }
        item.isQuotationSelected19 = 'Y';
        if (this.dealerSkuCol[19].isCfr == 'Y') {
          item.cfrAmount = event.data.item19;
          item.isCfr19 = 'Y';
        }
      }

    }
    if (20 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[20].isQuotationSelected == 'Y') {
        item.item20 = event.data.item20;
        if (this.dealerSkuCol[20].isImage == 'Y') {
          item.isImgItem20 = 'Y';
        }
        item.isQuotationSelected20 = 'Y';
        if (this.dealerSkuCol[20].isCfr == 'Y') {
          item.cfrAmount = event.data.item20;
          item.isCfr20 = 'Y';
        }
      }

    }
    if (21 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[21].isQuotationSelected == 'Y') {
        item.item20 = event.data.item21;
        if (this.dealerSkuCol[21].isImage == 'Y') {
          item.isImgItem21 = 'Y';
        }
        item.isQuotationSelected21 = 'Y';
        if (this.dealerSkuCol[21].isCfr == 'Y') {
          item.cfrAmount = event.data.item21;
          item.isCfr21 = 'Y';
        }
      }

    }
    if (22 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[22].isQuotationSelected == 'Y') {
        item.item22 = event.data.item22;
        if (this.dealerSkuCol[22].isImage == 'Y') {
          item.isImgItem22 = 'Y';
        }
        item.isQuotationSelected22 = 'Y';
        if (this.dealerSkuCol[22].isCfr == 'Y') {
          item.cfrAmount = event.data.item22;
          item.isCfr22 = 'Y';
        }
      }

    }
    if (23 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[23].isQuotationSelected == 'Y') {
        item.item23 = event.data.item23;
        if (this.dealerSkuCol[23].isImage == 'Y') {
          item.isImgItem23 = 'Y';
        }
        item.isQuotationSelected23 = 'Y';
        if (this.dealerSkuCol[23].isCfr == 'Y') {
          item.cfrAmount = event.data.item23;
          item.isCfr23 = 'Y';
        }
      }

    }
    if (24 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[24].isQuotationSelected == 'Y') {
        item.item24 = event.data.item24;
        if (this.dealerSkuCol[24].isImage == 'Y') {
          item.isImgItem24 = 'Y';
        }
        item.isQuotationSelected24 = 'Y';
        if (this.dealerSkuCol[24].isCfr == 'Y') {
          item.cfrAmount = event.data.item24;
          item.isCfr24 = 'Y';
        }
      }

    }
    if (25 < this.dealerSkuColSize) {
      if (this.dealerSkuCol[25].isQuotationSelected == 'Y') {
        item.item25 = event.data.item25;
        if (this.dealerSkuCol[25].isImage == 'Y') {
          item.isImgItem25 = 'Y';
        }
        item.isQuotationSelected25 = 'Y';
        if (this.dealerSkuCol[25].isCfr == 'Y') {
          item.cfrAmount = event.data.item25;
          item.isCfr25 = 'Y';
        }
      }

    }


    //item.price = item.cfrAmountManual;
    if (this.roleId == '3') {
      item.price = item.cfrAmountManual;
    }
    else {
      item.cfrAmountManual = item.cfrAmount;
      item.price = item.cfrAmount;
    }
    //console.log(item);
    this.selectedItems.push(item);
    this.baseAmount = this.baseAmount + parseFloat(item.price + "");
    //this.baseAmount = this.baseAmount + item.cfrAmount;
    //this.baseAmount = 0.1 + 0.2;
    this.billingAmount = +this.baseAmount;

  }
  getDealerQuotationColumns() {
    // this.spinner.show();
    //jQuery('.loaderClass').show();
    this.ss.getDealerQuotationColumns(localStorage.getItem("empId"))
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          //this.dealerQuotationCol = response.wrappedList;
          this.dealerSkuCol = response.wrappedList;
          for (var i = 0; i < this.dealerSkuCol.length; i++) {
            this.dealerSkuCol1.push(this.dealerSkuCol[i].fieldKey);
            if (this.dealerSkuCol[i].isQuotationSelected == 'Y') {
              this.dealerSkuSelectedCol.push(this.dealerSkuCol[i]);
            }
          }
          this.addColumns();
          // console.log(this.dealerQuotationCol);
          this.getDealerQuotationDetails();
          //this.totalCount = response.count;

          // this.spinner.hide();
          //jQuery('.loaderClass').hide();
        }
        else if (response.responseCode == '100001') {
          // alert("No Record Found");
          this.spinner.hide();
        }
        else {
          //alert("Server Error");
          this.spinner.hide();
        }

      },
        (error) => {
          //alert("Network Error");
          this.spinner.hide();
        }
      )
  }

  isCheckedRow() {
    //console.log("hi");
    // alert("hi");
  }
  getDealerQuotationDetails() {
    // alert("search");
    //if(this.searchBy!="" && this.searchProd!=""){
    if (this.dealerSkuCol1.length != 0) {
      //alert(this.searchBy);
      //alert(this.searchProd);
      // this.ss.getDealerQuotationDetails(this.searchBy,this.searchProd,this.dealerSkuCol1)
      this.ss.getDealerQuotationDetails(this.dealerSkuCol1)
        .subscribe((response) => {
          if (response.responseCode == '100000') {
            this.dealerSkuDetails = response.wrappedList;
           // console.log(this.dealerSkuDetails);
            this.dealerSkuColSize = this.dealerSkuCol1.length;
            //this.totalCount = response.count;

            // this.spinner.hide();
            //jQuery('.loaderClass').hide();
            //this.getDealerDraftQuotation();
          }
          else if (response.responseCode == '100001') {
            // alert("No Record Found");
            this.spinner.hide();
          }
          else {
            // alert("Server Error");
            this.spinner.hide();
          }

        },
          (error) => {
            // alert("Network Error");
            this.spinner.hide();
          }
        )
    }
    else {
      //  alert("Please fill searchBy and searchProduct values");
      // alert("No active field config found");
    }

  }

  addColumns() {
    for (var j = 0; j < this.dealerSkuCol.length; j++) {
      //var str: string  = this.dealerSkuCol[j].skuDisplayName;
      ///console.log("String: "+ str);
      //if(str.includes("Image")||str.includes("Diagram")){
      if (this.roleId == '3') {
        if (this.dealerSkuCol[j].fieldKey == 'CFR') {
          this.dealerSkuCol[j].isQuotationSearch = 'N';
        }
      }
      if (this.dealerSkuCol[j].isQuotationSearch == 'Y') {
        if (this.dealerSkuCol[j].isImage == 'Y') {
          this.mySettings.columns['item' + j] =
            {
              title: this.dealerSkuCol[j].skuDisplayName,
              filter: false,
              type: 'html',
              valuePrepareFunction: (item: string) => { return `<img src="${item}" width="30px" height="30px"/ >` }
            };
        }
        else {
          this.mySettings.columns['item' + j] =
            { title: this.dealerSkuCol[j].skuDisplayName };
        }

        this.settings = Object.assign({}, this.mySettings);
      }

      if (this.dealerSkuCol[j].fieldKey == 'CFR') {
        this.cfrPosition = j;
      }

    }
  }

  saveDraftSelectedItems() {
    this.spinner.show();
    this.validCurrency = false;
    this.validToField == false;

    if (jQuery("#toId").val() == null || jQuery("#toId").val().trim() == "") {
      // alert(jQuery("#toId").val());
      this.spinner.hide();
      alert("Please fill From field");
      return false;
    }
    if (jQuery("#myInput").val() == null || jQuery("#myInput").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill To field");
      return false;
    }
    else {
      for (var dlr = 0; dlr < this.dealerList.length; dlr++) {
        if (this.dealerList[dlr].dealerName == jQuery("#myInput").val()) {
          this.validToField = true;
          break;
        }
      }
      if (this.validToField == false) {
        this.spinner.hide();
        alert("Please Select a valid To field");
        return false;
      }
    }
    if (jQuery("#issuedBy").val() == null || jQuery("#issuedBy").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill issuedBy field");
      return false;
    }
    // if (jQuery("#contact").val() == null || jQuery("#contact").val().trim() == "") {
    //   alert("Please fill contact field");
    //   return false;
    // }

    if (jQuery("#projectStatus").val() == null || jQuery("#projectStatus").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill Project Status");
      return false;
    }

    if (jQuery("#quotationDate").val() == null || jQuery("#quotationDate").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill Quotation Date");
      return false;
    }

    if (jQuery("#currId").val() == null || jQuery("#currId").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill Currency");
      return false;
    }
    else {
      for (var cr = 0; cr < this.currencyList.length; cr++) {
        if (this.currencyList[cr].value == jQuery("#currId").val()) {
          this.validCurrency = true;
          break;
        }
      }
      if (this.validCurrency == false) {
        this.spinner.hide();
        alert("Please Select a valid Currency");
        return false;
      }
    }

    if (this.isDate == 'Y') {
      if (jQuery("#projectEndDateId").val() == null || jQuery("#projectEndDateId").val().trim() == "") {
        this.spinner.hide();
        alert("Please fill Quotation DeadLine");
        return false;
      }
      else {
        this.projectEndDate = jQuery("#projectEndDateId").val();
      }
    }
    else {
      this.projectEndDate = 'NA';
    }

    let qItemDetailList: QuotationItemDetail[] = [];
    for (var a = 0; a < this.selectedItems.length; a++) {
      let itemCfr = "";
      if (this.roleId == '3') {
        itemCfr = this.selectedItems[a].cfrAmountManual + "";
      }
      else {
        itemCfr = this.selectedItems[a].cfrAmountManual + "";
      }
      let qItemDetail: QuotationItemDetail = {
        selectedItemId: this.selectedItems[a].item0,
        quantity: this.selectedItems[a].qty,
        itemAmount: this.selectedItems[a].price + "",
        reference: this.selectedItems[a].ref,
        cfr: itemCfr
      }
      if (qItemDetail.quantity == null || qItemDetail.quantity.trim() == "") {
        this.spinner.hide();
        alert("Please fill quantity");
        return false;
      }
      if (qItemDetail.itemAmount == null || qItemDetail.itemAmount.trim() == "") {
        this.spinner.hide();
        alert("Please fill item amount");
        return false;
      }
      if (qItemDetail.cfr == null || qItemDetail.cfr.trim() == "") {
        this.spinner.hide();
        alert("Please fill item price");
        return false;
      }
      // if(qItemDetail.reference == null || qItemDetail.reference.trim() == ""){
      //   alert("Please fill reference");
      //   return false;
      // }
      qItemDetailList.push(qItemDetail);
    }

    if (qItemDetailList.length == 0) {
      this.spinner.hide();
      alert("Please select items for quotation");
      return false;
    }


    let dq: DraftQuotation = {
      qId: this.quotationId,
      fromName: jQuery("#toId").val(),
      toName: jQuery("#myInput").val(),
      issuedBy: jQuery("#issuedBy").val(),
      projectStatus: jQuery("#projectStatus").val(),
      quotationDeadline: this.projectEndDate + "",
      currency: this.currencyId,
      contactNumber: jQuery("#contact").val(),
      qIdDetList: qItemDetailList,
      baseAmount: this.baseAmount + "",
      billingAmount: this.billingAmount + "",
      billingInfo: null,
      termConditionAuto: null,
      termConditionManual: null,
      status: "PENDING",
      quotationDate: jQuery("#quotationDate").val(),
      empId: localStorage.getItem("empId"),
      countryCode: localStorage.getItem("countryCode"),
      fromDealerId: this.compId,
      toDealerId: this.compToDealerId
    }

    // this.ss.saveDraftSelectedItems(arr, quant, amount)
    this.ss.saveDraftSelectedItemsNew(dq)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.spinner.hide();
          alert("Saved in Draft");
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
  }
  exportToExcel(qId) {
    this.ss.quotationExportToExcel(qId);
  }
  getDealerDraftQuotation(qId) {
    this.spinner.show();
    this.selectedItems = [];
    this.ss.getDealerDraftQuotation(qId)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          // console.log("Draft " + JSON.stringify(response.wrappedList[0]));

          jQuery("#toId").val(response.wrappedList[0].fromName);
          jQuery("#myInput").val(response.wrappedList[0].toName);
          jQuery("#issuedBy").val(response.wrappedList[0].issuedBy);
          jQuery("#projectStatus").val(response.wrappedList[0].projectStatus);
          jQuery("#contact").val(response.wrappedList[0].contactNumber);
          jQuery("#currId").val(response.wrappedList[0].currencyName);
          this.currencyId = response.wrappedList[0].currencyId;
          jQuery("#quotationDate").val(response.wrappedList[0].quotationDate);
          this.baseAmount = parseFloat(response.wrappedList[0].baseAmount);
          this.billingAmount = parseFloat(response.wrappedList[0].billingAmount);
          this.billingValueList = [];
          if(response.wrappedList[0].billingInfo != null){
            var bilInfoArrayList = response.wrappedList[0].billingInfo.split("&");
            for(var biAr = 0; biAr < bilInfoArrayList.length; biAr++){
              var bi = bilInfoArrayList[biAr].split(':');
              var bv: BillingValue = {
                billingName: bi[0],
                billingValue: bi[1],
                billingType: bi[2]
              }
              this.billingValueList.push(bv);
             
            }
          }
          
          this.tclist = [];
          if(response.wrappedList[0].tcManual != null){
            var tcManual = response.wrappedList[0].tcManual.split(",");
            for( var i= 0; i < tcManual.length;i++){
              var tcM: TermAndCondition = {
                  tcValue: tcManual[i],
                  tcCheck: ""
              }
              this.tclist.push(tcM);
            }
          }
          if (response.wrappedList[0].quotationDeadline == 'NA') {
            this.isDate = 'N';
          }
          else {
            jQuery("#projectEndDateId").val(response.wrappedList[0].quotationDeadline);
          }

          let objArray = response.wrappedList[0].dqlist;
          for (var a = 0; a < objArray.length; a++) {
            let obj = objArray[a];
            let item: QuotationItem = {
              item0: "",
              item1: "",
              item2: "",
              item3: "",
              item4: "",
              item5: "",
              item6: "",
              item7: "",
              item8: "",
              item9: "",
              item10: "",
              item11: "",
              item12: "",
              item13: "",
              item14: "",
              item15: "",
              item16: "",
              item17: "",
              item18: "",
              item19: "",
              item20: "",
              item21: "",
              item22: "",
              item23: "",
              item24: "",
              item25: "",
              isImgItem0: "N",
              isImgItem1: "N",
              isImgItem2: "N",
              isImgItem3: "N",
              isImgItem4: "N",
              isImgItem5: "N",
              isImgItem6: "N",
              isImgItem7: "N",
              isImgItem8: "N",
              isImgItem9: "N",
              isImgItem10: "N",
              isImgItem11: "N",
              isImgItem12: "N",
              isImgItem13: "N",
              isImgItem14: "N",
              isImgItem15: "N",
              isImgItem16: "N",
              isImgItem17: "N",
              isImgItem18: "N",
              isImgItem19: "N",
              isImgItem20: "N",
              isImgItem21: "N",
              isImgItem22: "N",
              isImgItem23: "N",
              isImgItem24: "N",
              isImgItem25: "N",
              isQuotationSelected0: "N",
              isQuotationSelected1: "N",
              isQuotationSelected2: "N",
              isQuotationSelected3: "N",
              isQuotationSelected4: "N",
              isQuotationSelected5: "N",
              isQuotationSelected6: "N",
              isQuotationSelected7: "N",
              isQuotationSelected8: "N",
              isQuotationSelected9: "N",
              isQuotationSelected10: "N",
              isQuotationSelected11: "N",
              isQuotationSelected12: "N",
              isQuotationSelected13: "N",
              isQuotationSelected14: "N",
              isQuotationSelected15: "N",
              isQuotationSelected16: "N",
              isQuotationSelected17: "N",
              isQuotationSelected18: "N",
              isQuotationSelected19: "N",
              isQuotationSelected20: "N",
              isQuotationSelected21: "N",
              isQuotationSelected22: "N",
              isQuotationSelected23: "N",
              isQuotationSelected24: "N",
              isQuotationSelected25: "N",
              isCfr0: 'N',
              isCfr1: 'N',
              isCfr2: 'N',
              isCfr3: 'N',
              isCfr4: 'N',
              isCfr5: 'N',
              isCfr6: 'N',
              isCfr7: 'N',
              isCfr8: 'N',
              isCfr9: 'N',
              isCfr10: 'N',
              isCfr11: 'N',
              isCfr12: 'N',
              isCfr13: 'N',
              isCfr14: 'N',
              isCfr15: 'N',
              isCfr16: 'N',
              isCfr17: 'N',
              isCfr18: 'N',
              isCfr19: 'N',
              isCfr20: 'N',
              isCfr21: 'N',
              isCfr22: 'N',
              isCfr23: 'N',
              isCfr24: 'N',
              isCfr25: 'N',
              cfrAmount: 0,
              cfrAmountManual: 0,
              qty: "1",
              ref: "",
              price: 0
            }

            // item.item0 = obj.item0;
            // item.item1 = obj.item1;
            // item.item2 = obj.item2;
            // item.item3 = obj.item3;
            // item.item4 = obj.item4;
            // item.item5 = obj.item5;
            // item.item6 = obj.item6;
            // item.item7 = obj.item7;
            // item.item8 = obj.item8;
            // item.item9 = obj.item9;
            // item.item10 = obj.item10;
            // item.item11 = obj.item11;
            // item.item12 = obj.item12;
            // item.item13 = obj.item13;
            // item.item14 = obj.item14;
            // item.item15 = obj.item15;
            // item.item16 = obj.item16;
            // item.item17 = obj.item17;
            // item.item18 = obj.item18;
            // item.item19 = obj.item19;
            // item.item20 = obj.item20;
            // item.item21 = obj.item21;
            // item.item22 = obj.item22;
            // item.item23 = obj.item23;
            // item.item24 = obj.item24;
            // item.item25 = obj.item25;
            // item.ref = obj.ref;
            // item.qty = obj.qty;
            // item.cfrAmountManual = parseFloat(obj.cfrAmountManual);
            // item.cfrAmount = parseFloat(obj.cfrAmount);
            // item.price = parseFloat(obj.price);

            // if (obj.isImgItem0 != null && obj.isImgItem0 != "") {
            //   item.isImgItem0 = obj.isImgItem0;
            // }
            // if (obj.isImgItem1 != null && obj.isImgItem1 != "") {

            //   item.isImgItem1 = obj.isImgItem1;
            // }
            // if (obj.isImgItem2 != null && obj.isImgItem2 != "") {

            //   item.isImgItem2 = obj.isImgItem2;
            // }
            // if (obj.isImgItem3 != null && obj.isImgItem3 != "") {

            //   item.isImgItem3 = obj.isImgItem3;
            // }
            // if (obj.isImgItem4 != null && obj.isImgItem4 != "") {

            //   item.isImgItem4 = obj.isImgItem4;
            // }
            // if (obj.isImgItem5 != null && obj.isImgItem5 != "") {

            //   item.isImgItem5 = obj.isImgItem5;
            // }
            // if (obj.isImgItem6 != null && obj.isImgItem6 != "") {

            //   item.isImgItem6 = obj.isImgItem6;
            // }
            // if (obj.isImgItem7 != null && obj.isImgItem7 != "") {

            //   item.isImgItem7 = obj.isImgItem7;
            // }
            // if (obj.isImgItem8 != null && obj.isImgItem8 != "") {

            //   item.isImgItem8 = obj.isImgItem8;
            // }
            // if (obj.isImgItem9 != null && obj.isImgItem9 != "") {

            //   item.isImgItem9 = obj.isImgItem9;
            // }
            // if (obj.isImgItem10 != null && obj.isImgItem10 != "") {

            //   item.isImgItem10 = obj.isImgItem10;
            // }
            // if (obj.isImgItem11 != null && obj.isImgItem11 != "") {

            //   item.isImgItem11 = obj.isImgItem11;
            // }
            // if (obj.isImgItem12 != null && obj.isImgItem12 != "") {

            //   item.isImgItem12 = obj.isImgItem12;
            // }
            // if (obj.isImgItem13 != null && obj.isImgItem13 != "") {

            //   item.isImgItem13 = obj.isImgItem13;
            // }
            // if (obj.isImgItem14 != null && obj.isImgItem14 != "") {

            //   item.isImgItem14 = obj.isImgItem14;
            // }
            // if (obj.isImgItem15 != null && obj.isImgItem15 != "") {

            //   item.isImgItem15 = obj.isImgItem15;
            // }
            // if (obj.isImgItem16 != null && obj.isImgItem16 != "") {

            //   item.isImgItem16 = obj.isImgItem16;
            // }
            // if (obj.isImgItem17 != null && obj.isImgItem17 != "") {

            //   item.isImgItem17 = obj.isImgItem17;
            // }
            // if (obj.isImgItem18 != null && obj.isImgItem18 != "") {

            //   item.isImgItem18 = obj.isImgItem18;
            // }
            // if (obj.isImgItem19 != null && obj.isImgItem19 != "") {

            //   item.isImgItem19 = obj.isImgItem19;
            // }
            // if (obj.isImgItem20 != null && obj.isImgItem20 != "") {

            //   item.isImgItem20 = obj.isImgItem20;
            // }
            // if (obj.isImgItem21 != null && obj.isImgItem21 != "") {

            //   item.isImgItem21 = obj.isImgItem21;
            // }
            // if (obj.isImgItem22 != null && obj.isImgItem22 != "") {

            //   item.isImgItem22= obj.isImgItem22;
            // }
            // if (obj.isImgItem23 != null && obj.isImgItem23 != "") {

            //   item.isImgItem23 = obj.isImgItem23;
            // }
            // if (obj.isImgItem24 != null && obj.isImgItem24 != "") {

            //   item.isImgItem24 = obj.isImgItem24;
            // }
            // if (obj.isImgItem25 != null && obj.isImgItem25 != "") {

            //   item.isImgItem25 = obj.isImgItem25;
            // }
            // if (obj.isQuotationSelected0 != null && obj.isQuotationSelected0 != "") {

            //   item.isQuotationSelected0 = obj.isQuotationSelected0;
            // }
            // if (obj.isQuotationSelected1 != null && obj.isQuotationSelected1 != "") {

            //   item.isQuotationSelected1 = obj.isQuotationSelected1;
            // }
            // if (obj.isQuotationSelected2 != null && obj.isQuotationSelected2 != "") {

            //   item.isQuotationSelected2 = obj.isQuotationSelected2;
            // }
            // if (obj.isQuotationSelected3 != null && obj.isQuotationSelected3 != "") {

            //   item.isQuotationSelected3 = obj.isQuotationSelected3;
            // }
            // if (obj.isQuotationSelected4 != null && obj.isQuotationSelected4 != "") {

            //   item.isQuotationSelected4 = obj.isQuotationSelected4;
            // }
            // if (obj.isQuotationSelected5 != null && obj.isQuotationSelected5 != "") {

            //   item.isQuotationSelected5 = obj.isQuotationSelected5;
            // }
            // if (obj.isQuotationSelected6 != null && obj.isQuotationSelected6 != "") {

            //   item.isQuotationSelected6 = obj.isQuotationSelected6;
            // }
            // if (obj.isQuotationSelected7 != null && obj.isQuotationSelected7 != "") {

            //   item.isQuotationSelected7 = obj.isQuotationSelected7;
            // }
            // if (obj.isQuotationSelected8 != null && obj.isQuotationSelected8 != "") {

            //   item.isQuotationSelected8 = obj.isQuotationSelected8;
            // }
            // if (obj.isQuotationSelected9 != null && obj.isQuotationSelected9 != "") {

            //   item.isQuotationSelected9 = obj.isQuotationSelected9;
            // }
            // if (obj.isQuotationSelected10 != null && obj.isQuotationSelected10 != "") {

            //   item.isQuotationSelected10 = obj.isQuotationSelected10;
            // }
            // if (obj.isQuotationSelected11 != null && obj.isQuotationSelected11 != "") {

            //   item.isQuotationSelected11 = obj.isQuotationSelected11;
            // }
            // if (obj.isQuotationSelected12 != null && obj.isQuotationSelected12 != "") {

            //   item.isQuotationSelected12 = obj.isQuotationSelected12;
            // }
            // if (obj.isQuotationSelected13 != null && obj.isQuotationSelected13 != "") {

            //   item.isQuotationSelected13 = obj.isQuotationSelected13;
            // }
            // if (obj.isQuotationSelected14 != null && obj.isQuotationSelected14 != "") {

            //   item.isQuotationSelected14 = obj.isQuotationSelected14;
            // }
            // if (obj.isQuotationSelected15 != null && obj.isQuotationSelected15 != "") {

            //   item.isQuotationSelected15 = obj.isQuotationSelected15;
            // }
            // if (obj.isQuotationSelected16 != null && obj.isQuotationSelected16 != "") {

            //   item.isQuotationSelected16 = obj.isQuotationSelected16;
            // }
            // if (obj.isQuotationSelected17 != null && obj.isQuotationSelected17 != "") {

            //   item.isQuotationSelected17 = obj.isQuotationSelected17;
            // }
            // if (obj.isQuotationSelected18 != null && obj.isQuotationSelected18 != "") {

            //   item.isQuotationSelected18 = obj.isQuotationSelected18;
            // }
            // if (obj.isQuotationSelected19 != null && obj.isQuotationSelected19 != "") {

            //   item.isQuotationSelected19 = obj.isQuotationSelected19;
            // }
            // if (obj.isQuotationSelected20 != null && obj.isQuotationSelected20 != "") {

            //   item.isQuotationSelected20 = obj.isQuotationSelected20;
            // }
            // if (obj.isQuotationSelected21 != null && obj.isQuotationSelected21 != "") {

            //   item.isQuotationSelected21 = obj.isQuotationSelected21;
            // }
            // if (obj.isQuotationSelected22 != null && obj.isQuotationSelected22 != "") {

            //   item.isQuotationSelected22 = obj.isQuotationSelected22;
            // }
            // if (obj.isQuotationSelected23 != null && obj.isQuotationSelected23 != "") {

            //   item.isQuotationSelected23 = obj.isQuotationSelected23;
            // }
            // if (obj.isQuotationSelected24 != null && obj.isQuotationSelected24 != "") {

            //   item.isQuotationSelected24 = obj.isQuotationSelected24;
            // }
            // if (obj.isQuotationSelected25 != null && obj.isQuotationSelected25 != "") {

            //   item.isQuotationSelected25 = obj.isQuotationSelected25;
            // }

            //// start new 

            item.ref = obj.ref + "";
            item.qty = obj.qty;
            item.cfrAmountManual = parseFloat(obj.cfrAmountManual);
            item.cfrAmount = parseFloat(obj.cfrAmount);
            item.price = parseFloat(obj.price);

            item.item0 = obj.item0;

            if (1 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[1].isQuotationSelected == 'Y') {
                // alert(this.dealerSkuCol[0].fieldKey);
                item.item1 = obj.item1;
                if (this.dealerSkuCol[1].isImage == 'Y') {
                  item.isImgItem1 = 'Y';
                }
                item.isQuotationSelected1 = 'Y';
                if (this.dealerSkuCol[1].isCfr == 'Y') {
                  //item.cfrAmount = obj.item1;
                  item.isCfr1 = 'Y';
                }
              }

            }
            if (2 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[2].isQuotationSelected == 'Y') {
                item.isQuotationSelected2 = 'Y';
                item.item2 = obj.item2;
                if (this.dealerSkuCol[2].isImage == 'Y') {
                  item.isImgItem2 = 'Y';
                }
                if (this.dealerSkuCol[2].isCfr == 'Y') {
                  // item.cfrAmount = obj.item2;
                  item.isCfr2 = 'Y';
                }
              }

            }
            if (3 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[3].isQuotationSelected == 'Y') {
                item.item3 = obj.item3;
                if (this.dealerSkuCol[3].isImage == 'Y') {
                  item.isImgItem3 = 'Y';
                }
                item.isQuotationSelected3 = 'Y';
                if (this.dealerSkuCol[3].isCfr == 'Y') {
                  //item.cfrAmount = obj.item3;
                  item.isCfr3 = 'Y';
                }
              }

            }
            if (4 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[4].isQuotationSelected == 'Y') {
                item.item4 = obj.item4;
                if (this.dealerSkuCol[4].isImage == 'Y') {
                  item.isImgItem4 = 'Y';
                }
                item.isQuotationSelected4 = 'Y';
                if (this.dealerSkuCol[4].isCfr == 'Y') {
                  //item.cfrAmount = obj.item4;
                  item.isCfr4 = 'Y';
                }
              }

            }
            if (5 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[5].isQuotationSelected == 'Y') {
                item.item5 = obj.item5;
                if (this.dealerSkuCol[5].isImage == 'Y') {
                  item.isImgItem5 = 'Y';
                }
                item.isQuotationSelected5 = 'Y';
                if (this.dealerSkuCol[5].isCfr == 'Y') {
                  //item.cfrAmount = obj.item5;
                  item.isCfr5 = 'Y';
                }
              }

            }
            if (6 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[6].isQuotationSelected == 'Y') {
                item.item6 = obj.item6;
                if (this.dealerSkuCol[6].isImage == 'Y') {
                  item.isImgItem6 = 'Y';
                }
                item.isQuotationSelected6 = 'Y';
                if (this.dealerSkuCol[6].isCfr == 'Y') {
                  //item.cfrAmount = obj.item6;
                  item.isCfr6 = 'Y';
                }
              }

            }
            if (7 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[7].isQuotationSelected == 'Y') {
                item.item7 = obj.item7;
                if (this.dealerSkuCol[7].isImage == 'Y') {
                  item.isImgItem7 = 'Y';
                }
                item.isQuotationSelected7 = 'Y';
                if (this.dealerSkuCol[7].isCfr == 'Y') {
                  //item.cfrAmount = obj.item7;
                  item.isCfr7 = 'Y';
                }
              }

            }
            if (8 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[8].isQuotationSelected == 'Y') {
                item.item8 = obj.item8;
                if (this.dealerSkuCol[8].isImage == 'Y') {
                  item.isImgItem8 = 'Y';
                }
                item.isQuotationSelected8 = 'Y';
                if (this.dealerSkuCol[8].isCfr == 'Y') {
                  //item.cfrAmount = obj.item8;
                  item.isCfr8 = 'Y';
                }
              }

            }
            if (9 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[9].isQuotationSelected == 'Y') {
                item.item9 = obj.item9;
                if (this.dealerSkuCol[9].isImage == 'Y') {
                  item.isImgItem9 = 'Y';
                }
                item.isQuotationSelected9 = 'Y';
                if (this.dealerSkuCol[9].isCfr == 'Y') {
                  //item.cfrAmount = obj.item9;
                  item.isCfr9 = 'Y';
                }
              }

            }
            if (10 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[10].isQuotationSelected == 'Y') {
                item.item10 = obj.item10;
                if (this.dealerSkuCol[10].isImage == 'Y') {
                  item.isImgItem10 = 'Y';
                }
                item.isQuotationSelected10 = 'Y';
                if (this.dealerSkuCol[10].isCfr == 'Y') {
                  //  item.cfrAmount = obj.item10;
                  item.isCfr10 = 'Y';
                }
              }

            }
            if (11 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[11].isQuotationSelected == 'Y') {
                item.item11 = obj.item11;
                if (this.dealerSkuCol[11].isImage == 'Y') {
                  item.isImgItem11 = 'Y';
                }
                item.isQuotationSelected11 = 'Y';
                if (this.dealerSkuCol[11].isCfr == 'Y') {
                  // item.cfrAmount = obj.item11;
                  item.isCfr11 = 'Y';
                }
              }

            }
            if (12 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[12].isQuotationSelected == 'Y') {
                item.item12 = obj.item12;
                if (this.dealerSkuCol[12].isImage == 'Y') {
                  item.isImgItem12 = 'Y';
                }
                item.isQuotationSelected12 = 'Y';
                if (this.dealerSkuCol[12].isCfr == 'Y') {
                  // item.cfrAmount = obj.item12;
                  item.isCfr12 = 'Y';
                }
              }

            }
            if (13 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[13].isQuotationSelected == 'Y') {
                item.item13 = obj.item13;
                if (this.dealerSkuCol[13].isImage == 'Y') {
                  item.isImgItem13 = 'Y';
                }
                item.isQuotationSelected13 = 'Y';
                if (this.dealerSkuCol[13].isCfr == 'Y') {
                  //  item.cfrAmount = obj.item13;
                  item.isCfr13 = 'Y';
                }
              }

            }
            if (14 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[14].isQuotationSelected == 'Y') {
                item.item14 = obj.item14;
                if (this.dealerSkuCol[14].isImage == 'Y') {
                  item.isImgItem14 = 'Y';
                }
                item.isQuotationSelected14 = 'Y';
                if (this.dealerSkuCol[14].isCfr == 'Y') {
                  // item.cfrAmount = obj.item14;
                  item.isCfr14 = 'Y';
                }
              }

            }
            if (15 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[15].isQuotationSelected == 'Y') {
                item.item15 = obj.item15;
                if (this.dealerSkuCol[15].isImage == 'Y') {
                  item.isImgItem15 = 'Y';
                }
                item.isQuotationSelected15 = 'Y';
                if (this.dealerSkuCol[15].isCfr == 'Y') {
                  // item.cfrAmount = obj.item15;
                  item.isCfr15 = 'Y';
                }
              }

            }
            if (16 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[16].isQuotationSelected == 'Y') {
                item.item16 = obj.item16;
                if (this.dealerSkuCol[16].isImage == 'Y') {
                  item.isImgItem16 = 'Y';
                }
                item.isQuotationSelected16 = 'Y';
                if (this.dealerSkuCol[16].isCfr == 'Y') {
                  // item.cfrAmount = obj.item16;
                  item.isCfr16 = 'Y';
                }
              }

            }
            if (17 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[17].isQuotationSelected == 'Y') {
                item.item17 = obj.item17;
                if (this.dealerSkuCol[17].isImage == 'Y') {
                  item.isImgItem17 = 'Y';
                }
                item.isQuotationSelected17 = 'Y';
                if (this.dealerSkuCol[17].isCfr == 'Y') {
                  // item.cfrAmount = obj.item17;
                  item.isCfr17 = 'Y';
                }
              }

            }
            if (18 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[18].isQuotationSelected == 'Y') {
                item.item18 = obj.item18;
                if (this.dealerSkuCol[18].isImage == 'Y') {
                  item.isImgItem18 = 'Y';
                }
                item.isQuotationSelected18 = 'Y';
                if (this.dealerSkuCol[18].isCfr == 'Y') {
                  // item.cfrAmount = obj.item18;
                  item.isCfr18 = 'Y';
                }
              }

            }
            if (19 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[19].isQuotationSelected == 'Y') {
                item.item19 = obj.item19;
                if (this.dealerSkuCol[19].isImage == 'Y') {
                  item.isImgItem19 = 'Y';
                }
                item.isQuotationSelected19 = 'Y';
                if (this.dealerSkuCol[19].isCfr == 'Y') {
                  // item.cfrAmount = obj.item19;
                  item.isCfr19 = 'Y';
                }
              }

            }
            if (20 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[20].isQuotationSelected == 'Y') {
                item.item20 = obj.item20;
                if (this.dealerSkuCol[20].isImage == 'Y') {
                  item.isImgItem20 = 'Y';
                }
                item.isQuotationSelected20 = 'Y';
                if (this.dealerSkuCol[20].isCfr == 'Y') {
                  // item.cfrAmount = obj.item20;
                  item.isCfr20 = 'Y';
                }
              }

            }
            if (21 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[21].isQuotationSelected == 'Y') {
                item.item20 = obj.item21;
                if (this.dealerSkuCol[21].isImage == 'Y') {
                  item.isImgItem21 = 'Y';
                }
                item.isQuotationSelected21 = 'Y';
                if (this.dealerSkuCol[21].isCfr == 'Y') {
                  // item.cfrAmount = obj.item21;
                  item.isCfr21 = 'Y';
                }
              }

            }
            if (22 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[22].isQuotationSelected == 'Y') {
                item.item22 = obj.item22;
                if (this.dealerSkuCol[22].isImage == 'Y') {
                  item.isImgItem22 = 'Y';
                }
                item.isQuotationSelected22 = 'Y';
                if (this.dealerSkuCol[22].isCfr == 'Y') {
                  // item.cfrAmount = obj.item22;
                  item.isCfr22 = 'Y';
                }
              }

            }
            if (23 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[23].isQuotationSelected == 'Y') {
                item.item23 = obj.item23;
                if (this.dealerSkuCol[23].isImage == 'Y') {
                  item.isImgItem23 = 'Y';
                }
                item.isQuotationSelected23 = 'Y';
                if (this.dealerSkuCol[23].isCfr == 'Y') {
                  // item.cfrAmount = obj.item23;
                  item.isCfr23 = 'Y';
                }
              }

            }
            if (24 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[24].isQuotationSelected == 'Y') {
                item.item24 = obj.item24;
                if (this.dealerSkuCol[24].isImage == 'Y') {
                  item.isImgItem24 = 'Y';
                }
                item.isQuotationSelected24 = 'Y';
                if (this.dealerSkuCol[24].isCfr == 'Y') {
                  // item.cfrAmount = obj.item24;
                  item.isCfr24 = 'Y';
                }
              }

            }
            if (25 < this.dealerSkuColSize) {
              if (this.dealerSkuCol[25].isQuotationSelected == 'Y') {
                item.item25 = obj.item25;
                if (this.dealerSkuCol[25].isImage == 'Y') {
                  item.isImgItem25 = 'Y';
                }
                item.isQuotationSelected25 = 'Y';
                if (this.dealerSkuCol[25].isCfr == 'Y') {
                  // item.cfrAmount = obj.item25;
                  item.isCfr25 = 'Y';
                }
              }

            }
            /// end new



            this.selectedItems.push(item);
            // jQuery(".ref_"+a).val(obj.ref);
            // jQuery(".quant_"+a).val(obj.qty);
            //jQuery(".amount_"+a).val(obj.itemAmount);
          }

          //jQuery(".tcauto").prop('checked',false);
          //this.tcaList = [];
          for(let tca of this.termConditionList){
            tca.chkId = "";
          }
          if(response.wrappedList[0].tcAuto != null){
            var tcAuto = response.wrappedList[0].tcAuto.split(",");
            for(var tca = 0; tca < tcAuto.length;tca++){
              //console.log(tcAuto[tca]);
                  for(var tc of this.termConditionList){
                    if(tc.id == tcAuto[tca]){
                      tc.chkId = tc.id;
                      break;
                    }
                  }
            }
          }
          // console.log(JSON.stringify(this.selectedItems));
          //  alert("Saved in Draft");
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
    this.spinner.hide();
  }
  submitQuotation() {
    this.compToDealerId = "";
    this.spinner.show();
    this.validCurrency = false;
    this.validToField = false;
    let qItemDetailList: QuotationItemDetail[] = [];
    jQuery(".qtyspan").each(function () {
      jQuery(this).css('display', 'none');
    })
    jQuery(".cfrspan").each(function () {
      jQuery(this).css('display', 'none');
    })

    this.qtyspanClass = true;
    this.pricespanClass = true;
    if (jQuery("#toId").val() == null || jQuery("#toId").val().trim() == "") {
      //alert(jQuery("#toId").val());
      this.spinner.hide();
      alert("Please fill From field");
      return false;
    }
    if (jQuery("#myInput").val() == null || jQuery("#myInput").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill To field");
      return false;
    }
    else {
      for (var dlr = 0; dlr < this.dealerList.length; dlr++) {
        if (this.dealerList[dlr].dealerName == jQuery("#myInput").val()) {
          this.validToField = true;
          this.compToDealerId = this.toDealerId;
          break;
        }
      }
      if (this.validToField == false) {
        this.spinner.hide();
        alert("Please Select a valid To field");
        return false;
      }
    }
    if (jQuery("#issuedBy").val() == null || jQuery("#issuedBy").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill issuedBy field");
      return false;
    }
    // if (jQuery("#contact").val() == null || jQuery("#contact").val().trim() == "") {
    //   alert("Please fill contact field");
    //   return false;
    // }

    if (jQuery("#projectStatus").val() == null || jQuery("#projectStatus").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill Project Status");
      return false;
    }
    if (jQuery("#quotationDate").val() == null || jQuery("#quotationDate").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill Quotation Date");
      return false;
    }
    if (jQuery("#currId").val() == null || jQuery("#currId").val().trim() == "") {
      this.spinner.hide();
      alert("Please fill Currency");
      return false;
    }
    else {
      for (var cr = 0; cr < this.currencyList.length; cr++) {
        if (this.currencyList[cr].value == jQuery("#currId").val()) {
          this.validCurrency = true;
          break;
        }
      }
      if (this.validCurrency == false) {
        this.spinner.hide();
        alert("Please Select a valid Currency");
        return false;
      }
    }
    if (this.isDate == 'Y') {
      if (jQuery("#projectEndDateId").val() == null || jQuery("#projectEndDateId").val().trim() == "") {
        this.spinner.hide();
        alert("Please fill Quotation DeadLine");
        return false;
      }
      else {
        this.projectEndDate = jQuery("#projectEndDateId").val();
      }
    }
    else {
      this.projectEndDate = 'NA';
    }



    for (var a = 0; a < this.selectedItems.length; a++) {
      let itemCfr = "";
      let qtyspanId = true;
      let pricespanId = true;
      if (this.roleId == '3') {
        itemCfr = this.selectedItems[a].cfrAmountManual + "";
      }
      else {
        itemCfr = this.selectedItems[a].cfrAmountManual + "";
      }
      let qItemDetail: QuotationItemDetail = {
        selectedItemId: this.selectedItems[a].item0,
        quantity: this.selectedItems[a].qty + "",
        itemAmount: this.selectedItems[a].price + "",
        reference: this.selectedItems[a].ref,
        cfr: itemCfr
      }
      //console.log(qItemDetail.quantity);
      if (qItemDetail.quantity == null || qItemDetail.quantity.trim() == "" || qItemDetail.quantity.trim() == "0") {
        //this.spinner.hide();
        jQuery('#qtyspan_' + a).css('display', 'block');
        // alert("Please fill quantity");
        this.qtyspanClass = false;
        qtyspanId = false;
        // return false;
      }
      if (qItemDetail.cfr == null || qItemDetail.cfr.trim() == "" || qItemDetail.cfr.trim() == "0") {
       // this.spinner.hide();
        //alert("Please fill item price");
        jQuery('#cfrspan_' + a).css('display', 'block');
        this.pricespanClass = false;
        pricespanId = false;
        //return false;
      }
      // if(qItemDetail.itemAmount == null || qItemDetail.itemAmount.trim() == ""){
      //   this.spinner.hide();
      //   alert("Please fill item amount");
      //   return false;
      // }
      if (qtyspanId && pricespanId) {
        qItemDetailList.push(qItemDetail);
      }
    }

    if (this.qtyspanClass == false || this.pricespanClass == false) {
      this.spinner.hide();
      alert("Either Quantity or Price  missing");
      return false;
    }
    // if(this.pricespanClass == false){
    //   alert("Please fill price");
    //   return false;
    // }

    if (qItemDetailList.length == 0) {
      this.spinner.hide();
      alert("Please select items for quotation");
      return false;
    }


    let billingInfo: string = null;

    for (var b = 0; b < this.billingValueList.length; b++) {
      if(this.billingValueList[b].billingName != "" 
        && this.billingValueList[b].billingValue != ""
        && this.billingValueList[b].billingType != ""){
          var info = this.billingValueList[b].billingName + ":"
          + this.billingValueList[b].billingValue + ":"
          + this.billingValueList[b].billingType;

          if (billingInfo != null) {
            billingInfo = billingInfo + "&" + info;
          }
          else {
            billingInfo = info;
          }
        }
      else{
        this.spinner.hide();
        alert("Input required for additional cost");
        return false;
      }
      
    }

    
    let termConditionAuto: string = null;
    for (var t = 0; t < this.termConditionList.length; t++) {
      if (jQuery(".t_" + t).prop("checked")) {
        if (termConditionAuto != null) {
          termConditionAuto = termConditionAuto + "," + this.termConditionList[t].id;
        }
        else {
          termConditionAuto = this.termConditionList[t].id;
        }

      }
    }
    // if (termConditionAuto == null || termConditionAuto.trim() == "") {
    //   this.spinner.hide();
    //   alert("Please select term and condition");
    //   return false;
    // }

    let termConditionManual: string = null;
    for(let tcm of this.tclist){
      if(tcm.tcValue == null || tcm.tcValue.trim() == ''){
        this.spinner.hide();
        alert("Please fill term condition");
        return false;
      }
      if (termConditionManual != null) {
        termConditionManual = termConditionManual + "," + tcm.tcValue;
      }
      else {
        termConditionManual = tcm.tcValue;
      }
    }
    //console.log(termConditionManual);
    if(termConditionAuto == null && termConditionManual == null){
      this.spinner.hide();
      alert("Fill Payment Terms and Delivery Terms");
      return false;
    }
    if(confirm("Ensure you have updated Payment Terms and Delivery Terms.\nIf Yes then Click 'OK' to continue else to update same Click 'Cancel'")){
      let dq: DraftQuotation = {
        qId: this.quotationId,
        fromName: jQuery("#toId").val(),
        toName: jQuery("#myInput").val(),
        issuedBy: jQuery("#issuedBy").val(),
        projectStatus: jQuery("#projectStatus").val(),
        quotationDeadline: this.projectEndDate + "",
        currency: this.currencyId,
        contactNumber: jQuery("#contact").val(),
        qIdDetList: qItemDetailList,
        baseAmount: this.baseAmount + "",
        billingAmount: this.billingAmount + "",
        billingInfo: billingInfo,
        termConditionAuto: termConditionAuto,
        termConditionManual: termConditionManual,
        status: "VERIFIED",
        quotationDate: jQuery("#quotationDate").val(),
        empId: localStorage.getItem("empId"),
        countryCode: localStorage.getItem("countryCode"),
        fromDealerId: this.compId,
        toDealerId: this.compToDealerId
      }
      this.ss.saveDraftSelectedItemsNew(dq)
        .subscribe((response) => {
          if (response.responseCode == '100000') {
            alert("saved successfully");
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
    }
    else{
      this.spinner.hide();
    }



  }
  chooseCurrency() {
    //alert(jQuery("#currId").val());
  }
  getQuotationHistory() {

    this.ss.getQuotationHistory()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          //alert("Saved in Draft");
          this.quotationHistory = response.wrappedList;
        }
        else if (response.responseCode == '100001') {
          //   alert("No Record Found");
          this.spinner.hide();
        }
        else {
          // alert("Server Error");
          this.spinner.hide();
        }

      },
        (error) => {
          // alert("Network Error");
          this.spinner.hide();
        }
      )
  }

  chooseOptionalField(id, items) {
    // alert(id);
    this.selectedBudgetaryPdfItem = items;
    this.selectedPdfItem = id;
    //alert(this.selectedPdfItem);
    jQuery('#modelWindow1').modal({
      backdrop: 'static',
      keyboard: false
    });
    jQuery("#refNum").prop("checked", false);
    this.optionalCount = 0;
    this.getOptionalField();
    //this.getFieldConfigComb();

    // window.open();
  }
  clickOnOptionalField(i){
    //console.log(this.optionalCount);
    if (jQuery("#optionalCheck_"+i).prop("checked")) {
      this.optionalCount = this.optionalCount + 1;
    }
    else{
     this.optionalCount = this.optionalCount -1;
    }
    if(this.optionalCount > 5){
      this.optionalCount = this.optionalCount -1;
      alert("Maximum 5 Options can be selected in a single time");
      return false;
    }
  }

  clickOnRefNo(){
    if (jQuery("#refNum").prop("checked")) {
      this.optionalCount = this.optionalCount + 1;
    }
    else{
      this.optionalCount = this.optionalCount - 1;
    }
    if(this.optionalCount > 5){
      this.optionalCount = this.optionalCount -1;
      alert("Maximum 5 Options can be selected in a single time");
      return false;
    }
  }

  downloadBudgetPdf() {
    if(this.optionalCount > 5){
      alert("Maximum 5 Options can be selected in a single time");
      return false;
    }

    this.optionalFieldModelList = [];
    var refCol = 'N';
    for (var i = 0; i < this.optionalFieldList.length; i++) {
      
      if (jQuery("#optionalCheck_" + i).prop("checked")) {
        let optionalClass: OptionalField = {
          id: "",
          fieldKey: "",
          fieldName: ""
        };
        optionalClass.id = this.optionalFieldList[i].id;
        optionalClass.fieldName = this.optionalFieldList[i].fieldName;
        optionalClass.fieldKey = this.optionalFieldList[i].fieldKey;
        this.optionalFieldModelList.push(optionalClass);
      }

    }
    if (jQuery("#refNum").prop("checked")) {
      refCol = 'Y';
    }
    this.ss.downloadBudgetPdf(this.selectedPdfItem, this.optionalFieldModelList, refCol);

    //   .subscribe((response) =>{
    //     this.spinner.hide();
    //   },
    //   (error) =>{
    //     alert("Network Error");
    //     this.spinner.hide();
    //   }
    // );
  }
  chooseCombination(qId) {
    this.detailPdfQId = qId;
    jQuery('#modelWindow2').modal({
      backdrop: 'static',
      keyboard: false
    });
    jQuery("#c1").prop("checked", false);
    jQuery("#c2").prop("checked", false);
    jQuery("#c3").prop("checked", false);
    jQuery("#c4").prop("checked", false);
    jQuery("#c5").prop("checked", false);
    this.comb = "";
    this.getFieldConfigComb();
  }

  downloadDetailPdf() {
    if (this.comb == "") {
      alert("Please choose a valid combination");
    }
    else {
      this.ss.downloadDetailPdf(this.detailPdfQId, this.comb);
    }
  }

  getOptionalField() {
    this.spinner.show();
    this.ss.getOptionalField()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.optionalFieldList = response.wrappedList;
         // console.log(this.optionalFieldList);
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          // alert("No Record Found");
          this.spinner.hide();
        }
        else {
          // alert("Server Error");
          this.spinner.hide();
        }

      },
        (error) => {
          // alert("Network Error");
          this.spinner.hide();
        }
      )
  }

  getFieldConfigComb() {
    this.spinner.show();
    this.ss.getFieldConfigComb()
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.fieldConfigComb = response.wrappedList[0];
          //console.log(this.fieldConfigComb);
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          // alert("No Record Found");
          this.spinner.hide();
        }
        else {
          // alert("Server Error");
          this.spinner.hide();
        }

      },
        (error) => {
          // alert("Network Error");
          this.spinner.hide();
        }
      )
  }
 
  selectfilledComb(s: any) {
    //alert(s);
    this.comb = s;
    //   if(confirm("Are you sure to select the field configuration")){
    //    // alert("yes "+ s);
    //   // jQuery('.loaderClass').show();
    //    this.ss.activateFieldComb(s)
    //    .subscribe((response) =>{
    //      if(response.responseCode == '100000'){
    //       // this.fieldlist = response.wrappedList;
    //       // console.log(this.fieldlist);

    //      //  this.spinner.hide();
    //     // jQuery('.loaderClass').hide();
    //     // jQuery('#fConfigFormId').show();
    //     alert("Field Combination activated successfully");
    //    }
    //      else if(response.responseCode == '100001'){
    //        alert("No Record Found");
    //        this.spinner.hide();
    //      }
    //      else {
    //        alert("Server Error");
    //        this.spinner.hide();
    //      }

    //    },
    //    (error) =>{
    //      alert("Network Error");
    //      this.spinner.hide();
    //    }
    //  )
    //   }
    //   else{
    //     //alert("NO");
    //     //alert(jQuery(obj).attr("value"));
    //     //jQuery("input[name='fcRadio'][value="+s+"]").prop('checked', false);
    //     jQuery("#"+s). prop("checked", false);
    //    // alert(jQuery("#"+s).val());
    //   }
  }
}
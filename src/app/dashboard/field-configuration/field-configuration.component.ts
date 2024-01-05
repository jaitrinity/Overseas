import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jQuery;

@Component({
  selector: 'app-field-configuration',
  templateUrl: './field-configuration.component.html',
  styleUrls: ['./field-configuration.component.css']
})
export class FieldConfigurationComponent implements OnInit {
  fieldlist = [];
  fieldConfigComb;
  nextVacantComb: string;
  checkField: any = [];
  Comb1 = [];
  c1: string = "COMB1";
  c2: string = "COMB2";
  c3: string = "COMB3";
  c4: string = "COMB4";
  c5: string = "COMB5";
  commonList: any = [];
  wcList: any = [];
  fList: any = [];
  uList: any = [];
  bList: any = [];
  editCombPos = "";
  saveButtonStatus: boolean = true;
  updateButtonStatus: boolean = true;
  constructor(private ss: SharedService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    jQuery('#fConfigFormId').hide();
    jQuery('#updateBtnId').hide();
    this.getTableData();
    this.getFieldConfigComb();
  }

  checkFieldName(e){
   // alert(event.data.fieldName);
    //alert(jQuery("#"+e).prop("checked"));
    if(jQuery("#"+e).prop("checked")){
      // if(this.checkField.length==10){
      //   alert("Max limit is 10");
      //   jQuery("#"+e).prop("checked",false);
      // }
      // else{
        this.checkField.push(e);
    //  }
    }
    else{
      for(var i=0;i< this.checkField.length;i++){
        if(this.checkField[i]== e){
          this.checkField.splice(i,1);
          return false;
        }
      }
      
    }
    //console.log(this.checkField);
  }

  saveConfig(){
    let l = jQuery(".fconfigClass");
    //let arr = [];
    // jQuery(".fconfigClass").each(function(){
    //   let isChecked = jQuery(this).prop("checked");
    //   if(isChecked){
    //     arr.push(jQuery(this).attr("name"));
    //    // alert(jQuery(this).attr("name"));
    //   }
    // })
    if(this.checkField.length!=0){
      this.spinner.show();
      this.ss.saveValidFieldConfig(this.checkField,localStorage.getItem('nextVacantComb'))
      .subscribe(
        (response) => {
          if (response.responseCode == '100000') {
          alert("Successfully Saved");
          jQuery(".fconfigClass").prop("checked",false);
          this.checkField = [];
          this.getFieldConfigComb(); 
          this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
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
          
          jQuery(".fconfigClass").prop("checked",false);
          this.checkField.splice(0);
        }
        
      )
    }
   else{
     alert("Please select a field configuration");
   }
    
  }
 
  getTableData(){
    //this.spinner.show();
    jQuery('.loaderClass').show();
    this.ss.getFieldDetails()
    .subscribe((response) =>{
      if(response.responseCode == '100000'){
        this.fieldlist = response.wrappedList[0];
  
        this.commonList = response.wrappedList[0].commonList;
        this.wcList = response.wrappedList[0].wcList;
        this.fList = response.wrappedList[0].fList;
        this.bList = response.wrappedList[0].bList;
        this.uList = response.wrappedList[0].uList;
        //console.log(this.fieldlist);
       
      //  this.spinner.hide();
      jQuery('.loaderClass').hide();
      jQuery('#fConfigFormId').show();
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

  getFieldConfigComb(){
    this.spinner.show();
    jQuery('.loaderClass1').show();
    this.ss.getFieldConfigComb()
    .subscribe((response) =>{
      if(response.responseCode == '100000'){
        this.fieldConfigComb = response.wrappedList[0];
        //this.Comb1 = this.fieldConfigComb[0];
        //console.log(this.fieldConfigComb);
       if(this.fieldConfigComb.comb1.length==0){
         localStorage.setItem('nextVacantComb',this.c1);
         //this.nextVacantComb = this.c1;
       }
       else if(this.fieldConfigComb.comb2.length==0){
        localStorage.setItem('nextVacantComb',this.c2);
        //this.nextVacantComb = this.c2;
      }
      else if(this.fieldConfigComb.comb3.length==0){
        localStorage.setItem('nextVacantComb',this.c3);
        //this.nextVacantComb = this.c3;
      }
      else if(this.fieldConfigComb.comb4.length==0){
        localStorage.setItem('nextVacantComb',this.c4);
        //this.nextVacantComb = this.c4;
      }
      else if(this.fieldConfigComb.comb5.length==0){
        localStorage.setItem('nextVacantComb',this.c5);
        //this.nextVacantComb = this.c5;
      }
      //  this.spinner.hide();
     // jQuery('.loaderClass').hide();
     // jQuery('#fConfigFormId').show();
    // console.log(this.fieldConfigComb[0].comb1.length);
     if(this.fieldConfigComb.comb1.length!=0 && this.fieldConfigComb.comb2.length!=0
    && this.fieldConfigComb.comb3.length!=0 && this.fieldConfigComb.comb4.length!=0
  && this.fieldConfigComb.comb5.length!=0){
       // this.saveButtonStatus = true;
       jQuery('#saveBtnId').hide(); 
      }
       else{
       // this.saveButtonStatus = false;
       jQuery('#saveBtnId').show();
       }
       jQuery('#updateBtnId').hide();
       
       jQuery('.loaderClass1').hide();
       this.spinner.hide();
   // this.saveButtonStatus = false;
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

  selectfilledComb(s: any){
    if(confirm("Are you sure to select the field configuration")){
     // alert("yes "+ s);
    // jQuery('.loaderClass').show();
     this.ss.activateFieldComb(s)
     .subscribe((response) =>{
       if(response.responseCode == '100000'){
        // this.fieldlist = response.wrappedList;
        // console.log(this.fieldlist);
        
       //  this.spinner.hide();
      // jQuery('.loaderClass').hide();
      // jQuery('#fConfigFormId').show();
      alert("Field Combination activated successfully");
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
    else{
      //alert("NO");
      //alert(jQuery(obj).attr("value"));
      //jQuery("input[name='fcRadio'][value="+s+"]").prop('checked', false);
      jQuery("#"+s). prop("checked", false);
     // alert(jQuery("#"+s).val());
    }
  }
  editComb(c: string){
    jQuery(".fconfigClass").each(function(){
      // let isChecked = jQuery(this).prop("checked");
      jQuery(this).prop("checked",false);
       
     })
     this.checkField.splice(0);
     //console.log("checkfield array"+ this.checkField);
     this.editCombPos = c;

    let arr= [];
    if(this.editCombPos==this.c1){
      arr = this.fieldConfigComb.comb1;
    }
    else if(this.editCombPos == this.c2){
      arr = this.fieldConfigComb.comb2;
    }
    else if(this.editCombPos == this.c3){
      arr = this.fieldConfigComb.comb3;
    }
    else if(this.editCombPos == this.c4){
      arr = this.fieldConfigComb.comb4;
    }
    else if(this.editCombPos == this.c5)
    {
      arr = this.fieldConfigComb.comb5;
    }
    //console.log("comb array "+ JSON.stringify(arr));
    if(arr.length!=0){
      // for(var i=0;i<arr.length;i++){
      //   var a = arr[i].id;
      //   var flag: boolean = true;
      //   jQuery(".fconfigClass").each(function(){
      //    // let isChecked = jQuery(this).prop("checked");
      //    if(flag){
      //     if(a==jQuery(this).attr("name")){
      //       jQuery(this).prop("checked",true);
      //       this.checkField.push(a);
      //       flag = false;
      //      // alert(jQuery(this).attr("name"));
      //     }
      //    }
          
      //   })
      // }
        for(var i =0;i<arr.length;i++){
          var a = arr[i].id;
          jQuery("#"+a).prop("checked",true);
          if(jQuery("#"+a).prop("checked")){
            this.checkField.push(a);
          }
        }
        jQuery('#updateBtnId').show();
        jQuery('#saveBtnId').hide();
     // this.updateButtonStatus = false;
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  deleteComb(comb: string){
    if(confirm("Do you want to delete the combination")){
     // alert(comb);
      this.ss.deleteComb(comb)
     .subscribe((response) =>{
       if(response.responseCode == '100000'){
        // this.fieldlist = response.wrappedList;
        // console.log(this.fieldlist);
        
       //  this.spinner.hide();
      // jQuery('.loaderClass').hide();
      // jQuery('#fConfigFormId').show();
      alert("Field Combination deleted ");
      this.getFieldConfigComb();
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
    else{
      alert("NO");
    }
  }
  cancelConfig(){
    jQuery(".fconfigClass").prop("checked",false);
    this.checkField = [];
    jQuery('#updateBtnId').hide();
    if(this.fieldConfigComb.comb1.length!=0 && this.fieldConfigComb.comb2.length!=0
      && this.fieldConfigComb.comb3.length!=0 && this.fieldConfigComb.comb4.length!=0
      && this.fieldConfigComb.comb5.length!=0){
         jQuery('#saveBtnId').hide(); 
    }
    else{
         jQuery('#saveBtnId').show();
    }
  }
  updateConfig(){
    // let arr = [];
    // jQuery(".fconfigClass").each(function(){
    //   let isChecked = jQuery(this).prop("checked");
    //   if(isChecked){
    //     arr.push(jQuery(this).attr("name"));
    //    // alert(jQuery(this).attr("name"));
    //   }
    // })
    // 
      if(this.checkField.length!=0){
      this.ss.saveValidFieldConfig(this.checkField,this.editCombPos)
      .subscribe(
        (response) => {
          if (response.responseCode == '100000') {
          alert("Successfully updated");
          this.getFieldConfigComb(); 
          this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
            this.spinner.hide();
          }
          else {
            alert("Server Error1");
            this.spinner.hide();
          }
          jQuery(".fconfigClass").prop("checked",false);
          this.checkField = [];
        },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
          
          jQuery(".fconfigClass").prop("checked",false);
          this.checkField = [];
        }
        
      )
     
    }
    else{
      alert("Please select any field configuration");
    }
    this.updateButtonStatus = true;
  }

  
}

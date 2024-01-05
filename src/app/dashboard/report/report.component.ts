import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
declare var jQuery;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  
  projectCategory = "";
  companyId = "";
  salesPersonId= "";
  fromDate = "";
  toDate = "";
  
  projectQuotedCompanyId = "";
  projectQuotedSalesPersonId = "";
  projectQuotedFromDate = "";
  projectQuotedToDate = "";

  deadlineCompanyId = "";
  deadlineSalesPersonId = "";
  deadlineFromDate = "";
  deadlineToDate = "";

  historicCompanyId = "";
  historicSalesPersonId = "";
  historicFromDate = "";
  historicToDate = "";
  
  runningTableList = [];
  droppedTableList = [];
  completedTableList = [];
  runningYear = "";
  droppedYear = "";
  completedYear = "";
  csList = [];
  spList = [];
  projectQuotedSpList = [];
  deadlineSpList = [];
  historicSpList = [];
  yearValue = "";
  halfYearValue = "";
  quarterValue = "";
  monthValue = "";

  hisYearValue = "";
  hisHalfYearValue = "";
  hisQuarterValue = "";
  hisMonthValue = "";

  deadYearValue = "";
  deadHalfYearValue = "";
  deadQuarterValue = "";
  deadMonthValue = "";


  runningList = [];
  runningpieChartData: any = [
    {
      data: []
    }
  ];
  runningpieChartLabels = [];
  runningpieChartColor: any = [
    {
      backgroundColor: []
    }
  ];
  runningpieChartOptions = {
    responsive: true,
      legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Country Wise Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
  };



  droppedList = [];
  droppedpieChartData: any = [
    {
      data: []
    }
  ];
  droppedpieChartLabels = [];
  droppedpieChartColor: any = [
    {
      backgroundColor: []
    }
  ];
  droppedpieChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Country Wise Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  completedList = [];
  completedpieChartData: any = [
    {
      data: []
    }
  ];
  completedpieChartLabels = [];
  completedpieChartColor: any = [
    {
      backgroundColor: []
    }
  ];
  completedpieChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Country Wise Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };



  runningSalesList = [];
  runningpieChartSalesLabels = [];
  runningpieChartSalesColor: any = [
    {
      backgroundColor: []
    }
  ];
  runningpieChartSalesData: any = [
    {
      data: []
    }
  ];
  runningpieChartSalesOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Sales Person Wise Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  droppedSalesList = [];
  droppedpieChartSalesLabels = [];
  droppedpieChartSalesColor: any = [
    {
      backgroundColor: []
    }
  ];
  droppedpieChartSalesData: any = [
    {
      data: []
    }
  ];
  droppedpieChartSalesOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Sales Person Wise Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  completedSalesList = [];
  completedpieChartSalesLabels = [];
  completedpieChartSalesColor: any = [
    {
      backgroundColor: []
    }
  ];
  completedpieChartSalesData: any = [
    {
      data: []
    }
  ];
  completedpieChartSalesOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Sales Person Wise Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  monthlyStatusList = [];
  monthlyStatusLabels = [];
  monthlyStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  monthlyStatusData: any = [
    {
      data: []
    }
  ];
  monthlyStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Project Quoted Status'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  quarterlyStatusList = [];
  quarterlyStatusLabels = [];
  quarterlyStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  quarterlyStatusData: any = [
    {
      data: []
    }
  ];
  quarterlyStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Quarterly Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  halfYearlyStatusList = [];
  halfYearlyStatusLabels = [];
  halfYearlyStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  halfYearlyStatusData: any = [
    {
      data: []
    }
  ];
  halfYearlyStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Half Yearly Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  yearlyStatusList = [];
  yearlyStatusLabels = [];
  yearlyStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  yearlyStatusData: any = [
    {
      data: []
    }
  ];
  yearlyStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Yearly Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  hisStatusList = [];
  hisStatusLabels = [];
  hisStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  hisStatusData: any = [
    {
      data: []
    }
  ];
  hisStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Historic Data Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  
  deadMonthStatusList = [];
  deadMonthStatusLabels = [];
  deadMonthStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  deadMonthStatusData: any = [
    {
      data: []
    }
  ];
  deadMonthStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Deadline Wise'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  deadQuarterStatusList = [];
  deadQuarterStatusLabels = [];
  deadQuarterStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  deadQuarterStatusData: any = [
    {
      data: []
    }
  ];
  deadQuarterStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Quarterly Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  deadHalfYearStatusList = [];
  deadHalfYearStatusLabels = [];
  deadHalfYearStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  deadHalfYearStatusData: any = [
    {
      data: []
    }
  ];
  deadHalfYearStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Half Yearly Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };
  deadYearStatusList = [];
  deadYearStatusLabels = [];
  deadYearStatusColor: any = [
    {
      backgroundColor: []
    }
  ];
  deadYearStatusData: any = [
    {
      data: []
    }
  ];
  deadYearStatusOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Yearly Quotation'
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };


  constructor(private ss: SharedService, private spinner: NgxSpinnerService) {
    this.datePickerConfig = Object.assign({},
      {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'YYYY-MM-DD',
      adaptivePostion: true
    });
   }

  ngOnInit() {
    this.getCompanyNameWithSalesPerson();
    
   // this.getDefaultPieChartData();
   // this.getDefaultPieChartSaleswiseData();
   // this.getDefaultPieChartCategorywiseTimewise();
  }

  OnApplyFilter(){
    this.getProjectStatusReport();
  }
  OnViewChart(){
    this.getDefaultPieChartData();
    this.getDefaultPieChartSaleswiseData();
  }

  getCompanyNameWithSalesPerson(){
    this.spinner.show();
    var json = {
      "empId": localStorage.getItem("empId")
    }
    this.ss.getCompanyNameWithSalesPerson(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.csList = response.wrappedList;
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  getSalesPerson(type){
    var compId = "";
    if(type == "ProjectStatus"){
      compId = jQuery("#projectStatusCompId").val();
    }
    else if(type == "ProjectQuoted"){
      compId = jQuery("#projectQuotedCompId").val();
    }
    else if(type == "Deadline"){
      compId = jQuery("#deadlineCompId").val();
    }
    else if(type == "Historic"){
      compId = jQuery("#historicCompId").val();
    }

    var salesList = [];
    
    if(compId != ""){
      for(var i=0; i< this.csList.length;i++){
        if(this.csList[i].companyId == compId){
          salesList = this.csList[i].salesPersonList;
          break;
        }
      }
      if(type == "ProjectStatus"){
        this.spList = salesList;
      }
      else if(type == "ProjectQuoted"){
        this.projectQuotedSpList = salesList;
      }
      else if(type == "Deadline"){
        this.deadlineSpList = salesList;
      }
      else if(type == "Historic"){
        this.historicSpList = salesList;
      }
    }
    
  }

  viewTimewiseChart(){
    this.monthlyStatusData[0].data = [];
    this.monthlyStatusLabels = [];
    this.monthlyStatusColor[0].backgroundColor = [];
    if(jQuery('#projectQuotedFromDateId').val() == null){
      this.projectQuotedFromDate = "";
    }
    else{
      this.projectQuotedFromDate = jQuery('#projectQuotedFromDateId').val();
    }
    if(jQuery('#projectQuotedToDateId').val() == null){
      this.projectQuotedToDate = "";
    }
    else{
      this.projectQuotedToDate = jQuery('#projectQuotedToDateId').val();
    }
    this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.projectQuotedFromDate,
      'toDate': this.projectQuotedToDate,
      'companyId': this.projectQuotedCompanyId,
      'salesPersonId': this.projectQuotedSalesPersonId
    }
      this.getDefaultPieChartCategorywiseTimewise(json);
  }
  getDefaultPieChartCategorywiseTimewise(json){
    this.spinner.show();
    
    this.ss.getDefaultPieChartCategorywiseTimewise(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.monthlyStatusList = response.wrappedList;
          if (this.monthlyStatusList.length != 0) {
            for (var i = 0; i < this.monthlyStatusList.length; i++) {
              this.monthlyStatusData[0].data[i] = this.monthlyStatusList[i].dataValue;
              this.monthlyStatusLabels[i] = this.monthlyStatusList[i].labelValue;
              this.monthlyStatusColor[0].backgroundColor[i] = this.monthlyStatusList[i].colorValue;
            }
          }
          
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          //alert("No Record Found");
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
          // jQuery('.loaderClass').hide();
        }
      )
  }
  getDefaultPieChartSaleswiseData() {
    this.spinner.show();
    // let json = {
    //   'empId': localStorage.getItem("empId"),
    //   'isDefault': 'Y'
    // }
    if(jQuery('#fromDateId').val() == null){
      this.fromDate = "";
    }
    else{
      this.fromDate = jQuery('#fromDateId').val();
    }
    if(jQuery('#toDateId').val() == null){
      this.toDate = "";
    }
    else{
      this.toDate = jQuery('#toDateId').val();
    }
    this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'companyId': this.companyId,
      'projectCategory': this.projectCategory,
      'salesPersonId': this.salesPersonId
    }
    this.ss.getPieChartSaleswiseData(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.runningSalesList = response.wrappedList[0].runningPieChart;
          this.droppedSalesList = response.wrappedList[0].droppedPieChart;
          this.completedSalesList = response.wrappedList[0].completedPieChart;
          if (this.runningSalesList.length != 0) {
            for (var i = 0; i < this.runningSalesList.length; i++) {
              this.runningpieChartSalesData[0].data[i] = this.runningSalesList[i].dataValue;
              this.runningpieChartSalesLabels[i] = this.runningSalesList[i].labelValue;
              this.runningpieChartSalesColor[0].backgroundColor[i] = this.runningSalesList[i].colorValue;
            }
          }
          if (this.droppedSalesList.length != 0) {
            for (var i = 0; i < this.droppedSalesList.length; i++) {
              this.droppedpieChartSalesData[0].data[i] = this.droppedSalesList[i].dataValue;
              this.droppedpieChartSalesLabels[i] = this.droppedSalesList[i].labelValue;
              this.droppedpieChartSalesColor[0].backgroundColor[i] = this.droppedSalesList[i].colorValue;
            }
          }
          if (this.completedSalesList.length != 0) {
            for (var i = 0; i < this.completedSalesList.length; i++) {
              this.completedpieChartSalesData[0].data[i] = this.completedSalesList[i].dataValue;
              this.completedpieChartSalesLabels[i] = this.completedSalesList[i].labelValue;
              this.completedpieChartSalesColor[0].backgroundColor[i] = this.completedSalesList[i].colorValue;
            }
          }
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          //alert("No Record Found");
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  getRunningPieChartCountry(json) {
    this.runningList = [];
    this.runningpieChartColor = [
      {
        backgroundColor: []
      }
    ];
    this.runningpieChartData = [
      {
        data: []
      }
    ];
    this.runningpieChartLabels = [];
    this.ss.getPieChartData(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.runningList = response.wrappedList[0].runningPieChart;
          if (this.runningList.length != 0) {
            for (var i = 0; i < this.runningList.length; i++) {
              this.runningpieChartData[0].data[i] = this.runningList[i].dataValue;
              this.runningpieChartLabels[i] = this.runningList[i].labelValue;
              this.runningpieChartColor[0].backgroundColor[i] = this.runningList[i].colorValue;
            }
          }
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  getRunningPieChartSales(json) {
    this.runningSalesList = [];
    this.runningpieChartSalesColor = [
      {
        backgroundColor: []
      }
    ];
    this.runningpieChartSalesData = [
      {
        data: []
      }
    ];
    this.runningpieChartSalesLabels = [];
    this.ss.getPieChartSaleswiseData(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.runningSalesList = response.wrappedList[0].runningPieChart;
          if (this.runningSalesList.length != 0) {
            for (var i = 0; i < this.runningSalesList.length; i++) {
              this.runningpieChartSalesData[0].data[i] = this.runningSalesList[i].dataValue;
              this.runningpieChartSalesLabels[i] = this.runningSalesList[i].labelValue;
              this.runningpieChartSalesColor[0].backgroundColor[i] = this.runningSalesList[i].colorValue;
            }
          }
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  getRunningPieChartData(runningYear) {
    this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'isDefault': 'N',
      'runningYear': runningYear
    }
    this.getRunningPieChartCountry(json);
    this.getRunningPieChartSales(json);
  }

  getCompletedPieChartCountry(json) {
    this.completedList = [];
    this.completedpieChartColor = [
      {
        backgroundColor: []
      }
    ];
    this.completedpieChartData = [
      {
        data: []
      }
    ];
    this.completedpieChartLabels = [];
    this.ss.getPieChartData(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.completedList = response.wrappedList[0].completedPieChart;
          if (this.completedList.length != 0) {
            for (var i = 0; i < this.completedList.length; i++) {
              this.completedpieChartData[0].data[i] = this.completedList[i].dataValue;
              this.completedpieChartLabels[i] = this.completedList[i].labelValue;
              this.completedpieChartColor[0].backgroundColor[i] = this.completedList[i].colorValue;
            }
          }
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  getCompletedPieChartSales(json) {
    this.completedSalesList = [];
    this.completedpieChartSalesColor = [
      {
        backgroundColor: []
      }
    ];
    this.completedpieChartSalesData = [
      {
        data: []
      }
    ];
    this.completedpieChartSalesLabels = [];
    this.ss.getPieChartSaleswiseData(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.completedSalesList = response.wrappedList[0].completedPieChart;
          if (this.completedSalesList.length != 0) {
            for (var i = 0; i < this.completedSalesList.length; i++) {
              this.completedpieChartSalesData[0].data[i] = this.completedSalesList[i].dataValue;
              this.completedpieChartSalesLabels[i] = this.completedSalesList[i].labelValue;
              this.completedpieChartSalesColor[0].backgroundColor[i] = this.completedSalesList[i].colorValue;
            }
          }
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
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
          // jQuery('.loaderClass').hide();
        }
      )
  }
  getCompletedPieChartData(completedYear) {
    this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'isDefault': 'N',
      'completedYear': completedYear
    }
    this.getCompletedPieChartCountry(json);
    this.getCompletedPieChartSales(json);
  }

  getDefaultPieChartData() {
    // this.spinner.show();
    // let json = {
    //   'empId': localStorage.getItem("empId"),
    //   'isDefault': 'Y'
    // }
    if(jQuery('#fromDateId').val() == null){
      this.fromDate = "";
    }
    else{
      this.fromDate = jQuery('#fromDateId').val();
    }
    if(jQuery('#toDateId').val() == null){
      this.toDate = "";
    }
    else{
      this.toDate = jQuery('#toDateId').val();
    }
    this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'companyId': this.companyId,
      'projectCategory': this.projectCategory,
      'salesPersonId': this.salesPersonId
    }
    this.ss.getPieChartData(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.runningList = response.wrappedList[0].runningPieChart;
          this.droppedList = response.wrappedList[0].droppedPieChart;
          this.completedList = response.wrappedList[0].completedPieChart;
          if (this.runningList.length != 0) {
            for (var i = 0; i < this.runningList.length; i++) {
              this.runningpieChartData[0].data[i] = this.runningList[i].dataValue;
              this.runningpieChartLabels[i] = this.runningList[i].labelValue;
              this.runningpieChartColor[0].backgroundColor[i] = this.runningList[i].colorValue;
            }
          }
          if (this.droppedList.length != 0) {
            for (var i = 0; i < this.droppedList.length; i++) {
              this.droppedpieChartData[0].data[i] = this.droppedList[i].dataValue;
              this.droppedpieChartLabels[i] = this.droppedList[i].labelValue;
              this.droppedpieChartColor[0].backgroundColor[i] = this.droppedList[i].colorValue;
            }
          }
          if (this.completedList.length != 0) {
            for (var i = 0; i < this.completedList.length; i++) {
              this.completedpieChartData[0].data[i] = this.completedList[i].dataValue;
              this.completedpieChartLabels[i] = this.completedList[i].labelValue;
              this.completedpieChartColor[0].backgroundColor[i] = this.completedList[i].colorValue;
            }
          }
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          //alert("No Record Found");
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
          // jQuery('.loaderClass').hide();
        }
      )
  }
  getProjectStatusReport() {
    if(jQuery('#fromDateId').val() == null){
      this.fromDate = "";
    }
    else{
      this.fromDate = jQuery('#fromDateId').val();
    }
    if(jQuery('#toDateId').val() == null){
      this.toDate = "";
    }
    else{
      this.toDate = jQuery('#toDateId').val();
    }
    this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'companyId': this.companyId,
      'projectCategory': this.projectCategory,
      'salesPersonId': this.salesPersonId
    }
    this.ss.getProjectStatusReport(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.runningTableList = response.wrappedList[0].running;
          this.droppedTableList = response.wrappedList[0].dropped;
          this.completedTableList = response.wrappedList[0].completed;

          // if (this.completedList.length != 0) {
          //   for (var i = 0; i < this.completedList.length; i++) {
          //     this.completedpieChartData[0].data[i] = this.completedList[i].projectValue;
          //     this.completedpieChartLabels[i] = this.completedList[i].yearNo + "-" + this.completedList[i].countryNo + "-" + this.completedList[i].salesPerson;
          //     if (i == 0) {
          //       this.completedpieChartColor[0].backgroundColor[i] = 'red';
          //     }
          //     else if (i == 1) {
          //       this.completedpieChartColor[0].backgroundColor[i] = 'yellow';
          //     }
          //     else if (i == 2) {
          //       this.completedpieChartColor[0].backgroundColor[i] = 'orange';
          //     }
          //     else if (i == 3) {
          //       this.completedpieChartColor[0].backgroundColor[i] = 'blue';
          //     }
          //     else {
          //       this.completedpieChartColor[0].backgroundColor[i] = 'green';
          //     }
          //   }
          
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          //alert("No Record Found");
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  exportProjectQuotedReport(){
    if(jQuery('#projectQuotedFromDateId').val() == null){
      this.projectQuotedFromDate = "";
    }
    else{
      this.projectQuotedFromDate = jQuery('#projectQuotedFromDateId').val();
    }
    if(jQuery('#projectQuotedToDateId').val() == null){
      this.projectQuotedToDate = "";
    }
    else{
      this.projectQuotedToDate = jQuery('#projectQuotedToDateId').val();
    }
    //this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.projectQuotedFromDate,
      'toDate': this.projectQuotedToDate,
      'companyId': this.projectQuotedCompanyId,
      'salesPersonId': this.projectQuotedSalesPersonId
    }
    this.ss.exportProjectStatusReport(json);
  }

  exportDeadlineReport(){
    if(jQuery('#deadlineFromDateId').val() == null){
      this.deadlineFromDate = "";
    }
    else{
      this.deadlineFromDate = jQuery('#deadlineFromDateId').val();
    }
    if(jQuery('#deadlineToDateId').val() == null){
      this.deadlineToDate = "";
    }
    else{
      this.deadlineToDate = jQuery('#deadlineToDateId').val();
    }
    //this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.deadlineFromDate,
      'toDate': this.deadlineToDate,
      'companyId': this.deadlineCompanyId,
      'salesPersonId': this.deadlineSalesPersonId
    }
    this.ss.exportProjectStatusReport(json);
  }

  exportHistoricReport(){
    if(jQuery('#historicFromDateId').val() == null){
      this.historicFromDate = "";
    }
    else{
      this.historicFromDate = jQuery('#historicFromDateId').val();
    }
    if(jQuery('#historicToDateId').val() == null){
      this.historicToDate = "";
    }
    else{
      this.historicToDate = jQuery('#historicToDateId').val();
    }
    //this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.historicFromDate,
      'toDate': this.historicToDate,
      'companyId': this.historicCompanyId,
      'salesPersonId': this.historicSalesPersonId
    }
    this.ss.exportProjectStatusReport(json);
  }

  exportProjectStatusReport() {
    if(jQuery('#fromDateId').val() == null){
      this.fromDate = "";
    }
    else{
      this.fromDate = jQuery('#fromDateId').val();
    }
    if(jQuery('#toDateId').val() == null){
      this.toDate = "";
    }
    else{
      this.toDate = jQuery('#toDateId').val();
    }
    //this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.fromDate,
      'toDate': this.toDate,
      'companyId': this.companyId,
      'projectCategory': this.projectCategory,
      'salesPersonId': this.salesPersonId
    }
    this.ss.exportProjectStatusReport(json);
  }

  exportProjectStatusSummaryReport(cat) {

    if (cat == 'Running' && this.runningList.length == 0) {
      alert("no data to export");
      return false;
    }
    else if (cat == 'Dropped' && this.droppedList.length == 0) {
      alert("no data to export");
      return false;
    }
    else if (cat == 'Completed' && this.completedList.length == 0) {
      alert("no data to export");
      return false;
    }

    let json = {
      "projectStatusCategory": cat
    }
    this.ss.exportProjectStatusSummaryReport(json);
  }

  onTimewiseChartClick(timeType){
    let json = {
      "timeType": timeType,
      "empId": localStorage.getItem('empId'),
      "yearValue": this.yearValue,
      "halfYearValue": this.halfYearValue,
      "quarterValue": this.quarterValue,
      " ": this.monthValue
    }
    this.ss.exportTimewiseReport(json);
  }

  viewHistoricChart(){
   
      var json = {
        "empId": localStorage.getItem("empId"),
        "yearValue": "2020",
        "halfYearValue": this.hisHalfYearValue,
        "quarterValue" : this.hisQuarterValue,
        "monthValue": this.hisMonthValue
      }
      this.getHistoricPieChartTimewise(json);
  }
  getHistoricPieChartTimewise(json){

    this.spinner.show();
    
    this.ss.getHistoricPieChartTimewise(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.hisStatusList = response.wrappedList;
          if (this.hisStatusList.length != 0) {
            for (var i = 0; i < this.hisStatusList.length; i++) {
              this.hisStatusData[0].data[i] = this.hisStatusList[i].dataValue;
              this.hisStatusLabels[i] = this.hisStatusList[i].labelValue;
              this.hisStatusColor[0].backgroundColor[i] = this.hisStatusList[i].colorValue;
            }
          }
          
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          //alert("No Record Found");
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  viewDeadlinewiseChart(){
    this.deadMonthStatusData[0].data = [];
    this.deadMonthStatusLabels = [];
    this.deadMonthStatusColor[0].backgroundColor = [];
    if(jQuery('#deadlineFromDateId').val() == null){
      this.deadlineFromDate = "";
    }
    else{
      this.deadlineFromDate = jQuery('#deadlineFromDateId').val();
    }
    if(jQuery('#deadlineToDateId').val() == null){
      this.deadlineToDate = "";
    }
    else{
      this.deadlineToDate = jQuery('#deadlineToDateId').val();
    }
    this.spinner.show();
    let json = {
      'empId': localStorage.getItem("empId"),
      'fromDate': this.deadlineFromDate,
      'toDate': this.deadlineToDate,
      'companyId': this.deadlineCompanyId,
      'salesPersonId': this.deadlineSalesPersonId
    }
      this.getDeadlinePieChartTimewise(json);
  }

  getDeadlinePieChartTimewise(json){
    this.spinner.show();
    
    this.ss.getDeadlinePieChartTimewise(json)
      .subscribe((response) => {
        if (response.responseCode == '100000') {
          this.deadMonthStatusList = response.wrappedList;
          if (this.deadMonthStatusList.length != 0) {
            for (var i = 0; i < this.deadMonthStatusList.length; i++) {
              this.deadMonthStatusData[0].data[i] = this.deadMonthStatusList[i].dataValue;
              this.deadMonthStatusLabels[i] = this.deadMonthStatusList[i].labelValue;
              this.deadMonthStatusColor[0].backgroundColor[i] = this.deadMonthStatusList[i].colorValue;
            }
          }
          
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          //alert("No Record Found");
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
          // jQuery('.loaderClass').hide();
        }
      )
  }

  onDeadlinewiseChartClick(timeType){
    let json = {
      "timeType": timeType,
      "empId": localStorage.getItem('empId'),
      "yearValue": this.deadYearValue,
      "halfYearValue": this.deadHalfYearValue,
      "quarterValue": this.deadQuarterValue,
      "monthValue": this.deadMonthValue
    }
    this.ss.exportDeadlinewiseReport(json);
  }
  onHistoricChartClick(){
    let json = {
     // "timeType": timeType,
      "empId": localStorage.getItem('empId'),
      "yearValue": this.hisYearValue,
      "halfYearValue": this.hisHalfYearValue,
      "quarterValue": this.hisQuarterValue,
      "monthValue": this.hisMonthValue
    }
  }
}

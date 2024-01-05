import { Injectable } from '@angular/core';
import {Http, RequestOptions,Response,Headers} from '@angular/http';
import { Constant } from './constant';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Dealer } from '../models/dealer.model';
import { LoginCreationModel } from '../models/loginCreation.model';
import { DraftQuotation } from '../models/draftQuotation.model';

@Injectable()
export class SharedService{

    private serviceEndPoint;
    constructor(private http: Http){
        this.serviceEndPoint = Constant.serverURL;
    }
    login(empId: string,pwd: string){
        let json = {
            "empId": empId,
            "empPassword": pwd
        }
       // console.log(JSON.stringify(json));
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        // headers.append("Access-Control-Allow-Credentials",'true');
        // headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'authenticateUser',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

    }

    downloadSkuFormat(){
        //window.open("http://fast.org.in/Overseas/SkuMaster/ExcelFormat/SkuMasterExcel.xls");
        window.open("http://164.52.220.66/Overseas/SkuMaster/ExcelFormat/SkuMasterExcel.xls");
    }

    downloadFormatQuotation(){
        window.open("http://164.52.220.66/Overseas/QuotationMaster/DownloadFormat/QuotationDownloadFormat.xlsx");
    }
    
    exportProjectStatusReport(json){
        window.open(this.serviceEndPoint + "exportProjectStatusReport?jsonData="+encodeURI(JSON.stringify(json)), "_blank");
    }

    exportTimewiseReport(json){
        window.open(this.serviceEndPoint + "exportTimewiseReport?jsonData="+encodeURI(JSON.stringify(json)), "_blank");
    }

    exportDeadlinewiseReport(json){
        window.open(this.serviceEndPoint + "exportDeadlinewiseReport?jsonData="+encodeURI(JSON.stringify(json)), "_blank");
    }

    downloadBudgetPdf(items,optionFieldModelList,isRefCol){
        let json = {
            "qId": items,
            "optionField": optionFieldModelList,
            "isRefCol": isRefCol
        };
        window.open(this.serviceEndPoint + "downloadBudgetPdfNew?jsonData="+encodeURI(JSON.stringify(json)), "_blank");
       // window.open(this.serviceEndPoint + "/downloadBudgetPdf?skuItems="+items, "_blank");
    //    return  this.http.get(this.serviceEndPoint+'downloadBudgetPdf?skuItems='+items)
    //     .map((response:Response) => response.json())
    //     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    
    }

    downloadDetailPdf(qId,comb){
        let json = {
            "qId": qId,
            "comb": comb,
            "empId": localStorage.getItem("empId")
        };
        window.open(this.serviceEndPoint + "downloadDetailPdfNew?jsonData="+encodeURI(JSON.stringify(json)), "_blank");
    }
    
    quotationExportToExcel(qId){
     
        window.open(this.serviceEndPoint + "exportQuotationNew?qId="+qId);
    }
    getDashBaordMenu(role: string){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'getDashboardMenu?roleId='+role)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getCountryList(){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        return this.http.get(this.serviceEndPoint+'getCountryMaster')
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getSkuData1(json: any){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.serviceEndPoint+'getSKuMasterData',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getSkuDetails(pageSize: number,pageNo: number){
        let json = {
            "pageNo": pageNo,
            "pageSize": pageSize
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.serviceEndPoint+'getSKuMasterDetails',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateSku(j: any, skuCol: string){
        let json = {
            "skuData" : j,
            "skuCol" : skuCol
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.serviceEndPoint+'updateSKuMasterData',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
       
    }
    deleteSku(skuId: any){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
       // let options = new RequestOptions({ headers:headers });
        
        return this.http.get(this.serviceEndPoint+'deleteSKuMasterData?skuId='+skuId)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteCreatedQuotation(qId: any){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
       // let options = new RequestOptions({ headers:headers });
        
        return this.http.get(this.serviceEndPoint+'deleteQuotation?qId='+qId)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getDealerDetails(pageSize: number,pageNo: number){
        let json = {
            "pageNo": pageNo,
            "pageSize": pageSize,
            "empId": localStorage.getItem("empId"),
            "role": localStorage.getItem("empRole")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.serviceEndPoint+'getDealerDetails',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDealerList(){
        let json = {
            "empId": localStorage.getItem("empId"),
            "role": localStorage.getItem("empRole")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.serviceEndPoint+'getDealerList',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    getDealerListForLogin(){
        let json = {
            "empId": localStorage.getItem("empId"),
            "role": localStorage.getItem("empRole")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.serviceEndPoint+'getDealerListForLogin',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getDealerQuotationDetails(dealerSkuCol: any){
        // let json = {
        //     "searchBy": searchBy,
        //     "searchProd": searchProd,
        //     "dealerSkuCol": dealerSkuCol
        // }
        let json = {
            "dealerSkuCol": dealerSkuCol
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        
        return this.http.post(this.serviceEndPoint+'getDealerQuotationSkuDetails',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    exportSku(){
        window.open(this.serviceEndPoint+"exportSkuMaster",'_blank');
    }
    exportDealer(){
        window.open(this.serviceEndPoint+"exportCreatedDealer",'_blank');
    }

    viewCreatedLogin(){
        let json = {
            "empId": localStorage.getItem("empId"),
            "role": localStorage.getItem("empRole")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getViewLogin',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    submitCreateLogin(lclist: LoginCreationModel[],compName,compAbbr){
        let json = {
            "lclist" : lclist,
            "companyName" : compName,
            "compAbbr" : compAbbr,
            "createdBy" : localStorage.getItem("empId")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'saveLoginCreation',JSON.stringify(json),options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateCreatedLogin(lc){
        let json = {
            "id" : lc.id,
            "emailId": lc.emailId,
            "userName" : lc.userName,
            "mobile" : lc.mobile,
            "address" : lc.address,
            "empAbbr" : lc.empAbbr
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'updateLoginCreation',JSON.stringify(json),options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteCreatedLogin(lcId){

        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        //let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'deleteLoginCreation?lcId='+lcId)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getFieldDetails(){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'getFiledConfigurationNew')
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getOptionalField(){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'getOptionalField')
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getTermsAndConditions(){
      //  console.log("terms1");
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'getTermsAndConditions')
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getConstantValues(){
       // console.log("terms1");
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'getConstantValues')
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDealerQuotationColumns(empId: string){
      //  console.log("EMpid"+ empId);
        let json = {
            "empId": empId
            }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDealerQuotationColumns',JSON.stringify(json),options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    saveDealer(dealer: Dealer){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'saveDealer',JSON.stringify(dealer),options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteDealer(json: any){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'deleteDealer',JSON.stringify(json),options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    saveLogoImage(fileName: File,id){
        const formData = new FormData();
        let f = fileName.name;
        formData.append('logoImage', fileName,f);    
        formData.append('dealerId',id);
        return this.http.post(this.serviceEndPoint+'saveDealerLogo',formData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveValidFieldConfig(arr,nextcombPosition){
        let json = {
            "fieldComb": arr,
            "combPosition": nextcombPosition,
            "empId": localStorage.getItem("empId")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'saveValidFieldConfig',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getSkuTableColumns(){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'getSkuMasterTableColumns')
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    uploadSku(fileName: File){
        const formData = new FormData();
        let f = fileName.name;
        formData.append('skuFile', fileName,f);    
        return this.http.post(this.serviceEndPoint+'uploadSkuFile',formData)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getFieldConfigComb(){
        var empId = localStorage.getItem("empId");
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.get(this.serviceEndPoint+'getAllFilledConfigurationComb?empId='+empId)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    activateFieldComb(comb: string){
        let json ={
            "empId": localStorage.getItem("empId"),
            "fieldComb": comb
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'activateEmpFieldComb',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteComb(comb: string){
        let json ={
            "empId": localStorage.getItem("empId"),
            "fieldComb": comb
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'deleteEmpFieldComb',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveDraftSelectedItems(selItems: any,quant: any, amt: any){
        let json ={
            "empId": localStorage.getItem("empId"),
            "quotationSelectedItem": selItems,
            "quantity": quant,
            "amount": amt
        }
        //console.log(JSON.stringify(json));
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'saveDraftSelectedItems',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    saveDraftSelectedItemsNew(json: DraftQuotation){
       // console.log(JSON.stringify(json));
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'saveDraftSelectedItemsNew',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDealerDraftQuotation(qId){
        let json ={
            "qId": qId,
            "empId": localStorage.getItem("empId")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDealerDraftQuotation',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    submitQuotation(json: any){
        
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'submitDealerQuotation',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getQuotationHistory(){
        let json ={
            "empId": localStorage.getItem("empId"),
            "roleId": localStorage.getItem("empRole")
        }
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getEmpQuotationHistory',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
    getProjectStatusReport(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getProjectStatusReport',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDefaultPieChartData(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDefaultPieChartData',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPieChartData(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDefaultPieChartData',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPieChartSaleswiseData(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDefaultPieChartSaleswiseData',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDefaultPieChartCategorywiseTimewise(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDefaultPieChartCategorywiseTimewise',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getHistoricPieChartTimewise(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getHistoricPieChartTimewise',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getDeadlinePieChartTimewise(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getDeadlinePieChartTimewise',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getCompanyNameWithSalesPerson(json){
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append("Access-Control-Allow-Origin", '*');
        let options = new RequestOptions({ headers:headers });
        return this.http.post(this.serviceEndPoint+'getCompanyNameWithSalesPerson',json,options)
        .map((response:Response) => response.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    exportProjectStatusSummaryReport(json){
        window.open(this.serviceEndPoint + "exportProjectStatusSummaryReport?jsonData="+encodeURI(JSON.stringify(json)), "_blank");
    }
}
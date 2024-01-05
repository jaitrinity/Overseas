import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { BulkUploadReturnModel } from '../models/returnBulkUpload.model';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: BulkUploadReturnModel[], excelFileName: string): void {
    
    //  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    //  console.log('worksheet',worksheet);
    //  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    //  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    //  this.saveAsExcelFile(excelBuffer, excelFileName);

     var result = ["Item 1", "Item 3"];
     const myJsonString = JSON.stringify(json);
     const blob = new Blob([myJsonString], {
       type: "application/vnd.ms-excel;charset=utf-8"
     });
     FileSaver.saveAs(blob, "Report.xls");
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
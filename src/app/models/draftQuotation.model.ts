import { QuotationItemDetail } from './quotationItemDetail.model';

export class DraftQuotation{
    qId: string;
    fromName: string;
    toName: string;
    issuedBy: string;
    projectStatus: string;
    quotationDeadline: string;
    contactNumber: string;
    currency: string;
    qIdDetList: QuotationItemDetail[];
    baseAmount: string;
    billingAmount: string;
    billingInfo: string;
    termConditionAuto: string;
    termConditionManual: string;
    empId: string;
    status: string;
    quotationDate: string;
    countryCode: string;
    fromDealerId: string;
    toDealerId: string;
}
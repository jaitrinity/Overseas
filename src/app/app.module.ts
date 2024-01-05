import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FieldConfigurationComponent } from './dashboard/field-configuration/field-configuration.component';
import { QuotationCreationComponent } from './dashboard/quotation-creation/quotation-creation.component';
import { ReportComponent } from './dashboard/report/report.component';
import { SkumasterViewComponent } from './dashboard/skumaster-view/skumaster-view.component';
import { DealerViewComponent } from './dashboard/dealer-view/dealer-view.component';
import { SharedService } from './shared/shared.service';
import { HttpModule } from '@angular/http';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ImageRenderComponent } from './image-render/image-render.component';
import { ExcelService } from './shared/excel.service';
import { CreateLoginComponent } from './dashboard/create-login/create-login.component';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FieldConfigurationComponent,
    QuotationCreationComponent,
    ReportComponent,
    SkumasterViewComponent,
    DealerViewComponent,
    CreateLoginComponent,
    //ImageRenderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SmartTableModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    FilterPipeModule,
    Ng2SearchPipeModule,
    ChartsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [SharedService,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }

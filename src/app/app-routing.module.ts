import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FieldConfigurationComponent } from './dashboard/field-configuration/field-configuration.component';
import { QuotationCreationComponent } from './dashboard/quotation-creation/quotation-creation.component';
import { ReportComponent } from './dashboard/report/report.component';
import { SkumasterViewComponent } from './dashboard/skumaster-view/skumaster-view.component';
import { DealerViewComponent } from './dashboard/dealer-view/dealer-view.component';
import { CreateLoginComponent } from './dashboard/create-login/create-login.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'skuMasterUpload',
        component: SkumasterViewComponent
      },
     
      {
        path: 'dealerCreation',
        component: DealerViewComponent
      },
      {
        path: 'fieldConfiguration',
        component: FieldConfigurationComponent
      },
      {
        path: 'quotationCreation',
        component: QuotationCreationComponent
      },
      {
        path: 'loginCreation',
        component: CreateLoginComponent
      },
      {
        path: '',
        redirectTo: '/dashboard/quotationCreation',
        pathMatch: 'full'
      },
     
      {
        path: 'reports',
        component: ReportComponent
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

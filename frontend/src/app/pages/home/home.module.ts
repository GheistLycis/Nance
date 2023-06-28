import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { HomeComponent } from './home.component';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { ComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [
    HomeComponent,
    AnalyticsComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    NgSelectModule,
    FormsModule,
    NgbNavModule,
    ComponentsModule
  ]
})
export class HomeModule { }

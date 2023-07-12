import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SavingsComponent } from './savings.component';
import { AddEditSavingComponent } from './components/add-edit-saving/add-edit-saving.component';
import { NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    SavingsComponent,
    AddEditSavingComponent,
  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    PipesModule,
  ]
})
export class SavingsModule { }

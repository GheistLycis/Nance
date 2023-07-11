import { Component, OnInit } from '@angular/core';
import { AddEditSavingComponent } from './components/add-edit-saving/add-edit-saving.component';
import SavingDTO from 'src/app/shared/DTOs/SavingDTO';
import { SavingService } from 'src/app/shared/services/saving/saving.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralWarningComponent } from 'src/app/shared/components/modals/general-warning/general-warning.component';
import { AnalyticsService } from 'src/app/shared/services/analytics/analytics.service';
import { MonthService } from 'src/app/shared/services/month/month.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent implements OnInit {
  savings: SavingDTO[] = []
  actualBalance: number = 1
  
  constructor(
    private savingService: SavingService,
    private monthService: MonthService,
    private analyticsService: AnalyticsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }
  
  ngOnInit(): void {
    this.monthService.list({}).pipe(
      switchMap(({ data }) => this.analyticsService.monthBalance(data[0].id)),
      tap(({ data }) => this.actualBalance = data.balance),
    ).subscribe()
    
    this.listSavings()
  }
  
  listSavings(): void {
    this.savingService.list().subscribe(({ data }) => this.savings = data)
  }
  
  addSaving(): void {
    const { result } = this.modalService.open(AddEditSavingComponent, { size: 'lg' })
    
    result.then((res: boolean) => {
      if(res) {
        this.toastr.success('Criado com sucesso!')
        
        this.listSavings()
      }
    })
  }
  
  editSaving(saving: SavingDTO): void {
    const { componentInstance, result } = this.modalService.open(AddEditSavingComponent, { size: 'lg' })
    
    componentInstance.saving = saving
    
    result.then((res: boolean) => {
      if(res) {
        this.toastr.success('Editado com sucesso!')
        
        this.listSavings()
      }
    })
  }
  
  deleteSaving({ id, title, amount, dueDate }: SavingDTO): void {
    const { componentInstance, result } = this.modalService.open(GeneralWarningComponent, { size: 'md' })
    
    componentInstance.title = 'Excluir caixinha'
    componentInstance.text = `
      Deseja realmente excluir a caixinha <b>${title} - R$${amount} ${dueDate ? '(' + dueDate.toString() + ')' : ''}</b>?`
    
    result.then((res: boolean) => res && 
      this.savingService.delete(id).subscribe(() => {
        this.toastr.success('Excluído com sucesso!')
        
        this.listSavings()
      })
    )
  }
  
  updateStatus(id: SavingDTO['id'], status: SavingDTO['status']): void {
    this.savingService.updateStatus(id, status).subscribe(() => {
      this.toastr.success('Atualizado com sucesso!')
      
      this.listSavings()
    })
  }
}
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, forkJoin } from 'rxjs';
import YearHistory from '@interfaces/YearHistory';
import { AnalyticsService } from '@services/analytics/analytics.service';
import { YearService } from '@services/year/year.service';
import { AddEditYearComponent } from './components/add-edit-year/add-edit-year.component';
import { ToastrService } from 'ngx-toastr';
import YearDTO from '@DTOs/year';
import { GeneralWarningComponent } from '@components/modals/general-warning/general-warning.component';


@Component({
  selector: 'app-years',
  templateUrl: './years.component.html',
  styleUrls: ['./years.component.scss']
})
export class YearsComponent implements OnInit {
  yearsHistories: YearHistory[] = []
  loading = false
  
  constructor(
    private yearService: YearService,
    private analyticsService: AnalyticsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }
  
  ngOnInit(): void {
    this.listHistories()
  }
  
  listHistories(): void {
    this.loading = true
    
    this.yearService.list().subscribe(({ data }) => {
      if(!data.length) {
        this.yearsHistories = []
        this.loading = false
      }
      else {
        const histories$ = data.map(({ id }) => this.analyticsService.yearHistory(id).pipe(
            map(({ data }) => data)
          ))
        
        forkJoin(histories$).subscribe(histories => {
          this.yearsHistories = histories
          this.loading = false
        })
      }
    })
  }
  
  addYear(): void {
    const { result } = this.modalService.open(AddEditYearComponent, { size: 'sm' })
    
    result.then((res: boolean) => {
      if(res) {
        this.toastr.success('Criado com sucesso!')
        
        this.listHistories()
      }
    })
  }
  
  editYear(year: YearDTO): void {
    const { componentInstance, result } = this.modalService.open(AddEditYearComponent, { size: 'sm' })
    
    componentInstance.year = year
    
    result.then((res: boolean) => {
      if(res) {
        this.toastr.success('Editado com sucesso!')
        
        this.listHistories()
      }
    })
  }
  
  deleteYear({ id, year }: YearDTO): void {
    const { componentInstance, result } = this.modalService.open(GeneralWarningComponent, { size: 'md' })
    
    componentInstance.title = 'Excluir ano'
    componentInstance.text = `
      Deseja realmente excluir o ano de ${year}? 
      <b>Tudo</b> que está registrado nele - registros, grupos, categorias e meses - será <b>perdido!</b>`
    
    result.then((res: boolean) => res && 
      this.yearService.delete(id).subscribe(() => {
        this.toastr.success('Excluído com sucesso!')
        
        this.listHistories()
      })
    )
  }
}

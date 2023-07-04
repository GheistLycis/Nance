import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import CategoryDTO from 'src/app/shared/DTOs/category';
import MonthDTO from 'src/app/shared/DTOs/month';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { GeneralWarningComponent } from 'src/app/shared/components/modals/general-warning/general-warning.component';
import { monthNames } from 'src/app/shared/enums/monthNames';
import { GroupsComponent } from './components/groups/groups.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Input() month!: MonthDTO
  categories: CategoryDTO[] = []
  
  constructor(
    private categoryService: CategoryService,
    private modalService: NgbModal,
    protected activeModal: NgbActiveModal,
    private toastr: ToastrService,
  ) { }
  
  ngOnInit(): void {
    this.listCategories()
  }
  
  listCategories(): void {
    this.categoryService.list({ month: this.month.id }).subscribe(({ data }) => this.categories = data)
  }
  
  addCategory(): void {
    const { componentInstance, result } = this.modalService.open(AddEditCategoryComponent, { size: 'md' })
    
    componentInstance.month = this.month
    
    result.then((res: boolean) => {
      if(res) {
        this.toastr.success('Criado com sucesso!')
        
        this.listCategories()
      }
    })
  }
  
  editCategory(category: CategoryDTO): void {
    const { componentInstance, result } = this.modalService.open(AddEditCategoryComponent, { size: 'lg' })
    
    componentInstance.category = category
    
    result.then((res: boolean) => {
      if(res) {
        this.toastr.success('Editado com sucesso!')
        
        this.listCategories()
      }
    })
  }
  
  deleteCategory({ month, name, id }: CategoryDTO): void {
    const { componentInstance, result } = this.modalService.open(GeneralWarningComponent, { size: 'md' })
    let monthName: string
    
    for(const m in monthNames) if(monthNames[m] == `${month.month}`) monthName = m
    
    componentInstance.title = 'Excluir categoria'
    componentInstance.text = `
      Deseja realmente excluir a categoria <b>${name}</b> de ${monthName}? Todos grupos e registros contidos nela serão <b>perdidos!</b>`
    
    result.then((res: boolean) => res && 
      this.categoryService.delete(id).subscribe(() => {
        this.toastr.success('Excluído com sucesso!')
        
        this.listCategories()
      })
    )
  }
  
  listGroups(category: CategoryDTO): void {
    this.modalService.open(GroupsComponent, { size: 'xl' }).componentInstance.category = category
  }
}
import { Component, inject, ViewChild } from "@angular/core";
import { CategoryService } from "../../services/category.service";
import { AuthService } from "../../services/auth.service";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalService } from "../../services/modal.service";
import { ICategory } from "../../interfaces";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { CategoryListComponent } from "../../components/categories/category-list/category-list.component";
import { CategoryFormComponent } from "../../components/categories/category-form/category-form.component";
import { RoleGuardDirective } from "../../directive/role-guard.directive";

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [
    LoaderComponent,
    ModalComponent,
    PaginationComponent,
    CategoryListComponent,
    CategoryFormComponent,
    RoleGuardDirective,
],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent {
  public authService: AuthService = inject(AuthService);
  public modalService: ModalService = inject(ModalService);
  public categoryService: CategoryService = inject(CategoryService);
  @ViewChild("addCategoryModal") public addCategoryModal: any;
  public fb: FormBuilder = inject(FormBuilder);

  categoryForm = this.fb.group({
    id: [""],
    name: ["", Validators.required],
    description: ["", Validators.required],
  });

  constructor() {
    this.categoryService.search.page = 1;
    this.categoryService.getAll();
    this.categoryService.getAll();
  }

  saveCategory(category: ICategory) {
    this.categoryService.save(category);
    this.modalService.closeAll();
  }

  callEdition(category: ICategory) {
    this.categoryForm.controls["id"].setValue(
      category.id ? JSON.stringify(category.id) : ""
    );
    this.categoryForm.controls["name"].setValue(
      category.name ? category.name : ""
    );
    this.categoryForm.controls["description"].setValue(
      category.description ? category.description : ""
    );

    this.modalService.displayModal("md", this.addCategoryModal);
  }

  updateCategory(category: ICategory) {
    this.categoryService.update(category);
    this.modalService.closeAll();
  }
}

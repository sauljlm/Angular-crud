
import { Component, inject, ViewChild } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { AuthService } from "../../services/auth.service";
import { IProduct } from "../../interfaces";
import { FormBuilder, Validators } from "@angular/forms";
import { LoaderComponent } from "../../components/loader/loader.component";
import { ModalComponent } from "../../components/modal/modal.component";
import { ProductFormComponent } from "../../components/products/product-form/product-form.component";
import { ProductListComponent } from "../../components/products/product-list/product-list.component";
import { ProductsService } from "./../../services/products.service";
import { CategoryService } from "../../services/category.service";
import { RoleGuardDirective } from "../../directive/role-guard.directive";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [
    ProductListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    ProductFormComponent,
    RoleGuardDirective,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  public productsService: ProductsService = inject(ProductsService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  public categoryService: CategoryService = inject(CategoryService);
  @ViewChild('addProductsModal') public addProductsModal: any;
  public fb: FormBuilder = inject(FormBuilder);

  productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0.01)]],
    stockQuantity: ['', [Validators.required, Validators.min(0)]],
    category: ['', Validators.required]
  });

  constructor() {
    this.productsService.search.page = 1;
    this.productsService.getAll();
    this.categoryService.getAll();
  }

  saveProduct(product: IProduct) {
    this.productsService.save(product);
    this.modalService.closeAll();
  }

  callEdition(product: IProduct) {
    this.productForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
    this.productForm.controls['name'].setValue(product.name ? product.name : '');
    this.productForm.controls['description'].setValue(product.description ? product.description : '');
    this.productForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
    this.productForm.controls['stockQuantity'].setValue(product.stockQuantity ? JSON.stringify(product.stockQuantity) : '');
    this.productForm.controls['category'].setValue(product.category.id ? JSON.stringify(product.category.id) : '');
    this.modalService.displayModal('md', this.addProductsModal);
  }

  updateProduct(product: IProduct) {
    this.productsService.update(product);
    this.modalService.closeAll();
  }
}
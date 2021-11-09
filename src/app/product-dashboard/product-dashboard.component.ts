import { Component, OnInit } from '@angular/core';
import { faUser, faDollarSign, faCandyCane, faTag, faCheck, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from './product-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.css']
})
export class ProductDashboardComponent implements OnInit {
  faUser = faUser;
  faDollarSign = faDollarSign;
  faCandyCane = faCandyCane;
  faTag = faTag;
  faCheck = faCheck;
  faShoppingBag = faShoppingBag;
  formValue !: FormGroup;
  productModelObj : ProductModel = new ProductModel();
  productData !: any;
  filterTable = '';
  constructor(private formbuilder: FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      nombre: [''],
      categoria: [''],
      sabor: [''],
      precio: [''],
      estado: ['']
    })
    this.getProducts();
  }
  clicAddProduct(){
    this.formValue.reset();    
  }

  postProductDetails(){
    this.productModelObj.nombre = this.formValue.value.nombre;
    this.productModelObj.categoria = this.formValue.value.categoria;
    this.productModelObj.sabor = this.formValue.value.sabor;
    this.productModelObj.precio = this.formValue.value.precio;

    this.api.postProduct(this.productModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Producto Registrado con Exito")
      let ref = document.getElementById("cerrar")
      ref?.click();
      this.formValue.reset();
      this.getProducts();
    },
    err=>{
      alert("Algo salio mal")
    })
  }

  getProducts(){
    this.api.getProduct()
    .subscribe(res=>{
      this.productData = res;
    })
  }

  delProduct(row : any){  
    if(confirm("¿Estas seguro de eliminar el producto "+row.nombre+"?")) {          
      this.api.deleteProduct(row.id)
      .subscribe(res=>{
        alert("Producto eliminado");
        this.getProducts();
      })
    }
  }

  onEdit(row : any){    
    this.productModelObj.id = row.id;
    this.formValue.controls['nombre'].setValue(row.nombre);
    this.formValue.controls['categoria'].setValue(row.categoria);
    this.formValue.controls['sabor'].setValue(row.sabor);
    this.formValue.controls['precio'].setValue(row.precio);
    this.formValue.controls['estado'].setValue(row.estado);
  }

  updateProductDetails(){
    this.productModelObj.nombre = this.formValue.value.nombre;
    this.productModelObj.categoria = this.formValue.value.categoria;
    this.productModelObj.sabor = this.formValue.value.sabor;
    this.productModelObj.precio = this.formValue.value.precio;
    this.productModelObj.estado = this.formValue.value.estado;

    this.api.updateProduct(this.productModelObj, this.productModelObj.id)
    .subscribe(res=>{
      alert("Datos Actualizados");
      let ref = document.getElementById("cerrarEdit")
      ref?.click();
      this.formValue.reset();
      this.getProducts();
    })
  }
}

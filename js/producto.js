//DECLARACIÓN DE CLASE PRODUCTO
class Producto {
    constructor(id, nombre, precio, imagen, cantidad) {
            this.id = parseInt(id);
            this.nombre = nombre;
            this.precio = parseFloat(precio);
            this.imagen = imagen;
            this.cantidad= 1;
   
    }
    agregarCantidad(valor){
        this.cantidad += valor; 
    }
    subtotal(){
        return this.cantidad * this.precio;
    }
}
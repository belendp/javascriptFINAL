//FUNCION PARA GENERAR LA INTERFAZ DE PRODUCTOS CON JQUERY
function productosUI(productos, id){
  $(id).empty();
  for (const producto of productos) {
     $(id).append(`<div class="card" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h4 class="card-title">${producto.nombre}</h4>
                      <p class="card-text">${producto.precio}</p>                     
                      <a href="#" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
                    </div>
                  </div>`);
  }
  $('.btn-compra').on("click", comprarProducto);


}


//MANEJADOR DE COMPRA DE PRODUCTOS
function comprarProducto(e){
  e.preventDefault();
  const idProducto = e.target.id;
  const seleccionado=carrito.find(producto => producto.id ==idProducto);

  $('.alert').alert()

  if (seleccionado == undefined) {
    carrito.push(productos.find(producto => producto.id == idProducto));
  }else{
seleccionado.agregarCantidad(1);
  }

  //localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  //GENERAR SALIDA PRODUCTOS
  carritoUI(carrito);
}

function carritoUI(productos){
  $('#carritoCantidad').html(productos.length);
  //VACIAR EL INTERIOR DEL CUERPO DEL CARRITO;
  $('#carritoProductos').empty();
  for (const producto of productos) {
    $('#carritoProductos').append(registroCarrito(producto));
  }
  $('.btn-delete').on('click', eliminarCarrito)
  $('.btn-add').on('click', agregarCarrito)
  $('.btn-sub').on('click', restarCarrito)
}


      
function registroCarrito(producto){
  return `<p> ${producto.nombre} 
          <span class="badge badge-warning">$ ${producto.precio}</span>
          <span class="badge badge-dark">${producto.cantidad}</span>
          <span class="badge badge-success">$ ${producto.subtotal()}</span> 
          <a id="${producto.id}" class="btn btn-info btn-add" >+</a>
          <a id="${producto.id}" class="btn btn-warning btn-sub" >-</a>
          <a id="${producto.id}" class="btn btn-danger btn-delete" >x</a>
          </p>`
  }

  function eliminarCarrito(event){
    console.log(event.target.id);
    event.stopPropagation();
    carrito = carrito.filter(producto => producto.id != event.target.id);
    carritoUI(carrito);
    localStorage.setItem('carrito', JSON.stringify(carrito));

  }

  function agregarCarrito(event){
    event.stopPropagation();
    let producto= carritoUI.find(p => p.id == event.target.id);
    producto.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = producto.cantidad;
  $(this).parent().children()[2].innerHTML = producto.subtotal();
    localStorage.setItem('carrito', JSON.stringify(carrito));

  }
      
  function restarCarrito(event){
    event.stopPropagation();
    let producto= carritoUI.find(p => p.id == event.target.id);
    if(producto.cantidad > 1){
      producto.agregarCantidad(-1);
      $(this).parent().children()[1].innerHTML = producto.cantidad;
    $(this).parent().children()[2].innerHTML = producto.subtotal(); 
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }

  }








function enviarCompra() {
  //Envio la info del carrito  transformada a JSON
  $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito),function(datos,estado) {
    console.log(estado);
    console.log(datos);
    ///consulto si operacion fue exitosa
    if(estado == "success"){
      //Vacio el carrito
      $('#carritoProductos').empty();
      //Vacio el numero de productos
      $('#carritoCantidad').html("0");
    }else{
      console.log('Los datos no han sido enviados correctamente');
    }    

  })  
}

function selectUI(lista, selector) {
  $(selector).empty();
  for (const categoria of lista) {
    $(selector).append(`<option>${categoria}</option>`);    
  }
  $(selector).prepend(`<option selected>CATEGORIAS</option>`);  
}

function buscarCategoria() {


//guardo en una variable el valor seleccionado en el select
  let valor=this.value;
  //oculto el div de productos con una animacion y agrego una funcion callback para hacer el filtro
  $("#productosContenedor").fadeOut(2000,function () {
    //si la categoria seleccionada es diferente a todos quiere decir que es una categoria existente
    if(valor != "CATEGORIAS"){
      //filtro por categoria
      let filtrados= productos.filter(producto => producto.categoria == valor);
      //genero la interfaz solo con los productos filtrados
      productosUI(filtrados,"#productosContenedor");
    }else{
      //si la categoria seleccionada es todos, genero la interfaz con todos los productos
      productosUI(productos,"#productosContenedor");
    }    
  }).fadeIn(2000);//endadeno una animacion para mostrar el resultado
  
}

let productosContenedor = document.getElementById("#productosContenedor");

const validarCarrito=()=>{
    let carritoCompras=[];
    if(localStorage.getItem("carrito")){
        carritoCompras=JSON.parse(localStorage.getItem("carrito"));
    }
    return carritoCompras;
}

let carritoCompras=validarCarrito();

function mostrarProductosCarrito(){
    
    for(producto of carritoCompras){
        cajaProductosSeleccionados.innerHTML+=`
            <div class="card col-md-3 m-3">
                <img src="../${e.img}" class="card-img-top">
                <div class="card-body">            
                    <div class="card-title">
                        <h3>${e.name}</h3>
                    </div>
                    <div class="card-tex">
                        <p>${e.description}</p>
                    </div>
                    <div class="card-title">
                        <h3>${e.precio}</h3>
                    </div>
                    <button href="#" class="btn btn-primary"  onclick="quitar('${e.id}')">Quitar</button>
                </div>
            </div>
        `
    }
}
 
mostrarProductosCarrito();
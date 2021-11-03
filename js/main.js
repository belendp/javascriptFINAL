$(window).on('load'), function () {
    $("#espera").remove();
    $('#productosContenedor').fadeIn(2000);
};

$('productosContenedor').hide();

//Utilizo una llamada asincrona para traer los datos desde un JSON
$.get("data/productos.json", function (datos, estado) {
    console.dir(datos);  
    console.log(estado);
    //Pregunto si el estado de la operacion fue exitoso
    if(estado == "success"){
        //Recorro el array respuesta y lo transformo a objetos de tipo "producto"
        
        for (const objeto of datos) {
            //Guardo los objetos "traducidos" en el array productos          
            productos.push( new Producto(objeto.id, objeto.nombre, objeto.precio, objeto.imagen, objeto.cantidad) );
        }  
        //GENERAR INTERFAZ DE PRODUCTOS CON UNA FUNCION
        productosUI(productos, '#productosContenedor');
    
        }else{
        console.log('Los datos no se cargaron correctamente');
    }  
});


$(document).ready(function (){
    if("carrito" in localStorage){
        const datos= JSON.parse(localStorage.getItem('carrito'));
    for (const objeto of datos) {
        //Guardo los objetos "traducidos" en el array productos          
        carrito.push( new Producto(objeto.id, objeto.nombre, objeto.precio, objeto.imagen, objeto.categoria, objeto.cantidad) );
    }  
    carritoUI(carrito);
}


});






//Manejo del metodo Toggle desde un boton
$("#boton1").on("click", function () {
    $("#ejemplo2").slideToggle(1500);
})
//encadenamiento de animaciones
$("#ejemplo").animate({fontSize: "30px", opacity: 0.4 },3000).delay(2000).fadeOut(2000);
//Funcion para crear la interfaz fel select de categorias
selectUI(categorias,"#selectCategoria");
//Asocio en evento change al select
$("#selectCategoria").on("change", buscarCategoria)
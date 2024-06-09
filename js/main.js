import esunCuil from "./validar-cuil.js";
import esMayorDeEdad from "./validar-edad.js";
import { tiposError, mensajes } from "./customError.js";

const camposFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");
formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //prevenir el comportamiento
    const listaRespuestas = {
        nombre:e.target.elements["nombre"].value,
        email:e.target.elements["email"].value,
        identificacion:e.target.elements["identificacion"].value,
        cuil:e.target.elements["cuil"].value,
        fecha_nacimiento:e.target.elements["fecha_nacimiento"].value,
    }
    //Convierte nuestro objeto a un formato json que va a poder ser almacenado en el almacenamiento local de nuestor navegador
    localStorage.setItem("registro", JSON.stringify(listaRespuestas))

    window.location.href = "./abrir-cuenta-form-2.html";
})


camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo))
    campo.addEventListener("invalid", event => event.preventDefault())
});

function verificarCampo(campo){
    let mensaje ="" ;
    campo.setCustomValidity("");

    if(campo.name =="cuil" && campo.value.length >= 11){
        esunCuil(campo)
    }
    if(campo.name == "fecha_nacimiento" && campo.value != ""){
        esMayorDeEdad(campo)
    }
    // console.log(campo.validity);
    tiposError.forEach(error=>{
        if(campo.validity[error]){
            mensaje = mensajes[campo.name][error]
            console.log(mensaje);mensaje-error
        }
    })
const mensajeError= campo.parentNode.querySelector('.mensaje-error')
const validarInputCheck= campo.checkValidity()
if(!validarInputCheck) {
    mensajeError.textContent = mensaje
}else{
    mensajeError.textContent = ""
}


}

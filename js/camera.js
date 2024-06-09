const btnCamara = document.querySelector('[data-video-boton]');
const video = document.querySelector('[data-video]');
const campoCamara = document.querySelector('[data-camera]');

const btnTomarFoto = document.querySelector('[data-tomar-foto]');
const mensaje = document.querySelector('[data-mensaje]');
const canvas = document.querySelector('[data-video-canvas]');
const btnEnviar = document.querySelector('[data-enviar]');
let imgUrl ="";

btnCamara.addEventListener("click", async () => {
    const inicarVideo = await navigator.mediaDevices.getUserMedia({
        video:true,
        audio:false});

    btnCamara.style.display = "none";
    campoCamara.style.display = "block";
    video.srcObject = inicarVideo;
})

btnTomarFoto.addEventListener("click", ()=> {
     canvas.getContext("2d").drawImage(video,0,0,canvas.width, canvas.height);
    imgUrl = canvas.toDataURL("image/jpeg");
    //mostrar  y ocultar
    campoCamara.style.display = "none";
    mensaje.style.display = "block";

})

btnEnviar.addEventListener("click", ()=>{
    const recibirDatos = localStorage.getItem("registro");
    const convertirDatos = JSON.parse(recibirDatos);
    
    convertirDatos.img_URL= imgUrl;

    localStorage.setItem("registro", JSON .stringify(convertirDatos))

    window.location.href = "./abrir-cuenta-form-3.html";
})
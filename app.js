const upload = document.getElementById("upload")
const img = document.images[0]
const container =document.querySelector(".container")
const blur = document.getElementById("blur");
const saturate = document.getElementById("saturate");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const sepia = document.getElementById("sepia");
const grayscale = document.getElementById("grayscale");
const hue_rotate = document.getElementById("hue-rotate");
const invert = document.getElementById("invert");

const reset = document.getElementById("reset");
const download = document.getElementById("download");
download.style.display = "none"
reset.style.display = "none"
const ranges = document.querySelectorAll('input[type=range')
let canvas = document.getElementById("canvas")

let ctx = canvas.getContext('2d')

function resetDefault() {
    ctx.filter="none"
    blur.value = 0;
    saturate.value = 100;
    brightness.value =1
    contrast.value = 100
    sepia.value =0
    grayscale.value =0
    hue_rotate.value =0
    invert.value = 0;
    ctx.drawImage(img,0,0,canvas.width,canvas.height)
}

upload.onchange = () => {
    download.style.display = "block"
reset.style.display = "block"
    resetDefault()
    let file =new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = () => {
        img.src = file.result;
    }
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
    }
    img.style.display = 'none'
}

ranges.forEach(e => {
    e.addEventListener('input', () => {
        ctx.filter = `
        blur(${blur.value}px)
        saturate(${saturate.value}%)
        brightness(${brightness.value})
        contrast(${contrast.value}%)
        sepia(${sepia.value})
        grayscale(${grayscale.value})
        hue-rotate(${hue_rotate.value}deg)
        invert(${invert.value})
        `
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
    })
})

download.onclick = () => {
    download.href = canvas.toDataURL('image/jpeg')
}

reset.onclick = () => {
    resetDefault()
}
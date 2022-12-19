const img = document.getElementById("img-upload");
const canvas = document.getElementById("canvas");
const upload = document.getElementById("upload");

const Saturate = document.getElementById("Saturate");
const Contrast = document.getElementById("Contrast");
const Brightness = document.getElementById("Brightness");
const Sepia = document.getElementById("Sepia");
const GrayScale = document.getElementById("GrayScale");
const Blur = document.getElementById("Blur");
const hue_rotate = document.getElementById("hue-rotate");
const range = document.querySelectorAll("input[type='range']")
const download = document.getElementById("download");
const reset = document.getElementById("reset");

const ctx = canvas.getContext('2d');


window.onload = () => {
    download.style.display ="none"
    reset.style.display ="none"
}
function resetValue() {
        ctx.filter = "none"
        Saturate.value = 100
        Contrast.value =100
        Brightness.value =100
        Sepia.value =0
        GrayScale.value=0
        Blur.value =0
        hue_rotate.value=0
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}
upload.onchange = () => {
    resetValue()

    download.style.display = "block";
    reset.style.display = "block";
    let file = new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload = () => {
        img.src = file.result;
    }
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display='none'
    }
}
range.forEach(e => {
    e.addEventListener('input',function(){
        ctx.filter = 
        `saturate(${Saturate.value}%)
        contrast(${Contrast.value}%)
        brightness(${Brightness.value}%)
        sepia(${Sepia.value}%)
        grayscale(${GrayScale.value})
        blur(${Blur.value}px)
        hue-rotate(${hue_rotate.value}deg)
        `
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    })
})

reset.onclick = resetValue;

download.addEventListener('click', () => {
    download.href = canvas.toDataURL('image/jpeg')
})
fetch('https://picsum.photos/')
.then(response => response.json())
.then(data => {
    var div = document.createElement('div');

    div.innerHTML = '';

    for (var prop in data) {
       console.log(data[prop]);
       div.innerHTML +=
        '<span style="display:inline;"><img src="'+data[prop]+'"></span>';
    }
    document.getElementById('picsum').appendChild(div);
})
.catch(error => console.error(error))


const lightbox = document.createElement('div')
lightbox.id='lightbox'
document.body.appendChild(lightbox)
const images = document.querySelectorAll('img')
images.forEach(image=>{
    image.addEventListener('click',e=>{
    lightbox.classList.add('active')
    const img=document.createElement('img')
    img.src=image.src
    while(lightbox.firstChild){
        lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
    })
})

lightbox.addEventListener('click',e=>{
    if (e.target !==e.currentTarget) return
    lightbox.classList.remove('active')
})


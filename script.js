fetch('https://picsum.photos/v2/list?page=1&limit=6')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var div = document.createElement('div');

        div.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].download_url);
            div.innerHTML += '<span style="display:inline;"><img data-id="' + i + '" src="' + data[i].download_url + '"></span>';
        }

        // div.innerHTML += '<span style="display:inline;"><img src="' + data + '"></span>';
        document.getElementById('picsum').appendChild(div);
    })
    .then(() => {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';

        const nextBtn = document.createElement('button')
        nextBtn.innerHTML = ">"
        nextBtn.classList.add('next-btn')
        lightbox.appendChild(nextBtn)

        // Create previous button
        const prevBtn= document.createElement('button')
        prevBtn.innerHTML = "<"
        prevBtn.classList.add("prev-btn")
        lightbox.appendChild(prevBtn)

        document.body.appendChild(lightbox);
        const images = document.querySelectorAll('img');
        images.forEach((image, idx) => {
            image.addEventListener('click', e => {
                console.log(e)
                lightbox.classList.add('active');
                const img = document.createElement('img');
                img.src = image.src;
                img.id=e.target.dataset.id
                while (lightbox.firstChild) {
                    lightbox.removeChild(lightbox.firstChild);
                }

                if(images.length-1>idx) {
                    lightbox.appendChild(nextBtn)
                }

                // Append 'prev' button to lightbox 

                if(idx>0) {
                    lightbox.appendChild(prevBtn)
                }

                lightbox.appendChild(img);
            });
        });

        lightbox.addEventListener('click', e => {
            if (e.target !== e.currentTarget) return;
            lightbox.classList.remove('active');
        });

        nextBtn.addEventListener('click', e => {
            let currentImg = document.querySelector('#lightbox img')
            let images = document.querySelectorAll('img');

            let currentIdx= currentImg.id
            let nextId = parseInt(currentIdx) + 1
            console.log(currentIdx)
            console.log(nextId)

    
            if (nextId >= images.length) {
                nextId = 0
            }

            if(nextId>0) {
                lightbox.appendChild(prevBtn)
            }

            if(nextId==images.length-1) {
                lightbox.removeChild(nextBtn)
            }

            console.log(images)
            console.log(images[nextId])
            // console.log(images[nextId].currentSrc)
            currentImg.setAttribute('src', images[nextId].getAttribute("src"))
            currentImg.setAttribute('id', nextId)

            // img = document.createElement("img");
            // img.setAttribute("src", currentImg[i].getAttribute("href"));
            // lightbox.appendChild(img);

            // while (lightbox.firstChild) {
            //     lightbox.removeChild(lightbox.firstChild);
            // }
        
        });

        prevBtn.addEventListener('click',e =>{
            let currentImg = document.querySelector('#lightbox img')
            console.log(currentImg.id)

            let images = document.querySelectorAll('img');

            let currentIdx= currentImg.id
            let prevId = parseInt(currentIdx) - 1
            console.log(currentIdx)
            console.log(prevId)

    
            if (prevId >= images.length) {
                prevId = 0
            }

            if(prevId==0) {
                lightbox.removeChild(prevBtn)
            }

            console.log(images)
            console.log(images[prevId])
            // console.log(images[nextId].currentSrc)
            currentImg.setAttribute('src', images[prevId].getAttribute("src"))
            currentImg.setAttribute('id', prevId)

            //while (lightbox.firstChild) {
            //    lightbox.removeChild(lightbox.firstChild);
            //}
           
        })

       
    })
    .catch(error => console.error(error));




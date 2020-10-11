
const requestUrl = 'https://www.reddit.com/search.json?q=kittens+nsfw:no'
const slideshow = document.querySelector('#slideshow')
let i = 0
const imgArray = []
let slides

createSlideShow = () => {
fetch(requestUrl)
.then((responseData) => {
    return responseData.json()
})
.then((jsonData) => {
// console.log(jsonData.data.children)
    const dataChildren = jsonData.data.children
//  console.log(dataChildren)
    getImages(dataChildren)
    showSlides()

})
.catch((err) => {
    console.log('ERROR',err)
})

}

const stopSlideShow = () => {
    clearTimeout(slides)
    description.innerText = 'New Search'
    description.classList.remove('display-none')
    form.classList.remove('display-none')
}

// set up the query images and put them in an array
// I'm not sure this is necessary, but so far it's helpful
    const getImages = (dataChildren) => {
        for(let i = 0; i < dataChildren.length; i++) {
            // console.log(dataChildren[i])
            // so many broken images - this only gives me 3 though // but if I use innerHTML it does go through all
            if(dataChildren[i].data.url.endsWith('.jpg') || dataChildren[i].data.url.endsWith('.png')) {
                // let img = document.createElement('img')
                // img.setAttribute('id',`img${i}`)
                // img.setAttribute('src',dataChildren[i].data.url)
                let img = dataChildren[i].data.url
                // img.classList.add('display-none')
                imgArray.push(img)
            }
            // slideshow.appendChild(img)
            
            //dataChildren[i].data.url.style.display = 'none'
        }
        return(imgArray)
    }

// Need to briefly display each image in the array, but then clear it before the next one comes though
    const showSlides = () => {
        // this goes straight to the last image, but the rest are all still in the elements
        // so the setTimeout needs to be somewhere in here
        // for (let i=0; i<imgArray.length; i++) {
            // This is still going through everything too fast
            // setTimeout(()=>{
            //    if(i>0) document.querySelector (`#img${i - 1}`).classList.add('display-none')
            //     slideshow.appendChild(imgArray[i])
            //     document.querySelector(`#img${i}`).classList.remove('display-none')

            // while (i < imgArray.length) {
                slideshow.innerHTML = 
                `<div>
                    <img src='${imgArray[i]}'>
                </div>`
                i++
                if (i>imgArray.length) {i=0}
            // }
            slides = setTimeout(showSlides,2000)
        //    }, 2000)
        // }
    }

document.addEventListener('DOMContentLoaded',()=>{
    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        title.classList.add('display-none')
        description.classList.add('display-none')
        form.classList.add('display-none')
        const stop = document.createElement('button')
        stop.innerText = 'stop slideshow'
        document.querySelector('#stop-container').appendChild(stop)
        // slideshow.appendChild(stop)
        // document.querySelector('#stop-container').innerHTML=`<button id="stop-button">stop slideshow</button>`
        // document.querySelector('#stop-button').addEventListener('mouseup',console.log('click!'))
        stop.addEventListener('click',stopSlideShow)
        createSlideShow()
    })
})
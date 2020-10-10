
const requestUrl = 'https://www.reddit.com/search.json?q=kittens'

createSlideShow = () => {
fetch(requestUrl)
.then((responseData) => {
    return responseData.json()
})
.then((jsonData) => {
    // console.log(jsonData.data.children)
    const dataChildren = jsonData.data.children
//    console.log(dataChildren)
    let slideIndex = 0
    getImages(dataChildren)
    // let slideshow = document.querySelector('#slideshow')
    // slideshow.innerHTML=`<button>stop</button>`
})
.catch((err) => {
    console.log('ERROR',err)
})

}
    const getImages = (dataChildren) => {
        let slideshow = document.querySelector('#slideshow')
        for(let i = 0; i < dataChildren.length; i++) {
            console.log(dataChildren[i])
            slideshow.innerHTML = `<div>
            <img src= ${dataChildren[i].data.url}>
            </div>`
            // dataChildren[i].data.url.style.display = 'none'
        }
    //     slideIndex++
    //     if (slideIndex > dataChildren.length) {slideIndex = 1}
    //     dataChildren[slideIndex-1].style.display = 'block'
    //     setTimeout(getImages, 2000)
    }

document.addEventListener('DOMContentLoaded',()=>{
    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        title.classList.add('display-none')
        description.classList.add('display-none')
        form.classList.add('display-none')
        createSlideShow()
    })
})
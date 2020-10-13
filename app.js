const requestUrl = "https://www.reddit.com/search.json?q="
let container = document.querySelector('#container')
let stopBtn = document.querySelector('#stop-button')
var interval


//fetch the images from reddit
const fetchImages = () => {
    fetch(requestUrl+input.value+`+nsfw:no`)
    //return the data in json format
    .then((responseData)=>{
        return responseData.json()
    })
    //console.log the children of the returned json data
    .then((jsonData)=>{
        //get the array of children so you can loop through it using map function
        let children = jsonData.data.children
        // console.log("jsonData:", children)
        //map will give a new array of pics
        const thumbPics = children.map((child)=>{
           return child.data.thumbnail
        })
        for (let i = 0; i<thumbPics.length; i++) {
            if (!thumbPics[i].includes('jpg')) {
                thumbPics.splice(i, 1)
            }
        }
        //create an image tag for each search result
        console.log(thumbPics)
        thumbPics.forEach(createImg)
        //begin the slideshow once all image tags are created
        const slideshow = () => { 
            let allPics = document.querySelectorAll('img')
            let i = 0 
            interval = setInterval(() => {
                if(container.firstChild){
                    container.removeChild(container.firstChild)
                }
                allPics[i].classList.remove('hidden');
                console.log(allPics[i])
                i++
            }, 2000)
        }
        slideshow()
        const reset = () => {
            clearInterval(interval)
            console.log('STOP BUTTON WAS CLICKED')
            stopBtn.setAttribute('class','hidden')
            form.setAttribute('class','')
            form.reset()
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
        stopBtn.addEventListener('click', reset)
    })    
    .catch((error)=>{
        console.log("oh no, there's been an error!", error)
    })
}

const createImg = (imageURL)=>{
    let pic = document.createElement('img')
    //set pic source
    pic.setAttribute("src", imageURL)
    container.appendChild(pic)
    pic.classList.add('hidden')
    pic.style.width = '250px'
    pic.style.height = '250px'
}

document.addEventListener("DOMContentLoaded",() => {
    form.addEventListener("submit", (event)=>{
        console.log('SEARCH BUTTON WAS CLICKED')
        event.preventDefault()
        fetchImages()
        form.classList.add('hidden')
        stopBtn.setAttribute('class','')
    })
})

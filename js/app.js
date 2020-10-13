const requestUrl = 'http://www.reddit.com/search.json?q='
const images = []

const hideElements = () => {
    title.style.display = 'none'
    description.style.display = 'none'
    form.style.display = 'none'
}

const fetchRequest = (fetchUrl) => {
    console.log(requestUrl+input.value)
    fetch(fetchUrl+input.value+'+nsfw:no')
    .then((response)=>{
        console.log(response)
        return response.json()
    })
    .then((json)=>{
        let fetchData = json.data.children
        console.log('jsonData:', fetchData, json.data.children[0].data.thumbnail)
        fetchData.forEach((data)=>{
            if(data.data.thumbnail !== 'self') {
                images.push(data.data.thumbnail)
            }})
        appendImagesToSlideShow()
    })
    .catch((e)=>{
        console.log('There was an error:', e)
    })
}

const appendImagesToSlideShow = () => {
    const img = document.createElement('img')
    slideShow.appendChild(img)
    img.src = images[0]
    let i = 1
    console.log(images)

    setInterval(()=>{
        // if(i < images.length) {
        //     img.src = images[i]
        //     console.log(i)
        //     i += 1
        // } else if(i >= images.length) {
        //     img.src = images[0]
        //     let i = 1;
        //     console.log(i)
        // }
        if (i >= images.length) {
            img.src = images[0]
            i = 1
            console.log(i)
        } else if (i < images.length) {
            img.src = images[i]
            console.log(i)
            i++
        }
    },1000)

    //console.log('ended')

    // for(let i = 0; i < images.length; i++) {
    //     setInterval(()=> {
    //         img.src = images[i]
    //         console.log(images[i])
    //     }, 1500)
    // }
    
}

document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        hideElements()
        console.log('linked!')
        fetchRequest(requestUrl)
    })  
})
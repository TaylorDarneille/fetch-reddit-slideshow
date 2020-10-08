const requestUrl = "https://www.reddit.com/search.json?q="


//fetch the images from reddit
const fetchImages = () => {
    fetch(requestUrl+input.value+`+nsfw:no`)
    //return the data in json format
    .then((responseData)=>{
        // console.log("responseData:", responseData)
        return responseData.json()
    })
    //console.log the children of the returned json data
    .then((jsonData)=>{
        //get the array of children so you can loop through it using map function
        let children = jsonData.data.children
        console.log("jsonData:", children)
        //map will give a new array of pics
        const thumbPics = children.map((child)=>{
            return child.data.thumbnail
        })
        console.log(thumbPics)
        //for each item in the array create a new img tag and append to the container
        thumbPics.forEach((imageURL)=>{
            setInterval(() => {
                let container = document.querySelector('#container')
                let pic = document.createElement('img')
                //set pic source
                pic.setAttribute("src", imageURL)
                container.appendChild(pic)
            }, 2500)
        })
        
    })
    .catch((error)=>{
        console.log("oh no, there's been an error!", error)
    })
}

//append image function
// const addImage = 

document.addEventListener("DOMContentLoaded",() => {
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        fetchImages()
        // form.classList.add('hidden')
    })
})
const requestUrl = "https://www.reddit.com/search.json?q="
let container = document.querySelector('#container')


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
        thumbPics.forEach(createImg)        
        slideshow()
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
}

const slideshow = ()=>{
    let allPics = document.querySelectorAll('img')
    // console.log(allPics)
    let i = 0, time = 2000;
    
    setInterval(() => {
        if(container.firstChild){
            container.removeChild(container.firstChild)
        }
        allPics[i].classList.remove('hidden');
        //Go over each slide incrementing the index
        i++;
    }, time);
}



//append image function
// const addImage = (imageURL)=>{
//     let pic = document.createElement('img')
//     //set pic source
//     pic.setAttribute("src", imageURL)
//     container.appendChild(pic)
//     pic.classList.add('hidden') 
//     setInterval((pic) => {
//         pic.classList.remove('hidden') 
//         //go to the next index in the array
//         pic++
//         //create a function to stop and repopulate search field if the stop button is clicked
//     }, 3000)
// }

document.addEventListener("DOMContentLoaded",() => {
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        fetchImages()
        // form.classList.add('hidden')
    })
})
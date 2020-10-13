const requestURL = "http://www.reddit.com/search.json?q=+nsfw:no+"
const container = document.querySelector(".container")
const slideShowContainer = document.querySelector(".slideshow")
const refreshButton = document.querySelector(".refresh")
container.style.display = "block"
slideShowContainer.style.display = "none"
const slide = document.querySelector("#slide")
let index =0;
let mySlides;





document.addEventListener("DOMContentLoaded", ()=>{
    startSlides()
})

const startSlides = ()=>{
    clickGo()
    clickRestart()
    
}
const clickGo =()=>{
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        //clear the container when input is given
        container.style.display = "none";
        slideShowContainer.style.display= "block"
        console.log("user input is:", input.value)
        fetchPicture()
    })
}

const clickRestart =()=>{
    refreshButton.addEventListener("click", (event)=>{
        event.preventDefault()
        input.value = ""
        //clear the container when input is given
        window.clearInterval(mySlides)
        getPhoto(undefined)
        container.style.display = "block";
        slideShowContainer.style.display= "none"
        index=0;
        console.log("this is supposed to refresh")
    })
}
const fetchPicture =()=> {
    fetch(requestURL+input.value)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        const children =jsonData.data.children
        const thumbNailArray = children.map(child => child.data.thumbnail).filter(thumbnail => thumbnail.includes("https"))
        mySlides = window.setInterval(moveSlides, 2000, thumbNailArray)
        console.log(jsonData)
        // children.forEach(getPhoto)
        console.log(jsonData)
    })
    .catch((err)=>{
        console.log("error:", err)
    })
}

//make slideshow that goes through all pics
const moveSlides =(thumbNailsArray) =>{
    getPhoto(thumbNailsArray[index])
    if (index< thumbNailsArray.length-1){
        index++
    } else {
        index =0;
    }
}

//makes the child link into the src for each image in the slides
const getPhoto = (child)=>{
        slide.setAttribute("src", child)
}




//make stop button with event listener that brings back to search bar
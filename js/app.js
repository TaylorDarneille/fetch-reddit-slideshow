const requestURL = "http://www.reddit.com/search.json?q=nsfw:no+"
const container = document.querySelector(".container")
const slideShowContainer = document.querySelector(".slideshow")





document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
        container.style.display = "none"
        console.log("user input is:", input.value)
        fetchPicture()
    })


const fetchPicture =()=> {
    fetch(requestURL+input.value)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        const children =jsonData.data.children
        const thumbNails = children.map(child => child.data.thumbnail).filter(thumbnail => thumbnail.includes("http"))
        console.log(thumbNails)
        // thumbNails.setInterval()
        console.log(jsonData)
        children.forEach(getPhoto)
        console.log(jsonData)
    })
    .catch((err)=>{
        console.log("error:", err)
    })
}
})

// const buttonClick = () =>{
    //picture slideshow starts
// }
const getPhoto = (child)=>{
    let pic = document.createElement("img")
        pic.setAttribute("src", child.data.thumbnail)
        slideShowContainer.appendChild(pic)
        console.log("this is" +pic)
}

//clear the container when input is given
//make slideshow that goes through all pics
//make stop button with event listener that brings back to search bar
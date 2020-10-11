const requestURL = "http://www.reddit.com/search.json?q=nsfw:no+"
const conatainer = document.querySelector(".container")



document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit", (event)=>{
        event.preventDefault()
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
        conatainer.appendChild(pic)
        console.log(pic)
    return child.data.thumbnail
}
const requestURL = "http://www.reddit.com/search.json?q=cats+nsfw:no"


   

document.addEventListener("DOMContentLoaded", ()=>{
    fetch(requestURL+input.value)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        let pic = document.createElement("img")
        const children =jsonData.data.children
        children.forEach((child)=>{
            getPhoto(child)
        })
        console.log(jsonData)
    })
    .catch((err)=>{
        console.log("error:", err)
    })
    const fetching = () =>{
        fetch(requestURL+input.value)
    }
})

// const buttonClick = () =>{

// }
const getPhoto = (child)=>{
  console.log(child.data.thumbnail)
}


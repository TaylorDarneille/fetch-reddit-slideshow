
let img = document.querySelector("img")
let images = []
let body = document.querySelector("body")
let container = document.querySelector(".container")
let l = 0

slideshow = () =>{
let imgs = document.querySelectorAll(".img")
imgs.forEach((i)=>{
    l++
    setTimeout(()=>{
        console.log(l)
        i.style.display = "inline-block"
    },1000 * l)
    setTimeout(()=>{
        i.style.display = "none"
    },(1000 * l) + 1000 )
  }) 
}







document.addEventListener("DOMContentLoaded",()=>{
    form.addEventListener("submit",(event) => {
        const requestUrl = `https://www.reddit.com/search.json?q=${input.value}+nsfw:no`
            event.preventDefault()
            fetch(requestUrl)
            
            console.log(requestUrl)
            .then((responseData)=>{
                return responseData.json()
            })
            .then((jsonData)=>{
                    let children = jsonData.data.children
                    children.forEach((child)=>{
                    let photo = child.data.thumbnail
                    images.push(photo)
                    let image = document.createElement("img")
                    image.src = `${photo}`
                    image.classList.add("img")
                    container.insertBefore(image, container.children[2])
                    image.style.display = "none"
                })
                slideshow()
            })
            .catch((err)=>{
            console.log("error:",err)
            })
        })
    const fetching = () =>{
        fetch(requestUrl+input.value)
    }  
    
})


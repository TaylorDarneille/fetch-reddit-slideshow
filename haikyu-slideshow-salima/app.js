// declaring the variables for request url and subreddit 
const requestUrl = "https://www.reddit.com/search.json?q="
const subreddit = "+subreddit:haikyuu+nsfw:no"
let counter = -1

// declaring functions

// new titles
const addLayout = () => {
    let title = document.createElement("h1")
    title.innerHTML = "the star of the court"
    container.appendChild(title)
}

// add image 
const addImage = (redditpic) => {
    let imageBox = document.createElement("div")
    container.appendChild(imageBox)
    let image = document.createElement("img")
    image.setAttribute("src", redditpic)
    imageBox.appendChild(image)
}

// add reddit link
const addRedditLink = (redditlink) => {
    // source.innerText = "<a href=" + redditlink + ">see full post here</a>"
    let source = document.createElement("div")
    container.appendChild(source)
    let link = document.createElement("a")
    link.setAttribute("href", redditlink)
    link.setAttribute("target", "_blank")
    source.appendChild(link)
    link.innerText = "see full post"
    console.log(link.innerText)
}

const addClear = () => {
    let
}

// clear page 
const clear = () =>{ 
    const container = document.getElementById("container")
    while (container.firstChild) {
        container.removeChild(container.lastChild)
    }
}

// AJAX function
const fetchPlayer = (keyword) => {

    fetch(requestUrl+keyword+subreddit)

    .then((responseData)=>{
        return responseData.json()
    })

    .then((jsonData)=>{
        console.log("jsonData image:", jsonData.data.children[0].data.url)
        console.log("https://www.reddit.com" + jsonData.data.children[0].data.permalink)
        let children = jsonData.data.children // this is the array of children

        console.log(children)
        // give a new array of images
        const images = children.map((child)=>{
            return child.data.url
        })
        console.log(images)

        const permalinks = children.map((child)=>{
            return child.data.permalink
        })
        console.log(permalinks)

        //let redditpic = jsonData.data.children[0].data.url
        let redditlink = "https://www.reddit.com" + jsonData.data.children[0].data.permalink
        // setInterval(addImage(), 5000) // run the addImage function every 5 seconds
        // setInterval(addRedditLink(), 5000)

        const slideshow = () => {
            ++counter
            if (counter >= images.length) {
                counter = 0
            }
            clear()
            addLayout()
            addImage(images[counter])
            addRedditLink(permalinks[counter])
            console.log(images[counter])
        }

        const interval = setInterval(slideshow, 3000)

        clear()
        slideshow()
        // images.map(addImage)
        console.log(images.length)
        // images.forEach(addImage)
        //permalinks.forEach(addRedditLink)

        //addImage(redditpic)
        //addRedditLink(redditlink)

    })

    .catch((err)=>{
        console.log("time out! check this error: ", err)
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        console.log("fetch me my boy", input.value)
        fetchPlayer(input.value)
    })
})

// 10/09 -- get link to popular
// 10/09 -- forEach is working -- pulling all images and links 
// 10/09 -- how to make sure the only items pulled are images?
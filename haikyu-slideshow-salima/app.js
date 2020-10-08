const requestUrl = "https://www.reddit.com/search.json?q="
const subreddit = "+subreddit:haikyuu+nsfw:no"
let imgarray = []

const addImage = (jsonImg) => {
    let image = document.createElement("img")
    image.setAttribute("src", jsonImg)
    imageBox.appendChild(image)
}

const fetchPlayer = () => {

    fetch(requestUrl+input.value+subreddit)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        console.log("jsonData image:", jsonData.data.children[0].data.url)
        let redditpic = jsonData.data.children[0].data.url
        // redditpic.forEach(addImage)
        addImage(redditpic)
    })
    .catch((err)=>{
        console.log("time out! check this error: ", err)
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        console.log("fetch me my boy", input.value)
        fetchPlayer()
    })
})
const fetchReddit = (topic) => {
    const requestUrl = 'https://www.reddit.com/search.json?q='
    fetch(requestUrl+topic) 
    .then((responseData)=>{
        return responseData.json();
    })
    .then((jsonData)=>{
        console.log("Here is the data:", jsonData);
        // let picUrl = jsonData.data.children[Math.floor(Math.random() * 25)].data.thumbnail
        slideshow(jsonData)
    })
    // .catch((error)=>{
    //     slideshow(jsonData)
    // })
}



const slideshow = (picUrl) => {

    loading.style.visibility = 'hidden'


    let show = setInterval(()=>{

        document.querySelector('button').style.visibility = 'visible'

        
        let index = Math.floor(Math.random() * 25)
        console.log(index)
        let pic = picUrl.data.children[index].data.thumbnail
        if (pic.includes('.jpg')) {
            if (document.querySelector('img') !== null){
                document.querySelector('img').remove()
            }
            let picFrame = document.createElement('img')
            document.querySelector('body').appendChild(picFrame)
            picFrame.setAttribute('src', pic)
        }
        
    }, 1000)

    document.querySelector('button').addEventListener('click', () => {
        clearInterval(show)
        document.querySelector('button').style.visibility = 'hidden'
        form.style.visibility = "visible"
        title.style.visibility = "visible"
        instructions.style.visibility = "visible"

        input.value = ""

        document.querySelector('img').remove()

    })
}



form.addEventListener("submit", (event)=> {
    form.style.visibility = "hidden"
    title.style.visibility = "hidden"
    instructions.style.visibility = "hidden"
    loading.style.visibility = 'visible'
    

    fetchReddit(input.value)

    
    event.preventDefault()
})
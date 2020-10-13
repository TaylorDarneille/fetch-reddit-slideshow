const requestUrl = "https://www.reddit.com/search.json?q=";
const input = document.querySelector('#input')
let form = document.querySelector('#form')
let search = document.querySelector('.search')
let main = document.querySelector('main')
let counter = 0
let body = document.querySelector('body')
let stop = document.createElement('button')
let interval
stop.innerText = 'Stop'
function fetchEm(request){
    let pics = [];
    fetch(request)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        pics = jsonData.data.children.map(child => child.data.thumbnail).filter(urls => urls[0] === 'h')
        queue(pics)
    })
    .catch((error)=>{
        console.log("ERROR", error)
    })
    
}
function queue(pics){
    search.parentNode.removeChild(search)
    print(pics)
    interval = setInterval(print, 2000, pics)
    
    body.appendChild(stop)
}
function restart() {
    clearInterval(interval)
    while(main.firstChild){
        main.removeChild(main.firstChild)
    }
    main.appendChild(search)
    body.removeChild(stop)
    input.value = ''
}
function print(pics){
    
    let img = document.createElement('img')
    let pic = pics[counter]
    let imgToBeRemoved = document.querySelector('img')
    if(main.firstElementChild){
        main.removeChild(imgToBeRemoved)
    }
    img.setAttribute('src', pic)
    main.appendChild(img)
    
    counter ++
    if(counter === pics.length){
        counter = 0
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        fetchEm(requestUrl + input.value)
    })
    stop.addEventListener('click',(e)=>{
        e.preventDefault()
        restart()
    })
})


console.log('SCRIPT IS CONNECTED')
const requestUrl = 'https://www.reddit.com/search.json?q='
const container = document.querySelector('#container')
const h1 = document.querySelector('h1')
const h3 = document.querySelector('h3')
let imgArr
let interval

const slideShow = () => {
    let i = Math.floor(Math.random() * imgArr.length)
    console.log(i)
    container.innerHTML = `<img src="${imgArr[i]}" class="displayed-image">`}

const displayImage = (result) => {
    form.style.display = 'none'
    h1.style.display = 'none'
    h3.style.display = 'none'
    stopBtn.style.display = 'block'
    let firstFilter = result.filter(item => item.data.thumbnail !== 'self')
    let usable = firstFilter.filter(item => item.data.thumbnail !== 'default')
    imgArr = usable.map(item => item.data.thumbnail)  
    console.log(imgArr)
    interval = setInterval(slideShow, 2000)
}

fetchStuff = (inputValue) => {
    fetch(requestUrl+inputValue)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        let result = jsonData.data.children
        console.log(result[3].data.thumbnail)
        displayImage(result)
    })
    .catch((error)=>{
        console.log('Oops! There is an error:', error)
    })
}

resetPage = () => {
    h1.style.removeProperty('display')
    h3.style.removeProperty('display')
    form.style.removeProperty('display')
    stopBtn.style.display = 'none'
    clearInterval(interval)
    container.removeChild(container.firstChild)
    form.reset()
}

document.addEventListener('DOMContentLoaded', ()=>{
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        fetchStuff(input.value)
    })
    stopBtn.addEventListener('click', resetPage)
})
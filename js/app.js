console.log('SCRIPT IS CONNECTED')
const requestUrl = 'https://www.reddit.com/search.json?q='
const container = document.querySelector('#container')
const h1 = document.querySelector('h1')
const h3 = document.querySelector('h3')
// const stopBtn = document.stop


const displayImage = (result) => {
    form.style.display = 'none'
    h1.style.display = 'none'
    h3.style.display = 'none'
    stopBtn.style.display = 'block'
    let usable = result.filter(item => item.data.thumbnail !== 'self')
    const imgArr = usable.map(item => item.data.thumbnail)  
    console.log(imgArr)
    setInterval(function(){
        let i = Math.floor(Math.random() * imgArr.length)
        container.innerHTML = `<img src="${imgArr[i]}" class="displayed-image">`}
        , 3000)
}

fetchStuff = (inputValue) => {
    fetch(requestUrl+inputValue)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        let result = jsonData.data.children
        console.log(result)
        displayImage(result)
    })
    .catch((error)=>{
        console.log('Oops! There is an error:', error)
    })
}

resetPage = () => {

}

document.addEventListener('DOMContentLoaded', ()=>{
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        fetchStuff(input.value)
    })
    document.addEventListener('click', resetPage)
})
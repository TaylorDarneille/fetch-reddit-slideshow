console.log('SCRIPT IS CONNECTED')
const requestUrl = 'https://www.reddit.com/search.json?q='

const displayImage = (result) => {
        let container = document.querySelector('#container')
        container.innerHTML = `
            <img src="${result.children[0].data.thumbnail}" class="new-image">
        `    
}

fetchStuff = (inputValue) => {
    fetch(requestUrl+inputValue)
    .then((responseData)=>{
        return responseData.json()
    })
    .then((jsonData)=>{
        let result = jsonData.data
        console.log(result)
        displayImage(result)
    })
    .catch((error)=>{
        console.log('Oops! There is an error:', error)
    })
}

document.addEventListener('DOMContentLoaded', ()=>{
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        fetchStuff(input.value)
    })
})
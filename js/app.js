console.log('SCRIPT IS CONNECTED')
const requestUrl = 'https://www.reddit.com/search.json?q='

document.addEventListener('DOMContentLoaded', ()=>{
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
        fetchStuff(requestUrl+input.value)
    })
})
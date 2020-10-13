const requestUrl = "https://www.reddit.com/search.json?nsfw:no&q="
let currentImg = []
let picIndex = 0;
let timer = null;
const delayTimer = 3000;

let form = document.getElementById("form");

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let input = document.getElementById("input").value;
    console.log("fetch me my pic:", input)
    if (input) {
        fetchPics(input);
    }
    else {
        console.log("try again!")
    }    
})

const fetchPics = (input) => { 
    console.log("reddit search for:", input)
    fetch(requestUrl + input)
    .then((responseData)=>{
        return responseData.json();        
    })
    .then((jsonData)=>{
        console.log(jsonData);
        let picsResults = jsonData.data.children.filter((pic) => {
            return pic.data.post_hint = "image";
        }) .map((pic) => {
            return {
                url: pic.data.url
            }
        })
        console.log(picsResults);
        currentImg = picsResults;
    })
    .catch((error)=>{
        console.log("error!!!:", error);        
    });
}

// rendering the pics 
const showpic = () => {
    results.innerHTML = "";
    let img = document.createElement("img");
    img.setAttribute("src", currentImg[picIndex].url);
    results.append(img);
}

// interval - timer to change pic
const changepic = () => {
    picIndex += 1
    if (picIndex >= currentImg.length) {
        picIndex = 0;
    }
    showPic(); // repeat
}

// start slideshow
const startSlide = () => {
    console.log("does this work???");
    let form = document.getElementById("form-container");
    let slideshow = document.getElementById("slideshow-container");
    form.style.display = "none";
    slideshow.style.display = "inline-block"
    showPic();
    timer = setInterval(changePic, delayTimer)
}



// stop slideshow

let stop = document.getElementById("stop")
stop.addEventListener("click", () => {
    clearInterval(timer);
    let form = document.getElementById("form-container");
    let slideshow = document.getElementById("slideshow-container");
    form.style.display = "none";
    slideshow.style.display = "inline-block"
    picIndex = 0;
})


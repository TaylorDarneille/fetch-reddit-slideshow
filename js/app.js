document.addEventListener("DOMContentLoaded",()=>{
  document.querySelector('#form').addEventListener("submit",(e)=>{
    e.preventDefault()
    const baseURL = 'https://www.reddit.com/search.json?q='
    const query = document.querySelector('#search').value


    fetch(baseURL+query+"+nsfw:no")
    .then((responseData)=>{
      return responseData.json()
    })
    .then((jsonData)=>{
      console.log(jsonData.data.children)
      const imageArray = jsonData.data.children.map(child=>child.data.thumbnail).filter(element=>element[0]==="h");
      startSlideshow(imageArray);
    })
    .catch((err)=>{console.log(err)})
  })

  const startSlideshow = (imageArray) =>{
    const container = document.querySelector('#imageContainer');
    container.innerHTML = ""
    imageArray.forEach((image, idx)=>{
      const img = document.createElement('img');
      img.setAttribute('src',image);
      img.setAttribute('id',idx);
      img.style.display = "none"
      container.appendChild(img);
    });
    let count = 0;
    let next = 1;
    const images = document.querySelectorAll('img');
    images[count].style.display = "block"
    //show first image only
    const interval = setInterval(()=>{
      images[count].style.display = "none";
      images[next].style.display = "block";
      count = (count+1) % images.length;
      next = (next+1) % images.length;
    },500)
    document.querySelector('.results').style.display = 'block';
    document.querySelector('#searchPage').style.display = 'none';
  }
})

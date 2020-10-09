document.addEventListener("DOMContentLoaded", () => {



  //reference to the interval
  let interval;

  const startSlideshow = (imageArray) => {
    const container = document.querySelector('#imageContainer');
    //clear out previous images from DOM
    container.innerHTML = ""
    // make a new img for each image
    imageArray.forEach((image, idx) => {
      const img = document.createElement('img');
      img.setAttribute('src', image);
      img.style.display = "none" //todo use a class
      container.appendChild(img);
    });
    // pointers to track current and next image
    let current = 0;
    let next = 1;
    const images = document.querySelectorAll('img');
    //  TODO use a class?
    images[current].style.display = "block"
    //show first image only
    interval = setInterval(() => {
      // every 800ms change the image currently displayed to none, set next display to block
      images[current].style.display = "none";
      images[next].style.display = "block";
      // and update the pointers;
      current = next;
      next = (next + 1) % images.length;
    }, 2000)

    document.querySelector('#results').style.display = 'flex';
    // hide the search bar
    document.querySelector('#searchPage').style.display = 'none';
  }

  document.querySelector('#form').addEventListener("submit", (e) => {
    e.preventDefault()
    const baseURL = 'https://www.reddit.com/search.json?q='
    const query = document.querySelector('#search').value
    if (query.length === 0) {
      return
    }
    fetch(baseURL + query + "+nsfw:no")
      .then((responseData) => {
        return responseData.json()
      })
      .then((jsonData) => {
        // this RegExp matches strings ending in jpg or png, to only use images
        const regex = new RegExp('(jpg$|png$)')
        // map the urls, and filter for only items that match the regex
        const imageURLArray = jsonData.data.children.map(child => child.data.url).filter(element => regex.test(element));
        // call the startslide show passing in the array of URLs
        startSlideshow(imageURLArray);
      })
      .catch((err) => {
        console.log(err)
      })
  })


  document.querySelector('#stop').addEventListener('click', () => {
    clearInterval(interval);
    document.querySelector('#search').value = ""
    document.querySelector('#results').style.display = "none";
    document.querySelector('#searchPage').style.display = "flex"
  })

})

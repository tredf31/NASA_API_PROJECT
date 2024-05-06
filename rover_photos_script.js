const selectRover = document.querySelector(".dropdown");
const dateInput = document.querySelector(".date-input");
const getPhotosBtn = document.querySelector(".get_photos");
const slideshowContainer = document.querySelector(".slideshow-container")

const serverURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
const API_KEY = "M8Fy06vCGeWw8hQMXllRWaerM5n0aJvyGakzy5NN"

function daysBetweenDates(dateStr1, dateStr2) {

    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
  

    const difference = date2.getTime() - date1.getTime();
  

    const days = difference / (1000 * 60 * 60 * 24);
  
    // Return the number of days
    return Math.round(days); // Use Math.round if you want an integer result
  }

const getPhotos = async (roverName, solDate) => {
    const res = await fetch(`${serverURL}${roverName}/photos?sol=${solDate}&api_key=${API_KEY}`, {
        method: "GET",
        
    })

    if(res.ok) {
        const data = await res.json()
        return data;
    }
    return data;
}

let counterOfPictures = 0;
const showPictures = async () => {
  slideshowContainer.style.display = "block";
  counterOfPictures = 0;
  const allPhotos = document.querySelectorAll(".mySlides");
  allPhotos.forEach(item => item.remove())
    let solDate = daysBetweenDates("2018-01-01", dateInput.value); 
    console.log(dateInput.value);
    const photosData = await getPhotos(selectRover.value, solDate);
    photosData["photos"].forEach(item => {
        counterOfPictures += 1
        slideshowContainer.insertAdjacentHTML("beforeend", `
        <div class="mySlides">
            <div class="numbertext">${counterOfPictures} / ${photosData["photos"].length}</div>
            <img src="${item.img_src}" onerror="this.src='./images/erorr1.png'" style="width:100%">
            <div class="text">Sol: ${item.sol}, Camera name: ${item.camera.full_name}</div>
        </div>
        `)
    })
}

selectRover.addEventListener("change", (event) => {
    console.log(event.target.value);
    if(event.target.value === "curiosity") {
        dateInput.setAttribute("max", "2020-07-12");
    } else if (event.target.value === "perseverance") {
        dateInput.setAttribute("max", "2020-09-12")
        
    } else if (event.target.value === "opportunity") {
        dateInput.setAttribute("max", "2018-06-11")
        dateInput.setAttribute("min", "2004-01-25")
    }
})

getPhotosBtn.addEventListener("click", showPictures)

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
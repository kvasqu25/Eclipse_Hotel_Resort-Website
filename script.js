
"use strict";

// Photos and videos by pexels and unsplash 


///////// Ajax/API: Fetch nearby tourist attractions /////////////////////


//Using Unspash API since Mapbox doesn't have images
const UNSPLASH_ACCESS_KEY = "QDCiYtOZ5Y1Ox2kHrTeGAiSbSmm11QE5_tW8xME3XLI";  
const IMAGE_PER_PAGE = 1; 
const IMAGE_QUERY = "attraction"; 

let currentPage = 1;
const maxResultsPerPage = 4; 
const contentList = document.getElementById("content-list");
const loadMoreButton = document.getElementById("load-more");
let clickCount = 0;

const locations = [
  { lat: 33.4255, lng: -111.9400, name: "Tempe" },
  { lat: 33.4484, lng: -112.0740, name: "Phoenix" },
  { lat: 33.4152, lng: -111.8315, name: "Mesa" },
];

function fetchImageFromUnsplash(query) {
  return fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&count=${IMAGE_PER_PAGE}`)
    .then(response => response.json())
    .then(data => {
      return data[0] ? data[0].urls.small : null; 
    })
    .catch(err => console.error("Error fetching image from Unsplash:", err));
}



///Mapbox API 
function getNearbyAttractions(lat, lng, page = 1) {
  const token = "pk.eyJ1Ijoia3Zhc3F1MjUiLCJhIjoiY200YXFsNzZ4MGFzdzJrbjZhaGc5dTg4YiJ9.I_6JBRSuo-aKc9X1zc9Frg";
  const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/landmark.json?proximity=${lng},${lat}&access_token=${token}&limit=${maxResultsPerPage}&types=poi&page=${page}`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      if (data.features && data.features.length > 0) {
        let html = "";

        // Iterate through each feature and fetch the image
        const imagePromises = data.features.map((feature) => {
          return fetchImageFromUnsplash(IMAGE_QUERY).then(image => {
            html += `
              <li class="attraction-item">
                <img src="${image}" alt="${feature.text}" class="attraction-img">
                <div class="attraction-details">
                  <h3>${feature.text}</h3>
                  <p>${feature.place_name}</p>
                </div>
              </li>
            `;
          });
        }); 

        // After all images are fetched, add them to the list
        Promise.all(imagePromises).then(() => {
          contentList.innerHTML += html; // Add all content at once after images are fetched
        });

        currentPage++;
      } else {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = "No more results";
      }
    })
    .catch(error => {
      console.error("Error fetching Mapbox data:", error);
      loadMoreButton.disabled = true;
      loadMoreButton.textContent = "Failed to load data";
    });
}

function loadAttractions() {
  if (clickCount < 3) {
    const currentLocation = locations[clickCount % locations.length];
    getNearbyAttractions(currentLocation.lat, currentLocation.lng, currentPage);
    clickCount++;

    if (clickCount >= 3) {
      loadMoreButton.disabled = true;
      loadMoreButton.textContent = "No more results";
    }
  }
}

// Initial attraction load for city
getNearbyAttractions(33.4255, -111.9400);

// Attach event listener to the load more button
loadMoreButton.addEventListener("click", loadAttractions);




                                               /////////Slideshow/Carousel | Casino//////////////

 $(document).ready(function() {

  // Function to change the active slide
  function changeSlide() {
    var currentSlide = $(".carousel-slide.active");
    var nextSlide = currentSlide.next(".carousel-slide").length > 0 ? currentSlide.next(".carousel-slide") : $(".carousel-slide").first();

    currentSlide.removeClass("active");
    nextSlide.addClass("active");
  }

  // Change slides every 3 seconds (3000ms)
  setInterval(changeSlide, 3000);
});



                                      /////////// jQuery Widget/Plugin | Tabs for FAQ ///////////////////////////
$(document).ready(function() {
  $("#accordion").accordion({
    collapsible: true,  // Allows all panels to collapse
    active: false,      // Ensures no panel is open initially
    heightStyle: "content" // Adjusts to the height of the content
  });
});


  

                                       /////////////Store Data | Booking ///////

  // When the page loads, check if there's any data in localStorage and display it
window.onload = function() {
    const storedCity = localStorage.getItem('city');
    const storedCheckin = localStorage.getItem('checkin');  
    const storedCheckout = localStorage.getItem('checkout');
    
    // If data is found in localStorage, display it in the fields
    if (storedCity) {
      document.getElementById('location').value = storedCity;
    }
    if (storedCheckin) {
      document.getElementById('checkin').value = storedCheckin;
    }
    if (storedCheckout) {
      document.getElementById('checkout').value = storedCheckout;
    }
  };
  
  // Handle form submission and store selected values in localStorage
  document.querySelector('.book-now-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent page refresh on form submit
    
    const selectedCity = document.getElementById('location').value;
    const checkinDate = document.getElementById('checkin').value;
    const checkoutDate = document.getElementById('checkout').value;
  
    // Save the selected data to localStorage
    localStorage.setItem('city', selectedCity);
    localStorage.setItem('checkin', checkinDate);
    localStorage.setItem('checkout', checkoutDate);
    
    // Alert
    alert('Booking details saved!');
  });
  
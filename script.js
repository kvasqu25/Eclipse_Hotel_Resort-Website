
"use strict";

// Ajax/API: I used a third-party API (Yelp) to fetch nearby tourist attractions //

$(document).ready(function() {
    let offset = 0;

    // Function to load content from Yelp API
    function loadContent() {
        $.ajax({
            url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ikqcytwuSXvipC-uQ9zk6tM2B4mgodVtHylGsVOyL5soEFqr1_01wAPsd-XMv6JMiMbm93HfpVr-wRV1FBjikoHOJRVw0qgfmaDNr131N77-B1xClMDU-BwA1n1JZ3Yx',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
                location: 'Phoenix', 
                term: 'tourist attractions', 
                limit: 3, 
                offset: offset 
            },
            success: function(data) {
                const contentList = $('#content-list');
                
                // Clear the existing content before adding new items
                contentList.empty();

                // Append new content to the list
                data.businesses.forEach(item => {
                    contentList.append(`
                        <li>
                            <h3><a href="${item.url}" target="_blank" class="yelp-title">${item.name}</a></h3>
                            <p>${item.location.address1}, ${item.location.city}, ${item.location.state}</p>
                            <p>Rating: ${item.rating} ⭐ (${item.review_count} reviews)</p>
                            <img src="${item.image_url}" alt="${item.name}" style="width: 200px; height: 100;">
                        </li>
                    `);
                });

                // Update the offset to load the next set of results
                offset += 3;
            },
            error: function() {
                $('#dynamic-content').append('<p>Error loading content.</p>');
            }
        });
    }

    // Initially load the first set of content
    loadContent();

    // Handle the "Load More" button
    $('#load-more').click(function() {
        loadContent(); // Load the next set of results
    });
});



////Slideshow/Carousel

  $(document).ready(function(){
    $('.casino-carousel').slick({
        autoplay: true,             // Enable autoplay
        autoplaySpeed: 3000,        // 3-second delay between slides for faster transitions
        dots: true,                 // Show navigation dots for easy navigation
        arrows: true,               // Show navigation arrows
        infinite: true,             // Infinite looping of slides
        speed: 600,                 // Slightly quicker transition speed
        fade: true,                 // Elegant fade transition effect
        slidesToShow: 1,            // Display 1 slide at a time
        slidesToScroll: 1           // Scroll 1 slide at a time
        
    });
  });


  //jQuery Widget/Plugin tabs
  $(document).ready(function() {
    
    $(".tab-link").click(function(e) {
      e.preventDefault(); // Prevent the default anchor behavior
      
      // Toggle the visibility of the corresponding content
      var content = $(this).next(".tab-content");
      
      // Slide up all tab content
      $(".tab-content").not(content).slideUp().removeClass("active");
      
      // Slide down the clicked tab content
      content.stop(true, true).slideToggle().toggleClass("active");
    });
  });
  
  

  ///store data

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
    
    // Optionally, alert the user or provide feedback
    alert('Booking details saved!');
  });
  
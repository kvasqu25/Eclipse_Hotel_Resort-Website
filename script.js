
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

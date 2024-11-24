$(document).ready(function() {
    $('.slideshow').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true
    });
});
$(document).ready(function() {
    $.ajax({
        url: 'data/menu.json', // Example JSON file
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            let content = '';
            data.menu.forEach(item => {
                content += `
                    <div>
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p><strong>Price:</strong> $${item.price}</p>
                    </div>
                `;
            });
            $('#menu-content').html(content);
        },
        error: function() {
            $('#menu-content').html('<p>Unable to load the menu at this time.</p>');
        }
    });
});
$('#preference-form').on('submit', function(e) {
    e.preventDefault();
    const favorite = $('#favorite').val();
    if (favorite) {
        localStorage.setItem('favoriteTreat', favorite);
        $('#saved-favorite').text(`Your favorite treat is: ${favorite}`);
    }
});

$(document).ready(function() {
    const savedFavorite = localStorage.getItem('favoriteTreat');
    if (savedFavorite) {
        $('#saved-favorite').text(`Your favorite treat is: ${savedFavorite}`);
    }
});
{
    "menu": [
        {
            "name": "Chocolate Cake",
            "description": "Rich and creamy chocolate cake.",
            "price": 12.99
        },
        {
            "name": "Vanilla Cupcake",
            "description": "Classic vanilla cupcakes with buttercream frosting.",
            "price": 3.99
        },
        {
            "name": "Oatmeal Cookie",
            "description": "Chewy and sweet oatmeal cookies with raisins.",
            "price": 1.99
        }
    ]
}

$(function () {

    $('.shop-detail-carousel').owlCarousel({
        items: 1,
        thumbs: true,
        nav: false,
        dots: false,
        loop: true,
        autoplay: true,
        thumbsPrerendered: true
    });


    $('#main-slider').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsSpeed: 400
    });


    $('#get-inspired').owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        dotsSpeed: 400
    });


    $('.product-slider').owlCarousel({
        items: 1,
        dots: true,
        nav: false,
        responsive: {
            480: {
                items: 1
            },
            765: {
                items: 2
            },
            991: {
                items: 3
            },
            1200: {
                items: 5
            }
        }
    });





    // productDetailGallery(4000);
    utils();

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, {
                expires: 365,
                path: document.URL.substr(0, document.URL.lastIndexOf('/'))
            });

        }

        return false;
    });

});



$(window).on('load', function () {
    $(this).alignElementsSameHeight();
});

$(window).resize(function () {
    setTimeout(function () {
        $(this).alignElementsSameHeight();
    }, 150);
});


/* product detail gallery */

function productDetailGallery(confDetailSwitch) {
    $('.thumb:first').addClass('active');
    timer = setInterval(autoSwitch, confDetailSwitch);
    $(".thumb").click(function(e) {

	switchImage($(this));
	clearInterval(timer);
	timer = setInterval(autoSwitch, confDetailSwitch);
	e.preventDefault();
    }
    );
    $('#mainImage').hover(function() {
	clearInterval(timer);
    }, function() {
	timer = setInterval(autoSwitch, confDetailSwitch);
    });

    function autoSwitch() {
	var nextThumb = $('.thumb.active').closest('div').next('div').find('.thumb');
	if (nextThumb.length == 0) {
	    nextThumb = $('.thumb:first');
	}
	switchImage(nextThumb);
    }

    function switchImage(thumb) {

	$('.thumb').removeClass('active');
	var bigUrl = thumb.attr('href');
	thumb.addClass('active');
	$('#mainImage img').attr('src', bigUrl);
    }
}

function utils() {


    /* click on the box activates the radio */

    $('#checkout').on('click', '.box.shipping-method, .box.payment-method', function (e) {
        var radio = $(this).find(':radio');
        radio.prop('checked', true);
    });
    /* click on the box activates the link in it */

    $('.box.clickable').on('click', function (e) {

        window.location = $(this).find('a').attr('href');
    });
    /* external links in new window*/

    $('.external').on('click', function (e) {

        e.preventDefault();
        window.open($(this).attr("href"));
    });
    /* animated scrolling */

    $('.scroll-to, .scroll-to-top').click(function (event) {

        var full_url = this.href;
        var parts = full_url.split("#");
        if (parts.length > 1) {

            scrollTo(full_url);
            event.preventDefault();
        }
    });

    function scrollTo(full_url) {
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#" + trgt).offset();
        var target_top = target_offset.top - 100;
        if (target_top < 0) {
            target_top = 0;
        }

        $('html, body').animate({
            scrollTop: target_top
        }, 1000);
    }
}


$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

        var maxHeight = 0;

        var children = $(this).find('.same-height');

        children.height('auto');

        if ($(document).width() > 768) {
            children.each(function () {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight();
                }
            });

            children.innerHeight(maxHeight);
        }

        maxHeight = 0;
        children = $(this).find('.same-height-always');

        children.height('auto');

        children.each(function () {
            if ($(this).innerHeight() > maxHeight) {
                maxHeight = $(this).innerHeight();
            }
        });

        children.innerHeight(maxHeight);

    });
    $(document).ready(function(){
        $(".product-slider").owlCarousel({
          items: 4, // Number of visible items
          loop: true,
          margin: 10,
          autoplay: true,
          autoplayTimeout: 3000,
          responsive: {
            0: {
              items: 1
            },
            600: {
              items: 2
            },
            1000: {
              items: 4
            }
          }
        });
      });
      //login page
    //   document.querySelector('#login-modal form').addEventListener('submit', function(event) {
    //     const email = document.getElementById('email-modal').value;
    //     const password = document.getElementById('password-modal').value;
    
    //     if (!email || !password) {
    //         event.preventDefault(); // Prevent form submission
    //         alert('Please fill in all fields.');
    //     }
    // });
    $('#login-modal form').on('submit', function(event) {
        const email = $('#email-modal').val();
        const password = $('#password-modal').val();
        if (!email || !password) {
            event.preventDefault(); 
            alert('Please fill in all fields.');
        }
    });
    

    //top and Bottom
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        });

        $('.back-to-top').click(function(event) {
            event.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
    });
// Add cart
$(document).ready(function () {
    // Add to cart functionality
    $('.add-to-cart').click(function (e) {
      e.preventDefault();
  
      // Get product details
      var productName = $(this).data('name');
          var productPrice = $(this).data('price');
      var productImage = $(this).data('image');
  
      // Create cart item HTML
      var cartItemHtml = `
        <li class="cart-item">
          <img src="${productImage}" alt="${productName}" style="width: 50px; height: 50px;">
          <span>${productName} - ₹${productPrice}</span>
        </li>
      `;
  
      // Append the cart item to the cart
      $('#cart-items').append(cartItemHtml);
  
      alert(`${productName} has been added to your cart!`);
    });
  });

//   buy now
$(document).ready(function() {
    // Handle Add to Cart Button Click
    $('#add-to-cart-btn').on('click', function(event) {
        event.preventDefault();

        // Product details
        const productName = "Lymio Casual Shirt for Men";
        const unitPrice = 290.00;
        const quantity = 1;  // For simplicity, assuming quantity is 1
        const discount = 10.00; // Example discount
        const total = (unitPrice - discount) * quantity;

        // Get current total from the footer
        let currentTotal = parseFloat($('#total-price').text().replace('₹', '').replace('$', ''));

        // Append a new row to the cart table
        const newRow = `
            <tr>
                <td colspan="2">${productName}</td>
                <td>${quantity}</td>
                <td>₹${unitPrice.toFixed(2)}</td>
                <td>₹${discount.toFixed(2)}</td>
                <td colspan="2">₹${total.toFixed(2)}</td>
            </tr>
        `;
        $('#cart-items').append(newRow);

        // Update the total price in the footer
        currentTotal += total;
        $('#total-price').text(`₹${currentTotal.toFixed(2)}`);
    });

    // Handle Buy Now Button Click
    $('#buy-now-btn').on('click', function(event) {
        event.preventDefault();
        // Redirect to the checkout page
        window.location.href = 'checkout1.html';
    });
});
//add to cart
$(document).ready(function () {
    // Function to add product to cart
    $('.add-to-cart-btn').on('click', function (e) {
        e.preventDefault();

        // Get product details
        var productName = $(this).data('name');
        var productPrice = $(this).data('price');
        var productImg = $('#productMain .shop-detail-carousel .item img').first().attr('src');
        
        // Create a product object
        var product = {
            name: productName,
            price: productPrice,
            quantity: 1, 
            img: productImg
        };

        // Retrieve the existing cart from local storage
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product already exists in the cart
        var existingProductIndex = cart.findIndex(item => item.name === product.name);

        if (existingProductIndex !== -1) {
            // If product exists, update the quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // Add new product to the cart
            cart.push(product);
        }

        // Store the updated cart in local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        alert(" Added to your cart!");

        // Optionally, redirect to cart page
        window.location.href = 'basket.html';
    });
});

}
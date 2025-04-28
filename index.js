$(document).ready(function () {
    // Initialize Owl Carousel
    var owl = $(".custom-carousel").owlCarousel({
      items: 3,              // Number of items to display at once
      autoWidth: true,       // Allows auto-width of items
      loop: true,            // Loops through items
      margin: 10,            // Adds some space between items
      center: true,          // Ensures the active item is always centered
      responsive: {
        0: {
          items: 1           // 1 item per view on small screens
        },
        768: {
          items: 2           // 2 items per view for medium screens
        },
        992: {
          items: 3           // 3 items per view for larger screens
        }
      }
    });
  
    // Toggle 'active' class on item click
    $(".custom-carousel .item").click(function () {
      // Remove 'active' class from all items except the clicked one
      $(".custom-carousel .item").removeClass("active");
  
      // Add 'active' class to the clicked item
      $(this).addClass("active");
  
      // Get the index of the clicked item
      var index = $(this).index();
  
      // Center the clicked item
      owl.trigger('to.owl.carousel', [index, 300, true]);  // Smooth scroll to the clicked item
    });
  });
  
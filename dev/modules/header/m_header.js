function headerMobileSearchClose() {
  $('.btn-search-mobile').removeClass('is-open');
}
function headerMobileMenuClose() {
  $('.menu-mobile').removeClass('is-open');
}

function headerMobileSearch() {
  $('.btn-search-mobile').on('click', function() {
    headerMobileMenuClose();
    $(this).toggleClass('is-open');
  });
}
headerMobileSearch();

function headerMobileMenu() {
  $('.btn-mobile-menu').on('click', function() {
    headerMobileSearchClose();
    $(this).parent('.menu-mobile').toggleClass('is-open');
  });
}
headerMobileMenu();
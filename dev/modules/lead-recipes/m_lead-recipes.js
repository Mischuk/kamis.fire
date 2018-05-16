function showCurrentRecipes() {
  var currentType = $('.recipes-nav li a.current').attr('data-recipe-type');
  var i = 0;
  $('.recipes-list .item').each(function(){
    if ( $(this).attr('data-item-type') === currentType ) {
      $(this).addClass('current');
      i++;
      if ( i > 2) {
        $(this).addClass('hide-mobile');
      }
    } else {
      $(this).removeClass('hide-mobile current');
    }

  });
}
showCurrentRecipes();

function mobileSelectedItem() {
  var result = $('.selected-recipe-collapse');
  result.html($('.recipes-nav li a.current').text());
}
mobileSelectedItem();

function mobileToggleCollapse() {
  $('.selected-recipe-collapse').on('click', function(){
    $(this).toggleClass('is-open');
  });
}
mobileToggleCollapse();



function changeCurrentRecipes() {
  var recipesNavItem = $('.recipes-nav a');
  recipesNavItem.on('click', function(){
    if ( $(this).hasClass('current') ) {
      return false
    } else {
      recipesNavItem.removeClass('current');
      $(this).addClass('current');
      showCurrentRecipes();
      mobileSelectedItem();
      $('.selected-recipe-collapse').removeClass('is-open');
    }
  });
}

changeCurrentRecipes();
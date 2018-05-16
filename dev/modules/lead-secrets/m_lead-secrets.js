function showCurrentSecret() {
  var currentType = $('.secret-nav li a.current').attr('data-secret-type');
  var i = 0;
  $('.secret-list .item').each(function(){
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

  $('.m_lead-secrets .details a').each(function(){
    if ( $(this).attr('data-secret-type') === currentType ) {
      $(this).addClass('current');
    } else {
      $(this).removeClass('current');
    }
  });
}
showCurrentSecret();

function mobileSelectedSecretItem() {
  var result = $('.selected-secret-collapse');
  result.html($('.secret-nav li a.current').text());
}
mobileSelectedSecretItem();

function mobileToggleCollapseSecret() {
  $('.selected-secret-collapse').on('click', function(){
    $(this).toggleClass('is-open');
  });
}
mobileToggleCollapseSecret();



function changeCurrentSecret() {
  var secretNavItem = $('.secret-nav a');
  secretNavItem.on('click', function(){
    if ( $(this).hasClass('current') ) {
      return false
    } else {
      secretNavItem.removeClass('current');
      $(this).addClass('current');
      showCurrentSecret();
      mobileSelectedSecretItem();
      $('.selected-secret-collapse').removeClass('is-open');
    }
  });
}

changeCurrentSecret();
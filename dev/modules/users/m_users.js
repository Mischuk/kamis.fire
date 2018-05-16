function showCurrentUsers() {
  var currentType = $('.users-nav li a.current').attr('data-user-type');
  var i = 0;
  $('.users-list .item').each(function(){
    if ( $(this).attr('data-item-type') === currentType ) {
      $(this).addClass('current');
    } else {
      $(this).removeClass('current');
    }

  });
}
showCurrentUsers();

function mobileSelectedUser() {
  var result = $('.selected-users-collapse');
  result.html($('.users-nav li a.current').text());
}
mobileSelectedUser();

function mobileToggleCollapseUsers() {
  $('.selected-users-collapse').on('click', function(){
    $(this).toggleClass('is-open');
  });
}
mobileToggleCollapseUsers();



function changeCurrentUsers() {
  var usersNavItem = $('.users-nav a');
  usersNavItem.on('click', function(){
    if ( $(this).hasClass('current') ) {
      return false
    } else {
      usersNavItem.removeClass('current');
      $(this).addClass('current');
      showCurrentUsers();
      mobileSelectedUser();
      $('.selected-users-collapse').removeClass('is-open');
    }
  });
}

changeCurrentUsers();
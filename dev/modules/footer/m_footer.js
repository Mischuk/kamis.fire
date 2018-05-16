function collapseFooterMenu() {
  $('.collapse-list').on('click', function(){
    $(this).next().slideToggle(300);
    $(this).toggleClass('is-open');
  });
}
collapseFooterMenu();
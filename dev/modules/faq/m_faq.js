function collapseFAQ() {
  var $item = $('.m_faq .item .headling');
  $item.on('click', function(){
    $(this).parent().toggleClass('is-open');
    $(this).next().slideToggle(300);
  });
}
collapseFAQ();
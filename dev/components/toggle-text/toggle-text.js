function toggleText() {
  $('.toggle-text-btn a').on('click', function(){
    var opened = $(this).attr('data-opened');
    $(this).text(function(i, text){
      return text === "Полный текст правил" ? opened : "Полный текст правил";
    })
    $(this).parent().prev('.toggle-text-wrp').slideToggle(300);
  });
}
toggleText();
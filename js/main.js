/* js for show line bottom in navbar if client scroling bar */
$(window).on('scroll', function(){
  if($(window).scrollTop() > 100){
    $('nav').addClass('lineBottom');
  }else{
    $('nav').removeClass('lineBottom');
  }
})


/* sticky position for navbar content
$(function(){
        // Check the initial Poistion of the Sticky Header
        var stickyHeaderTop = $('.container-custom').offset().top;

        $(window).scroll(function(){
                if( $(window).scrollTop() > stickyHeaderTop ) {
                        $('.container-custom').css({position: 'fixed', top: '65px'});
                } else {
                        $('.container-custom').css({position: 'static'});
                }
        });
  });
*/

/* catatan sticky position nanti
var  mn = $(".container-custom");
    mns = "sticky";
    hdr = $('.container-custom').height() + $('.container-fluid').height();

$(window).scroll(function() {
  if( $(this).scrollTop() > hdr ) {
    mn.addClass(mns);
  } else {
    mn.removeClass(mns);
  }
});
*/

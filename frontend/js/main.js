/* js for show line bottom in navbar if client scroling bar */
$(window).on('scroll', function(){
  if($(window).scrollTop() > 100){
    $('nav').addClass('lineBottom');
  }else{
    $('nav').removeClass('lineBottom');
  }
});

(function() {
  $(".player-content-left").find('a').click(function() {
    if ($(this).hasClass("random") || $(this).hasClass("play-pause") || $(this).hasClass("repeat")) {
      return $(this).toggleClass("active");
    }
  });

}).call(this);

//----------start
$('#playlist-menu').click(function(e){
    e.stopPropagation();
     $('#playlist-container').toggleClass('playlist-container-show');
      document.body.style.overflow = 'hidden';
});

$('body,html').click(function(e){
    var container = $("#playlist-container");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('playlist-container-show');
      document.body.style.overflow = 'auto';
    }
});
//--------------end

function loginOpen(){
  // if(){
    alert('Data Berhasil Di Simpan');
  // }else{

  //}
  document.getElementById('md-account').style.display='none';
  document.getElementById('md-account-login').style.display='block'
}

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

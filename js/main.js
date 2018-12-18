/* js for show line bottom in navbar if client scroling bar */
$(window).on('scroll', function(){
    if($(window).scrollTop() > 100){
        $('nav').addClass('lineBottom');
    }else{
        $('nav').removeClass('lineBottom');
    }
});


//----------start
$('#playlist-menu').click(function(e){
    // user session variable for access playlist
    var userSession = 'active';

    if (userSession == 'active'){
        e.stopPropagation();
        $('#playlist-container').toggleClass('playlist-container-show');
        document.body.style.overflow = 'hidden';
    }else{
        document.getElementById('md-account-login').style.display='block';
    }
});

$('body,html').click(function(e){
    var container = $("#playlist-container");

    if (!container.is(e.target) && container.has(e.target).length === 0 && !($('#fixedPlaylist').hasClass('pinPlaylistActive'))) {
        container.removeClass('playlist-container-show');
        document.body.style.overflow = 'auto';
    }
});
//--------------end


$('#fixedPlaylist').click(function(e){
    $(this).toggleClass('pinPlaylistActive');
});



function loginOpen(){
  // if(){
    alert('Data Berhasil Di Simpan');
  // }else{

  //}
  document.getElementById('md-account').style.display='none';
  document.getElementById('md-account-login').style.display='block'
}

// audio control

/*var vls = $('#mute-toggle');

*/
$('#mute-toggle').on('click', function() {
    var vls = document.getElementById('mute-toggle');
    //var mute_toggle = $(this);

    if(player.isMuted()){
        player.unMute();
        vls.style.color = '#000';
    }
    else{
        player.mute();
        vls.style.color = '#db2768';
    }
});

$('#volume-input').on('change', function () {
  player.setVolume($(this).val());
});


          //context menu playlist
            var tableContextMenu = null;

            $(document).ready(function(){
                var options = {
                    openCallBack: function(contextMenu) {
                        contextMenu.disableMenuItem("Warning Item");
                    }
                };
                tableContextMenu = new ContextMenu("context-menu-items", menuItemClickListener);
                tableContextMenu.disableMenuItem(1);
            });

            function menuItemClickListener(menu_item, parent)
            {
                if (menu_item.text() === "Re-enable item 2")
                {
                    tableContextMenu.enableMenuItem("Item 2");
                    //As we can't enable item 2 again, then why not disable the menu item to re-enable
                    tableContextMenu.disableMenuItem(3);
                }
                else
                {
                    alert("Menu Item Clicked: " + menu_item.text() + "\nRecord ID: " + parent.attr("data-row-id"));
                }
            }
//prevent the form from submitting
$(function(){
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
})

//get database data for playlist user if they have data
getDataJSON();

//youtube API Key
var apiKey = 'AIzaSyBM7U5jft6XHLqfNfo1ZN3ZKg744gx_76w';

//required vars and arrays
var index = 1, i = 0, state = 'other';
var list = [], listTitle = [], listDur = [], seek = []; //for reg playlist
var listPl = [], listPlTitle = [], listPlDur = [], seekPl = []; //for custom playlist

//calling iframe API asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
function clearArrays(){
    list = [];
    listTitle = [];
    listDur = [];
    seek = [];
}
function clearCustomArrays(){
    listPl = [];
    listPlTitle = [];
    listPlDur = [];
    seekPl = [];
}
//search engine
function search(){
    //clr results
    $('#results').html('');
    $('#buttons').html('');
    //clear index array
    clearArrays();
    //get input val
    query = $('#query').val();
    if (!query){
        var head = document.getElementById("res-header");
        head.innerHTML = 'Trending';
    } else {
        var head = document.getElementById("res-header");
        head.innerHTML = 'Search Results';
    }
    //GET request on Youtube API V3
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: query,
            type: 'video',
            maxResults: '10',
            key: apiKey},

            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                $.each(data.items, function(i, item){
                    //get content details
                    $.get("https://www.googleapis.com/youtube/v3/videos",{
                        id: item.id.videoId,
                        part: 'contentDetails',
                        key: apiKey},
                        function(data){
                            console.log(data);

                            $.each(data.items, function(j, details){
                                var listIds = item.id.videoId;
                                var listTitles = item.snippet.title;
                                var time = details.contentDetails.duration;
                                var timeConv = moment.duration(time);
                                var dur = timeConv.format('m:s', {trim: false});
                                var seekTime = timeConv.format('s', {trim: false});
                                list.push(listIds);
                                listTitle.push(listTitles);
                                listDur.push(dur);
                                seek.push(seekTime)
                                //console.log(seekTime);
                                 //custom function to get request output
                                var output = getOutput(item, details);
                                $('#results').append(output);
                            });
                        }
                    );

                });
                //page buttons
                var buttons = pageBtn(prevPageToken, nextPageToken);
                $('#buttons').append(buttons);
            }
    );
}

//next page button function
function nextPage(){
    var token = $('#next-button').data('token');
    var query = $('#next-button').data('query');

    //clr results
    $('#results').html('');
    $('#buttons').html('');
    //clear index array
    clearArrays();
    //get input val
    query = $('#query').val();
    index = index + 1;
    console.log(index);
    //GET request on Youtube API V3
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            pageToken: token,
            q: query,
            type: 'video',
            maxResults: '10',
            key: apiKey},

            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                console.log(data);
                $.each(data.items, function(i, item){
                    $.get("https://www.googleapis.com/youtube/v3/videos",{
                        id: item.id.videoId,
                        part: 'contentDetails',
                        key: apiKey},
                        function(data){
                            console.log(data);

                            $.each(data.items, function(j, details){
                                var listIds = item.id.videoId;
                                var listTitles = item.snippet.title;
                                var time = details.contentDetails.duration;
                                var timeConv = moment.duration(time);
                                var dur = timeConv.format('m:s', {trim: false});
                                var seekTime = timeConv.format('s', {trim: false});
                                seek.push(seekTime);
                                list.push(listIds);
                                listTitle.push(listTitles);
                                listDur.push(dur);
                                console.log(timeConv);
                                 //custom function to get request output
                                var output = getOutput(item, details);
                                $('#results').append(output);
                            });
                        }
                    );
                });
                //page buttons
                var buttons = pageBtn(prevPageToken, nextPageToken, index);
                $('#buttons').append(buttons);
        });
    return index;
}

// Previous page function
function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
   // clear
    $('#results').html('');
    $('#buttons').html('');
    //clear index array
    clearArrays();
    index = index - 1;
    console.log(index);
    // get form input
    q = $('#query').val();
    // run get request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            maxResults:'10',
            key: apiKey},

            function(data) {

            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;
            // Log data
            console.log(data);
            $.each(data.items, function(i, item) {
              $.get("https://www.googleapis.com/youtube/v3/videos",{
                        id: item.id.videoId,
                        part: 'contentDetails',
                        key: apiKey},
                        function(data){
                            console.log(data);

                            $.each(data.items, function(j, details){
                                var listIds = item.id.videoId;
                                var listTitles = item.snippet.title;
                                var time = details.contentDetails.duration;
                                var timeConv = moment.duration(time);
                                var dur = timeConv.format('m:s', {trim: false});
                                var seekTime = timeConv.format('s', {trim: false});
                                seek.push(seekTime)
                                list.push(listIds);
                                listTitle.push(listTitles);
                                listDur.push(dur);
                                console.log(list);
                                console.log(listTitles);
                                console.log(listDur);
                                 //custom function to get request output
                                var output = getOutput(item, details);
                                $('#results').append(output);
                            });
                        }
                    );
            });
            var buttons = pageBtn(prevPageToken, nextPageToken);
            // Display buttons
            $('#buttons').append(buttons);
        });
    return index;
}

//display results
function getOutput(item,details){
    var vidId = item.id.videoId;
    var title = item.snippet.title;
    var channel = item.snippet.channelTitle;
    var img = item.snippet.thumbnails.high.url;
    var isoTime = details.contentDetails.duration;
    var time = moment.duration(isoTime);
    var duration = time.format('m:s', {trim:false});
    var seekTimePl = time.format('s', {trim: false});
    var output ='<div class="col-md-10">'+
                  '<div class="content-album-play">'+
                    '<img src="'+img+'">'+
                    '<div class="row">'+
                      '<div class="col-md-12">'+
                        '<div class="row">'+
                          '<div class="col-md-12">'+
                            '<p data-dur="'+duration+'" data-title="'+title+'" data-state="other" data-id="'+vidId+'" onclick="playSong(this);return false;">'+title+'<br>'+
                              '<small>'+duration+' uploaded by '+channel+'</small>'+
                            '</p>'+
                            '<b class="md-back">'+
                              '<a href="#" title="Play this video music" data-state="other" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="playSong(this);return false;"><i class="fa">&#xf01d;</i> Play</a>'+
<<<<<<< HEAD
                              '<a href="#" title="Set this music to my playlist" data-dur="'+duration+'" data-id="'+vidId+'" data-title="'+title+'" data-channel="'+channel+'" data-seek="'+seekTimePl+'" onclick="saveVideo(this); return false;"><i class="fa">&#xf196;</i> Add To Playlist</a>'+                        
                              '</b>'+
=======
                              '<a href="#" title="Set this music to my playlist" data-dur="'+duration+'" data-id="'+vidId+'" data-title="'+title+'" data-channel="'+channel+'" data-seek="'+seekTimePl+'" onclick="addList(this); return false;"><i class="fa">&#xf196;</i> Add To Playlist</a>'+
                            '</b>'+
>>>>>>> db6bb49a40e52b974702fd5a5ecb4e7c8e5235d3
                          '</div>'+
                        '</div>'+
                        '<div class="phone-list">'+
                          '<div class="row" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="playSong(this);return false;">'+
                            '<div class="col-md-12">'+
                              '<label title="Set this music to my playlist">Set to MyPlaylist</label>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>';
    return output;
}

//build pagination button
function pageBtn(prevPageToken, nextPageToken, index){
    if(!prevPageToken){
        var btnOutput ='<a class="fa" title="Previous" disabled>&#xf104;</a><b>1</b><a href="#" class="fa" title="Next" id="next-button" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">&#xf105;</a>';
    } else {
        var btnOutput ='<a href="#" class="fa" title="Previous" id="prev-button" data-token="'+prevPageToken+'" data-query="'+query+'" onclick="prevPage();">&#xf104;</a>'+
                       '<b>'+index+'</b>'+
                       '<a href="#" class="fa" title="Next" id="next-button" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">&#xf105;</a>';
    }
    return btnOutput;
}
var player;
function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          //host: 'https://www.youtube.com',
          height: '1px',
          width: '1px',
          enablejsapi: '1',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
          }
        });
      }
function onPlayerReady(event) {
        //event.target.playSong();
      }
function onPlayerError(event) {
        return nextSong();
      }
var timer;
function onPlayerStateChange(event) {
    if (event.data == 0) {
        //return false;
        $('#current').html('');
        $('#seek').val(0);
        return nextSong();
    }
    if(event.data==1) { // playing
        timer = setInterval(function(){
            var time = player.getCurrentTime();
            var currentSec = Math.floor(time);
            var current = parseInt(time / 60) + ':' + (currentSec % 60);
            //console.log(seek[i]);
            //console.log(current);
            var currentTag = document.getElementById("current");
            currentTag.innerHTML = current;
            if(state == 'playlist'){
                $('#seek').val(currentSec * (100 / seekPl[i]));
            }
            else{
                $('#seek').val(currentSec * (100 / seek[i]));
            }

        }, 1000); // 100 means repeat in 100 ms

    } else { // not playing
        clearInterval(timer);
    }
}

function stop() {
    player.stopVideo();
}

var lost;
function playSong(element) {
        $('#song-title').html('');
        var songId = $(element).data('id');
        var songTitle = $(element).data('title');
        var duration = $(element).data('dur');
        state = $(element).data('state');
        console.log(songId);
        console.log('state:',state);
        player.loadVideoById(songId, "small");
        if (state == 'playlist'){
            i = listPl.indexOf(songId);
            console.log('index playlist: ', i);
        }
        else{
            i = list.indexOf(songId);
        }
        //console.log(i);
        var titleText = '<small class="current">'+songTitle+'</small>';
        $('#song-title').append(titleText);
        var durationTag = document.getElementById("duration");
        durationTag.innerHTML = duration;

        document.title = 'MYOUSICS - '+songTitle;

        lost = 'stop';
        console.log(lost);
        buttonPlayPress(lost);
}

function saveVideo(element) {
    if(document.getElementById('session_trust') !== null){
        var songId = $(element).data('id');
        var titleSong = $(element).data('title');
        var channelSong = $(element).data('channel');
        var durationSong = $(element).data('dur');
        var seekSong = $(element).data('seek');

        //console.log(songId);
        $.ajax({
            url: "../db_access/db_login.php",
            method: "POST",
            data: { songId : JSON.stringify(songId), 
                    titleSong : JSON.stringify(titleSong), 
                    channelSong : JSON.stringify(channelSong), 
                    durationSong : JSON.stringify(durationSong),
                    seekSong : JSON.stringify(seekSong)
                },
            success:function(data){
                $('.playlist-item').load(' .playlist-item');
                
                alert('playlist already saved');
                //console.log(res);
            }
        });
        getDataJSON();
    }else{
        document.getElementById('md-account-login').style.display='block';
    }
    
}

function deletePlaylist(){
    $.ajax({
        url: "../db_access/db_login.php",
        method: "POST",
        data: { deleteAll : "tb_playlist_user" },
        success:function(data){
            $('.playlist-item').load(' .playlist-item');
            
            alert('All of your playlists were deleted');

            clearCustomArrays();
        }
    });
}


function viewData(){
    $.get('../user_page/index.php', function(data){
        $('tbody').class('playlist-item')
    })
}

function nextSong(){
    if(i == listPl.length || i == list.length){
        i = 0;
    }
    else{
        i = i+1;
    }
    if (state == 'playlist'){
        var songId = listPl[i];
        var songTitle = listPlTitle[i];
        var duration = listPlDur[i];
    }
    else{
        var songId = list[i];
        var songTitle = listTitle[i];
        var duration = listDur[i];
    }
    console.log(state);
    console.log(i);
    $('#song-title').html('');
    console.log(songId);
    //console.log(songTitle);
    //console.log(i);
    player.loadVideoById(songId, "small");
    var titleText = '<small class="current">'+songTitle+'</small>';
    var durationTag = document.getElementById("duration");
    durationTag.innerHTML = duration;
    var titleText = '<small class="current">'+songTitle+'</small>';
    $('#song-title').append(titleText);
    document.title = 'MYOUSICS - '+songTitle;
}
function prevSong(){
    if(i>0){
        i = i-1;
     } else {
         i = 0;
     }
    if (state == 'playlist'){
        var songId = listPl[i];
        var songTitle = listPlTitle[i];
        var duration = listPlDur[i];
    }
    else{
        var songId = list[i];
        var songTitle = listTitle[i];
        var duration = listDur[i];
    }
    console.log(state);
    $('#song-title').html('');
    console.log(songId);
    //console.log(i);
    player.loadVideoById(songId, "small");
    var titleText = '<small class="current">'+songTitle+'</small>';
    $('#song-title').append(titleText);
    var durationTag = document.getElementById("duration");
    durationTag.innerHTML = duration;
    document.title = 'MYOUSICS - '+songTitle;
}

function pause(){
    if(lost == 'play'){
      player.pauseVideo();
      buttonPlayPress(lost);
    }else if (lost == 'stop') {
      player.playSong();
      buttonPlayPress(lost);
    }
}

function seekSong(){
    if(state == 'playlist'){
        var seekVal = seekPl[i]*($('#seek').val() / 100);
    }
    else{
        var seekVal =seek[i]*($('#seek').val() / 100);
    }
    player.seekTo(seekVal);
    //console.log(seekVal);
}

//function for button play and pause
function buttonPlayPress(state) {
    var cls = document.getElementById('playpausebtn');
    if(state=='stop'){
      lost = 'play';
      cls.setAttribute('class','fa fa-pause');
    }
    else if(state=='play'){
      lost = 'stop';
      cls.setAttribute('class','fa fa-play');
    }
    console.log("button play pressed, play was "+state);
    console.log(state);
}

<<<<<<< HEAD
//get data selected query in php and encode to json, get data in this function for array
function getDataJSON(){
    var xmlhttp = new XMLHttpRequest();
    var url = "getdata_json.php";
=======
//PLAYLIST
function addList(element){
    var songId = $(element).data('id');
    var songTitle = $(element).data('title');
    var upBy = $(element).data('channel');
    var songDur = $(element).data('dur');
    var seekTimeP = $(element).data('seek');
    var listVal = '<div class="row">'+
                    '<div class="col-8">'+
                        '<span>'+
                            '<b>'+songTitle+'</b><br>'+
                            '<small>Uploaded by: '+upBy+'</small>'+
                        '</span>'+
                    '</div>'+
                    '<div class="col-3">'+
                        '<a href="#" class="fa" align="left" title="Play Music Playlist" data-state="playlist" data-dur="'+songDur+'" data-title="'+songTitle+'" data-id="'+songId+'" onclick="playSong(this);return false;">&#xf04b;</a>'+
                        '<i class="fa">&#xf142;</i>'+
                    '</div>'+
                '</div>';
    $('#playlist-item').append(listVal);
    listPl.push(songId);
    listPlTitle.push(songTitle);
    listPlDur.push(songDur);
    seekPl.push(seekTimeP);
    console.log(listPl);
    console.log(seekPl);
>>>>>>> db6bb49a40e52b974702fd5a5ecb4e7c8e5235d3

    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var myArr = JSON.parse(this.responseText);
            //console.log(myArr);
            myFunction(myArr);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(arr){
        var i;
        clearCustomArrays();

        for(i = 0; i < arr.length; i++){
            listPl.push(arr[i].id_song);
            listPlTitle.push(arr[i].title_song);
            listPlDur.push(arr[i].duration_song); 
            seekPl.push(arr[i].seek_song);
        }
        /* check index in array
            length = listPl.length;
            for (i = 0; i < length; i += 1) {
                if (Object.prototype.hasOwnProperty.call(listPl, i)) {
                    console.log(i, listPl[i]);
                }
            }
        */
    }
}


 //CONTEXT MENU FOR PLAYLIST
 var tableContextMenu = null;

 $(document).ready(function(){
     tableContextMenu = new ContextMenu("context-menu-items", menuItemClickListener);
     //tableContextMenu.disableMenuItem(1); propety for disable menu in index 1
 });

 function menuItemClickListener(menu_item, parent)
 {
     if(menu_item.text() == "Delete Item"){
         var result = confirm("Want to delete this item ?");
         
         if (result) {
             $.ajax({
                 url: "../db_access/db_login.php",
                 method: "POST",
                 data: { 
                     deleteItem : "tb_playlist_user",
                     dataId : parent.attr("data-id")
                     //songId : parent.attr("data-id-song")
                 },
                 success:function(data){
                     $('.playlist-item').load(' .playlist-item');
                     
                     alert('this item success to deleted');
                     
                     getDataJSON();
                 }
             });
         }
     }else if(menu_item.text() == "Details"){
         alert("Menu Item Clicked: " + menu_item.text() + "\nRecord ID: " + parent.attr("data-id-song"));
     }
 }

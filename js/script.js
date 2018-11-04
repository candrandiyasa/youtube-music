//prevent the form from submitting
$(function(){
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
})

//youtube API Key
var apiKey = 'AIzaSyBM7U5jft6XHLqfNfo1ZN3ZKg744gx_76w';

//required vars and arrays
var index=1, i=0;
var list = [], listTitle = [], listDur = [], seek = [];

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
                                seek.push(seekTime)
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
    var output ='<div class="col-md-10">'+
                  '<div class="content-album-play">'+
                    '<img src="'+img+'">'+
                    '<div class="row">'+
                      '<div class="col-md-12">'+
                        '<div class="row">'+
                          '<div class="col-md-12">'+
                            '<p data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="playVideo(this);return false;">'+title+'<br>'+
                              '<small>'+duration+' uploaded by '+channel+'</small>'+
                            '</p>'+
                            '<b class="md-back">'+
                              '<a href="#" title="Play this video music" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="playVideo(this);return false;"><i class="fa">&#xf01d;</i> Play</a>'+
                              '<a href="#" title="Set this music to my playlist"><i class="fa">&#xf196;</i> Set to MyPlaylist</a>'+
                            '</b>'+
                          '</div>'+
                        '</div>'+
                        '<div class="phone-list">'+
                          '<div class="row" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="playVideo(this);return false;">'+
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
        //event.target.playVideo();
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
            $('#seek').val(currentSec * (100 / seek[i]));

        }, 1000); // 100 means repeat in 100 ms

    } else { // not playing
        clearInterval(timer);
    }
}

function stop() {
    player.stopVideo();
}

var lost;
function playVideo(element) {
        $('#song-title').html('');
        var songId = $(element).data('id');
        var songTitle = $(element).data('title');
        var duration = $(element).data('dur');
        console.log(songId);
        //console.log(songTitle);
        player.loadVideoById(songId, "small");
        i = list.indexOf(songId);
        //console.log(i);
        var titleText = '<small class="current">'+songTitle+'</small>';
        $('#song-title').append(titleText);
        var durationTag = document.getElementById("duration");
        durationTag.innerHTML = duration;

        document.title = 'StreaMIX - '+songTitle;

        lost = 'stop';
        console.log(lost);
        buttonPlayPress(lost);
}

function nextSong(){
    if(i<10){
       i = i+1;
    } else {
        i = 9;
    }
    $('#song-title').html('');
    var songId = list[i];
    var songTitle = listTitle[i];
    var duration = listDur[i];
    console.log(songId);
    //console.log(songTitle);
    //console.log(i);
    player.loadVideoById(songId, "small");
    var titleText = '<small class="current">'+songTitle+'</small>';
    var durationTag = document.getElementById("duration");
    durationTag.innerHTML = duration;
    var titleText = '<small class="current">'+songTitle+'</small>';
    $('#song-title').append(titleText);
    document.title = 'StreaMIX - '+songTitle;
}
function prevSong(){
    if(i>0){
       i = i-1;
    } else {
        i = 0;
    }
    $('#song-title').html('');
    var songId = list[i];
    var songTitle = listTitle[i];
    var duration = listDur[i];
    console.log(songId);
    //console.log(i);
    player.loadVideoById(songId, "small");
    var titleText = '<small class="current">'+songTitle+'</small>';
    $('#song-title').append(titleText);
    var durationTag = document.getElementById("duration");
    durationTag.innerHTML = duration;
    document.title = 'StreaMIX - '+songTitle;
}
function pause(){
    player.pauseVideo();
    buttonPlayPress(lost);
}

function seekSong(){
    var seekVal = $('#seek').val() * (1000/seek[i]);
    player.seekTo(seekVal);
    //console.log(seekVal);
}

function buttonPlayPress(state) {
    var cls = document.getElementById('playpausebtn');
    if(state=='stop'){
      state='play';
      cls.setAttribute('class','fa fa-pause');
    }
    else if(state=='play'){
      state='stop';
      cls.setAttribute('class','fa fa-pause');
    }
    console.log("button play pressed, play was "+state);
    console.log(state);
}

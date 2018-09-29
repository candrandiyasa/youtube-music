$(function(){
    $('#search-form').submit(function(e){
        e.preventDefault();
    }); 
})

var apiKey = 'AIzaSyBM7U5jft6XHLqfNfo1ZN3ZKg744gx_76w';
var index=1, i=0;
var list = [], listTitle = [], listDur = [];
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function search(){
    //clr results
    $('#results').html('');
    $('#buttons').html('');
    //clear index array
    list = [];
    listTitle = [];
    listDur = [];
    //get input val
    query = $('#query').val();
    //GET request on Youtube API V3
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            q: query,
            type: 'video',
            maxResults: '40',
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
                                var dur = timeConv.format('mm:ss', {trim: false});
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
    list = [];
    //get input val
    query = $('#query').val();
    //GET request on Youtube API V3
    $.get(
        "https://www.googleapis.com/youtube/v3/search",{
            part: 'snippet, id',
            pageToken: token,
            q: query,
            type: 'video',
            maxResults: '40',
            key: apiKey},

            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;
                index = index + 1;
                console.log(data);
                console.log(index);
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
                                var dur = timeConv.format('mm:ss', {trim: false});
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
                //page buttons
                var buttons = pageBtn(prevPageToken, nextPageToken, index);
                $('#buttons').append(buttons);

            }
    );
}

// Previous page function
function prevPage() {
    var token = $('#prev-button').data('token');
    var q = $('#prev-button').data('query');
   // clear 
    $('#results').html('');
    $('#buttons').html('');
    //clear index array
    list = [];
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
            index = index - 1;
            // Log data
            console.log(data);
            console.log(index);
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
                                var dur = timeConv.format('mm:ss', {trim: false});
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
                '<p>'+title+'<br>'+
                '<small>'+duration+' uploaded by '+channel+'</small>'+
                '<b class="md-back">'+
                '<a href="#" title="Play this video music" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="playVideo(this);return false;"><i class="fa">&#xf01d;</i></a>'+
                '<a href="#" title="Set this music to my playlist"><i class="fa">&#xf196;</i></a>'+
                '</b></p></div></div></div></div>';
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
          videoId: 'M7lc1UVf-VE',
          enablejsapi: '1',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
function onPlayerReady(event) {
        //event.target.playVideo();
      }
var timer;
function onPlayerStateChange(event) {
    if (event.data == 0) {
        nextSong();
        return false;
        $('#current').html('');
    }
    if(event.data==1) { // playing
        timer = setInterval(function(){ 
            var time;
            time = player.getCurrentTime();
            var current = parseInt(time / 60) + ':' + Math.floor(time % 60);
            //console.log(current);
            var currentTag = document.getElementById("current");
            currentTag.innerHTML = current;
        }, 1000); // 100 means repeat in 100 ms
    } else { // not playing
        clearInterval(timer);
    }
}

function stop() {
    player.stopVideo();
}

function playVideo(element) {
        $('#currentSongTitle').html('');
        $('#duration').html('');
        var songId = $(element).data('id');
        var songTitle = $(element).data('title');
        var duration = $(element).data('dur');
        console.log(songId);
        console.log(songTitle);
        player.loadVideoById(songId, "small");
        i = list.indexOf(songId);
        console.log(i);
        var titleText = '<small class="current">'+songTitle+'</small>';
        $('#currentSongTitle').append(titleText);
        $('#duration').append(duration); 
        document.title = 'Project PPL - '+songTitle;

}
function nextSong(){
    if(i<40){
       i = i+1; 
    } else {
        i = 39;
    }
    $('#currentSongTitle').html('');
    var songId = list[i];
    var songTitle = listTitle[i];
    console.log(songId);
    console.log(songTitle);
    console.log(i);
    player.loadVideoById(songId, "small");
    var titleText = '<small class="current">'+songTitle+'</small>';
    $('#currentSongTitle').append(titleText);
    document.title = 'Project PPL - '+songTitle;
}
function prevSong(){
    if(i>0){
       i = i-1; 
    } else {
        i = 0;
    }
    $('#currentSongTitle').html('');
    var songId = list[i];
    var songTitle = listTitle[i];
    console.log(songId);
    console.log(i);
    player.loadVideoById(songId, "small");
    var titleText = '<small class="current">'+songTitle+'</small>';
    $('#currentSongTitle').append(titleText);
    document.title = 'Project PPL - '+songTitle;
}
function pause(){
    player.pauseVideo();
}
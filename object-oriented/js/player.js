//prevent the form from submitting
$(function(){
    $('#search-form').submit(function(e){
        e.preventDefault();
    });
})

var apiKey = 'AIzaSyBM7U5jft6XHLqfNfo1ZN3ZKg744gx_76w';
var list = [], listTitle = [], listDur = [], seek = [];
var i = 0;

//ECMAScript 6 classes
class SearchEngine{
	constructor(index, query){
		this.index = index;
		this.query = query;
	}

	search(){
		this.query = $('#query').val();
		//clr results
	    $('#results').html('');
	    $('#buttons').html('');
	    this.index = 1;
	    //clear index array
	    this.clearArrays();
	    if (!this.query){
	        var head = document.getElementById("res-header");
	        head.innerHTML = 'Trending';
	    } else {
	        var head = document.getElementById("res-header");
	        head.innerHTML = 'Search Results';
	    }
	    console.log(this.query);
	    //GET request on Youtube API V3
	    $.ajax({
	    	context: this,
	 		cache: false,
	 		data: $.extend({
				key: apiKey,
		 		q: this.query,
		 		part: 'snippet, id'
	 		}, {maxResults:10}),
	 		dataType: 'json',
	 		type: 'GET',
	 		timeout: 5000,
	 		url: 'https://www.googleapis.com/youtube/v3/search'
 		})
	    .done(function(data){
	        var nextPageToken = data.nextPageToken;
	        var prevPageToken = data.prevPageToken;
	        console.log(data);
	        console.log(nextPageToken);
	        console.log(prevPageToken);
	        var _this = this;
	        $.each(data.items, function(i, item){
	    		//get content details
	    		$.ajax({
			 		cache: false,
			 		data: $.extend({
						key: apiKey,
				 		part: 'contentDetails'
			 		}, {id: item.id.videoId}),
			 		dataType: 'json',
			 		type: 'GET',
			 		timeout: 5000,
			 		url: 'https://www.googleapis.com/youtube/v3/videos'
		 		})
	            .done(function(data){
                   // console.log(data);
                    $.each(data.items, function(j, details){
                        var listIds = item.id.videoId;
                        var listTitles = item.snippet.title;
                        var time = details.contentDetails.duration;
                        var timeConv = moment.duration(time);
                        var dur = timeConv.format('m:s', {trim: false});
                        console.log(dur);
                        var seekTime = timeConv.format('s', {trim: false});
                        list.push(listIds);
                        listTitle.push(listTitles);
                        listDur.push(dur);
                        seek.push(seekTime);
                        //console.log(seekTime);
                        //custom function to get request output
                        var output = _this.getOutput(item, details);
                        $('#results').append(output);
                    });
                });
				
	        });
	        //page buttons
	        var buttons =  this.pageBtn(prevPageToken, nextPageToken); //ini manggil fungsi pageBtn
	        $('#buttons').append(buttons);
	        data:data
	    });
	}

	clearArrays(){
	    list = [];
	    listTitle = [];
	    listDur = [];
	    seek = [];
	}

	nextPage(){
    var token = $('#next-button').data('token');
    var query = $('#next-button').data('query');
    //clr results
    $('#results').html('');
    $('#buttons').html('');
    //clear index array
    this.clearArrays();
    //get input val
    var index = this.index+=1;
    console.log(index);
    console.log(query);
    console.log('current: ',token);
    //GET request on Youtube API V3
    $.ajax({
	    	context: this,
	 		cache: false,
	 		data: $.extend({
				key: apiKey,
		 		q: query,
		 		pageToken: token,
		 		part: 'snippet, id'
	 		}, {maxResults:10}),
	 		dataType: 'json',
	 		type: 'GET',
	 		timeout: 5000,
	 		url: 'https://www.googleapis.com/youtube/v3/search'
 		})
	    .done(function(data){
	        var nextPageToken = data.nextPageToken;
	        var prevPageToken = data.prevPageToken;
	        console.log(data);
	        console.log('next: ',nextPageToken);
	        console.log('prev: ',prevPageToken);
	        var _this = this;
	        $.each(data.items, function(i, item){
	    		//get content details
	    	
	    		$.ajax({
			 		cache: false,
			 		data: $.extend({
						key: apiKey,
				 		part: 'contentDetails'
			 		}, {id: item.id.videoId}),
			 		dataType: 'json',
			 		type: 'GET',
			 		timeout: 5000,
			 		url: 'https://www.googleapis.com/youtube/v3/videos'
		 		})
	            .done(function(data){
                    //console.log(data);
                    $.each(data.items, function(j, details){
                        var listIds = item.id.videoId;
                        var listTitles = item.snippet.title;
                        var time = details.contentDetails.duration;
                        var timeConv = moment.duration(time);
                        var dur = timeConv.format('m:s', {trim: false});
                        var seekTime = timeConv.format('s', {trim: false});
                        _this.list.push(listIds);
                        _this.listTitle.push(listTitles);
                        _this.listDur.push(dur);
                        _this.seek.push(seekTime)
                        //console.log(seekTime);
                        //custom function to get request output
                        var output = _this.getOutput(item, details);
                        $('#results').append(output);
                    });
                });
				
	        });
                //page buttons
                var buttons = this.pageBtn(prevPageToken, nextPageToken, index);
                $('#buttons').append(buttons);
        });
    return index;
}

// Previous page function
prevPage() {
    var token = $('#prev-button').data('token');
    var query = $('#prev-button').data('query');
    //clr results
    $('#results').html('');
    $('#buttons').html('');
    //clear index array
    this.clearArrays();
    //get input val
    var index = this.index-=1;
    console.log(index);
    console.log(query);
    console.log('current: ',token);
    $.ajax({
	    	context: this,
	 		cache: false,
	 		data: $.extend({
				key: apiKey,
		 		q: query,
		 		pageToken: token,
		 		part: 'snippet, id'
	 		}, {maxResults:10}),
	 		dataType: 'json',
	 		type: 'GET',
	 		timeout: 5000,
	 		url: 'https://www.googleapis.com/youtube/v3/search'
 		})
	    .done(function(data){
	        var nextPageToken = data.nextPageToken;
	        var prevPageToken = data.prevPageToken;
	        console.log(data);
	        console.log('next: ',nextPageToken);
	        console.log('prev: ',prevPageToken);
	        var _this = this;
	        $.each(data.items, function(i, item){
	    		//get content details
	    		console.log(apiKey);
	    		$.ajax({
			 		cache: false,
			 		data: $.extend({
						key: apiKey,
				 		part: 'contentDetails'
			 		}, {id: item.id.videoId}),
			 		dataType: 'json',
			 		type: 'GET',
			 		timeout: 5000,
			 		url: 'https://www.googleapis.com/youtube/v3/videos'
		 		})
	            .done(function(data){
                    //console.log(data);
                    $.each(data.items, function(j, details){
                        var listIds = item.id.videoId;
                        var listTitles = item.snippet.title;
                        var time = details.contentDetails.duration;
                        var timeConv = moment.duration(time);
                        var dur = timeConv.format('m:s', {trim: false});
                        var seekTime = timeConv.format('s', {trim: false});
                        _this.list.push(listIds);
                        _this.listTitle.push(listTitles);
                        _this.listDur.push(dur);
                        _this.seek.push(seekTime)
                        //console.log(seekTime);
                        //custom function to get request output
                        var output = _this.getOutput(item, details);
                        $('#results').append(output);
                    });
                });
				
	        });
            var buttons = this.pageBtn(prevPageToken, nextPageToken, index);
            // Display buttons
            $('#buttons').append(buttons);
        });
    return index;
}
	
	//ini fungsi getOutputnya
	getOutput(item,details){
	    var vidId = item.id.videoId;
	    console.log(vidId);
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
	                            '<p data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="mPlayer.playSong(this);return false;">'+title+'<br>'+
	                              '<small>'+duration+' uploaded by '+channel+'</small>'+
	                            '</p>'+
	                            '<b class="md-back">'+
	                              '<a href="#" title="Play this video music" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="mPlayer.playSong(this);return false;"><i class="fa">&#xf01d;</i> Play</a>'+
	                              '<a href="#" title="Set this music to my playlist" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="playlist.addList(this);return false;"><i class="fa">&#xf196;</i> Set to MyPlaylist</a>'+
	                            '</b>'+
	                          '</div>'+
	                        '</div>'+
	                        '<div class="phone-list">'+
	                          '<div class="row" data-dur="'+duration+'" data-title="'+title+'" data-id="'+vidId+'" onclick="mPlayer.playSong(this);return false;">'+
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

	//ini fungsi pageBtnnya
	pageBtn(prevPageToken, nextPageToken, index){
	    if(!prevPageToken){
	        var btnOutput ='<a class="fa" title="Previous" disabled>&#xf104;</a><b>1</b><a href="#" class="fa" title="Next" id="next-button" data-token="'+nextPageToken+'" data-query="'+this.query+'" onclick="sengine.nextPage();">&#xf105;</a>';
	    } else {
	        var btnOutput ='<a href="#" class="fa" title="Previous" id="prev-button" data-token="'+prevPageToken+'" data-query="'+this.query+'" onclick="sengine.prevPage();">&#xf104;</a>'+
	                       '<b>'+index+'</b>'+
	                       '<a href="#" class="fa" title="Next" id="next-button" data-token="'+nextPageToken+'" data-query="'+this.query+'" onclick="sengine.nextPage();">&#xf105;</a>';
	    }
	    return btnOutput;
	}
}

class Player{
	constructor(player, songId, songTitle, duration){
		this.songId = songId;
		this.songTitle = songTitle;
		this.duration = duration;
		this.player = player;
	}
	onYouTubeIframeAPIReady() {
        this.player = new YT.Player('player', {
          //host: 'https://www.youtube.com',
          height: '1px',
          width: '1px',
          enablejsapi: '1',
          videoId: this.vidId,
          events: {
            'onStateChange': this.onPlayerStateChange,
            'onError': this.onPlayerError
          }
        });
    }

	onPlayerError(event) {
        return nextSong();
    }

	onPlayerStateChange(event) {
	
    if (event.data == 0) {
        //return false;
        $('#current').html('');
        $('#seek').val(0);
        this.nextSong();
    }/*
    var _this = this;
    if(event.data==1) { // playing
    	var time = _this.player.getCurrentTime();
        console.log(time);
    	/*var _this = this;
        var timer = setInterval(function(){
            var time = _this.player.getCurrentTime();
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
    	}*/
	}


	stop() {
    	this.player.stopVideo();
	}

	playSong(element) {
        $('#song-title').html('');
        this.songId = $(element).data('id');
        this.songTitle = $(element).data('title');
        this.duration = $(element).data('dur');
        console.log(this.songId);
        //console.log(songTitle);
        this.player.loadVideoById(this.songId, "small");
        i = list.indexOf(this.songId);
        //console.log(i);
        var titleText = '<small class="current">'+this.songTitle+'</small>';
        $('#song-title').append(titleText);
        var durationTag = document.getElementById("duration");
        durationTag.innerHTML = this.duration;

        document.title = 'StreaMIX - '+this.songTitle;

	}

	nextSong(){
	    if(i<10){
	       i = i+1;
	    } else {
	        i = 9;
	    }
	    $('#song-title').html('');
	    this.songId = list[i];
	    this.songTitle = listTitle[i];
	    this.duration = listDur[i];
	    console.log(this.songId);
	    //console.log(songTitle);
	    //console.log(i);
	    this.player.loadVideoById(this.songId, "small");
	    var titleText = '<small class="current">'+this.songTitle+'</small>';
	    var durationTag = document.getElementById("duration");
	    durationTag.innerHTML = this.duration;
	    var titleText = '<small class="current">'+this.songTitle+'</small>';
	    $('#song-title').append(titleText);
	    document.title = 'StreaMIX - '+this.songTitle;
	}

	prevSong(){
	    if(i>0){
	       i = i-1;
	    } else {
	        i = 0;
	    }
	    $('#song-title').html('');
	    this.songId = list[i];
	    this.songTitle = listTitle[i];
	    this.duration = listDur[i];
	    console.log(this.songId);
	    //console.log(i);
	    this.player.loadVideoById(this.songId, "small");
	    var titleText = '<small class="current">'+this.songTitle+'</small>';
	    $('#song-title').append(titleText);
	    var durationTag = document.getElementById("duration");
	    durationTag.innerHTML = this.duration;
	    document.title = 'StreaMIX - '+this.songTitle;
	}
}


//ini instansiasi doang gw taro biar tinggal kopas
let sengine = new SearchEngine(1,'');
let mPlayer = new Player('M7lc1UVf-VE');
mPlayer.onYouTubeIframeAPIReady();

class PlayList extends Player{
	constructor(player, songId){
		super(player);
		this.songId = songId;
		this.idList = [];
		i = 0;
	}

	addList(element) {
        this.songId = $(element).data('id');
        this.songTitle = $(element).data('title');
        this.duration = $(element).data('dur');
		console.log(this.songId);
		
        //console.log(songTitle);
        var listItem = '<div class="row">'+
							'<div class="col-8">'+
		  						'<span>'+
									'<b>'+this.songTitle+'</b>'+
		  						'</span>'+
							'</div>'+
							'<div class="col-3">'+
		  						'<a href="#" class="fa" align="left" title="Play Music Playlist" data-dur="'+this.duration+'" data-title="'+this.songTitle+'" data-id="'+this.songId+'" onclick="playlist.playSingle(this);return false;">&#xf04b;</a>'+
		  						'<i class="fa">&#xf142;</i>'+
							'</div>'+
							  '</div>';
		$('#playlist-items').append(listItem);
		this.idList.push(this.songId);

	}
	playSingle(element){
		$('#song-title').html('');
        this.songId = $(element).data('id');
        this.songTitle = $(element).data('title');
        this.duration = $(element).data('dur');
        console.log(this.songId);
        //console.log(songTitle);
        super.player.loadVideoById(this.songId, "small");
        this.i = list.indexOf(this.songId);
        //console.log(i);
        var titleText = '<small class="current">'+this.songTitle+'</small>';
        $('#song-title').append(titleText);
        var durationTag = document.getElementById("duration");
        durationTag.innerHTML = this.duration;

        document.title = 'StreaMIX - '+this.songTitle;
	}
}
let playlist = new PlayList('');
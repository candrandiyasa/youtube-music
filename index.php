<?php 
  include 'db_access/db_login.php'; 
  // Check if user is already logged in
  if ($data->is_logged_in()) {
    // Redirect logged in user to their home page
    $data->redirect('user_page/index.php');
  }  
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <title>MYOUSICS - Listen To Musics From Youtube</title>

  <link rel="icon" href="img/logo.png">

  <link rel="stylesheet" href="css/bootstrap-grid.min.css">
  <link rel="stylesheet" href="css/styleNew-min.css">

  <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>
<body onload="return search();">
  <!-- this start CONTAINER for Navbar responsive -->

    <nav class="navbar">
      <input type="checkbox" id="nav" class="hidden">
      <!-- this label for responsive menu screen max. 864px -->
      <label for="nav" class="nav-btn">
        <i></i>
        <i></i>
        <i></i>
      </label>
      <div class="logo">
        <img src="img/logo.png">
        <a href="#">mYouSics</a>
      </div>
      <div class="nav-wrapper">
        <ul>
          <li><a onclick="document.getElementById('md-account').style.display='block'">Create Acount</a></li>
          <li><a onclick="document.getElementById('md-account-login').style.display='block'">Log In</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </div>
    </nav>

    <div id="md-account" class="modal-create-account">
      <div class="modal-create-account-content">
        <div class="modal-container">
          <span onclick="document.getElementById('md-account').style.display='none'" class="modal-butt-close modal-topright">&times;</span>
          <br>
          <h1>Create New Account </h1>
          <small>Make your playlist music for free</small>
          <br><br>
          <div class="modal-container-middle">
            <form method="POST">
              <input type="text" placeholder="Your Username" name="username">
              <input type="password" placeholder="Your Password" style="float: left;" name="password">
              <input type="password" placeholder="Confirmation Password" style="float: right;" name="confirmpassword">
              <input type="email" placeholder="Your Email" name="email">
              <input type="submit" value="Sign Up" name="createaccount">
            </form>
            <br>
            <div style="text-align: center;">Already have an account? <a onclick="document.getElementById('md-account').style.display='none'; document.getElementById('md-account-login').style.display='block'">Log In</a></div>
            <br><br>
          </div>
        </div>
      </div>
    </div>

    <div id="md-account-login" class="modal-create-account">
      <div class="modal-create-account-content">
        <div class="modal-container">
          <span onclick="document.getElementById('md-account-login').style.display='none'" class="modal-butt-close modal-topright">&times;</span>
          <br>
          <h1>Log In </h1>
          <small>Make your playlist music for free</small>
          <br><br>
          <div class="modal-container-middle">
            <form method="POST">
              <input type="text" name="username" required="" placeholder="Username or Email">
              <input type="password" name="password" required="" placeholder="Your Password" style="float: left; width: 100%;">
              <input type="submit" value="Log In" name="login">
            </form>
            <br>
            <div style="text-align: center;">Don't have an account? <a onclick="document.getElementById('md-account-login').style.display='none'; document.getElementById('md-account').style.display='block'">Create Account</a></div>
            <br><br>
          </div>
        </div>
      </div>
    </div>


  <!-- this end CONTAINER for Navbar responsive -->

<div class="container-body">
  <!-- this start HEADER Content -->
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-sm-9" align="center" style="margin-top: 60px;">
        <h4>Discover your music from Youtube</h4>
      </div>
    </div>
    <div class="row">
      <div class="box">
        <div class="container-1">
          <span class="icon"><i class="fa fa-search"></i></span>
          <form id="search-form" onsubmit="return search();">
          <input type="search" id="query" placeholder="Search..." />
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- this end HEADER Content -->

  <br><br><br>

  <!-- this start NAVBAR Content -->
  <div class="container-custom">
    <div class="row justify-content-center">
      <div class="col-md-6">
      <div class="hidden-lg" id="player"></div>
        <b class="nav-log" id="res-header">Trending</b>
      </div>
    </div>
  </div>
  <!-- this end NAVBAR Content -->

</div>

  <div class="container-fluid"></br>
      <div class="row justify-content-center">
        <div class="col-sm-8">

          <!-- section 1 -->
          <div class="row justify-content-center" id="results">
            <!-- results deployed here-->
          </div>

        </div>
      </div>
      <!-- pagination-->
          <div class="row justify-content-center" style="padding-top: 30px">
            <div class="col-md-6" align="center">
              <div class="pagination-button" id="buttons">
                <!--button deployed here-->
              </div>
            </div>
          </div>
  </div>


  <div class="footer-cus">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-sm-5">
          <p>Informatics Students Of<br>
            Technology Institute Of Indonesia</p>
        </div>
        <div class="col-sm-5">
          <p align="right">Help (?)</p>
        </div>
      </div>
    </div>
  </div>

    <div class="playlist-container" id="playlist-container">
        <div class="row">
          <div class="col-md-12" style="margin-bottom: 40px;">
            <label>Your Playlist</label>
          </div>
        </div>
        <div class="playlist-item">
        
          <div class="row">
            <div class="col-8">
              <span>
                <b>Bring Me The Horizon - Mantra Bring Me The Horizon - Mantra</b><br>
                <small>by BringMeTheHorizonVevo</small>
              </span>
            </div>
            <div class="col-3">
              <a href="#" class="fa" align="left" title="Play Music Playlist">&#xf04b;</a>
              <i class="fa">&#xf142;</i>
            </div>
          </div>

        </div>
    </div>

 <div class="player-navbar">
    <div class="row justify-content-center">
      <div class="col-lg-3">
        <div class="player-content-left">
          <!--<a class="random">
            <i class="fa fa-random"></i>
          </a>-->
          <a href="#" class="prev" onclick="prevSong();return false;" id="prevBtn">
            <i class="fa fa-step-backward"></i>
          </a>
          <a href="#" class="play-pause" onclick="pause();return false;" id="pauseBtn">
            <i class="fa fa-play" id="playpausebtn"></i>
          </a>
          <a href="#" class="stop" onclick="stop();return false;" id="stopBtn">
            <i class="fa fa-stop"></i>
          </a>
          <a href="#" class="next" onclick="nextSong();return false;">
            <i class="fa fa-step-forward"></i>
          </a>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="player-content-time">
            <div class="time">
              <div class="row">
                <div class="col-lg-9">
                  <small class="title-player" id="song-title"></small><!-- current song title deployed here-->
                </div>
                <div class="col-lg-3" align="right">
                  <small class="current" id="current">0:0</small>
                  <small class="current"> / </small>
                  <small class="duration" id="duration">0:0</small>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12" >
                  <input type="range" min="0" max="100" class="slider" style="width: 100%; position: absolute; top: 5px; left: 0px; right: 0px; padding: 0px; margin: 0px;" id="seek" value="0" onclick="return seekSong();">
                </div>
              </div>
            </div>
        </div>
      </div>
      <div class="col-lg-2">
        <div class="player-content-left" style="padding-left: 0px; display: flex;">
          <i class="fa fa-volume-up" style="margin-top: 10px;" id="mute-toggle"></i>
          <input type="range" min="0" max="100" class="slider" id="volume-input" value="0" style="width: 70px; margin: 18px 0px 0px 8px;">
          <a class="playlist-menu" onclick="document.getElementById('md-account-login').style.display='block'">
            <i class="fa fa-th-list"></i>
          </a>
        </div>
      </div>
  </div>
<!--script src="https://www.youtube.com/iframe_api"></script-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.20.1/moment.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment-duration-format/1.3.0/moment-duration-format.min.js"></script>
<script type="text/javascript" src="js/script.js"></script>
<script src="js/main.js"></script>
</body>
</html>

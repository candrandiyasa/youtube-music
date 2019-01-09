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

    <div id="md-about" class="modal-create-account">
      <div class="modal-about-content">
        <div class="modal-container">
            <span onclick="document.getElementById('md-about').style.display='none'" class="modal-butt-close modal-topright">&times;</span>
            <br>
            <h1 align="center">About Us</h1>
            <center><small style="text-align: center;">Make your playlist music for free</small></center>
            <br><br>
            <div class="modal-container-middle">
                
                <div class="row justify-content-around">
                    <div class="col-lg-12">
                        <div class="row justify-content-around">
                            <div class="col-sm-3" style="text-align: center;">
                                <img src="img/about/ditto.jpg" class="imgabout" >
                                <label class="namephoto">Ditto</label>
                            </div>
                            <div class="col-sm-3" style="text-align: center;">
                                <img class="imgabout" src="img/about/ridwan.jpg">
                                <label class="namephoto">Ridwan</label>
                            </div>
                            <div class="col-sm-3" style="text-align: center;">  
                                <img class="imgabout" src="img/about/candra.jpg">
                                <label class="namephoto">Candra</label>
                            </div>
                        </div>
                    </div>
                </div>
                <br><br>

            </div>
        </div>
      </div>
    </div>
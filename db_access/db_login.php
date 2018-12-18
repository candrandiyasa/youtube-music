<?php
  include 'db_access.php';
  session_start();
  $data = new Databases;
  $message = '';

  if(isset($_POST["login"])){
      $field = array(
        'username_usr' => $_POST["username"],
        'pass_usr' => md5($_POST["password"])
      );

      if($data->required_validation($field)){
          if($data->select_data("tb_user_access", $field)){
              $get_user_data = $data->get_id_usr("tb_user_access", $_POST['username']);
              $_SESSION['id_usr'] = $get_user_data;
              $_SESSION["username"] = $_POST["username"];
              header("location:user_page/index.php");
          }else{
              $message = $data->error;
          }
      }else{
          $message = $data->error;
      }
  }
  
  else if(isset($_POST["createaccount"])){
      if($_POST["password"] == $_POST["confirmpassword"]){
          $field = array(
              'username_usr' => $_POST["username"],
              'pass_usr' => md5($_POST["password"]),
              'email_usr' => $_POST["email"]
          );
          if($data->required_validation($field)){
              if($data->create_data("tb_user_access", $field)){
                  $get_user_data = $data->get_id_usr("tb_user_access", $_POST['username']);
                  $_SESSION['id_usr'] = $get_user_data;
                  $_SESSION["username"] = $_POST["username"];
                  header("location:user_page/index.php");
              }else{
                  $message = $data->error;
              }
          }else{
              $message = $data->error;
          }
      }else{
          //echo"<script>alert('Password dan Confirmasi Password tidak sesuai');</script>";
      }
  }
  
  else if(isset($_GET['logout']) && ($_GET['logout'] == 'TRUE')){
      $data->log_out();
      $data->redirect('../index.php'); 
  }
  
  else if(isset($_POST['songId'])){
      $songId = $_POST['songId'];
      $titleSong = $_REQUEST['titleSong'];
      $channelSong = $_REQUEST['channelSong'];
      $durationSong = $_REQUEST['durationSong'];
      $songId = trim($songId,'"');
      $titleSong  = trim($titleSong ,'"');
      $channelSong = trim($channelSong,'"');
      $durationSong = trim($durationSong,'"');

      $data_check = array(
          'id_song' => $songId,
          'id_usr' => $_SESSION['id_usr']
      );

      $field = array(
        'id_song' => $songId,
        'title_song' => $titleSong,
        'channel_song' => $channelSong,
        'duration_song' => $durationSong,
        'id_usr' => $_SESSION['id_usr'],
        'date_save' => date("Y-m-d H:i:s")
      );

      if($data->select_data("tb_playlist_user", $data_check)){
            echo "can't add, this playlist already save in your playlist";
      }else{
            if($data->create_data("tb_playlist_user", $field)){
                echo "berhasil bro";
                echo "ini dia";
                echo $_SESSION['id_usr'];
            }else{
                echo "you have problem with save playlist, please try again";
            }
      }
  }

?>

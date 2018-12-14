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
      $songId = trim($songId,'"');

      $field = array(
          'id_song' => $songId,
          'id_usr' => $_SESSION['id_usr'],
          'date' => date("Y-m-d H:i:s")
      );
      if(!($data->select_data("tb_playlist_user", $field))){
          if($data->create_data("tb_playlist_user", $field)){
              echo "berhasil bro";
              echo "ini dia";
              echo $_SESSION['id_usr'];
          }else{
              echo "you have problem with save playlist, please try again";
          }
      }else{
          echo "can't add, this playlist already save in your playlist";
      }
  }

  //if($page=='add'){

    //try{
        /*$field = array(
          'id_song' => $_POST['songId'],
          'id_user' => 1,
          'date' => '2018-12-04'
        );
        $data->register_user("tb_playlist_user", $field);
        /*$stmt = $dbh->prepare("INSERT INTO crud VALUES(?,?,?,?,?)");
        $stmt->bindParam(1,$id);
        $stmt->bindParam(2,$nm);
        $stmt->bindParam(3,$em);
        $stmt->bindParam(4,$hp);
        $stmt->bindParam(5,$ad);
        if($stmt->execute()){
            print "<div class='alert alert-success' role='alert'>Data has been added</div>";
        } else{
            print "<div class='alert alert-danger' role='alert'>Failed to add data</div>";
    }*/ 
    //} catch(PDOException $e){
        //print "Error!: " . $e->getMessage() . "<br/>";
    //} 
  //}
?>

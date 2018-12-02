<?php
  include 'db_class.php';
  session_start();
  $data = new Databases;
  $message = '';

  if(isset($_POST["login"])){
    $field = array(
      'username_usr' => $_POST["username"],
      'pass_usr' => md5($_POST["password"])
    );
    if($data->required_validation($field)){
      if($data->can_login("tb_user_access", $field)){
        $_SESSION["username"] = $_POST["username"];
        header("location:user_page/index.php");
      }else{
        $message = $data->error;
      }
    }else{
      $message = $data->error;
    }
  }else if(isset($_POST["createaccount"])){
    if($_POST["password"] == $_POST["confirmpassword"]){
      $field = array(
        'username_usr' => $_POST["username"],
        'pass_usr' => md5($_POST["password"]),
        'email_usr' => $_POST["email"]
      );
      if($data->required_validation($field)){
        if($data->register_user("tb_user_access", $field)){
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
  }else if(isset($_GET['logout']) && ($_GET['logout'] == 'TRUE')){
    $data->log_out();
    $data->redirect('../index.php');  
  }else if(isset($_POST["songIdY"])){
    echo"<script>console.log(".$_POST["songIdY"].")</script>";
  }
?>

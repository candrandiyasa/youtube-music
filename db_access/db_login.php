<?php
  include 'db_class.php';
  session_start();
  $data = new Databases;
  $message = '';

  if(isset($_POST["login"])){
    $field = array(
      'username_usr' => $_POST["username"],
      'pass_usr' => $_POST["password"]
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

  }
?>

<?php
  include 'db_access.php';
  session_start();
  $data = new Databases;
  $message = '';
  $page = isset($_GET['p'])? $_GET['p'] : '';

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

  if($page=='add'){
    //try{
        $field = array(
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
  }
?>

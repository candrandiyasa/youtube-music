<?php
  //database
  class Databases{
    public $con;
    public $error;
    public function __construct(){
      $this->con = mysqli_connect("localhost", "root", "", "myousics_db");
      if(!$this->con){
        echo 'Database Connection Error'.mysqli_connect_error($this->con);
      }
    }

    public function required_validation($field){
      $count = 0;
      foreach($field as $key => $value){
        if(empty($value)){
          $count++;
          $this->error .= "<p>" . $key . " id required</p>";
        }
      }
      if($count == 0){
        return TRUE;
      }
    }

    public function can_login($table_name, $where_condition){
      $condition = '';
      foreach($where_condition as $key => $value){
        $condition .= $key . " = '".$value."' AND ";
      }
      $condition = substr($condition, 0, -5);
      /*
        this code will convert array to string like this
        input - array (
          'id' => '5'
        )
        output = id = '5'
      */
      $query = "SELECT * FROM ".$table_name." WHERE " . $condition;
      $result = mysqli_query($this->con, $query);
      if(mysqli_num_rows($result)){
        return TRUE;
      }else{
        $this->error = "Wrong Data";
      }
    }
  }
?>

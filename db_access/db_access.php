<?php
  class Databases{
    public $con;
    public $error;
    public function __construct(){
        $this->con = mysqli_connect("localhost", "root", "", "myousics_db");
        if(!$this->con){
            echo 'Database Connection Error'.mysqli_connect_error($this->con);
        }
    }
        
    public function redirect($url) {
      header("Location: $url");
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

    //SELECT DATA
    public function select_data($table_name, $where_condition){
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
        if(mysqli_num_rows($result) > 0){
            return TRUE;
        }else{
            $this->error = "Wrong Data";
          //echo "<script>alert('Username and password are not available, please enter again');</script>";
        }
    }
    
    //INSERT DATA
    public function create_data($table_name, $where_condition){
        $condition = '';
        $column = '';
        $val_sql = '';
        foreach($where_condition as $key => $value){
            $column .= ", ".$key;
            $val_sql .= ", '".$value."'";
        }
        $condition = substr($condition, 0);
        $column = substr($column, 1);
        $val_sql = substr($val_sql, 1);
      
        $query = "INSERT INTO ".$table_name."(". $column .") VALUES (" . $val_sql . ")";
        $result = mysqli_query($this->con, $query) or die(mysqli_connect_errno()."Data cannot inserted");
        if($result > 0){
            return TRUE;
        }else{
            $this->error = "Wrong Data";
        }
    }

    public function get_id_usr($table_name, $where){
        $query = "SELECT id_usr FROM " . $table_name . " WHERE username_usr = '" . $where . "'";
        $result = mysqli_query($this->con, $query);
        if($getid = mysqli_fetch_assoc($result) > 0){
            $feth = $getid;
            return $feth;
        }else{
            $this->error = "You have problem, cek your data";
            //echo "<script>alert('Username and password are not available, please enter again');</script>";
        }
    }

    public function select_query($table_name, $where){
        $query = "SELECT * FROM " . $table_name . " WHERE id_usr = '" . $where . "'";
        $result = mysqli_query($this->con, $query);
        
        return $result;
    }

/* FUNCTION FOR SESSION LOG IN AND LOG OUT*/ 
    // Check if the user is already logged in
    public function is_logged_in() {
        // Check if user session has been set
        if (isset($_SESSION['username'])) {
            return true;
        }
    }

    // Destroy and unset active session
    public function log_out() {
        session_destroy();
        unset($_SESSION['username']);
        unset($_SESSION['id_usr']);
        return TRUE;
    }
  }
?>

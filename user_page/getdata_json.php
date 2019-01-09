<?php 
include '../db_access/db_login.php';

$get_playlist_data = $data->select_query("tb_playlist_user", $_SESSION['id_usr']);

$playistArray = array();
if(mysqli_num_rows($get_playlist_data) > 0){
    while($show_data = mysqli_fetch_assoc($get_playlist_data)){
        $playistArray[] = $show_data;
    }
    echo json_encode($playistArray);
}
?>
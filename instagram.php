<?php
    $js_next_url = $_POST['js_next_url'];

    function get_feed($js_next_url) {
      $count = 4; // the number of photos you want to fetch
      $access_token = "338711336.5cf7fb1.bb7ae07ace0749e2ace259a2c726ba5d";
      $display_size = "thumbnail"; // you can choose between "low_resolution", "thumbnail" and "standard_resolution"
      if ($js_next_url == null || $js_next_url == "") {
        $next_url = "https://api.instagram.com/v1/users/338711336/media/recent/?count=" . $count . "&access_token=" . $access_token;
      } else {
        $next_url = $js_next_url;
      }
      
      /*while ($next_url != null) {*/
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $next_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 20);
        $result = curl_exec($ch);
        $result = json_decode($result);
        $final_json = "";

        $imgs = array();

        foreach ($result->data as $photo) {
            $img = $photo->images->{$display_size};
            $final_json = $final_json . "<li><a href='{$photo->link}'><img src='{$img->url}' /></a></li>";
            $imgs[] = "<a href='{$photo->link}' target='_blank'><img src='{$img->url}' /></a>";
        }
        $next_url = $result->pagination->next_url;
        $arr = array('next_url' => $next_url, 'result' => $final_json, 'imgs' => $imgs);
        return json_encode($arr);
    }
    echo get_feed($js_next_url);
    exit;

    
?>
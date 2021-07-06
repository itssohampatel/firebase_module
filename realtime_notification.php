<?php
    require('../include/services/functions.php');
	$fire=new Firebasetoken();
	$fire->data=$_POST;
	$response=$fire->get();
	if($response['status']=='success'){
    ?>
        <script>
	        var token='<?=$response['data'];?>';
	        var data={
	            title:'<?php echo $_POST['title']; ?>',
	            body:'<?php echo $_POST['body']; ?>',
	            token:'<?php echo $response['data']; ?>'
	        };
	        $.ajax({
                url:'/firebase/send_notification',
                method:'post',
                data:data,
                success:function(result,resposne){
                    console.log(result);
                }
            });
	    </script>
    <?php } ?>
?>
<?php
require('../include/services/functions.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
    <form action="/firebase/send_notification" method="post">
        <input type="text" name="title"/>
        <input type="text" name="body"/>
        <input type="hidden" name="token" id="token"/>
        <input type="submit"/>
    </form>
	<?php
	$fire=new Firebasetoken();
	$fire->data['id']='makk$2';
	$response=$fire->get();
	if($response['status']=='success'){
    ?>
        <script>
	        var token='<?=$response['data'];?>';
	        document.getElementById('token').value=token;
	    </script>
    <?php } ?>
</body>
</html>
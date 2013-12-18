<?php 

	// echo "<pre>";
	// var_dump($_FILES);
	// echo "</pre>";

	//图片上传后的临时文件
	$tmp = $_FILES['Filedata']['tmp_name'];

	//保存上传目录
	$path = 'uploads/';

	//截取文件扩展名
	$ext = strchr($_FILES['Filedata']['name'],'.');
	// echo $ext;

	//使用uniquid()获取唯一字符串 防止文件同名覆盖
	//保存文件名
	$save_name = uniqid().$ext;

	//移动上传的临时文件
	$result = move_uploaded_file($tmp, $path.$save_name);

	if($result){
		echo $save_name;
	}else{
		echo '0';
	}


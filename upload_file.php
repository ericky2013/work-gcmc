<?php 

	// echo "<pre>";
	// var_dump($_FILES);
	// echo "</pre>";

	//图片上传后的临时文件
	$tmp = $_FILES['Filedata']['tmp_name'];

	//保存上传目录
	$path_img = 'uploads/imgs/';
	$path_file = 'uploads/files/';

	//截取文件扩展名
	// $ext = strchr($_FILES['Filedata']['name'],'.');
	// echo $ext;

	//使用uniquid()获取唯一字符串 防止文件同名覆盖
	//保存文件名

	// Validate the file type
	$fileTypes = array('txt','doc','zip','rar','docx'); // File extensions
	
	$fileParts = pathinfo($_FILES['Filedata']['name']);
	//$fileParts['extension'] 取得文件后缀名
	if (in_array($fileParts['extension'],$fileTypes)) {   //如果上传的是符合的图片格式
		$save_name = uniqid().'.'.$fileParts['extension'];     //取得一个唯一的文件名
		$result = move_uploaded_file($tmp, $path_file.$save_name);  //移动到指定的路径
		if($save_name){
			echo $fileParts['extension'];
		}
	}else {												
		echo '0';
	}




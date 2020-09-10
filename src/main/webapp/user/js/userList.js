var flag = {
	userName : false,
	name : false,
	mobile : false,
	email : false,
	role : false
};
$(function() {
	// 验证用户名
	$("#userName").blur(checkUserName);
	// 验证姓名
	$("#name").blur(checkName);
	// 验证角色
	$("#role").blur(checkRole);
	// 验证手机号
	$("#phoneNumber").blur(checkMobile);
	// 验证邮箱
	$("#EMail").blur(checkEmail);
	var roleId = $("#roleId").val();
	$.post(basePath + "user-User-loadAllRole.action", {}, function(data) {
		category = data.data;
		$.each(category, function() {
			if (roleId == this.roleId) {
				$("#role").append(
						"<option selected = 'selected' value='" + this.roleId
								+ "'>" + this.name + "</option>");
			} else {
				$("#role").append(
						"<option value='" + this.roleId + "'>" + this.name
								+ "</option>");
			}
		});
	});
	$('#myModal').on('hide.bs.modal', function() {// 在调用 hide 后隐藏前触发
		$("#addForm")[0].reset();
		$('#check_userUserName').html("");
		$('#check_userName').html("");
		$('#check_userMobile').html("");
		$('#check_userEmail').html("");
		$('#check_userRole').html("");
	});
});
function resetPsw(userId) {
	if (!confirm("你确定要重置用户密码吗？")) {
		return false;
	}
	$.ajax({
		type : "post",
		url : "user-User-resetPsw.action",
		data : {
			userId : userId
		},
		dataType : "json",
		success : function(data) {
			alert(data.msg);
			$("#frmMain").submit();
		}
	});
}
// 验证用户名
var checkUserName = function() {
	var userName = $("#userName").val();
	var userId = $("#userId").val();
	if (userName) {
		$.ajax({
			type:"post",
			url:"user-User-checkUserName.action",
			async:false, 
			data:{
				userId:userId,
				userName:userName
			},
			dataType : "json",
			success : function(data) {
				if(data.msg=="0"){
					flag.userName = true;
					$('#check_userUserName').html('');
				}else{
					flag.userName = false;
					$('#check_userUserName').html('用户名重复！');
				}
			}
		});
		
	} else {
		flag.userName = false;
		$('#check_userUserName').html('用户名不能为空！');
	}
};
// 验证姓名
var checkName = function() {
	var name = $("#name").val();
	if (name) {
		flag.name = true;
		$('#check_userName').html('');
	} else {
		flag.name = false;
		$('#check_userName').html('姓名不能为空！');
	}
};
// 验证角色
var checkRole = function() {
	var role = $("#role").val();
	if (role) {
		flag.role = true;
		$('#check_userRole').html('');
	} else {
		flag.role = false;
		$('#check_userRole').html('请选择角色！');
	}
};
// 验证手机
var checkMobile = function() {
	var phoneNumber = $("#phoneNumber").val();
	if (phoneNumber) {
		if (!isMobile(phoneNumber)) {
			flag.mobile = false;
			$('#check_userMobile').html('手机号码格式不正确！');
			// return;
		} else {
			flag.mobile = true;
			$('#check_userMobile').html('');
		}
	} else {
		flag.mobile = false;
		$('#check_userMobile').html('手机号码不能为空！');
	}
};
// 验证邮箱
var checkEmail = function() {
	var eMail = $("#EMail").val();
	if (eMail) {
		if (!isEmail(eMail)) {
			flag.email = false;
			$('#check_userEmail').html('邮箱格式不正确！');
			// return;
		} else {
			flag.email = true;
			$('#check_userEmail').html('');
		}
	} else {
		flag.email = false;
		$('#check_userEmail').html('邮箱不能为空！');
	}
};
function toSave(){
	$("#myModalLabel").html("新增用户信息");
	$('#myModal').modal('toggle');
}
/**
 * 保存
 */
function save() {
	$("#submit").attr({"disabled":"disabled"});
	checkUserName();
	checkName();
	checkRole();
	checkMobile();
	checkEmail();
	if (flag.userName && flag.name && flag.role && flag.mobile && flag.email) {
		$.post(basePath + "user-User-saveUser.action", $("#addForm")
				.serialize(), function(data) {
			$('#myModal').modal('toggle');
			$("#submit").removeAttr("disabled");//将按钮可用
			alert("保存成功！");
			$("#frmMain").submit();
		});
	}
	$("#submit").removeAttr("disabled");//将按钮可用
}
/**
 * 修改
 * @param userId 用户id
 */
function update(userId){
	$("#myModalLabel").html("修改用户信息");
	$.ajax({
		type : "post",
		url : "user-User-selectUserByUserId.action",
		data : {
			userId : userId
		},
		dataType : "json",
		success : function(data) {
			data = data.data;
			$("#userId").val(data.userId);
			$("#password").val(data.password);
			$("#userName").val(data.userName);
			$("#name").val(data.name);
			$("#phoneNumber").val(data.phoneNumber);
			$("#EMail").val(data.EMail);
			$("#role").val(data.role.roleId);
			$("#status").val(data.status);
			$('#myModal').modal('toggle');
		}
	});
}
/**
 * 删除
 * @param userId
 */
function deleteUser(userId){
	if (!confirm("你确定要删除该用户？")) {
		return false;
	}
	$.ajax({
		type : "post",
		url : "user-User-deleteUser.action",
		data : {
			userId : userId
		},
		dataType : "json",
		success : function(data) {
			alert(data.msg);
			$("#frmMain").submit();
		}
	});
}
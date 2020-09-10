<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>用户</title>
<%@ include file="/commons/website.jsp"%>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/index.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css" />
<script type="text/javascript" src="<%=basePath%>js/index.js"></script>
<script type="text/javascript" src="<%=basePath%>user/js/userList.js"></script>
<script type="text/javascript">
	var userName = "<s:property value="#session.loginInfoBean.userName"/>";
</script>

</head>
<body>
	<div class="personnel">
		<div class="content">
			<div class="title-bj"></div>
			<h2 class="mb50">用户管理</h2>
			<button type="button" class="btn btn-info"
				style="width: 100px; margin-left: 20px;" onclick="toSave();">增加用户</button>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<s:form id="frmMain" name="frmMain"
				action="user-User-loadAllUser.action">
				<table class="mt10 ml20">
					<thead>
						<tr>
							<th>序号</th>
							<th>用户名</th>
							<th>姓名</th>
							<th>角色</th>
							<th>电话</th>
							<th>邮箱</th>
							<th>状态</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<s:iterator value="data" var="u" status="t">
							<tr>
								<td><s:property value="#t.count" /></td>
								<td><s:property value="#u.userName" /></td>
								<td class="fw"><s:property value="#u.name" /></td>
								<td><s:property value="#u.role.name" /></td>
								<td><s:property value="#u.phoneNumber" /></td>
								<td><s:property value="#u.EMail" /></td>
								<td><s:property value='#u.status' /></td>
								<td><a href="javascript:void(0);" title='编辑用户'
									style="border: none;"
									onclick="update('<s:property value="#u.userId"/>');"><i
										class="iconfont edit">&#xe605;</i></a> <!-- &nbsp;&nbsp;&nbsp;&nbsp;<a id="delete" href="javascript:void(0);" title='删除该用户' onclick="deleteUser('<s:property value="#u.userId"/>');"><i class="iconfont del" > &#xe606;</i></a> -->
									&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);"
									title='密码重置'
									onclick="resetPsw('<s:property value="#u.userId"/>');"><i
										class="iconfont del">&#xe607;</i></a>
									&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0);"
									title='删除用户'
									onclick="deleteUser('<s:property value="#u.userId"/>');"><i
										class="iconfont del">&#xe60a;</i></a></td>
							</tr>
						</s:iterator>

					</tbody>
				</table>
			</s:form>
			<!-- 模态框（Modal） -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
				aria-labelledby="myModalLabel" aria-hidden="true"
				data-backdrop="static">
				<div class="modal-dialog" style="width: 450px;">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">×</button>
							<h4 class="modal-title" id="myModalLabel"
								style="font-weight: bold;">新增用户</h4>
						</div>
						<div class="modal-body">
							<form id="addForm" name="addForm" method="post"
								action="<%=basePath%>user-User-saveUser.action">
								<input type="hidden" id="userId" name="user.userId">
								<input type="hidden" id="password" name="user.password">
								<div class="user-form">
									<label>用户名：</label> <input type="text" id="userName"
										name="user.userName" maxlength="25">&nbsp;&nbsp;<span
										style="color: red;">*</span>
									<div id="check_userUserName"
										style="color: red; width: 200px; height: 30px; margin-left: 100px; margin-top: -30px; position: relative;"></div>
									<label>姓名：</label> <input type="text" id="name"
										name="user.name" maxlength="25">&nbsp;&nbsp;<span
										style="color: red;">*</span>
									<div id="check_userName"
										style="color: red; width: 200px; height: 30px; margin-left: 100px; margin-top: -30px; position: relative;"></div>
									<label>手机：</label> <input type="text" id="phoneNumber"
										name="user.phoneNumber" maxlength="11">&nbsp;&nbsp;<span
										style="color: red;">*</span>
									<div id="check_userMobile"
										style="color: red; width: 200px; height: 30px; margin-left: 100px; margin-top: -30px; position: relative;"></div>
									<label>邮箱：</label> <input type="text" id="EMail"
										name="user.EMail" maxlength="50">&nbsp;&nbsp;<span
										style="color: red;">*</span>
									<div id="check_userEmail"
										style="color: red; width: 200px; height: 30px; margin-left: 100px; margin-top: -30px; position: relative;"></div>
									<label>角色：</label> <select id="role" name="user.role.roleId"
										style="width: 180px; height: 32px; line-height: 32px; margin-bottom: 25px;">
										<option value="">请选择</option>
									</select>&nbsp;&nbsp;<span style="color: red;">*</span>
									<div id="check_userRole"
										style="color: red; width: 200px; height: 30px; margin-left: 100px; margin-top: -28px; position: relative;"></div>
									<label>状态：</label> <select id="status" name="user.status"
										style="width: 180px; height: 32px; line-height: 32px; margin-bottom: 25px;">
										<option value="在职" selected="selected">在职</option>
										<option value="离职">离职</option>
									</select>&nbsp;&nbsp;<span style="color: red;">*</span><br>

								</div>
							</form>
						</div>
						<div class="modal-footer">
							<input type="button" id="submit" name="tijiao" class="btn btn-info"
								onclick="save();" style="margin-right: 160px;" value="保存">
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</body>
</html>
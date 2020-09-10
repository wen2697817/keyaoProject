<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>项目管理</title>
<%@ include file="/commons/website.jsp"%>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/index.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css" />
<link rel="stylesheet" type="text/css"
	href="<%=basePath%>js/uploadify/uploadify.css" />
<script
	src="<%=basePath%>js/jquery-validation-1.13.1/jquery.validate.min.js"></script>
<script
	src="<%=basePath%>js/jquery-validation-1.13.1/localization/messages_zh.min.js"></script>

<script type="text/javascript" src="<%=basePath%>js/index.js"></script>
<link rel="stylesheet"
	href="<%=basePath%>js/bootstrap-3.3.4-dist/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css" />
<script
	src="<%=basePath%>js/bootstrap-3.3.4-dist/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min.js"></script>
<script
	src="<%=basePath%>js/bootstrap-3.3.4-dist/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>

<script type="text/javascript"
	src="<%=basePath%>pmp/js/pmpList.js">
	
</script>
<!--  上传文件 -->
<script src="<%=basePath%>js/uploadify/jquery.uploadify.js"></script>
<style>
.slh {
	pointer-events: none;
	color: #afafaf;
	cursor: default
}

li.active>a, li.active>a:focus, li.active>a:hover {
	color: #FFFFFF;
	background-color: #31B0D5 !important;
	border-color: #ddd !important;
}

.addform_label {
	font-size: small;
	padding-top: 7px;
	text-align: right;
}

.uploadify_buttonClass {
	background: none repeat scroll 0 0 #5BC0DE;
	border-width: 0;
	font-size: 15px;
	color: #FFFFFF;
	font-weight: 500;
	border-radius: 6px;
	cursor: pointer;
	color: #FFFFFF;
	margin-top: 5px;
}

.uploadify:hover .uploadify_buttonClass {
	background: none repeat scroll 0 0 #31B0D5;
	border-width: 0;
	font-size: 15px;
	color: #FFFFFF;
	font-weight: 500;
	border-radius: 6px;
	cursor: pointer;
	margin-top: 5px;
}

.file_uploadify_buttonClass {
	background: none repeat scroll 0 0 #1891E0;
	border-width: 0;
	font-size: 15px;
	color: #FFFFFF;
	font-weight: 500;
	border-radius: 6px;
	cursor: pointer;
	color: #FFFFFF;
	margin-top: 5px;
}

.uploadify:hover .file_uploadify_buttonClass {
	background: none repeat scroll 0 0 #0C4789;
	border-width: 0;
	font-size: 15px;
	color: #FFFFFF;
	font-weight: 500;
	border-radius: 6px;
	cursor: pointer;
	margin-top: 5px;
}

.juz {
	text-align: center; /*设置水平居中*/
	vertical-align: middle; /*设置垂直居中*/
}

p {
	margin-top: 10px;
}

a:link {
	text-decoration: none;
}

a:visited {
	text-decoration: none;
}

a:hover {
	text-decoration: none;
}

a:active {
	text-decoration: none;
}

#loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	z-index: 15000;
}

#loading img {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 33px;
	height: 33px;
	margin-top: -15px;
	margin-left: -15px;
}
</style>
</head>
<body>
	<div id="loading">
	    <img src="<%=basePath%>img/loader.gif" width="33" alt="">
	</div>
	<input type="hidden" id="userId"
		value="<s:property value='#session.loginInfoBean.userId'/>" />
	<div class="order_list">
		<div class="content">
			<div class="title-bj"></div>
			<h2 class="mb50">项目管理</h2>
			<form id="frmMain" name="frmMain" action="" method="post">
				<input type="hidden" id="jurisdiction" name="jurisdiction"
					value="<s:property value="#session.loginInfoBean.userId"/>">
				<input type="hidden" id="roleId" name="roleId"
					value="<s:property value="#session.loginInfoBean.role.roleId"/>">
				<input type="hidden" id="rateProgress" name="rateProgress" value="'研发','调试'">
				<input type="hidden" name="pageVo.start" value="0">
				<div class="form-inline">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>项目代号：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 100px;" name="pmpCode"
						id="pmpCode"> <label>项目名称：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 150px;" name="pmpName"
						id="pmpName"><label>进度：</label>
					<div class="checkbox">
						<label> <input type="checkbox" id="have"
							onchange="javascript:$('#button').click();" checked> 研发
						</label>
					</div>
					&nbsp;&nbsp;
					<div class="checkbox">
						<label> <input type="checkbox" id="potential"
							onchange="javascript:$('#button').click();" checked>调试
						</label>
					</div>
					&nbsp;&nbsp;
					<div class="checkbox">
						<label> <input type="checkbox" id="not"
							onchange="javascript:$('#button').click();"> 完成
						</label>
					</div>
					<br> <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>开始时间：</label>
					<span class="input-group date form_date" style="width: 182px;">
						<input class="form-control" type="text"
						style="border-radius: 0px;" name="date1" id="date1"
						value="<s:property value="#session.date"/>" placeholder="起始日期"
						readonly> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon" style="border-radius: 0px;"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</span>&nbsp;—— <span class="input-group date form_date"
						style="width: 182px;"> <input class="form-control"
						type="text" style="border-radius: 0px;" name="date2" id="date2"
						value="<s:property value="#session.date"/>" placeholder="截止日期"
						readonly> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon" style="border-radius: 0px;"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</span><label>客户名称：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 150px;" name="customerName"
						id="customerName"><input type="button" class="btn btn-info"
						style="width: 80px; margin-left: 10px;" id="button" value="查询" />
					<button type="button" class="btn btn-info"
						style="width: 80px; margin-left: 10px;" onclick="toSave();">增加</button>
					<table class="ml20 mt10">
						<thead>
							<tr>
								<th>序号</th>
								<th>项目代号</th>
								<th>项目名称</th>
								<th>客户名称</th>
								<th>进度</th>
								<th>开始时间</th>
								<th>结束时间</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody id="tbody0">
						</tbody>

					</table>
				</div>
				<div class="page" style="margin-right: 5px;">
					<ul class="pagination pull-right" id="pageBar">
						<li><a href="javascript:void(0); ">&laquo;</a></li>
						<li class="active"><a href="javascript:void(0);">1</a></li>
						<li><a href="javascript:void(0);">&raquo;</a></li>
					</ul>
				</div>


			</form>
		</div>
	</div>

	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static" style="margin-top: 0;">
		<div class="modal-dialog" style="width: 1020px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel"
						style="font-weight: bold;">新增项目</h4>
				</div>
				<div class="modal-body" id="modalbody"
					style="height: 500px; overflow: auto;">
					<div id="outerdiv"
						style="position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.7); z-index: 2; width: 100%; height: 100%; display: none; text-align: center">
						<div id="innerdiv" style="margin: 0 auto;">
							<img id="bigimg" style="border: 5px solid #fff;" src="" />
						</div>
					</div>
					<form id="addForm" method="post">
						<input type="hidden" id="pmpId" name="pmp.pmpId">
						<input type="hidden" id="projectId" name="project.projectId">
						<input type="text" id="member" name="members"
							style="display: none;"> <input type="text" id="dynamic"
							name="dynamics" style="display: none;">
						<div class="row">

							<label class="col-xs-1 addform_label">项目代号</label>
							<div class="col-xs-2">
								<input type="text" class="form-control" id="pmpCode1"
									name="pmp.pmpCode" maxlength="25" >
							</div>
							<div
								style="position: absolute; margin-left: 240px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
							<label class="col-xs-1 addform_label">项目名称</label>
							<div class="col-xs-5">
								<input type="text" class="form-control" id="pmpName1"
									name="pmp.pmpName" maxlength="50">
							</div>
							<div
								style="position: absolute; margin-left: 740px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
							<label style="font-size: small; padding-top: 7px;"
								class="col-xs-1 addform_label">项目进度</label>
							<div class="col-xs-2">
								<select id="rateProgress1"
									name="pmp.rateProgress" class="form-control">
									<option value="研发" selected="selected">研发</option>
									<option value="调试">调试</option>
									<option value="完成">完成</option>
								</select>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label">客户名称</label>
							<div class="col-xs-5">
								<input type="text" class="form-control" id="customerName1"
									name="pmp.customerName" maxlength="50">
							</div>
							<label class="col-xs-1 addform_label">项目时间</label>
							<div class="col-xs-5">
								<input type="text" class="form-control form_date"
									style="width: 180px; display: inline;" id="startTime"
									name="pmp.startTime" placeholder="开始时间" readonly>
								至<input type="text" class="form-control form_date"
									style="width: 185px; display: inline;" id="endTime"
									name="pmp.endTime" placeholder="结束时间" readonly>
							</div>							
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
							<div class="col-xs-11">
								<textarea class="form-control" id="remark0"
									name="pmp.remark" maxlength="500" rows="3"></textarea>
							</div>
						</div>

						<legend
							style="font-size: small; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">联系人信息</legend>
						<!--表格-->

						<div>
							<a href='javascript:void(0);' id="addRowbtn" onclick=''><i
								class='iconfont edit'>&#xe610;</i>添加成员</a>
							<table class="table table-striped" id="reportTable">
								<thead>
									<tr>
										<th>姓名</th>
										<th>职务</th>
										<th>工作描述</th>
										<th id="caoz">操作</th>
									</tr>
								</thead>
								<tbody id="tbody1">
								</tbody>

							</table>
							<!--<table class="table table-striped table-hover" id="reportTable1"></table>-->
						</div>

						<legend
							style="font-size: small; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">项目动态</legend>
						<!--表格-->

						<div>
							<a href='javascript:void(0);' id="addDynamicRowbtn" onclick=''><i
								class='iconfont edit'>&#xe60b;</i>添加项目动态</a>
							<table class="table table-striped" id="dynamicTable">
								<thead>
									<tr>
										<th width="150px;">开始时间</th>
										<th width="150px;">结束时间</th>
										<th width="100px;">人员</th>
										<th width="400px;" style="">情况描述</th>
										<th>附件</th>
										<th style="display: none"></th>
										<th id="caoz1" style="width: 100px;">操作</th>
									</tr>
								</thead>
								<tbody id="tbody2">
								</tbody>

							</table>
							<!--<table class="table table-striped table-hover" id="reportTable1"></table>-->
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<input type="button" id="submit" class="btn btn-info"
						onclick="save();" style="margin-right: 460px; width: 100px;"
						value="保存">
				</div>
			</div>
		</div>
	</div>
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static" style="margin-top: 0px;">
		<div class="modal-dialog" id="modalDialog1" style="width: 650px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" onclick="closeTheModal();">×</button>
					<h4 class="modal-title" id="myModalLabel1"
						style="font-weight: bold;">新增项目人员</h4>
				</div>
				<div id="modalbody1" class="modal-body"
					style="height: 380px; overflow: auto;">
					<div id="outerdiv4"
						style="position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.7); z-index: 2; width: 100%; height: 100%; display: none; text-align: center">
						<div id="innerdiv4" style="margin: 0 auto;">
							<img id="bigimg4" style="border: 5px solid #fff;" src="" />
						</div>
					</div>
					<form id="addmemberForm" name="addmemberForm" method="post"
						action="">
						<input type="hidden" id="memberId" name="member.memberId">
						<input type="hidden" id="pmpId1" name="pmpId1">
						<div class="row">
							<label class="col-xs-2 addform_label">姓名：</label>
							<div class="col-xs-4">
								<input class="form-control" type="text" id="username"
									name="member.userName" maxlength="10" value="">
							</div>
							<div
								style="position: absolute; margin-left: 310px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
							<label class="col-xs-2 addform_label">职务：</label>
							<div class="col-xs-4">
								<input class="form-control" type="text" id="post"
									name="member.post" maxlength="15">
							</div>
							<div
								style="position: absolute; margin-left: 635px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-2 addform_label">工作描述：</label>
							<div class="col-xs-10">
								<textarea class="form-control" id="assignment"
									name="member.assignment" maxlength="250" rows="3"></textarea>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<input type="button" id="submit" class="btn btn-info"
						onclick="addTableRow();" style="margin-right: 160px;" value="确定">
				</div>
			</div>
		</div>
	</div>
	<!-- 模态框（Modal） -->
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static" style="margin-top: 0px;">
		<div class="modal-dialog" id="modalDialog2" style="width: 600px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" onclick="closeTheModal1();">×</button>
					<h4 class="modal-title" id="myModalLabel2"
						style="font-weight: bold;">新增项目动态</h4>
				</div>
				<div id="modalbody2" class="modal-body"
					style="height: 270px; overflow: auto;">
					<form id="addDynamicForm" name="addDynamicForm" method="post"
						action="">
						<input type="hidden" id="dynamicId" name="dynamic.dynamicId">
						<input type="hidden" id="pmpId2" name="pmpId2">
						<div class="row">
							<label class="col-xs-2 addform_label">时间：</label>
							<div class="col-xs-10">
								<input type="text" class="form-control form_date1"
									style="width: 200px; display: inline;" id="dynamicTime"
									name="dynamic.dynamicTime" placeholder="开始时间" readonly>
								至<input type="text" class="form-control form_date1"
									style="width: 200px; display: inline;" id="dynamicEndTime"
									name="dynamic.dynamicEndTime" placeholder="结束时间" readonly>
							</div>
							<div
								style="position: absolute; margin-left: 538px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-2 addform_label">人员：</label>
							<div class="col-xs-10">
								<input class="form-control" type="text" id="userName2"
									name="dynamic.userName" maxlength="25"
									value="<s:property value="#session.loginInfoBean.name"/>">
							</div>
							<div
								style="position: absolute; margin-left: 588px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-2 addform_label">情况描述：</label>
							<div class="col-xs-10">
								<textarea class="form-control" id="describe"
									name="dynamic.describes" maxlength="250" rows="3"></textarea>
							</div>
							<div
								style="position: absolute; margin-left: 588px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
						</div>
						<div class="row">
							<label class="col-xs-2 addform_label" style="padding-top: 10px;">附件：</label>
							<div class="col-xs-10"
								style="text-align: left; margin-top: 10px;">
								<div id="uploadify1"></div>
							</div>
						</div>
						<div class="row">
							<label class="col-xs-2 addform_label" style="padding-top: 10px;"></label>
							<div class="col-xs-10 tu">
								<ul id="imgList1">

								</ul>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<input type="button" id="submit" class="btn btn-info"
						onclick="addDynamicTableRow();" style="margin-right: 160px;"
						value="确定">
				</div>
			</div>
		</div>
	</div>
	<!-- 查看界面模态框（Modal） -->
	<div class="modal fade" id="myModal3" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static" style="margin-top: 0;">
		<div class="modal-dialog" style="width: 1020px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel3"
						style="font-weight: bold;">查看客户信息</h4>
				</div>
				<div class="modal-body" id="modalbody3"
					style="height: 500px; overflow: auto;">
					<div id="outerdiv3"
						style="position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.7); z-index: 2; width: 100%; height: 100%; display: none; text-align: center">
						<div id="innerdiv3" style="margin: 0 auto;">
							<img id="bigimg3" style="border: 5px solid #fff;" src="" />
						</div>
					</div>
					<div class="row">
						<label class="col-xs-1 addform_label">项目代号</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="pmpCode3" readonly="readonly">
						</div>
						<label class="col-xs-1 addform_label">项目名称</label>
						<div class="col-xs-5">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="pmpName3" readonly="readonly">
						</div>
						<label style="font-size: small; padding-top: 7px;"
							class="col-xs-1 addform_label">项目进度</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="rateProgress3"
								readonly="readonly">
						</div>
					</div>
					<br>
					<div class="row">
						<label class="col-xs-1 addform_label">客户名称</label>
						<div class="col-xs-5">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="customerName3" readonly="readonly">
						</div>
						<label class="col-xs-1 addform_label">项目时间</label>
						<div class="col-xs-5">
							<input type="text" class="form-control"
									style="width: 180px; display: inline;border: none; background-color: #fff;" id="startTime3" placeholder="开始时间" readonly>
								至<input type="text" class="form-control"
									style="width: 185px; display: inline;border: none; background-color: #fff;" id="endTime3" placeholder="结束时间" readonly>
						</div>
					</div>
					<br>
					<div class="row ">
						<label class="col-xs-1 addform_label" style="padding-top: 20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
							<div class="col-xs-11">
								<textarea style="border: none; background-color: #fff;" class="form-control" id="remark3" maxlength="500" rows="3" readonly="readonly"></textarea>
							</div>
					</div>
					<br>
					<legend
						style="font-size: small; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">
						项&nbsp;目&nbsp;成&nbsp;员<a href='javascript:void(0);' id="lxrA"
							onclick='unfold("lxrDiv","lxrImg","lxrA");' title="展开"><i
							id="lxrImg" class='iconfont edit'>&#xe613;</i></a><font id="lxr"></font>
					</legend>
					<!--表格-->

					<div id="lxrDiv" style="display: none;">
						<table class="table table-striped" id="reportTable3">
							<thead>
								<tr>
									<th>姓名</th>
									<th>职务</th>
									<th>工作描述</th>
								</tr>
							</thead>
							<tbody id="tbody3">
							</tbody>

						</table>
						<!--<table class="table table-striped table-hover" id="reportTable1"></table>-->
					</div>
					<legend
						style="font-size: small; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">
						项&nbsp;目&nbsp;动&nbsp;态<a href='javascript:void(0);' id="dynamicA"
							onclick='unfold("dynamicDiv","dynamicImg","dynamicA");'
							title="展开"><i id="dynamicImg" class='iconfont edit'>&#xe613;</i></a>
					</legend>
					<!--表格-->

					<div id="dynamicDiv" style="display: block;">
						<table class="table table-striped" id="dynamicTable3">
							<thead>
								<tr>
									<th width="150px;">开始时间</th>
									<th width="150px;">结束时间</th>
									<th width="100px;">人员</th>
									<th width="400px;">情况描述</th>
									<th>附件</th>
									<th style="display: none"></th>
								</tr>
							</thead>
							<tbody id="tbody32">
							</tbody>

						</table>
						<!--<table class="table table-striped table-hover" id="reportTable1"></table>-->
					</div>
				</div>
				<div class="modal-footer">
					<input type="button" class="btn btn-info" data-dismiss="modal"
						aria-hidden="true" style="margin-right: 460px; width: 100px;"
						value="关闭">
				</div>
			</div>
		</div>
	</div>
</body>
</html>
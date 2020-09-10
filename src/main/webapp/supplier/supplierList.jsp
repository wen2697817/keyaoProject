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
	src="<%=basePath%>supplier/js/supplierList.js">
	
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
			<h2 class="mb50">供应商管理</h2>
			<form id="frmMain" name="frmMain" action="" method="post">
				<input type="hidden" id="jurisdiction" name="jurisdiction"
					value="<s:property value="#session.loginInfoBean.userId"/>">
				<input type="hidden" id="roleId" name="roleId"
					value="<s:property value="#session.loginInfoBean.role.roleId"/>">
				<input type="hidden" name="pageVo.start" value="0">
				<div class="form-inline">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>供应商编号：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 100px;" name="supplierCode"
						id="supplierCode"> <label>供应商名称：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 150px;" name="supplierName"
						id="supplierName"><label>经营范围：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 150px;" name="scopeBusiness"
						id="scopeBusiness"><input type="button" class="btn btn-info"
						style="width: 80px; margin-left: 10px;" id="button" value="查询" />
					<button type="button" class="btn btn-info"
						style="width: 80px; margin-left: 10px;" onclick="toSave();">增加</button>
					<table class="ml20 mt10">
						<thead>
							<tr>
								<th>序号</th>
								<th>供应商编号</th>
								<th>供应商名称</th>
								<th>经营范围</th>
								<th>联系人</th>
								<th>电话</th>
								<th>维护人员</th>
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
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static" style="margin-top: 0;">
		<div class="modal-dialog" style="width: 800px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel"
						style="font-weight: bold;">新增供应商</h4>
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
						<input type="hidden" id="supplierId1" name="supplier.supplierId">
						<input type="hidden" id="userId1" name="supplier.user.userId">
						<input type="hidden" id="createTime" name="supplier.createTime">
						<div class="row">
							<label class="col-xs-1 addform_label">编号</label>
							<div class="col-xs-2">
								<input type="text" class="form-control" id="supplierCode1"
									name="supplier.supplierCode" maxlength="25" >
							</div>
							<div
								style="position: absolute; margin-left: 200px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
							<label class="col-xs-1 addform_label">名称</label>
							<div class="col-xs-8">
								<input type="text" class="form-control" id="supplierName1"
									name="supplier.supplierName" maxlength="50">
							</div>
							<div
								style="position: absolute; margin-left: 790px; margin-top: 5px;">
								<span style="color: red;">*</span>
							</div>
							
						</div>
						<br>
						<div class="row">
							<label style="font-size: small; padding-top: 7px;"
								class="col-xs-1 addform_label">范围</label>
							<div class="col-xs-5">
								<input type="text" class="form-control" id="scopeBusiness1"
									name="supplier.scopeBusiness" maxlength="50">
							</div>
							<label class="col-xs-1 addform_label">地址</label>
							<div class="col-xs-5">
								<input type="text" class="form-control" id="address1"
									name="supplier.address" maxlength="50">
							</div>
											
						</div>
						<br>
						
						<div class="row">
							<label class="col-xs-1 addform_label">姓名</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="linkmanName1"
									name="supplier.linkmanName" maxlength="10">
							</div>		
							<label class="col-xs-1 addform_label">固话</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="landlineTelephone"
									name="supplier.landlineTelephone" maxlength="15">
							</div>	
							<label class="col-xs-1 addform_label">手机</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="phoneNumber"
									name="supplier.phoneNumber" maxlength="11">
							</div>	
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 20px;">备注</label>
							<div class="col-xs-11">
								<textarea class="form-control" id="remark1"
									name="supplier.remark" maxlength="100" rows="3"></textarea>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">附件</label>
							<div class="col-xs-11"
								style="text-align: left; margin-top: 10px;">
								<div id="uploadify"></div>
							</div>
						</div>
						<div class="row">
							<label class="col-xs-2 addform_label" style="padding-top: 10px;"></label>
							<div class="col-xs-10 tu">
								<ul id="imgList">

								</ul>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<input type="button" id="submit" class="btn btn-info"
						onclick="save();" style="margin-right: 340px; width: 100px;"
						value="保存">
				</div>
			</div>
		</div>
	</div>
	<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true"
		data-keyboard="false" data-backdrop="static" style="margin-top: 0;">
		<div class="modal-dialog" style="width: 800px;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">×</button>
					<h4 class="modal-title" id="myModalLabel2"
						style="font-weight: bold;">查看供应商</h4>
				</div>
				<div class="modal-body" id="modalbody2"
					style="height: 500px; overflow: auto;">
					<div id="outerdiv"
						style="position: fixed; top: 0; left: 0; background: rgba(0, 0, 0, 0.7); z-index: 2; width: 100%; height: 100%; display: none; text-align: center">
						<div id="innerdiv" style="margin: 0 auto;">
							<img id="bigimg" style="border: 5px solid #fff;" src="" />
						</div>
					</div>
						<div class="row">
							<label class="col-xs-1 addform_label">编号</label>
							<div class="col-xs-2">
								<input type="text" class="form-control" id="supplierCode2" readonly="readonly" maxlength="25" >
							</div>
							<label class="col-xs-1 addform_label">名称</label>
							<div class="col-xs-8">
								<input type="text" class="form-control" id="supplierName2"
									readonly="readonly" maxlength="50">
							</div>
						</div>
						<br>
						<div class="row">
							<label style="font-size: small; padding-top: 7px;"
								class="col-xs-1 addform_label">范围</label>
							<div class="col-xs-5">
								<input type="text" class="form-control" id="scopeBusiness2"
									readonly="readonly" maxlength="50">
							</div>
							<label class="col-xs-1 addform_label">地址</label>
							<div class="col-xs-5">
								<input type="text" class="form-control" id="address2"
									readonly="readonly" maxlength="50">
							</div>
											
						</div>
						<br>
						
						<div class="row">
							<label class="col-xs-1 addform_label">姓名</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="linkmanName2"
									readonly="readonly" maxlength="10">
							</div>		
							<label class="col-xs-1 addform_label">固话</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="landlineTelephone2"
									readonly="readonly" maxlength="15">
							</div>	
							<label class="col-xs-1 addform_label">手机</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="phoneNumber2"
									readonly="readonly" maxlength="11">
							</div>	
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 20px;">备注</label>
							<div class="col-xs-11">
								<textarea class="form-control" id="remark2"
									nreadonly="readonly" maxlength="100" rows="3"></textarea>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 20px;">附件</label>
							<label class="col-xs-2 addform_label" style="padding-top: 10px;"></label>
							<div class="col-xs-10 tu">
								<ul id="imgList2">

								</ul>
							</div>
						</div>
				</div>
				<div class="modal-footer">
					<input type="button" id="submit" class="btn btn-info"
						onclick="save();" style="margin-right: 340px; width: 100px;"
						value="保存">
				</div>
			</div>
		</div>
	</div>
</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>日志管理</title>
<%@ include file="/commons/website.jsp"%>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/index.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>css/reset.css" />
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
	src="<%=basePath%>log/js/logList.js">
	
</script>
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
			<h2 class="mb50">日志管理</h2>
			<form id="frmMain" name="frmMain" action="" method="post">
				<input type="hidden" id="jurisdiction" name="jurisdiction"
					value="<s:property value="#session.loginInfoBean.userId"/>">
				<input type="hidden" id="roleId" name="roleId"
					value="<s:property value="#session.loginInfoBean.role.roleId"/>">
				<input type="hidden" name="pageVo.start" value="0">
				<div class="form-inline">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>客户代号：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 100px;" name="pmpCode"
						id="pmpCode"> <label>客户名称：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 150px;" name="pmpName"
						id="pmpName"> <label>操作人：</label><input
						class="form-control" type="text"
						style="border-radius: 0px; width: 100px;" name="userName"
						id="userName">
					<br> <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>创建时间：</label>
					<span class="input-group date form_date" style="width: 182px;">
						<input class="form-control" type="text"
						style="border-radius: 0px;" name="beginDate" id="beginDate"
						value="<s:property value="#session.date"/>" placeholder="起始日期"
						readonly> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon" style="border-radius: 0px;"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</span>&nbsp;—— <span class="input-group date form_date"
						style="width: 182px;"> <input class="form-control"
						type="text" style="border-radius: 0px;" name="endDate" id="endDate"
						value="<s:property value="#session.date"/>" placeholder="截止日期"
						readonly> <span class="input-group-addon"><span
							class="glyphicon glyphicon-remove"></span></span> <span
						class="input-group-addon" style="border-radius: 0px;"><span
							class="glyphicon glyphicon-calendar"></span></span>
					</span><input type="button" class="btn btn-info"
						style="width: 80px; margin-left: 10px;" id="button" value="查询" />
					<table class="ml20 mt10">
						<thead>
							<tr>
								<th>序号</th>
								<th>操作人</th>
								<th>操作内容</th>
								<th>客户代号</th>
								<th>客户名称</th>
								<th>创建时间</th>
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
						<label class="col-xs-1 addform_label">客户代号</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="pmpCode3" readonly="readonly">
						</div>
						<label class="col-xs-1 addform_label">客户名称</label>
						<div class="col-xs-5">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="pmpName3" readonly="readonly">
						</div>
						<label style="font-size: small; padding-top: 7px;"
							class="col-xs-1 addform_label">企业性质</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="enterpriseProperty3"
								readonly="readonly">
						</div>
					</div>
					<br>
					<div class="row">
						<label class="col-xs-1 addform_label">所属行业</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="industry3" readonly="readonly">
						</div>
						<label class="col-xs-1 addform_label">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</label>
						<div class="col-xs-5">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="pmpAddress3" readonly="readonly">
						</div>
						<label class="col-xs-1 addform_label">需求情况</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="conditionsDemand3" readonly="readonly">
						</div>
					</div>
					<br>
					<div class="row ">
						<label class="col-xs-1 addform_label">客户来源</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="source3" readonly="readonly">
						</div>
						<label class="col-xs-1 addform_label">网&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址</label>
						<div class="col-xs-5">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="url3" readonly="readonly">
						</div>
						<label class="col-xs-1 addform_label">隶&nbsp;&nbsp;属&nbsp;&nbsp;人</label>
						<div class="col-xs-2">
							<input style="border: none; background-color: #fff;" type="text"
								class="form-control" id="userName3" readonly="readonly">
						</div>
					</div>
					<br>
					<div class="row">
						<label class="col-xs-1 addform_label" style="padding-top: 20px;">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
						<div class="col-xs-11">
							<textarea style="border: none; background-color: #fff;"
								class="form-control" id="remark3" maxlength="250" rows="3"
								readonly="readonly"></textarea>
						</div>
					</div>

					<legend
						style="font-size: small; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">
						联系人信息<a href='javascript:void(0);' id="lxrA"
							onclick='unfold("lxrDiv","lxrImg","lxrA");' title="展开"><i
							id="lxrImg" class='iconfont edit'>&#xe613;</i></a><font id="lxr"></font>
					</legend>
					<!--表格-->

					<div id="lxrDiv" style="display: none;">
						<table class="table table-striped" id="reportTable3">
							<thead>
								<tr>
									<th>姓名</th>
									<th>性别</th>
									<th>年龄</th>
									<th>固话</th>
									<th>手机</th>
									<th>传真</th>
									<th>e_mail</th>
									<th>QQ</th>
									<th>爱好</th>
									<th>部门职务</th>
									<th>名片</th>
								</tr>
							</thead>
							<tbody id="tbody3">
							</tbody>

						</table>
						<!--<table class="table table-striped table-hover" id="reportTable1"></table>-->
					</div>
					<legend
						style="font-size: small; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">
						项&nbsp;目&nbsp;信&nbsp;息<a href='javascript:void(0);' id="projectA"
							onclick='unfold("projectDiv","projectImg","projectA");'
							title="展开"><i id="projectImg" class='iconfont edit'>&#xe613;</i></a>
					</legend>
					<div id="projectDiv" style="display: none;">
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 120px;">检测物品</label>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;">
								<div id="localImag31">
									<img class="pimg3" id="preview31"
										src="<%=basePath%>img/no_img.gif" width="150px" title=""
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="localImag32">
									<img class="pimg3" id="preview32"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="localImag33">
									<img class="pimg3" id="preview33"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="localImag34">
									<img class="pimg3" id="preview34"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="localImag35">
									<img class="fimg" id="preview35"
										src="<%=basePath%>img/no_file.gif" width="150px"
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;"></div>
						</div>
						<div class="row">
							<div class="col-xs-1"></div>
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">描述</label>
							<div class="col-xs-10">
								<textarea style="border: none; background-color: #fff;"
									readonly="readonly" class="form-control description"
									id="goodsDescription3" maxlength="250" rows="3"></textarea>
							</div>
						</div>

						<div class="row" style="background-color: #F7F7F7;">
							<label class="col-xs-1 addform_label" style="padding-top: 120px;">检测部位</label>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;">
								<div id="partlocalImag31">
									<img class="pimg3" id="partpreview31"
										src="<%=basePath%>img/no_img.gif" width="150px" title=""
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="partlocalImag32">
									<img class="pimg3" id="partpreview32"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="partlocalImag33">
									<img class="pimg3" id="partpreview33"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="partlocalImag34">
									<img class="pimg3" id="partpreview34"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="partlocalImag35">
									<img class="fimg" id="partpreview35"
										src="<%=basePath%>img/no_file.gif" width="150px"
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;"></div>
						</div>
						<div class="row" style="background-color: #F7F7F7;">
							<div class="col-xs-1"></div>
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">描述</label>
							<div class="col-xs-10">
								<textarea style="border: none; background-color: #F7F7F7;"
									readonly="readonly" class="form-control description"
									id="partDescription3" maxlength="250" rows="3"></textarea>
							</div>
						</div>



						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 120px;">次品</label>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;">
								<div id="inferiorlocalImag31">
									<img class="pimg3" id="inferiorpreview31"
										src="<%=basePath%>img/no_img.gif" width="150px" title=""
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="inferiorlocalImag32">
									<img class="pimg3" id="inferiorpreview32"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="inferiorlocalImag33">
									<img class="pimg3" id="inferiorpreview33"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="inferiorlocalImag34">
									<img class="pimg3" id="inferiorpreview34"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="inferiorlocalImag35">
									<img class="fimg" id="inferiorpreview35"
										src="<%=basePath%>img/no_file.gif" width="150px"
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;"></div>
						</div>
						<div class="row">
							<div class="col-xs-1"></div>
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">描述</label>
							<div class="col-xs-10">
								<textarea class="form-control description"
									style="border: none; background-color: #fff;"
									readonly="readonly" id="inferiorDescription3" maxlength="250"
									rows="3"></textarea>
							</div>
						</div>

						<div class="row" style="background-color: #F7F7F7;">
							<label class="col-xs-1 addform_label" style="padding-top: 120px;">速度</label>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;">
								<div id="speedlocalImag31">
									<img class="pimg3" id="speedpreview31"
										src="<%=basePath%>img/no_img.gif" width="150px" title=""
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="speedlocalImag32">
									<img class="pimg3" id="speedpreview32"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="speedlocalImag33">
									<img class="pimg3" id="speedpreview33"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="speedlocalImag34">
									<img class="pimg3" id="speedpreview34"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="speedlocalImag35">
									<img class="fimg" id="speedpreview35"
										src="<%=basePath%>img/no_file.gif" width="150px"
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;"></div>
						</div>
						<div class="row" style="background-color: #F7F7F7;">
							<div class="col-xs-1"></div>
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">描述</label>
							<div class="col-xs-10">
								<textarea style="border: none; background-color: #F7F7F7;"
									readonly="readonly" class="form-control description"
									id="speedDescription3" maxlength="250" rows="3"></textarea>
							</div>
						</div>

						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 120px;">精度</label>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;">
								<div id="precisionlocalImag31">
									<img class="pimg3" id="precisionpreview31"
										src="<%=basePath%>img/no_img.gif" width="150px" title=""
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="precisionlocalImag32">
									<img class="pimg3" id="precisionpreview32"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="precisionlocalImag33">
									<img class="pimg3" id="precisionpreview33"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="precisionlocalImag34">
									<img class="pimg3" id="precisionpreview34"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="precisionlocalImag35">
									<img class="fimg" id="precisionpreview35"
										src="<%=basePath%>img/no_file.gif" width="150px"
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;"></div>
						</div>
						<div class="row">
							<div class="col-xs-1"></div>
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">描述</label>
							<div class="col-xs-10">
								<textarea class="form-control description"
									style="border: none; background-color: #fff;"
									readonly="readonly" id="precisionDescription3" maxlength="250"
									rows="3"></textarea>
							</div>
						</div>

						<div class="row" style="background-color: #F7F7F7;">
							<label class="col-xs-1 addform_label" style="padding-top: 120px;">空间</label>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;">
								<div id="environmentlocalImag31">
									<img class="pimg3" id="environmentpreview31"
										src="<%=basePath%>img/no_img.gif" width="150px" title=""
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="environmentlocalImag32">
									<img class="pimg3" id="environmentpreview32"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="environmentlocalImag33">
									<img class="pimg3" id="environmentpreview33"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="environmentlocalImag34">
									<img class="pimg3" id="environmentpreview34"
										src="<%=basePath%>img/no_img.gif" width="150px" height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px; margin-left: 18px;">
								<div id="environmentlocalImag35">
									<img class="fimg" id="environmentpreview35"
										src="<%=basePath%>img/no_file.gif" width="150px"
										height="120px" />
								</div>
							</div>
							<div class="col-xs-2"
								style="text-align: center; margin-top: 10px;"></div>
						</div>
						<div class="row" style="background-color: #F7F7F7;">
							<div class="col-xs-1"></div>
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">描述</label>
							<div class="col-xs-10">
								<textarea class="form-control description"
									style="border: none; background-color: #F7F7F7;"
									readonly="readonly" id="environmentDescription3"
									maxlength="250" rows="3"></textarea>
							</div>
						</div>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 10px;">附件</label>
							<div class="col-xs-10 tu">
								<ul id="imgList3">

								</ul>
							</div>
						</div>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 30px;">备注</label>
							<div class="col-xs-11" style="padding-top: 10px;">
								<textarea class="form-control" id="remark31" maxlength="250"
									rows="3"></textarea>
							</div>
						</div>
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
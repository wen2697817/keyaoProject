<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>物料管理</title>
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
	src="<%=basePath%>purchase/js/purchaseList.js">
	
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
			<h2 class="mb50">物料管理</h2>
			<form id="frmMain" name="frmMain" action="" method="post">
				<input type="hidden" id="jurisdiction" name="jurisdiction"
					value="<s:property value="#session.loginInfoBean.userId"/>">
				<input type="hidden" id="roleId" name="roleId"
					value="<s:property value="#session.loginInfoBean.role.roleId"/>">
				<input type="hidden" name="pageVo.start" value="0">
				<div class="form-inline">
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>物料名称：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 100px;" name="materialName"
						id="materialName"> <label>规格型号：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 150px;" name="model"
						id="model"><label>所属项目：</label> <input
						class="form-control" type="text"
						style="border-radius: 0px; width: 150px;" name="pmpName"
						id="pmpName"><input type="button" class="btn btn-info"
						style="width: 80px; margin-left: 10px;" id="button" value="查询" />
					<button type="button" class="btn btn-info"
						style="width: 80px; margin-left: 10px;" onclick="toSave();">增加</button>
					<table class="ml20 mt10">
						<thead>
							<tr>
								<th>序号</th>
								<th>物料名称</th>
								<th>规格型号</th>
								<th>单位</th>
								<th>数量</th>
								<th>单价</th>
								<th>所属项目</th>
								<th>采购人员</th>
								<th>状态</th>
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
						style="font-weight: bold;">新增物料</h4>
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
						<input type="hidden" id="purchaseId1" name="purchase.purchaseId">
						<input type="hidden" id="userId1" name="purchase.user.userId">
						<input type="hidden" id="createTime" name="purchase.createTime">
						<div class="row">
							<label class="col-xs-1 addform_label">物料名称</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="materialName1"
									name="purchase.materialName" maxlength="25" data-bv-notempty="true" data-bv-notempty-message="不能为空">
							</div>
							<label class="col-xs-1 addform_label">规格型号</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="model1"
									name="purchase.model" maxlength="50">
							</div>
							<label class="col-xs-1 addform_label">项目</label>
							<div class="col-xs-3">
								<select class="form-control" id="pmpName1" name="purchase.pmpName">
									<option value="">请选择</option>
								</select>
							</div>
						</div>
						<br>
						<div class="row">
							<label style="font-size: small; padding-top: 7px;"
								class="col-xs-1 addform_label">单位</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="unit1"
									name="purchase.unit" maxlength="50">
							</div>
							<label class="col-xs-1 addform_label">数量</label>
							<div class="col-xs-3">
								<input type="number" class="form-control" id="amount1"
									name="purchase.amount" min="1" max="999" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
							</div>
							<label class="col-xs-1 addform_label">单价(元)</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="price1" name="purchase.price">
							</div>
						</div>
						<br>
						
						<div class="row">
							<label class="col-xs-1 addform_label">厂家</label>
							<div class="col-xs-3">
								<select class="form-control" id="supplierName1" name="purchase.supplierName">
										<option value="">请选择</option>
								</select>
							</div>	
							<label class="col-xs-1 addform_label">采购时间</label>
							<div class="col-xs-3">
								<input type="text" class="form-control form_date"
									style="display: inline;" id="startTime1"
									name="purchase.startTime" placeholder="开始时间" readonly>
							</div>	
							<label class="col-xs-1 addform_label">到货时间</label>
							<div class="col-xs-3">
								<input type="text" class="form-control form_date"
									style="display: inline;" id="endTime1"
									name="purchase.endTime" placeholder="结束时间" readonly>
							</div>	
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 20px;">备注</label>
							<div class="col-xs-11">
								<textarea class="form-control" id="memo1" name="purchase.memo" maxlength="100" rows="3"></textarea>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label">状态</label>
							<div class="col-xs-3">
								<select id="status1"
									name="purchase.status" class="form-control">
									<option value="未使用" selected="selected">未使用</option>
									<option value="已使用">已使用</option>
									<option value="损坏">损坏</option>
									<option value="维修">维修</option>
								</select>
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
						style="font-weight: bold;">查看物料</h4>
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
							<label class="col-xs-1 addform_label">物料名称</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="materialName2" readonly>
							</div>
							<label class="col-xs-1 addform_label">规格型号</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="model2" readonly>
							</div>
							<label class="col-xs-1 addform_label">项目</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="pmpName2" readonly>
							</div>
						</div>
						<br>
						<div class="row">
							<label style="font-size: small; padding-top: 7px;"
								class="col-xs-1 addform_label">单位</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="unit2" readonly>
							</div>
							<label class="col-xs-1 addform_label">数量</label>
							<div class="col-xs-3">
								<input type="number" class="form-control" id="amount2" readonly>
							</div>
							<label class="col-xs-1 addform_label">单价(元)</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="price2" readonly>
							</div>
						</div>
						<br>
						
						<div class="row">
							<label class="col-xs-1 addform_label">厂家</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="supplierName2" readonly>
							</div>	
							<label class="col-xs-1 addform_label">采购时间</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="startTime2" readonly>
							</div>	
							<label class="col-xs-1 addform_label">到货时间</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="endTime2" readonly>
							</div>	
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label" style="padding-top: 20px;">备注</label>
							<div class="col-xs-11">
								<textarea class="form-control" id="memo2"
									name="purchase.memo" maxlength="100" rows="3" readonly></textarea>
							</div>
						</div>
						<br>
						<div class="row">
							<label class="col-xs-1 addform_label">状态</label>
							<div class="col-xs-3">
								<input type="text" class="form-control" id="status2" readonly>
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
			</div>
		</div>
	</div>
</body>
</html>
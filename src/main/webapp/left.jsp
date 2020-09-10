<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<HTML >
	<HEAD>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<%@ include file="/commons/website.jsp" %>
	<link rel="stylesheet" type="text/css" href="<%=basePath %>css/index.css" />
		<link rel="stylesheet" type="text/css" href="<%=basePath %>css/reset.css" />
		<script type="text/javascript" src="<%=basePath %>js/index.js"></script>
		<base href="<%=basePath %>"/>
		<TITLE>功能菜单</TITLE>
	</HEAD>
	<script type="text/javascript">
	function user(){
		parent.window.frames['contentFrame'].location.href = basePath+"user-User-loadAllUser.action";
	}
	function pmp(){
		parent.window.frames['contentFrame'].location.href = basePath+"pmp/pmpList.jsp";
	}
	function report(){
		parent.window.frames['contentFrame'].location.href = basePath+"report/reportList.jsp";
	}
	function supplier(){
		parent.window.frames['contentFrame'].location.href = basePath+"supplier/supplierList.jsp";
	}
	function purchase(){
		parent.window.frames['contentFrame'].location.href = basePath+"purchase/purchaseList.jsp";
	}
	function log(){
		parent.window.frames['contentFrame'].location.href = basePath+"log/logList.jsp";
	}
	
	</script>
	<BODY >
	<div>
			<div class="left-menu">
				<ul>
					<li id="collect">
						<h4><span></span><i class="iconfont" >&#xe601;</i><a href="javascript:void(0)" onclick="pmp();">项目管理</a></h4>
					</li>
					<li id="collect2">
						<h4><span></span><i class="iconfont" >&#xe603;</i><a href="javascript:void(0)" onclick="report();">工作日志</a></h4>
					</li>
					<li id="collect3">
						<h4><span></span><i class="iconfont" >&#xe605;</i><a href="javascript:void(0)" onclick="pmp();">出差管理</a></h4>
					</li>
					<li id="collect4">
						<h4><span></span><i class="iconfont" >&#xe625;</i><a href="javascript:void(0)" onclick="supplier();">供应商管理</a></h4>
					</li>
					<li id="collect1">
						<h4><span></span><i class="iconfont" >&#xe602;</i><a href="javascript:void(0)" onclick="purchase();">采购管理</a></h4>
					</li>
					<s:if test='#session.loginInfoBean.role.roleId=="1"'>
						<li>
							<h4><span></span><i class="iconfont" >&#xe604;</i><a href="javascript:void(0)" onclick="user();">用户管理</a></h4>
						</li>
					</s:if>
					<li>
						<h4><span></span><i class="iconfont" >&#xe618;</i><a href="javascript:void(0)" onclick="log();">日志管理</a></h4>
					</li>
				</ul>	
			</div>
		</div>
	
	</BODY>
</HTML>

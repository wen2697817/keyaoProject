var pageBarHtml = null, pager = null;
var num = 1;
var flag = true;// 区分项目成员是列表中添加还是模态框中添加true是模态框false是数据列表新增
/**
 * 
 * @param a
 *            浏览按钮id
 * @param b
 *            缩略图id
 * @param c
 *            删除按钮id
 * @param d
 *            form表单隐藏提交的信息用于提交到后台
 */
function loadfile(a, b, c, d) {
	var buttonName = '选择图片';
	var fileType = '*.jpg;*.png;*.bmp;*.gif';
	var uploadify_buttonClass = "uploadify_buttonClass";
	var fileSize = 10485760;
	if (a.slice(-1) == '5') {// 上传文件
		buttonName = '选择文件';
		fileType = '*.*';
		uploadify_buttonClass = "file_uploadify_buttonClass";
		fileSize = 52428800;
	}
	var userId = $("#userId").val();
	$("#" + a).uploadify(
			{
				width : 76,
				height : 24,
				multi : false,
				swf : basePath + "js/uploadify/uploadify.swf",
				uploader : basePath + 'common-FileUpload-upload.action',
				cancelImg : basePath + "js/uploadify/uploadify-cancel.png",
				fileObjName : 'file',
				buttonText : buttonName,
				buttonClass : uploadify_buttonClass,
				fileTypeExts : fileType,
				auto : false,
				formData : {
					path : "upload/pmp/" + userId + "/"
				},
				onUploadSuccess : function(file, data, response) {
					var json = $.parseJSON(data);
					var filename = json.data;
					var dataforSql = "upload/pmp/" + userId + "/"
							+ filename;
					if (a.slice(-1) == '5') {// 上传文件
						$("#" + b).attr("src", basePath + "img/file.jpg");
					} else {
						$("#" + b).attr(
								"src",
								basePath + "upload/pmp/" + userId + "/"
										+ filename);
					}
					$("#" + b).attr("title",
							filename.substring(13, filename.length));
					$("#" + c).css("display", "block");
					$("#" + d).val(dataforSql);
				},
				onSelect : function(file, errorCode, errorMsg) {
					if (file.size > fileSize) {
						if (a.slice(-1) == '5') {// 上传文件
							alert("文件不能大于50M");
						} else {
							alert("图像不能大于10M");
						}
					} else {
						$('#' + a).uploadify('upload', '*')
					}
				}
			});
}
var array = [
		[ 'goods1', 'goods2', 'goods3', 'goods4', 'goods5', 'part1', 'part2',
				'part3', 'part4', 'part5', 'inferior1', 'inferior2',
				'inferior3', 'inferior4', 'inferior5', 'speed1', 'speed2',
				'speed3', 'speed4', 'speed5', 'precision1', 'precision2',
				'precision3', 'precision4', 'precision5', 'environment1',
				'environment2', 'environment3', 'environment4', 'environment5',
				'card1', 'card2' ],
		[ 'preview1', 'preview2', 'preview3', 'preview4', 'preview5',
				'partpreview1', 'partpreview2', 'partpreview3', 'partpreview4',
				'partpreview5', 'inferiorpreview1', 'inferiorpreview2',
				'inferiorpreview3', 'inferiorpreview4', 'inferiorpreview5',
				'speedpreview1', 'speedpreview2', 'speedpreview3',
				'speedpreview4', 'speedpreview5', 'precisionpreview1',
				'precisionpreview2', 'precisionpreview3', 'precisionpreview4',
				'precisionpreview5', 'environmentpreview1',
				'environmentpreview2', 'environmentpreview3',
				'environmentpreview4', 'environmentpreview5', 'cardpreview1',
				'cardpreview2' ],
		[ 'del1', 'del2', 'del3', 'del4', 'del5', 'partdel1', 'partdel2',
				'partdel3', 'partdel4', 'partdel5', 'inferiorpartdel1',
				'inferiorpartdel2', 'inferiorpartdel3', 'inferiorpartdel4',
				'inferiorpartdel5', 'speedpartdel1', 'speedpartdel2',
				'speedpartdel3', 'speedpartdel4', 'speedpartdel5',
				'precisionpartdel1', 'precisionpartdel2', 'precisionpartdel3',
				'precisionpartdel4', 'precisionpartdel5',
				'environmentpartdel1', 'environmentpartdel2',
				'environmentpartdel3', 'environmentpartdel4',
				'environmentpartdel5', 'carddel1', 'carddel2' ],
		[ 'goodsImg1', 'goodsImg2', 'goodsImg3', 'goodsImg4', 'goodsAccessory',
				'partImg1', 'partImg2', 'partImg3', 'partImg4',
				'partAccessory', 'inferiorImg1', 'inferiorImg2',
				'inferiorImg3', 'inferiorImg4', 'inferiorAccessory',
				'speedImg1', 'speedImg2', 'speedImg3', 'speedImg4',
				'speedAccessory', 'precisionImg1', 'precisionImg2',
				'precisionImg3', 'precisionImg4', 'precisionAccessory',
				'environmentImg1', 'environmentImg2', 'environmentImg3',
				'environmentImg4', 'environmentAccessory', 'cardImg1',
				'cardImg2' ] ];
$(function() {
	$("#modalbody").css("height", $(window).height() - 180);
	$("#modalbody3").css("height", $(window).height() - 180);
	$("#modalbody1").css("height", 200);
	$("#modalbody2").css("height", 400);
	$("#modalDialog1").css("margin-top",
			(($(window).height() - $("#modalbody1").height() - 180) / 2));
	$("#modalDialog2").css("margin-top",
			(($(window).height() - $("#modalbody2").height() - 180) / 2));
	for (var i = 0; i < 32; i++) {
		loadfile(array[0][i], array[1][i], array[2][i], array[3][i]);
	}
	var userId = $("#userId").val();
	$("#uploadify")
			.uploadify(
					{
						width : 100,
						height : 30,
						fileSizeLimit : "50MB",
						swf : basePath + "js/uploadify/uploadify.swf",
						uploader : basePath + 'common-FileUpload-upload.action',
						cancelImg : basePath
								+ "js/uploadify/uploadify-cancel.png",
						fileObjName : 'file',
						fileTypeExts : "*.*",
						buttonClass : "file_uploadify_buttonClass",
						fileTypeDesc : "请选择文件",
						buttonText : '选择文件',
						removeTimeout : 0,
						auto : true,
						formData : {
							path : "upload/pmp/" + userId + "/"
						},
						onUploadSuccess : function(file, data, response) {
							data = $.parseJSON(data);
							var html = '<li><span>'
									+ (data.data).substring(13,
											(data.data).length)
									+ '</span><input name="accessorys" type="hidden" value="upload/pmp/'
									+ userId
									+ '/'
									+ data.data
									+ '">&nbsp;&nbsp;&nbsp;&nbsp;<a class="mask" href="javascript:void(0);" title="删除"><i class="iconfont edit">&#xe612;</i></a></li>';
							$("#imgList").append(html);
						},
						onSelectError : function(file, errorCode, errorMsg) {
							this.queueData.errorMsg = "请选择小于50M的图像";
						}
					});
	$("#uploadify1")
			.uploadify(
					{
						width : 100,
						height : 30,
						multi : false,
						swf : basePath + "js/uploadify/uploadify.swf",
						uploader : basePath + 'common-FileUpload-upload.action',
						cancelImg : basePath
								+ "js/uploadify/uploadify-cancel.png",
						fileObjName : 'file',
						buttonText : "选择文件",
						buttonClass : "file_uploadify_buttonClass",
						fileTypeExts : "*.*",
						auto : false,
						formData : {
							path : "upload/dynamic/" + userId + "/"
						},
						onUploadSuccess : function(file, data, response) {
							data = $.parseJSON(data);
							var html = '<li><span>'
									+ (data.data).substring(13,
											(data.data).length)
									+ '</span><input id="accessory" name="dynamic.accessory" type="hidden" value="upload/dynamic/'
									+ userId
									+ '/'
									+ data.data
									+ '"><a class="mask" href="javascript:void(0);" title="删除"><i class="iconfont edit">&#xe612;</i></a></li>';
							$("#imgList1").children().remove();
							$("#imgList1").append(html);
						},
						onSelect : function(file, errorCode, errorMsg) {
							if (file.size > 104857600) {
								alert("文件不能大于100M");
							} else {
								$('#uploadify1').uploadify('upload', '*')
							}
						}
					});
	$(document).on("click", ".mask", function() {
		$(this).parent().remove();
	});
	$(".pimg").click(function() {
		var _this = $(this);// 将当前的pimg元素作为_this传入函数
		imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
	});
	$(".pimg3").click(function() {
		var _this = $(this);// 将当前的pimg元素作为_this传入函数
		imgShow("#outerdiv3", "#innerdiv3", "#bigimg3", _this);
	});
	$(".pimg4").click(function() {
		var _this = $(this);// 将当前的pimg元素作为_this传入函数
		imgShow("#outerdiv4", "#innerdiv4", "#bigimg4", _this);
	});
	$('.form_date').datetimepicker({
		format : 'yyyy-mm-dd',// 时间显示格式
		language : "zh-CN",
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		minView : 2,
		forceParse : 0
	}).on('hide', function(event) {
		event.preventDefault();
		event.stopPropagation();
	});
	$('.form_date1').datetimepicker({
		format : 'yyyy-mm-dd hh:00',// 时间显示格式
		language : "zh-CN",
		weekStart : 1,
		todayBtn : 1,
		autoclose : 1,
		todayHighlight : 1,
		startView : 2,
		minView : 1,
		showMeridian : true,
		forceParse : 0
	});
	// loadMealOrderForm();
	$("#button").click(function() {
		// 对date数据进行验证
		if ($("#date1").val() && $("#date2").val()) {
			var s1 = $("#date1").val();
			var s2 = $("#date2").val();
			if (s1 > s2) {
				alert("截止时间应大于起始时间");
				return;
			}
		}
		var schedule="";
		if($("#have").is(':checked')){
			schedule="'研发'";
		}
		if($("#potential").is(':checked')){
			if(schedule){
				schedule=schedule+",'调试'";
			}else{
				schedule="'调试'";
			}
		}
		if($("#not").is(':checked')){
			if(schedule){
				schedule=schedule+",'完成'";
			}else{
				schedule="'完成'";
			}
		}
		$("#rateProgress").val(schedule);
		loadOrderFormData();
	});
	$("#frmMain input[name='formType']").val(null);
	$("#frmMain input[name='formStatus']").val(null);
	$("#frmMain input[name='pageVo.start']").val("0");
	pageBarHtml = $("#pageBar").html();

	$(document).on("click", "#pageBar li:not(:first):not(:last) a", function() {
		var page = $(this).text();
		var start = (parseInt(page, 10) - 1) * pager.limit;
		num = start+1;
		if (start != $("#frmMain input[name='pageVo.start']").val()) {
			$("#frmMain input[name='pageVo.start']").val(start);
			$("#pageBar li:not(:first):not(:last)").removeClass();
			$(this).parent().addClass("active");
			loadOrderFormData(true);
			rePageBars(page, pager);
		}
	});

	$(document).on("click", "#pageBar li:first a", function() {

		if ($("#pageBar li:not(:first):not(:last)").size() <= 0) {
			return;
		}
		var curActive = $("#pageBar li:not(:first):not(:last).active a");
		var page = curActive.text();
		page = parseInt(page, 10);
		if (page == 1) {
			return;
		}
		page--;
		var start = (page - 1) * pager.limit;
		num = start+1;
		if (start != $("#frmMain input[name='pageVo.start']").val()) {
			$("#frmMain input[name='pageVo.start']").val(start);
			$("#pageBar li:not(:first):not(:last)").removeClass();
			$(curActive).parent().prev().addClass("active");
			loadOrderFormData(true);
			rePageBars(page, pager);
		}
	});

	$(document).on("click", "#pageBar li:last a", function() {

		if ($("#pageBar li:not(:first):not(:last)").size() <= 0) {
			return;
		}
		var curActive = $("#pageBar li:not(:first):not(:last).active a");
		var page = curActive.text();
		page = parseInt(page, 10);

		if (page == $("#pageBar li:not(:first):not(:last)").size()) {
			return;
		}
		page++;
		var start = (page - 1) * pager.limit;
		num = start+1;
		if (start != $("#frmMain input[name='pageVo.start']").val()) {
			$("#frmMain input[name='pageVo.start']").val(start);
			$("#pageBar li:not(:first):not(:last)").removeClass();
			$(curActive).parent().next().addClass("active");
			loadOrderFormData(true);
			rePageBars(page, pager);
		}
	});

	function labelBtnChange(btn) {
		$(btn).parent().children("button").removeClass("clickBtn");
		$(btn).addClass("clickBtn");
	}
	$.post(basePath + "user-User-findAllUser.action", {}, function(data) {
		var list = data.data;
		$.each(list, function() {
			$("#userName1").append(
					"<option value='" + this.userId + "'>" + this.name
							+ "</option>");
			$("#userName").append(
					"<option value='" + this.userId + "'>" + this.name
					+ "</option>");
		});
	});
	loadOrderFormData();
	$('#addRowbtn').click(function() {
		$("#myModalLabel1").html("新增项目成员");
		$('#myModal1').modal('toggle');
	});
	$('#addDynamicRowbtn').click(function() {
		$("#myModalLabel2").html("新增项目动态");
		$('#myModal2').modal('toggle');
	});
	$('#myModal').on('show.bs.modal', function() {// 在调用 show 方法后触发。

	});
	$('#myModal').on('hide.bs.modal', function() {// 在调用 hide 后隐藏前触发
		removeModalAllData();
		$("#pmpCode1").focus();
		$('#modalbody').prop('scrollTop', '0')
	});
	$('#myModal1').on('hide.bs.modal', function() {// 在调用 hide 后隐藏前触发
		removeModal1AllData();
	});
	$('#myModal3').on('hide.bs.modal', function() {// 在调用 hide 后隐藏前触发
		$('#modalbody3').prop('scrollTop', '0');
		$(document).find("a[name='download']").remove();
		$("#tbody3").children().remove();
		$("#tbody32").children().remove();
		$("#imgList3").children().remove();
		$('#pmpCode3').val("");
		$('#pmpName3').val("");
		$('#enterpriseProperty3').val("");
		$('#industry3').val("");
		$('#pmpAddress3').val("");
		$('#conditionsschedule3').val("");
		$('#source3').val("");
		$('#url3').val("");
		$('#userId3').val("");
		$('#userName3').val("");
		$('#remark3').val("");
		$("#lxr").html("");
		$("#lxrImg").html("&#xe613;");
		$("#lxrA").attr("title", "展开");
		$("#lxrDiv").css("display", "none");
		$("#projectImg").html("&#xe613;");
		$("#projectA").attr("title", "展开");
		$("#projectDiv").css("display", "none");
		$("#dynamicImg").html("&#xe614;");
		$("#dynamicA").attr("title", "折叠");
		$("#dynamicDiv").css("display", "block");
	});
});
function removeRow(rowIndex) {
	$('#reportTable').bootstrapTable('removeRow', rowIndex);
}
/**
 * 隐藏客户信息模态框后清空表单
 */
function removeModalAllData() {
	$("#tbody1").children().remove();
	$("#tbody2").children().remove();
	$("#imgList").children().remove();
	$(".pimg").attr("src", basePath + "img/no_img.gif");
	$(".fimg").attr("src", basePath + "img/no_file.gif");
	for (var i = 0; i < 32; i++) {
		$("#" + array[3][i]).val("");
	}
	$(".del").css("display", "none");
	$('#addForm')[0].reset();
}
/**
 * 隐藏基本信息模态框时触发
 */
function removeModal1AllData() {
	$('#addmemberForm')[0].reset();
	$('#cardImg1').val("");
	$('#cardImg2').val("");
	$(".pimg4").attr("src", basePath + "img/no_img.gif");
	$(".del").css("display", "none");
}
/**
 * 隐藏基本信息模态框时触发
 */
function removeModal2AllData() {
	$("#imgList1").children().remove();
	$('#addDynamicForm')[0].reset();
}
// 添加数据 并把表单内值传递给后台
function loadOrderFormData(rePageBarFlag) {
	$('#loading').show();
	if (!rePageBarFlag) {
		$("#frmMain input[name='pageVo.start']").val("0");
	}
	$.post(basePath + "pmp-Pmp-loadAllPmp.action", $("#frmMain")
			.serialize(), function(data) {
		if (data.code != "200") {
			alert("登录超时，请重新登录！！");
			window.parent.parent.location.href=basePath;
			return;
		}
		$("#tbody0").children().remove();
		var list = data.data[0];
		if (list.length <= 0) {
			$("#tbody0").append("<p>无数据</p>");
		} else {
			if(!rePageBarFlag){
				num = 1;
			}

			$.each(list, function(i) {

				appendRequire(this);

			});
		}
		if (!rePageBarFlag) {

			pager = data.data[1];
			rePageBar(pager);
		}
		$('#loading').hide();
	});
	
}
/**
 * 获得修改数据打开修改页面
 * 
 * @param pmpId
 */
function findEditData(pmpId) {
	$('#loading').show();
	$("#myModalLabel").html("修改客户信息");
	$
			.ajax({
				type : "post",
				url : "pmp-Pmp-findpmpById.action",
				data : {
					pmpId : pmpId
				},
				dataType : "json",
				success : function(data) {
					if (data.code != "200") {
						alert("登录超时，请重新登录！！");
						window.parent.parent.location.href=basePath;
						return;
					}
					data = data.data;
					if($("#roleId").val()!='1'){
						$('#caoz1').css("display", "none");
					}
					// 基本信息
					$('#pmpId').val(data.pmpId);
					$('#pmpCode1').val(data.pmpCode);
					$('#pmpName1').val(data.pmpName);
					$('#rateProgress1').val(data.rateProgress);
					$('#customerName1').val(data.customerName);
					$('#startTime').val(data.startTime.replace("T", " "));
					$('#endTime').val(data.endTime.replace("T", " "));
					$('#remark0').val(data.remark);
					var roleId = $("#roleId").val();
					// 项目成员
					var members = data.members;
					for ( var a in members) {
						var html = "<tr title='"
								+ members[a].assignment + "'>";
						html = html + "<td valign='middle'>"
								+ members[a].userName + "</td>";
						html = html + "<td>" + members[a].post + "</td>";
						html = html + "<td>" + members[a].assignment + "</td>";
						html = html
								+ "<td><a href='javascript:void(0);' onclick='editMember(this);'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='delMember(this);'>删除</a></td>";
						html = html + "</tr>";
						$("#tbody1").append(html);
					}
					// 动态
					var dynamics = data.dynamics;
					for ( var a in dynamics) {
						var fileName = "";
						var accessory = dynamics[a].accessory;
						if (accessory) {
							var filePaths = accessory.split("/");
							var fullfileName = filePaths[filePaths.length - 1];
							fileName = fullfileName.substring(13,
									fullfileName.length);
						}
						var html = "<tr>";
						html = html + "<td valign='middle'>"
								+ (dynamics[a].dynamicTime).replace("T", " ")
								+ "</td>";
						html = html
								+ "<td>"
								+ (dynamics[a].dynamicEndTime)
										.replace("T", " ") + "</td>";
						html = html + "<td>" + dynamics[a].userName + "</td>";
						html = html + "<td style='text-align: left;'>" + dynamics[a].describes + "</td>";
						html = html + "<td style='text-align: left;'>" + fileName + "</td>";
						html = html + "<td style='display:none'>" + accessory
								+ "</td>";
						if (roleId == '1') {
							html = html
									+ "<td><a href='javascript:void(0);' onclick='editDynamic(this);'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='delDynamic(this);'>删除</a></td>";
						}
						html = html + "</tr>";
						$("#tbody2").append(html);
					}
					// 项目基本信息
					var project = data.projects;
					$("#projectId").val(project[0].projectId);
					$("#goodsDescription").val(project[0].goodsDescription);
					$("#partDescription").val(project[0].partDescription);
					$("#inferiorDescription").val(
							project[0].inferiorDescription);
					$("#speedDescription").val(project[0].speedDescription);
					$("#precisionDescription").val(
							project[0].precisionDescription);
					$("#environmentDescription").val(
							project[0].environmentDescription);
					$("#remark1").val(project[0].remark);
					var arrayImg = [ project[0].goodsImg1,
							project[0].goodsImg2, project[0].goodsImg3,
							project[0].goodsImg4, project[0].goodsAccessory,
							project[0].partImg1, project[0].partImg2,
							project[0].partImg3, project[0].partImg4,
							project[0].partAccessory, project[0].inferiorImg1,
							project[0].inferiorImg2, project[0].inferiorImg3,
							project[0].inferiorImg4,
							project[0].inferiorAccessory, project[0].speedImg1,
							project[0].speedImg2, project[0].speedImg3,
							project[0].speedImg4, project[0].speedAccessory,
							project[0].precisionImg1, project[0].precisionImg2,
							project[0].precisionImg3, project[0].precisionImg4,
							project[0].precisionAccessory,
							project[0].environmentImg1,
							project[0].environmentImg2,
							project[0].environmentImg3,
							project[0].environmentImg4,
							project[0].environmentAccessory ];
					for (var i = 0; i < arrayImg.length; i++) {
						backfillFormImg(arrayImg[i], array[1][i], array[2][i],
								array[3][i]);
					}
					var accessorys = project[0].accessorys;
					for ( var i in accessorys) {
						var filePaths = (accessorys[i].accessoryPath)
								.split("/");
						var fileName = filePaths[filePaths.length - 1];
						var html = '<li><span>'
								+ fileName.substring(13, fileName.length)
								+ '</span><input name="accessorys" type="hidden" value="'
								+ accessorys[i].accessoryPath
								+ '">&nbsp;&nbsp;&nbsp;&nbsp;<a class="mask" href="javascript:void(0);" title="删除"><i class="iconfont edit">&#xe612;</i></a></li>';
						$("#imgList").append(html);
					}
					$('#myModal').modal('toggle');
					$('#loading').hide();
				}
			});

}
function readData(pmpId) {
	$('#loading').show();
	$
			.ajax({
				type : "post",
				url : "pmp-Pmp-findpmpById.action",
				data : {
					pmpId : pmpId
				},
				dataType : "json",
				success : function(data) {
					if (data.code != "200") {
						alert("登录超时，请重新登录！！");
						window.parent.parent.location.href=basePath;
						return;
					}
					data = data.data;
					// 基本信息
					$('#pmpCode3').val(data.pmpCode);
					$('#pmpName3').val(data.pmpName);
					$('#rateProgress3').val(data.rateProgress);
					$('#customerName3').val(data.customerName);
					$('#startTime3').val(data.startTime.replace("T", " "));
					$('#endTime3').val(data.endTime.replace("T", " "));
					var members = data.members;
					if (!members.length) {
						$("#lxrA").attr("onclick", "");
						$("#lxr").html("（无成员!）");
					} else {
						$("#lxrA").attr("onclick",
								"unfold('lxrDiv','lxrImg','lxrA');");
						for ( var a in members) {
							var html = "<tr title='"
									+ members[a].assignment + "'>";
							html = html + "<td>" + members[a].userName
									+ "</td>";
							html = html + "<td>" + members[a].post
									+ "</td>";
							html = html + "<td>" + members[a].assignment
									+ "</td>";
							html = html + "</tr>";
							$("#tbody3").append(html);
						}
					}
					// 动态
					var dynamics = data.dynamics;
					if (!dynamics.length) {
						$("#tbody32").append("<p>无数据</p>");
					} else {
						for ( var a in dynamics) {
							var fileName = "";
							var accessory = dynamics[a].accessory;
							if (accessory) {
								var filePaths = accessory.split("/");
								var fullfileName = filePaths[filePaths.length - 1];
								fileName = fullfileName.substring(13,
										fullfileName.length);
							}
							var html = "<tr>";
							html = html
									+ "<td valign='middle'>"
									+ (dynamics[a].dynamicTime).replace("T",
											" ") + "</td>";
							html = html
									+ "<td>"
									+ (dynamics[a].dynamicEndTime).replace("T",
											" ") + "</td>";
							html = html + "<td>" + dynamics[a].userName
									+ "</td>";
							html = html + "<td style='text-align: left;'>" + dynamics[a].describes
									+ "</td>";
							html = html + "<td style='text-align: left;'><a href='" + basePath
									+ "download.action?fileName=" + fileName
									+ "&pathName=" + accessory + "'>"
									+ fileName + "</a></td>";
							html = html + "<td style='display:none'>"
									+ accessory + "</td>";
							html = html + "</tr>";
							$("#tbody32").append(html);
						}
					}
					// 项目基本信息
					var project = data.projects;
					$("#goodsDescription3").val(project[0].goodsDescription);
					$("#partDescription3").val(project[0].partDescription);
					$("#inferiorDescription3").val(
							project[0].inferiorDescription);
					$("#speedDescription3").val(project[0].speedDescription);
					$("#precisionDescription3").val(
							project[0].precisionDescription);
					$("#environmentDescription3").val(
							project[0].environmentDescription);
					$("#remark31").val(project[0].remark);
					var arrayImg = [ project[0].goodsImg1,
							project[0].goodsImg2, project[0].goodsImg3,
							project[0].goodsImg4, project[0].goodsAccessory,
							project[0].partImg1, project[0].partImg2,
							project[0].partImg3, project[0].partImg4,
							project[0].partAccessory, project[0].inferiorImg1,
							project[0].inferiorImg2, project[0].inferiorImg3,
							project[0].inferiorImg4,
							project[0].inferiorAccessory, project[0].speedImg1,
							project[0].speedImg2, project[0].speedImg3,
							project[0].speedImg4, project[0].speedAccessory,
							project[0].precisionImg1, project[0].precisionImg2,
							project[0].precisionImg3, project[0].precisionImg4,
							project[0].precisionAccessory,
							project[0].environmentImg1,
							project[0].environmentImg2,
							project[0].environmentImg3,
							project[0].environmentImg4,
							project[0].environmentAccessory ];
					for (var i = 0; i < arrayImg.length; i++) {
						backfillFormImg(arrayImg[i], array[1][i], array[2][i],
								array[3][i], true);
					}
					var accessorys = project[0].accessorys;
					for ( var i in accessorys) {
						var accessoryPath = accessorys[i].accessoryPath;
						var filePaths = accessoryPath.split("/");
						var fileName = filePaths[filePaths.length - 1];
						var html = '<li><span><a href="' + basePath
								+ 'download.action?fileName='
								+ fileName.substring(13, fileName.length)
								+ '&pathName=' + accessoryPath + '">'
								+ fileName.substring(13, fileName.length)
								+ '</a></span></li>';
						$("#imgList3").append(html);
					}
					$('#loading').hide();
					$('#myModal3').modal('toggle');
				}
			});
}
/**
 * 回填项目基本图片附件
 * 
 * @param imgpath
 *            路径
 * @param preview
 *            显示图片id
 * @param del
 *            删除按钮
 */
function backfillFormImg(imgpath, preview, del, img, bl) {

	if (bl) {
		preview = preview.substring(0, preview.length - 1) + "3"
				+ preview.substring(preview.length - 1, preview.length);

		if (preview.slice(-1) == '5')
			$("#" + preview).attr("src", basePath + "img/no_file.gif");
		else
			$("#" + preview).attr("src", basePath + "img/no_img.gif");
	}
	if (imgpath) {
		if (!bl) {
			$("#" + img).val(imgpath);
		}
		var imgPaths = imgpath.split("/");
		var fileName = imgPaths[imgPaths.length - 1].substring(13,
				imgPaths[imgPaths.length - 1].length);
		$("#" + preview).attr("title", fileName);
		if (preview.slice(-1) == '5') {
			$("#" + preview).attr("src", basePath + "img/file.jpg");
		} else {
			$("#" + preview).attr("src", basePath + imgpath);
		}
		if (!bl) {
			$("#" + del).css("display", "block");
		} else {
			var a = "<a name='download' href='" + basePath
					+ "download.action?fileName=" + fileName + "&pathName="
					+ imgpath + "'>下载</a>";
			$("#" + preview).after(a);
		}
	}
}
// 拼接html
function appendRequire(form) {
	var jurisdiction = $("#jurisdiction").val();
	var roleId = $("#roleId").val();
	var userId = form[0];
	var html = "<tr><td>" + (num++) + "</td><td>" + form[2] + "</td>"
			+ "<td><a href='javascript:void(0);' onclick='readData(\""
			+ form[3] + "\");'>" + form[4] + "</a></td>"
			+ "<td>" + form[5] + "</td>";
	if(form[6]=='研发'){
		html = html+ "<td style='color: #4DB376;'>"
		+ form[6];
	}else if(form[6]=='调试'){
		html = html+ "<td style='color: #31B0D5;'>"
		+ form[6];
	}else{
		html = html+ "<td style='color: #C43C3C;'>"
		+ form[6];
	}
	var nowDate = new Date();
	var objDate1 = new Date(form[7]);
    var objDate2 = new Date(form[8]);
    var allDate = (objDate2.getTime() - objDate1.getTime()) / (24 * 60 * 60 * 1000);
    var nowCount =  (nowDate.getTime() - objDate1.getTime()) / (24 * 60 * 60 * 1000);
    var percentage = parseInt(nowCount/allDate*100);
	html = html+  "<progress max='"+allDate+"' value='"+nowCount+"' id='pg'></progress>"+percentage+"%</td>";
	html = html+  "<td>"
			+ (form[7]).replace("T", " ") + "</td>" + "<td>";
	html = html+ (form[8]).replace("T", " ") + "</td>" + "<td>";
	if (jurisdiction == userId || roleId == "1"|| roleId == "2") {
		html = html
				+ "<a href='javascript:void(0);' onclick='findEditData(\""
				+ form[3]
				+ "\");' title='修改信息'><i class='iconfont edit'>&#xe605;</i></a>"
				+ "&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='addmember(\""
				+ form[3]
				+ "\");' title='添加项目成员'><i class='iconfont edit'>&#xe60c;</i></a>"
				+ "&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	html = html
				+ "<a href='javascript:void(0);' onclick='addDynamic(\""
				+ form[3]
				+ "\");' title='添加项目动态'><i class='iconfont edit'>&#xe60b;</i></a>&nbsp;&nbsp;&nbsp;&nbsp;";
	html = html
			+ "<a href='javascript:void(0);' onclick='readData(\""
			+ form[3]
			+ "\");' title='查看详细信息'><i class='iconfont edit'>&#xe60d;</i></a></td> </tr>";
	$("#tbody0").append(html);

	oTable = document.getElementById("tab");// 找表格
	aTr = document.getElementsByTagName("tr");// 找所有的行
	for (var i = 0; i < aTr.length; i++) {
		if (i % 2 == 0) {
			aTr[i].style.background = "#fff";
		} else {
			aTr[i].style.background = "#EEEEEE";
		}
	}
}
// 进行分 ，循环输出页码。
var count = 4;
function rePageBar(page) {
	resetPageBar();
	var pageNum = Math.ceil(page.total / page.limit);
	pageNum = pageNum == 0 ? 1 : pageNum;
	var flag1 = false;
	for (var i = 1; i < pageNum; i++) {
		if (count <(i + 1) && (i + 1) < pageNum) {
			if (!flag1) {
				$('<li><a href="javascript:void(0);" class="slh">...</a></li>')
						.insertBefore("#pageBar li:last");
				flag1 = true;
			}
		} else {
			$('<li><a href="javascript:void(0);">' + (i + 1) + '</a></li>')
					.insertBefore("#pageBar li:last");
		}
	}

}
function rePageBars(page, pager) {
	resetPageBar();
	var nowPage=page;
	var pageNum = Math.ceil(pager.total / pager.limit);
	pageNum = pageNum == 0 ? 1 : pageNum;
	var leftCount = page - 1;// 左侧3
	var rightCount = pageNum - page;// 右侧5
	//左侧的分页
	if (leftCount <= count) {//左侧数量小于4最多显示页
		for (var i = 1; i <= leftCount; i++) {
			$('<li><a href="javascript:void(0);">' + (i + 1) + '</a></li>')
					.insertBefore("#pageBar li:last");
		}
	} else {//大于一次最多显示页
		var flag1 = false;
		var d = page - count;// 2个需要转为...
		nowPage = 5;
		for (var i = 1; i <= leftCount; i++) {
			if (i <= d) {
				if (!flag1) {
					$(
							'<li><a href="javascript:void(0);" class="slh">...</a></li>')
							.insertBefore("#pageBar li:last");
					flag1 = true;
				}
			} else {
				$('<li><a href="javascript:void(0);">' + (i + 1) + '</a></li>')
						.insertBefore("#pageBar li:last");
			}
		}
	}
	if (rightCount <= count) {
		for (var i = page; i < pageNum; i++) {
			$(
					'<li><a href="javascript:void(0);">' + (Number(i) + 1)
							+ '</a></li>').insertBefore("#pageBar li:last");
		}
	} else {
		var flag1 = false;
		var d = rightCount - count + 1;// 2
		for (var i = page; i < pageNum; i++) {
			if ((Number(i) + 1) >= (Number(pageNum) - Number(d))
					&& i < Number(pageNum) - 1) {
				if (!flag1) {
					$(
							'<li><a href="javascript:void(0);" class="slh">...</a></li>')
							.insertBefore("#pageBar li:last");
					flag1 = true;
				}
			} else {
				$(
						'<li><a href="javascript:void(0);">' + (Number(i) + 1)
								+ '</a></li>').insertBefore("#pageBar li:last");
			}
		}

	}
	$("#pageBar li:not(:first):not(:last)").removeClass();
	// alert(page);
	$("#pageBar li:eq(" + nowPage + ")").addClass("active");
}

function resetPageBar() {
	$("#pageBar").html(pageBarHtml);
}

function onclickUpload(doc) {
	$("#" + doc).click();
}
function setXiaZValue() {
	var file = $("#project").val();
	var fileName = getFileName(file);
	$("#projectxiaZ").html(fileName);
}
/**
 * 
 * @param sr1
 *            文件上传框
 * @param sr2
 *            删除按钮
 * @param sr3
 *            缩略图
 * @param sr4
 *            form表单隐藏提交的信息id用于提交到后台
 */
function del(sr1, sr2, sr3, str4) {
	$("#" + sr3).attr("title", "");
	$("#" + str4).val("");
	if (sr1.slice(-1) == '5')
		$("#" + sr3).attr("src", "../img/no_file.gif");
	else
		$("#" + sr3).attr("src", "../img/no_img.gif");
	$("#" + sr1).val("");
	$("#" + sr2).css("display", "none");
}
/*
 * 获得上传文件的名称
 */
function getFileName(o) {
	var pos = o.lastIndexOf("\\");
	return o.substring(pos + 1);
}
function imgShow(outerdiv, innerdiv, bigimg, _this) {

	var src = _this.attr("src");// 获取当前点击的pimg元素中的src属性
	if (src == '/keyaoProject/img/no_img.gif' || src == '../img/no_img.gif')
		return;
	$(bigimg).attr("src", src);// 设置#bigimg元素的src属性

	/* 获取当前点击图片的真实大小，并显示弹出层及大图 */

	$("<img/>").attr("src", src).load(function() {

		var windowW = $(window).width();// 获取当前窗口宽度

		var windowH = $(window).height();// 获取当前窗口高度

		var realWidth = this.width;// 获取图片真实宽度

		var realHeight = this.height;// 获取图片真实高度

		var imgWidth, imgHeight;

		var scale = 0.8;// 缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

		if (realHeight > windowH * scale) {// 判断图片高度

			imgHeight = windowH * scale;// 如大于窗口高度，图片高度进行缩放

			imgWidth = imgHeight / realHeight * realWidth;// 等比例缩放宽度

			if (imgWidth > windowW * scale) {// 如宽度扔大于窗口宽度

				imgWidth = windowW * scale;// 再对宽度进行缩放

			}

		} else if (realWidth > windowW * scale) {// 如图片高度合适，判断图片宽度

			imgWidth = windowW * scale;// 如大于窗口宽度，图片宽度进行缩放

			imgHeight = imgWidth / realWidth * realHeight;// 等比例缩放高度

		} else {// 如果图片真实高度和宽度都符合要求，高宽不变

			imgWidth = realWidth;

			imgHeight = realHeight;

		}

		$(bigimg).css("width", imgWidth);// 以最终的宽度对图片缩放

		var w = (windowW - imgWidth) / 2;// 计算图片与窗口左边距

		var h = (windowH - imgHeight) / 2;// 计算图片与窗口上边距

		$(innerdiv).css({
			"top" : h,
			"left" : w
		});// 设置#innerdiv的top和left属性

		$(outerdiv).fadeIn("fast");// 淡入显示#outerdiv及.pimg

	});

	$(outerdiv).click(function() {// 再次点击淡出消失弹出层

		$(this).fadeOut("fast");

	});

}
function closeTheModal() {
	$('#myModal1').modal('toggle');
}
function closeTheModal1() {
	removeModal2AllData();
	$('#myModal2').modal('toggle');
}
/**
 * 新增项目成员
 */
function addTableRow() {
	var username = $('#username').val();
	var post = $('#post').val();
	var assignment = $('#assignment').val();
	if (!username) {
		alert("成员姓名不能为空！");
		$('#username').focus();
		return;
	}
	if (!post) {
		alert("成员职务不能为空！");
		$('#post').focus();
		return;
	}
	if (!assignment) {
		alert("成员工作内容不能为空！");
		$('#assignment').focus();
		return;
	}
	var roleId = $("#roleId").val();
	if (flag) {
		if ($("#myModalLabel1").html() == "新增项目成员") {
			var html = "<tr title='" + assignment + "'>";
			html = html + "<td valign='middle'>" + username + "</td>";
			html = html + "<td>" + post + "</td>";
			html = html + "<td>" + assignment + "</td>";
			html = html
			+ "<td><a href='javascript:void(0);' onclick='editMember(this);'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='delMember(this);'>删除</a></td>";
			html = html + "</tr>";
			$("#tbody1").append(html);
		} else {
			tr
					.each(function() {
						$(this).children('td:eq(0)').text(username);
						$(this).children('td:eq(1)').text(post);
						$(this).children('td:eq(2)').text(assignment);
						$(this).attr("title",assignment);
					});
		}
		$('#myModal1').modal('toggle');
	} else {
		flag = true;
		$.post(basePath + "pmp-Pmp-addMember.action", $(
				"#addmemberForm").serialize(), function(data) {
			if (data.code != "200") {
				alert("登录超时，请重新登录！！");
				window.parent.parent.location.href=basePath;
				return;
			}
			$('#myModal1').modal('toggle');
			alert("保存成功");
		});
	}

}
function addDynamicTableRow() {
	var dynamicTime = $("#dynamicTime").val();
	var dynamicEndTime = $("#dynamicEndTime").val();
	var userName = $("#userName2").val();
	var describe = $("#describe").val();
	var accessory = $("#accessory").val();
	var roleId = $("#roleId").val();
	var fileName = "";
	if (!dynamicTime) {
		alert("开始时间不能为空");
		return;
	}
	if (!dynamicEndTime) {
		alert("结束时间不能为空");
		return;
	}
	if (dynamicEndTime < dynamicTime) {
		alert("结束时间不能小于开始时间");
		return;
	}
	if (!userName) {
		alert("人员不能为空");
		return;
	}
	if (!describe) {
		alert("描述不能为空");
		return;
	}
	if (accessory) {
		var filePaths = accessory.split("/");
		var fullfileName = filePaths[filePaths.length - 1];
		fileName = fullfileName.substring(13, fullfileName.length);
	}
	if (flag) {
		if ($("#myModalLabel2").html() == "新增项目动态") {
			var html = "<tr>";
			html = html + "<td valign='middle'>" + dynamicTime + "</td>";
			html = html + "<td>" + dynamicEndTime + "</td>";
			html = html + "<td>" + userName + "</td>";
			html = html + "<td style='text-align: left;'>" + describe + "</td>";
			html = html + "<td style='text-align: left;'>" + fileName + "</td>";
			html = html + "<td style='display:none'>"
					+ (accessory ? accessory : "") + "</td>";
			if (roleId == '1') {
				html = html
						+ "<td><a href='javascript:void(0);' onclick='editDynamic(this);'>编辑</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0);' onclick='delDynamic(this);'>删除</a></td>";
			}
			html = html + "</tr>";
			$("#tbody2").append(html);
		} else {
			tr1.each(function() {
				var accessory = $('#accessory').val();
				if (accessory) {
					var filePaths = accessory.split("/");
					var fullfileName = filePaths[filePaths.length - 1];
					fileName = fullfileName.substring(13, fullfileName.length);
				}
				$(this).children('td:eq(0)').text($('#dynamicTime').val());
				$(this).children('td:eq(1)').text($('#dynamicEndTime').val());
				$(this).children('td:eq(2)').text($('#userName2').val());
				$(this).children('td:eq(3)').text($('#describe').val());
				$(this).children('td:eq(4)').text(fileName);
				$(this).children('td:eq(5)').text(accessory ? accessory : "");
			});
		}
		removeModal2AllData();
		$('#myModal2').modal('toggle');
	} else {
		flag = true;
		$.post(basePath + "pmp-Pmp-addDynamic.action", $(
				"#addDynamicForm").serialize(), function(data) {
			if (data.code != "200") {
				alert("登录超时，请重新登录！！");
				window.parent.parent.location.href=basePath;
				return;
			}
			removeModal2AllData();
			$('#myModal2').modal('toggle');
			alert("保存成功");
		});
	}

}
var tr;
function editMember(editTd) {
	$("#myModalLabel1").html("修改项目成员信息");
	tr = $(editTd).parent().parent();
	tr.each(function() {
		$('#username').val($(this).children('td:eq(0)').text());
		$('#post').val($(this).children('td:eq(1)').text());
		$('#assignment').val($(this).children('td:eq(2)').text());
	});
	$('#myModal1').modal('toggle');
}
var tr1;
function editDynamic(editTd) {
	$("#myModalLabel2").html("修改项目动态");
	tr1 = $(editTd).parent().parent();
	tr1
			.each(function() {
				$('#dynamicTime').val($(this).children('td:eq(0)').text());
				$('#dynamicEndTime').val($(this).children('td:eq(1)').text());
				$('#userName2').val($(this).children('td:eq(2)').text());
				$('#describe').val($(this).children('td:eq(3)').text());
				if ($(this).children('td:eq(4)').text()) {
					var html = '<li><span>'
							+ $(this).children('td:eq(4)').text()
							+ '</span><input id="accessory" name="dynamic.accessory" type="hidden" value="'
							+ $(this).children('td:eq(5)').text()
							+ '"><a class="mask" href="javascript:void(0);" title="删除"><i class="iconfont edit">&#xe612;</i></a></li>';
					$("#imgList1").children().remove();
					$("#imgList1").append(html);
				}

			});
	$('#myModal2').modal('toggle');
}
function delMember(delTd) {
	if (confirm("确定要删除项目成员吗？")) {
		$(delTd).parent().parent().remove();
	}
}
function delDynamic(delTd) {
	if (confirm("确定要删除项目动态吗？")) {
		$(delTd).parent().parent().remove();
	}
}
function toSave() {
	$("#myModalLabel").html("新增客户信息");
	$("#userName1").val($("#jurisdiction").val());
	$("#pmpId").val("");
	$("#projectId").val("");
	if($('#caoz1').css("display")=='none'){
		$('#caoz1').css("display", "block");
		$('#caoz1').css("position", "relative");
		$('#caoz1').css("top", "3px");
	}
	$('#loading').hide();
	$('#myModal').modal('toggle');
}
function save() {
	$('#loading').show();
	$("#submit").attr({
		"disabled" : "disabled"
	});
	var userId = $("#userId").val();
	var pmpId = $("#pmpId").val();
	var dh = $("#pmpCode1").val();
	var pmpName = $("#pmpName1").val();
	var customerName = $("#customerName1").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	if (!dh) {
		alert("代号不能为空");
		$("#pmpCode1").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	if (!pmpName) {
		alert("项目名称不能为空");
		$("#pmpName1").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	if (!customerName) {
		alert("客户名称不能为空");
		$("#customerName").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	if (!startTime) {
		alert("开始时间不能为空");
		$("#startTime").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	if (!endTime) {
		alert("结束时间不能为空");
		$("#endTime").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	if(startTime>=endTime){
		alert("结束时间必须大于开始时间");
		$("#endTime").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	$
			.ajax({
				async : false,
				type : "POST",
				url : basePath + "pmp-Pmp-checkpmpCode.action",
				dataType : 'json',
				data : {
					pmpId : pmpId,
					pmpCode : dh
				},
				success : function(data) {
					if (data.code != "200") {
						alert("登录超时，请重新登录！！");
						window.parent.parent.location.href=basePath;
						return;
					}
					if (data.data != '0') {
						alert("代号不能重复");
						$("#pmpCode1").focus();
						$("#submit").removeAttr("disabled");// 将按钮可用
						$('#loading').hide();
						return;
					} else {
						var members = [];
						var dynamics = [];
						var i = 0, j = 0;
						$("#tbody1 tr")
								.each(
										function() {
											var member = {};
											member["username"] = $(this)
													.children('td:eq(0)')
													.text();
											member["post"] = $(this)
													.children('td:eq(1)')
													.text();
											member["assignment"] = $(this).children(
													'td:eq(2)').text();
											members[i] = member;
											i++;
										});
						$("#tbody2 tr").each(
								function() {
									var dynamic = {};
									dynamic["dynamicTime"] = $(this).children(
											'td:eq(0)').text();
									dynamic["dynamicEndTime"] = $(this)
											.children('td:eq(1)').text();
									dynamic["userName"] = $(this).children(
											'td:eq(2)').text();
									dynamic["describe"] = $(this).children(
											'td:eq(3)').text();
									dynamic["accessory"] = $(this).children(
											'td:eq(5)').text();
									dynamics[j] = dynamic;
									j++;
								});
						$('#member').val(JSON.stringify(members));
						$('#dynamic').val(JSON.stringify(dynamics));
						$.post(basePath
								+ "pmp-Pmp-addpmp.action", $(
								"#addForm").serialize(), function(data) {
							if (data.code != "200") {
								alert("登录超时，请重新登录！！");
								window.parent.parent.location.href=basePath;
								return;
							}
							$('#myModal').modal('toggle');
							$("#submit").removeAttr("disabled");// 将按钮可用
							alert("保存成功");
							$('#loading').hide();
							loadOrderFormData();
						});
					}
				}
			});
}
function addmember(pmpId) {
	$("#pmpId1").val(pmpId);
	flag = false;
	$('#myModal1').modal('toggle');
}
function addDynamic(pmpId) {
	$("#pmpId2").val(pmpId);
	flag = false;
	$('#myModal2').modal('toggle');
}
function toAddDynamicForm() {
	$('#myModal2').modal('toggle');
}
function downFile(fileName) {
	$.ajax({
		async : false,
		type : "POST",
		url : basePath + "download.action",
		dataType : 'json',
		data : {
			fileName : fileName
		},
		success : function(data) {

		}
	});
}
function unfold(a1, a2, a3) {
	var display = $('#' + a1).css('display');
	if (display == "none") {
		$("#" + a2).html("&#xe614;");
		$("#" + a3).attr("title", "折叠");
		$("#" + a1).css("display", "block");
	} else {
		$("#" + a2).html("&#xe613;");
		$("#" + a3).attr("title", "展开");
		$("#" + a1).css("display", "none");
	}
}
function cardClick(_this, a) {
	_this = $(_this);// 将当前的pimg元素作为_this传入函数
	if (a)
		imgShow("#outerdiv3", "#innerdiv3", "#bigimg3", _this);
	else
		imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
}
/**
 * 禁止空格输入
 * 
 * @param e
 * @returns {Boolean}
 */
function banInputSapce(e) {
	var keynum;
	if (window.event) // IE
	{
		keynum = e.keyCode
	} else if (e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which
	}
	if (keynum == 32) {
		return false;
	}
	return true;
}
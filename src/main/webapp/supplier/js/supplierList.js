/**
 * 
 */
var pageBarHtml = null, pager = null;
var num = 1;
var flag = true;// 区分项目成员是列表中添加还是模态框中添加true是模态框false是数据列表新增
$(function() {
	var userId = $("#userId").val();
	$("#uploadify")
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
									+ '</span><input id="accessory" name="supplier.accessory" type="hidden" value="upload/dynamic/'
									+ userId
									+ '/'
									+ data.data
									+ '"><a class="mask" href="javascript:void(0);" title="删除"><i class="iconfont edit">&#xe612;</i></a></li>';
							$("#imgList").children().remove();
							$("#imgList").append(html);
						},
						onSelect : function(file, errorCode, errorMsg) {
							if (file.size > 104857600) {
								alert("文件不能大于100M");
							} else {
								$('#uploadify').uploadify('upload', '*')
							}
						}
					});
	$(document).on("click", ".mask", function() {
		$(this).parent().remove();
	});
	$("#button").click(function() {
		loadOrderFormData();
	});
	$("#frmMain input[name='formType']").val(null);
	$("#frmMain input[name='formStatus']").val(null);
	$("#frmMain input[name='pageVo.start']").val("0");
	pageBarHtml = $("#pageBar").html();

	$(document).on("click", "#pageBar li:not(:first):not(:last) a", function() {
		var page = $(this).text();
		var start = (parseInt(page, 10) - 1) * pager.limit;
		num = start + 1;
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
		num = start + 1;
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
		num = start + 1;
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
	loadOrderFormData();
});
function loadOrderFormData(rePageBarFlag) {
	$('#loading').show();
	if (!rePageBarFlag) {
		$("#frmMain input[name='pageVo.start']").val("0");
	}
	$.post(basePath + "supplier-Supplier-loadAllSupplier.action", $("#frmMain")
			.serialize(), function(data) {
		if (data.code != "200") {
			alert("登录超时，请重新登录！！");
			window.parent.parent.location.href = basePath;
			return;
		}
		$("#tbody0").children().remove();
		var list = data.data[0];
		if (list.length <= 0) {
			$("#tbody0").append("<p>无数据</p>");
		} else {
			if (!rePageBarFlag) {
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
function appendRequire(form) {
	var userId = $("#userId").val();
	var html = "<tr><td>" + (num++) + "</td><td>" + form[2] + "</td>"
			+ "<td><a href='javascript:void(0);' onclick='readData(\""
			+ form[0] + "\");'>" + form[3] + "</a></td><td>" + form[4]
			+ "</td><td>" + form[5] + "</td><td>" + form[6] + "</td><td>"
			+ form[1] + "</td><td>";
	if(userId == form[7]||userId == '1'){
		html = html
		+ "<a href='javascript:void(0);' onclick='findEditData(\""
		+ form[0]
		+ "\");' title='修改信息'><i class='iconfont edit'>&#xe605;</i></a>&nbsp;&nbsp;";
	}
	html = html
			+ "<a href='javascript:void(0);' onclick='readData(\""
			+ form[0]
			+ "\");' title='查看详细信息'><i class='iconfont edit'>&#xe60d;</i></a></td> </tr>"
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
		if (count < (i + 1) && (i + 1) < pageNum) {
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
	var nowPage = page;
	var pageNum = Math.ceil(pager.total / pager.limit);
	pageNum = pageNum == 0 ? 1 : pageNum;
	var leftCount = page - 1;// 左侧3
	var rightCount = pageNum - page;// 右侧5
	// 左侧的分页
	if (leftCount <= count) {// 左侧数量小于4最多显示页
		for (var i = 1; i <= leftCount; i++) {
			$('<li><a href="javascript:void(0);">' + (i + 1) + '</a></li>')
					.insertBefore("#pageBar li:last");
		}
	} else {// 大于一次最多显示页
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
function toSave() {
	$("#myModalLabel").html("新增供应商信息");
	$('#loading').hide();
	$('#myModal').modal('toggle');
}
function save() {
	$('#loading').show();
	$("#submit").attr({
		"disabled" : "disabled"
	});
	var userId = $("#userId").val();
	var supplierId = $("#supplierId1").val();
	var supplierCode = $("#supplierCode1").val();
	var supplierName = $("#supplierName1").val();
	var scopeBusiness = $("#scopeBusiness1").val();
	var address = $("#address1").val();
	var linkmanName = $("#linkmanName1").val();
	var landlineTelephone = $("#landlineTelephone").val();
	var phoneNumber = $("#phoneNumber").val();
	var remark = $("#remark1").val();
	var accessory = $("#accessory").val();
	if (!supplierCode) {
		alert("编号不能为空");
		$("#supplierCode1").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	if (!supplierName) {
		alert("名称不能为空");
		$("#supplierName1").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	if (!scopeBusiness) {
		alert("范围不能为空");
		$("#scopeBusiness1").focus();
		$("#submit").removeAttr("disabled");// 将按钮可用
		$('#loading').hide();
		return;
	}
	$.ajax({
		async : false,
		type : "POST",
		url : basePath + "supplier-Supplier-checkSupplierCode.action",
		dataType : 'json',
		data : {
			supplierId : supplierId,
			supplierCode : supplierCode
		},
		success : function(data) {
			if (data.code != "200") {
				alert("登录超时，请重新登录！！");
				window.parent.parent.location.href = basePath;
				return;
			}
			if (data.data != '0') {
				alert("编号不能重复");
				$("#supplierCode1").focus();
				$("#submit").removeAttr("disabled");// 将按钮可用
				$('#loading').hide();
				return;
			} else {
				$.post(basePath + "supplier-Supplier-addSupplier.action", $(
						"#addForm").serialize(), function(data) {
					if (data.code != "200") {
						alert("登录超时，请重新登录！！");
						window.parent.parent.location.href = basePath;
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
function findEditData(supplierId) {
	$('#loading').show();
	$("#myModalLabel").html("修改供应商信息");
	$
			.ajax({
				type : "post",
				url : "supplier-Supplier-findSupplierById.action",
				data : {
					supplierId : supplierId
				},
				dataType : "json",
				success : function(data) {
					if (data.code != "200") {
						alert("登录超时，请重新登录！！");
						window.parent.parent.location.href = basePath;
						return;
					}
					data = data.data;
					// 基本信息
					$('#createTime').val(data.createTime.replace("T", " "));
					$('#userId1').val(data.user.userId);
					$('#supplierId1').val(data.supplierId);
					$('#supplierCode1').val(data.supplierCode);
					$('#supplierName1').val(data.supplierName);
					$('#scopeBusiness1').val(data.scopeBusiness);
					$('#address1').val(data.address);
					$('#linkmanName1').val(data.linkmanName);
					$('#landlineTelephone').val(data.landlineTelephone);
					$('#phoneNumber').val(data.phoneNumber);
					$('#remark1').val(data.remark);
					if (data.accessory) {
						var filePaths = data.accessory.split("/");
						var fileName = filePaths[filePaths.length - 1];
						var html = '<li><span>'
								+ fileName.substring(13, fileName.length)
								+ '</span><input id="accessory" name="supplier.accessory" type="hidden" value="'
								+ data.accessory
								+ '"><a class="mask" href="javascript:void(0);" title="删除"><i class="iconfont edit">&#xe612;</i></a></li>';
						$("#imgList").children().remove();
						$("#imgList").append(html);
					}
					// 项目基本信息
					$('#myModal').modal('toggle');
					$('#loading').hide();
				}
			});

}
function readData(supplierId) {
	$('#loading').show();
	$.ajax({
		type : "post",
		url : "supplier-Supplier-findSupplierById.action",
		data : {
			supplierId : supplierId
		},
		dataType : "json",
		success : function(data) {
			if (data.code != "200") {
				alert("登录超时，请重新登录！！");
				window.parent.parent.location.href = basePath;
				return;
			}
			data = data.data;
			// 基本信息
			$('#supplierCode2').val(data.supplierCode);
			$('#supplierName2').val(data.supplierName);
			$('#scopeBusiness2').val(data.scopeBusiness);
			$('#address2').val(data.address);
			$('#linkmanName2').val(data.linkmanName);
			$('#landlineTelephone2').val(data.landlineTelephone);
			$('#phoneNumber2').val(data.phoneNumber);
			$('#remark2').val(data.remark);
			if (data.accessory) {
				var accessoryPath = data.accessory;
				var filePaths = accessoryPath.split("/");
				var fileName = filePaths[filePaths.length - 1];
				var html = '<li><span><a href="' + basePath
						+ 'download.action?fileName='
						+ fileName.substring(13, fileName.length)
						+ '&pathName=' + accessoryPath + '">'
						+ fileName.substring(13, fileName.length)
						+ '</a></span></li>';
				$("#imgList2").children().remove();
				$("#imgList2").append(html);
			}
			$('#loading').hide();
			$('#myModal2').modal('toggle');
		}
	});
}

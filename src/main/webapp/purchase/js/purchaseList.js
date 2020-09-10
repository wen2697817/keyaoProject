/**
 * 
 */
var pageBarHtml = null, pager = null;
var num = 1;
var flag = true;// 区分项目成员是列表中添加还是模态框中添加true是模态框false是数据列表新增
$(function() {
	$('#addForm').bootstrapValidator({
		message : '输入值不合法',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			'purchase.materialName' : {
				message : '物料名称验证失败',
				validators : {
					notEmpty : {
						message : '物料名称不能为空'
					}
				}
			},
			'purchase.model' : {
				message : '型号验证失败',
				validators : {
					notEmpty : {
						message : '型号不能为空'
					}
				}
			},
			'purchase.pmpName' : {
				message : '项目名称验证失败',
				validators : {
					notEmpty : {
						message : '项目名称不能为空'
					}
				}
			},
			'purchase.unit' : {
				message : '单位验证失败',
				validators : {
					notEmpty : {
						message : '单位不能为空'
					}
				}
			},
			'purchase.amount' : {
				message : '数量验证失败',
				validators : {
					notEmpty : {
						message : '数量不能为空'
					}
				}
			},
			'purchase.price' : {
				message : '单价验证失败',
				validators : {
					notEmpty : {
						message : '单价不能为空'
					},
					regexp: {
					    regexp: /^[0-9]+([.]{1}[0-9]+){0,1}$/,
					    message: '单价只能输入数字'
					}
				}
			},
			'purchase.supplierName' : {
				message : '厂家验证失败',
				validators : {
					notEmpty : {
						message : '厂家不能为空'
					}
				}
			},
			'purchase.startTime' : {
				message : '开始时间验证失败',
				validators : {
					notEmpty : {
						message : '开始时间不能为空'
					}
				}
			},
			'purchase.endTime' : {
				message : '结束时间验证失败',
				validators : {
					notEmpty : {
						message : '结束时间不能为空'
					}
				}
			}
		},
	});
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
									+ '</span><input id="accessory" name="purchase.accessory" type="hidden" value="upload/dynamic/'
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
	$('.form_date').datetimepicker({
		format : 'yyyy-mm-dd',// 时间显示格式
		language : "zh-CN",
		weekStart : 7,
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
	var pmpName = $("#pmpName1").val();
	$.post(basePath + "pmp-Pmp-loadAllPmpNoPage.action", {}, function(data) {
		var list = data.data[0];
		$.each(list, function(i) {
			if (pmpName == this) {
				$("#pmpName1").append(
						"<option selected = 'selected' value='" + this + "'>"
								+ this + "</option>");
			} else {
				$("#pmpName1").append(
						"<option value='" + this + "'>" + this + "</option>");
			}
		});
	});
	var supplierName = $("#supplierName1").val();
	$.post(basePath + "supplier-Supplier-loadAllSupplierNoPage.action", {},
			function(data) {
				var list = data.data[0];
				$.each(list, function(i) {
					if (supplierName == this) {
						$("#supplierName1").append(
								"<option selected = 'selected' value='" + this
										+ "'>" + this + "</option>");
					} else {
						$("#supplierName1").append(
								"<option value='" + this + "'>" + this
										+ "</option>");
					}
				});
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
	$.post(basePath + "purchase-Purchase-loadAllPurchase.action", $("#frmMain")
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
	var html = "<tr><td>" + (num++) + "</td><td>" + form[2] + "</td>" + "<td>"
			+ form[3] + "</a></td><td>" + form[4] + "</td><td>" + form[5]
			+ "</td><td>" + form[6] + "</td><td>" + form[7] + "</td><td>"
			+ form[1] + "</td><td>";
	if (userId == form[8] || userId == '1') {
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
	$("#myModalLabel").html("新增采购信息");
	$('#loading').hide();
	$('#myModal').modal('toggle');
}
function save() {
	// $('#loading').show();
	$("#submit").attr({
		"disabled" : "disabled"
	});
	$('#addForm').submit();
	var isValid = $('#addForm').data("bootstrapValidator").isValid();
	if (!isValid) {
		$("#submit").removeAttr("disabled");// 将按钮可用
	} else {
		var userId = $("#userId").val();
		var purchaseId = $("#purchaseId1").val();
		var materialName = $("#materialName1").val();
		var model = $("#model1").val();
		var pmpName = $("#pmpName1").val();
		var unit = $("#unit1").val();
		var amount = $("#amount1").val();
		var price = $("#price1").val();
		var supplierName = $("#supplierName1").val();
		var startTime = $("#startTime1").val();
		var endTime = $("#endTime1").val();
		var memo = $("#memo1").val();
		var accessory = $("#accessory").val();
		$.post(basePath+ "purchase-Purchase-addPurchase.action",
			$("#addForm").serialize(),
			function(data) {
				if (data.code != "200") {
					alert("登录超时，请重新登录！！");
					window.parent.parent.location.href = basePath;
					return;
				}
				$('#myModal').modal('toggle');
				$("#submit").removeAttr(
						"disabled");// 将按钮可用
				alert("保存成功");
				$('#loading').hide();
				loadOrderFormData();
		});
	}
}
function findEditData(purchaseId) {
	$('#loading').show();
	$("#myModalLabel").html("修改供应商信息");
	$
			.ajax({
				type : "post",
				url : "purchase-Purchase-findPurchaseById.action",
				data : {
					purchaseId : purchaseId
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
					$('#purchaseId1').val(data.purchaseId);
					$('#materialName1').val(data.materialName);
					$('#model1').val(data.model);
					$('#pmpName1').val(data.pmpName);
					$('#unit1').val(data.unit);
					$('#amount1').val(data.amount);
					$('#price1').val(data.price);
					$('#supplierName1').val(data.supplierName);
					$('#startTime1').val(data.startTime.replace("T", " "));
					$('#endTime1').val(data.endTime.replace("T", " "));
					$('#memo1').val(data.memo);
					if (data.accessory) {
						var filePaths = data.accessory.split("/");
						var fileName = filePaths[filePaths.length - 1];
						var html = '<li><span>'
								+ fileName.substring(13, fileName.length)
								+ '</span><input id="accessory" name="purchase.accessory" type="hidden" value="'
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
function readData(purchaseId) {
	$('#loading').show();
	$.ajax({
		type : "post",
		url : "purchase-Purchase-findPurchaseById.action",
		data : {
			purchaseId : purchaseId
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
			$('#materialName2').val(data.materialName);
			$('#model2').val(data.model);
			$('#pmpName2').val(data.pmpName);
			$('#unit2').val(data.unit);
			$('#amount2').val(data.amount);
			$('#price2').val(data.price);
			$('#supplierName2').val(data.supplierName);
			$('#startTime2').val(data.startTime.replace("T", " "));
			$('#endTime2').val(data.endTime.replace("T", " "));
			$('#memo2').val(data.memo);
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

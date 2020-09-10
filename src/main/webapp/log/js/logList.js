var pageBarHtml = null, pager = null;
var num = 1;
var flag = true;// 区分联系人是列表中添加还是模态框中添加true是模态框false是数据列表新增
$(function() {
	$("#modalbody3").css("height", $(window).height() - 180);
	var userId = $("#userId").val();
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
	});
	// loadMealOrderForm();

	$("#button").click(function() {

		// 对date数据进行验证
		if ($("#beginDate").val() && $("#endDate").val()) {

			var s1 = $("#beginDate").val();
			var s2 = $("#endDate").val();
			if (s1 > s2) {
				alert("截止时间应大于起始时间");
				return;
			}
		}
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
	loadOrderFormData();
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
		$('#conditionsDemand3').val("");
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
	$(".pimg3").click(function() {
		var _this = $(this);// 将当前的pimg元素作为_this传入函数
		imgShow("#outerdiv3", "#innerdiv3", "#bigimg3", _this);
	});
});
// 添加数据 并把表单内值传递给后台
function loadOrderFormData(rePageBarFlag) {
	$('#loading').show();
	if (!rePageBarFlag) {
		$("#frmMain input[name='pageVo.start']").val("0");
	}
	$.post(basePath + "log-Log-loadAllLog.action", $("#frmMain").serialize(),
			function(data) {
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
	var html = "<tr><td>" + (num++) + "</td><td>" + form[2] + "</td><td>"
			+ form[3] + "</td><td>" + form[1] + "</td><td><a href='javascript:void(0);' onclick='readData(\""
			+ form[1] + "\");'>" + form[4]
			+ "</a></td><td>" + form[5].replace("T", " ") + "</td>";
	html = html + "</tr>";
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
function readData(pmpCode) {
	$('#loading').show();
	$
			.ajax({
				type : "post",
				url : "pmp-pmp-findpmpByCode.action",
				data : {
					pmpCode : pmpCode
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
					$('#enterpriseProperty3').val(data.enterpriseProperty);
					$('#industry3').val(data.industry);
					$('#pmpAddress3').val(data.pmpAddress);
					$('#conditionsDemand3').val(data.conditionsDemand);
					$('#source3').val(data.source);
					$('#url3').val(data.url);
					$('#userId3').val(data.user.userId);
					$('#userName3').val(data.user.name);
					$('#remark3').val(data.remark);
					$(".description").val("");
					var linkmans = data.linkmans;
					if (!linkmans) {
						$("#lxrA").attr("onclick", "");
						// onclick='unfold("lxrDiv","lxrImg","lxrA");'
						$("#lxr").html("（无查看权限,联系人已隐藏!）");
					} else {
						if (!linkmans.length) {
							$("#lxrA").attr("onclick", "");
							$("#lxr").html("（无联系人!）");
						} else {
							$("#lxrA").attr("onclick",
									"unfold('lxrDiv','lxrImg','lxrA');");
							for ( var a in linkmans) {
								var html = "<tr title='备注："
										+ (linkmans[a].remark ? linkmans[a].remark
												: "无") + "'>";
								html = html + "<td valign='middle'>"
										+ linkmans[a].username + "</td>";
								html = html + "<td>" + linkmans[a].gender
										+ "</td>";
								html = html + "<td>" + linkmans[a].age
										+ "</td>";
								html = html + "<td>" + linkmans[a].telephone
										+ "</td>";
								html = html + "<td>" + linkmans[a].mobilePhone
										+ "</td>";
								html = html + "<td>" + linkmans[a].fax
										+ "</td>";
								html = html + "<td>" + linkmans[a].EMail
										+ "</td>";
								html = html + "<td>" + linkmans[a].qq + "</td>";
								html = html + "<td>" + linkmans[a].hobby
										+ "</td>";
								html = html + "<td>" + linkmans[a].department
										+ "</td>";
								html = html + "<td>";
								if (linkmans[a].cardImg1) {
									html = html
											+ "<img title='名片正面' onclick='cardClick(this,true);' style='width:15px;height:12px;' src='"
											+ basePath + linkmans[a].cardImg1
											+ "'></img>&nbsp;";
								}
								if (linkmans[a].cardImg2) {
									html = html
											+ "<img title='名片背面' onclick='cardClick(this,true);' style='width:15px;height:12px;' src='"
											+ basePath + linkmans[a].cardImg2
											+ "'></img>";
								}
								html = html + "</td>";
								html = html + "</tr>";
								$("#tbody3").append(html);
							}
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
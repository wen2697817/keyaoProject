package com.glintech.keyaoProject.report.action;

import javax.annotation.Resource;

import com.glintech.keyaoProject.core.BaseAction;
import com.glintech.keyaoProject.model.Report;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.report.service.IReportService;
import com.glintech.keyaoProject.util.Globals;

public class ReportAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Resource
	public IReportService reportService;
	public Report report;

	/**
	 * 获取所有的用户
	 * 
	 * @return
	 */
	public String loadAllReport() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String time1 = request.getParameter("date1");
		String time2 = request.getParameter("date2");
		String roleId = user.getRole().getRoleId();
		String userId = user.getUserId();
		this.data = new Object[] {
				reportService.getAllReport(time1, time2, roleId, userId, pageVo),
				pageVo };
		return success();
	}

	public String addReport() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		reportService.addReport(report, user);
		return success();
	}

	public String findReportById() {
		String reportId = request.getParameter("reportId");
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		this.data = reportService.findReportById(reportId);
		return success();
	}

	public Report getReport() {
		return report;
	}

	public void setReport(Report report) {
		this.report = report;
	}

}

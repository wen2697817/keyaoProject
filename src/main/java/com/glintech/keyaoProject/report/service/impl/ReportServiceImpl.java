package com.glintech.keyaoProject.report.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.glintech.keyaoProject.core.BaseService;
import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.model.Report;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.report.service.IReportService;
import com.glintech.keyaoProject.util.Tools;

@Repository
public class ReportServiceImpl extends BaseService implements IReportService {

	public List<Object> getAllReport(String time1, String time2, String roleId, String userId, PageValueObject pageVo) {
		String hql = "select r.reportId,r.user.userName,r.reportTime,r.startTime,r.endTime,r.createTime,r.user.userId from Report r where 1=1 ";
		if (!Tools.isEmpty(time1)) {
			hql = hql + " and r.reportTime>='" + time1+"'";
		}
		if (!Tools.isEmpty(time2)) {
			hql = hql + " and r.reportTime<='" + time2+"'";
		}
		if (!(roleId.equals("1") || roleId.equals("2"))) {
			hql = hql + " and r.user.userId='" + userId+"'";
		}
		hql = hql + " order by r.reportTime,r.user.userName desc";
		return commonDao.getObjectsByPage(hql, pageVo);
	}

	public void addReport(Report report, User user) {
		// TODO Auto-generated method stub
		if (Tools.isEmpty(report.getReportId())) {// 新增
			Date d = new Date();
			report.setCreateTime(d);
			report.setUser(user);
			commonDao.addObject(report);
		} else {// 修改
			commonDao.updateObject(report);
		}
	}

	public Report findReportById(String reportId) {
		return commonDao.getObject(Report.class, reportId);
	}

}

package com.glintech.keyaoProject.report.service;

import java.util.List;

import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.model.Report;
import com.glintech.keyaoProject.model.User;

public interface IReportService {
	/**
	 * 查询数据列表
	 * @param time1时间开始汇报时间
	 * @param time2时间结束汇报时间
	 * @param roleId
	 * @param userId
	 * @param pageVo
	 * @return
	 */
	List<Object> getAllReport(String time1, String time2, String roleId, String userId, PageValueObject pageVo);
	/**
	 * 新增和修改
	 * @param report
	 * @param user
	 */
	void addReport(Report report, User user);
	/**
	 * 通过Id查询数据
	 * @param reportId
	 * @return
	 */
	Report findReportById(String reportId);

}

package com.glintech.keyaoProject.model;

import java.util.Date;

/**
 * 
 * @author WXR
 * 每日汇报表
 */
public class Report implements java.io.Serializable {
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String reportId;
	private String accessory;
	private User user;
	private String startTime;
	private Date reportTime;
	private String endTime;
	private Date createTime;
	public Report() {
	}
	public Report(String reportId) {
		this.reportId =reportId;
	}
	public Report(String reportId, String accessory, User user, String startTime, Date reportTime, String endTime,
			Date createTime) {
		super();
		this.reportId = reportId;
		this.accessory = accessory;
		this.user = user;
		this.startTime = startTime;
		this.reportTime = reportTime;
		this.endTime = endTime;
		this.createTime = createTime;
	}
	public String getReportId() {
		return reportId;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public String getAccessory() {
		return accessory;
	}
	public void setAccessory(String accessory) {
		this.accessory = accessory;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Date getReportTime() {
		return reportTime;
	}
	public void setReportTime(Date reportTime) {
		this.reportTime = reportTime;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}

package com.glintech.keyaoProject.model;

// Generated 2016-8-15 13:33:45 by Hibernate Tools 3.2.2.GA

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.glintech.keyaoProject.model.Dynamic;
import com.glintech.keyaoProject.model.Member;

/**
 * pmp generated by hbm2java
 */
public class Pmp implements java.io.Serializable {

	private String pmpId;
	private String pmpCode;
	private String pmpName;
	private String customerName;
	private String rateProgress;
	private User user;
	private Date createTime;
	private Date startTime;
	private Date endTime;
	private String remark;
	private Set<Project> projects = new HashSet<Project>(0);
	private Set<Dynamic> dynamics = new HashSet<Dynamic>(0);
	private Set<Member> members = new HashSet<Member>(0);
	public Pmp() {
	}

	public Pmp(String pmpId) {
		this.pmpId = pmpId;
	}

	public Pmp(String pmpId, String pmpCode,
			String pmpName, String customerName, String rateProgress,
			String enterpriseProperty, String conditionsDemand, User user,
			Date startTime, Date endTime, Date createTime, String remark,Set<Project> projects
			,Set<Dynamic> dynamics,Set<Member> members) {
		this.pmpId = pmpId;
		this.pmpCode = pmpCode;
		this.pmpName = pmpName;
		this.customerName = customerName;
		this.rateProgress = rateProgress;
		this.user = user;
		this.startTime = startTime;
		this.endTime = endTime;
		this.createTime = createTime;
		this.remark = remark;
		this.projects = projects;
		this.dynamics = dynamics;
		this.members = members;
	}

	public String getPmpId() {
		return pmpId;
	}

	public void setPmpId(String pmpId) {
		this.pmpId = pmpId;
	}

	public String getPmpCode() {
		return pmpCode;
	}

	public void setPmpCode(String pmpCode) {
		this.pmpCode = pmpCode;
	}

	public String getPmpName() {
		return pmpName;
	}

	public void setPmpName(String pmpName) {
		this.pmpName = pmpName;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getRateProgress() {
		return rateProgress;
	}

	public void setRateProgress(String rateProgress) {
		this.rateProgress = rateProgress;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}
	
	public Set<Project> getProjects() {
		return projects;
	}

	public void setProjects(Set<Project> projects) {
		this.projects = projects;
	}

	public Set<Dynamic> getDynamics() {
		return dynamics;
	}

	public void setDynamics(Set<Dynamic> dynamics) {
		this.dynamics = dynamics;
	}

	public Set<Member> getMembers() {
		return members;
	}

	public void setMembers(Set<Member> members) {
		this.members = members;
	}

}

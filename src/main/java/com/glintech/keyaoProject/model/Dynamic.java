package com.glintech.keyaoProject.model;


// Generated 2016-8-15 13:33:45 by Hibernate Tools 3.2.2.GA

/**
 * Dynamic generated by hbm2java
 */
public class Dynamic implements java.io.Serializable {

	private String dynamicId;
	private Pmp pmp;
	private String dynamicTime;
	private String dynamicEndTime;
	private String userName;
	private String describes;
	private String accessory;

	public Dynamic() {
	}

	public Dynamic(String dynamicId) {
		this.dynamicId = dynamicId;
	}

	public Dynamic(String dynamicId, Pmp pmp, String dynamicTime,String dynamicEndTime,
			String userName, String describes, String accessory) {
		this.dynamicId = dynamicId;
		this.pmp = pmp;
		this.dynamicTime = dynamicTime;
		this.dynamicEndTime = dynamicEndTime;
		this.userName = userName;
		this.describes = describes;
		this.accessory = accessory;
	}

	public String getDynamicId() {
		return this.dynamicId;
	}

	public void setDynamicId(String dynamicId) {
		this.dynamicId = dynamicId;
	}

	public Pmp getPmp() {
		return pmp;
	}

	public void setPmp(Pmp pmp) {
		this.pmp = pmp;
	}

	public String getDynamicTime() {
		return this.dynamicTime;
	}

	public void setDynamicTime(String dynamicTime) {
		this.dynamicTime = dynamicTime;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDescribes() {
		return this.describes;
	}

	public void setDescribes(String describes) {
		this.describes = describes;
	}

	public String getAccessory() {
		return this.accessory;
	}

	public void setAccessory(String accessory) {
		this.accessory = accessory;
	}

	public String getDynamicEndTime() {
		return dynamicEndTime;
	}

	public void setDynamicEndTime(String dynamicEndTime) {
		this.dynamicEndTime = dynamicEndTime;
	}

}
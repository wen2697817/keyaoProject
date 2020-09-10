package com.glintech.keyaoProject.model;

import java.util.Date;

/**
 * 
 * @author WXR
 * 附件
 */
public class Supplier implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String supplierId;
	private String supplierCode;
	private String supplierName;
	private String scopeBusiness;
	private String address;
	private String linkmanName;
	private String landlineTelephone;
	private String phoneNumber;
	private String remark;
	private String accessory;
	private User user;
	private Date createTime;
	public Supplier() {
	}

	public Supplier(String supplierId) {
		this.supplierId =supplierId;
	}

	public Supplier(String supplierId, String supplierCode, String supplierName, String scopeBusiness,
			String address,String linkmanName,String landlineTelephone,String phoneNumber,String remark,
			String accessory,User user,Date createTime) {
		this.supplierId = supplierId;
		this.supplierCode = supplierCode;
		this.supplierName = supplierName;
		this.scopeBusiness = scopeBusiness;
		this.address = address;
		this.linkmanName = linkmanName;
		this.landlineTelephone = landlineTelephone;
		this.phoneNumber = phoneNumber;
		this.remark = remark;
		this.accessory = accessory;
		this.user = user;
		this.createTime = createTime;
	}

	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public String getSupplierCode() {
		return supplierCode;
	}

	public void setSupplierCode(String supplierCode) {
		this.supplierCode = supplierCode;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getScopeBusiness() {
		return scopeBusiness;
	}

	public void setScopeBusiness(String scopeBusiness) {
		this.scopeBusiness = scopeBusiness;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLinkmanName() {
		return linkmanName;
	}

	public void setLinkmanName(String linkmanName) {
		this.linkmanName = linkmanName;
	}

	public String getLandlineTelephone() {
		return landlineTelephone;
	}

	public void setLandlineTelephone(String landlineTelephone) {
		this.landlineTelephone = landlineTelephone;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getAccessory() {
		return accessory;
	}

	public void setAccessory(String accessory) {
		this.accessory = accessory;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

}

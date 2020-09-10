package com.glintech.keyaoProject.model;

import java.util.Date;

/**
 * 
 * @author WXR
 * 采购表
 */
public class Purchase implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String purchaseId;
	private String materialName;
	private String model;
	private String unit;
	private int amount;
	private double price;
	private String pmpName;
	private String memo;
	private String supplierName;
	private String accessory;
	private User user;
	private Date startTime;
	private Date endTime;
	private Date createTime;
	public Purchase() {
	}
	public Purchase(String purchaseId) {
		this.purchaseId =purchaseId;
	}
	
	public Purchase(String purchaseId, String materialName, String model, String unit, int amount, double price,
			String pmpName, String memo, String supplierName, String accessory, User user, Date startTime,
			Date endTime, Date createTime) {
		super();
		this.purchaseId = purchaseId;
		this.materialName = materialName;
		this.model = model;
		this.unit = unit;
		this.amount = amount;
		this.price = price;
		this.pmpName = pmpName;
		this.memo = memo;
		this.supplierName = supplierName;
		this.accessory = accessory;
		this.user = user;
		this.startTime = startTime;
		this.endTime = endTime;
		this.createTime = createTime;
	}
	/**
	 * @return the purchaseId
	 */
	public String getPurchaseId() {
		return purchaseId;
	}
	/**
	 * @param purchaseId the purchaseId to set
	 */
	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}
	/**
	 * @return the materialName
	 */
	public String getMaterialName() {
		return materialName;
	}
	/**
	 * @param materialName the materialName to set
	 */
	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}
	/**
	 * @return the model
	 */
	public String getModel() {
		return model;
	}
	/**
	 * @param model the model to set
	 */
	public void setModel(String model) {
		this.model = model;
	}
	/**
	 * @return the unit
	 */
	public String getUnit() {
		return unit;
	}
	/**
	 * @param unit the unit to set
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}
	/**
	 * @return the amount
	 */
	public int getAmount() {
		return amount;
	}
	/**
	 * @param amount the amount to set
	 */
	public void setAmount(int amount) {
		this.amount = amount;
	}
	/**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}
	/**
	 * @param price the price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}
	/**
	 * @return the pmpName
	 */
	public String getPmpName() {
		return pmpName;
	}
	/**
	 * @param pmpName the pmpName to set
	 */
	public void setPmpName(String pmpName) {
		this.pmpName = pmpName;
	}
	/**
	 * @return the memo
	 */
	public String getMemo() {
		return memo;
	}
	/**
	 * @param memo the memo to set
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
	
	/**
	 * @return the supplierName
	 */
	public String getSupplierName() {
		return supplierName;
	}
	/**
	 * @param supplierName the supplierName to set
	 */
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	/**
	 * @return the accessory
	 */
	public String getAccessory() {
		return accessory;
	}
	/**
	 * @param accessory the accessory to set
	 */
	public void setAccessory(String accessory) {
		this.accessory = accessory;
	}
	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}
	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}
	/**
	 * @return the startTime
	 */
	public Date getStartTime() {
		return startTime;
	}
	/**
	 * @param startTime the startTime to set
	 */
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	/**
	 * @return the endTime
	 */
	public Date getEndTime() {
		return endTime;
	}
	/**
	 * @param endTime the endTime to set
	 */
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	/**
	 * @return the createTime
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/**
	 * @param createTime the createTime to set
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}

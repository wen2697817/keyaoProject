package com.glintech.keyaoProject.model;
/**
 * 
 * @author WXR
 * 附件
 */
public class Accessory implements java.io.Serializable {
	private String accessoryId;
	private Project project;
	private String accessoryPath;
	private String serialNumber;

	public Accessory() {
	}

	public Accessory(String accessoryId) {
		this.accessoryId =accessoryId;
	}

	public Accessory(String accessoryId, String accessoryPath, String serialNumber, Project project) {
		this.accessoryId = accessoryId;
		this.accessoryPath = accessoryPath;
		this.serialNumber = serialNumber;
		this.project = project;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getAccessoryPath() {
		return accessoryPath;
	}

	public void setAccessoryPath(String accessoryPath) {
		this.accessoryPath = accessoryPath;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getAccessoryId() {
		return accessoryId;
	}

	public void setAccessoryId(String accessoryId) {
		this.accessoryId = accessoryId;
	}

}

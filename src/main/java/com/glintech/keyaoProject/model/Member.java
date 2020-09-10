package com.glintech.keyaoProject.model;
/**
 * 
 * @author WXR
 * 项目成员
 */
public class Member implements java.io.Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String memberId;
	private Pmp pmp;
	private String userName;
	private String post;
	private String assignment;

	public Member() {
	}

	public Member(String memberId) {
		this.memberId =memberId;
	}

	public Member(String memberId, String userName, String post, String assignment,Pmp pmp) {
		this.memberId = memberId;
		this.userName = userName;
		this.post = post;
		this.assignment = assignment;
		this.pmp = pmp;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}


	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public String getAssignment() {
		return assignment;
	}

	public void setAssignment(String assignment) {
		this.assignment = assignment;
	}

	public Pmp getPmp() {
		return pmp;
	}

	public void setPmp(Pmp pmp) {
		this.pmp = pmp;
	}
}

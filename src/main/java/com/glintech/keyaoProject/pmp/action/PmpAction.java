package com.glintech.keyaoProject.pmp.action;

import java.io.IOException;

import javax.annotation.Resource;

import com.glintech.keyaoProject.model.Dynamic;
import com.glintech.keyaoProject.model.Member;
import com.glintech.keyaoProject.core.BaseAction;
import com.glintech.keyaoProject.pmp.service.IPmpService;
import com.glintech.keyaoProject.model.Pmp;
import com.glintech.keyaoProject.model.Project;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.util.Globals;

public class PmpAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("restriction")
	@Resource
	private IPmpService pmpService;
	private Pmp pmp;
	private Project project;
	private Member member;
	private Dynamic dynamic;
	/**
	 * 获取所有的用户
	 * 
	 * @return
	 */
	public String loadAllPmp() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String rateProgress = request.getParameter("rateProgress");
		String pmpCode = request.getParameter("pmpCode");
		String pmpName = request.getParameter("pmpName");
		String customerName = request.getParameter("customerName");
		String startDate = request.getParameter("date1");
		String endDate = request.getParameter("date2");
		this.data = new Object[] {
				pmpService.getAllPmp(pmpCode,
						pmpName, customerName, startDate, endDate,
						rateProgress, pageVo), pageVo };
		return success();
	}
	public String loadAllPmpNoPage() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		this.data = new Object[] {pmpService.getAllPmpNoPage()};
		return success();
	}

	public String addpmp() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String members = request.getParameter("members");
		String dynamics = request.getParameter("dynamics");
		String[] accessorys = request.getParameterValues("accessorys");// 所有附件
		pmp.setUser(user);
		pmpService.addpmp(pmp, members, project, accessorys,
				dynamics,user.getUserName());
		return success();
	}

	public String findpmpById() {
		String pmpId = request.getParameter("pmpId");
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String roleId = user.getRole().getRoleId();
		this.data = pmpService.findpmpById(pmpId, roleId,
				user.getUserId());
		return success();
	}
	public String findpmpByCode() {
		String pmpCode = request.getParameter("pmpCode");
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String roleId = user.getRole().getRoleId();
		this.data = pmpService.findpmpByCode(pmpCode, roleId,
				user.getUserId());
		return success();
	}

	public String downloadFile() throws IOException {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String filePath = request.getParameter("file");
		pmpService.downloadfile(filePath, response);
		return success();
	}

	public String checkpmpCode() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			this.code = "201";
			return failure("登录超时，请重新登录！");
		}
		String pmpId = request.getParameter("pmpId");
		String pmpCode = request.getParameter("pmpCode");
		this.data = pmpService.checkpmpCode(pmpId,
				pmpCode.replace(" ", ""));
		return success();
	}

	public String addMember() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String pmpId = request.getParameter("pmpId1");
		pmpService.addMember(pmpId, member);
		return success();
	}

	public String addDynamic() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String pmpId = request.getParameter("pmpId2");
		pmpService.addDynamic(pmpId, dynamic,user.getUserName());
		return success();
	}
	public Pmp getPmp() {
		return pmp;
	}

	public void setPmp(Pmp pmp) {
		this.pmp = pmp;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public Dynamic getDynamic() {
		return dynamic;
	}

	public void setDynamic(Dynamic dynamic) {
		this.dynamic = dynamic;
	}

}

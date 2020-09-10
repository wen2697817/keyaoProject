package com.glintech.keyaoProject.log.action;

import javax.annotation.Resource;

import com.glintech.keyaoProject.core.BaseAction;
import com.glintech.keyaoProject.log.service.ILogService;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.util.Globals;

public class LogAction extends BaseAction {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Resource
	private ILogService logService;
	public String loadAllLog(){
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String userName = request.getParameter("userName");
		String pmpCode = request.getParameter("pmpCode");
		String pmpName = request.getParameter("pmpName");
		String beginDate = request.getParameter("beginDate");
		String endDate = request.getParameter("endDate");
		this.data = new Object[] {logService.loadAllLog(userName,pmpCode,pmpName,beginDate,endDate,pageVo),pageVo};
		return success();
	}
}

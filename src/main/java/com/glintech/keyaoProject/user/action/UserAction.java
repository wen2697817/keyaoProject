package com.glintech.keyaoProject.user.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;

import com.glintech.keyaoProject.core.BaseAction;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.user.service.IUserService;
import com.glintech.keyaoProject.util.Globals;
import com.glintech.keyaoProject.util.MD5;

public class UserAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private User user;
	@Resource
	private IUserService userService;
	/**
	 * 验证用户名是否重复
	 * @return
	 */
	public String checkUserName(){
		String userId = request.getParameter("userId");
		String userName = request.getParameter("userName");
		int count = userService.selectUserByUserName(userId,userName);
		return success(String.valueOf(count));
	}
	/**
	 * 保存用户信息
	 * 
	 * @return
	 */
	public String saveUser() {
		if(StringUtils.isEmpty(user.getUserId())){
			user.setPassword(MD5.getMD5("1"));
		}
		userService.saveUser(user);
		try {
			return success();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	/**
	 * 获取所有的用户
	 * 
	 * @return
	 */
	public String loadAllUser() {
		this.definedReturnResult = "/user/userList.jsp";
		List<User> list = new ArrayList<User>();
		list = userService.getAllUser();
		this.data = list;
		return success();
	}
	/**
	 * 获取所有的用户
	 * 
	 * @return
	 */
	public String findAllUser() {
		this.data = userService.getAllUser();;
		return success();
	}

	/**
	 * 加载所有的角色
	 * 
	 * @return
	 */
	public String loadAllRole() {
		try {
			this.data = userService.getAllRole();
			return success();
		} catch (Exception e) {
			return failure(e.getMessage());
		}
	}

	/**
	 * 跳转到编辑页面
	 * 
	 * @return
	 */
	public String toUpdateUser() {
		this.definedReturnResult = "/user/userSet.jsp";
		String userId = request.getParameter("userId");
		this.data = userService.getUserById(userId);
		return success();
	}
	/**
	 * 通过主键查询user对象
	 * @return
	 */
	public String selectUserByUserId(){
		String userId = request.getParameter("userId");
		this.data = userService.getUserById(userId);
		return success();
	}
	/**
	 * 删除用户
	 * 
	 * @return
	 */
	public String deleteUser() {
		String userId = request.getParameter("userId");
		String message= userService.deleteUserById(userId);
		return success(message);
	}
	/**
	 * 重置密码
	 * @return
	 */
	public String resetPsw() {
		String userId = request.getParameter("userId");
		userService.updateResetPsw(userId);
		return success("密码重置成功！");
	}
	public String checkPassword(){
		User user = Globals.getLoginInfoBean(request.getSession());
		String password = MD5.getMD5(request.getParameter("password"));
		if(password.equals(user.getPassword())){
			return success();
		}else{
			return failure("原密码错误");
		}
		
	}
	/**
	 * 修改密码
	 * @return
	 */
	public String updatePsw() {
		User user = Globals.getLoginInfoBean(request.getSession());
		String password1 = request.getParameter("password1");
		user.setPassword(MD5.getMD5(password1));
		userService.updatePsw(user);
		return success();
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}

package com.glintech.keyaoProject.user.service;

import java.util.List;

import com.glintech.keyaoProject.model.Role;
import com.glintech.keyaoProject.model.User;


public interface IUserService {
	/**
	 * 保存用户信息
	 * 
	 * @param user
	 */
	public void saveUser(User user);

	/**
	 * 获取所有的用户
	 * 
	 * @return
	 */
	public List<User> getAllUser();

	/**
	 * 根据id获取用户对象
	 * 
	 * @param id
	 * @return
	 */
	public User getUserById(String id);

	/**
	 * 根据id删除用户
	 * 
	 * @param id
	 */
	public String deleteUserById(String id);
	/**
	 * 获得所有角色
	 * @return
	 */
	public List<Role> getAllRole();
	/**
	 * 重置密码
	 * @param userId
	 */
	public void updateResetPsw(String userId);
	/**
	 * 根据用户名查询用户个数
	 * @param userName
	 * @return
	 */
	public int selectUserByUserName(String userId,String userName);
	/**
	 * 更新密码
	 * @param user
	 */
	public void updatePsw(User user);
	/**
	 * 查询所有业务员
	 * @return
	 */
	public Object findAllUser();
}

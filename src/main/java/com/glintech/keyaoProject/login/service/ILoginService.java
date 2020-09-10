package com.glintech.keyaoProject.login.service;

import java.util.List;

import com.glintech.keyaoProject.model.User;



public interface ILoginService {
	/**
	 * 根据用户名获取用户对象
	 * 
	 * @param userName
	 * @return
	 */
	public List<User> getUserByUserName(String userName);
}

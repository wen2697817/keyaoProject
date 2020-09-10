package com.glintech.keyaoProject.login.service.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.glintech.keyaoProject.core.BaseService;
import com.glintech.keyaoProject.login.service.ILoginService;
import com.glintech.keyaoProject.model.User;

@Repository("loginService")
public class LoginServiceImpl extends BaseService implements ILoginService {

	public List<User> getUserByUserName(String userName) {
		String hql="from User where userName=?";
		return commonDao.getObjects(hql, new Object[]{userName});
	}
}

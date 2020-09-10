package com.glintech.keyaoProject.user.service.impl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.glintech.keyaoProject.core.BaseService;
import com.glintech.keyaoProject.model.Pmp;
import com.glintech.keyaoProject.model.Role;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.user.service.IUserService;
import com.glintech.keyaoProject.util.MD5;
import com.glintech.keyaoProject.util.Tools;

@Repository
public class UserServiceImpl extends BaseService implements IUserService {

	public void saveUser(User user) {
		// 如果用户id为空，则为新增用户，调用addObject方法；否则是编辑用户，调用updateObject方法
		if (StringUtils.isEmpty(user.getUserId())) {
			commonDao.addObject(user);
		} else {
			commonDao.updateObject(user);
		}
	}

	public List<User> getAllUser() {
		String hql = "FROM User order by userName ASC";
		return commonDao.getObjects(hql);
	}

	public User getUserById(String id) {

		return commonDao.getObject(User.class, id);
	}

	public String deleteUserById(String id) {
		String hql = "from pmp c where c.user.userId=?";
		List<Pmp> pmpList = commonDao.getObjects(hql, new Object[]{id});
		if(pmpList!=null&&pmpList.size()>0){
			return "该用户下存在客户，删除用户失败！";
		}
		commonDao.delObject(User.class, id);
		return "删除成功！";
	}

	public List<Role> getAllRole() {
		String hql = "from Role r order by r.roleId";
		List<Role> roles = commonDao.getObjects(hql);
		return roles;
	}

	public void updateResetPsw(String userId) {
		String password = MD5.getMD5("1");
		String sql = "update user set password=? where user_id=?";
		commonDao.executeJDBCSql(sql, new Object[] { password, userId });
	}

	public int selectUserByUserName(String userId,String userName) {
		if(!Tools.isEmpty(userId)){
			User user = commonDao.getObject(User.class, userId);
			if(userName.equals(user.getUserName())){
				return 0;
			}
		}
		String hql = "from User r where r.userName=?";
		List<User> userList = commonDao.getObjects(hql, new Object[]{userName});
		if(userList!=null){
			return userList.size();
		}
		return 0;
	}

	public void updatePsw(User user) {
		// TODO Auto-generated method stub
		commonDao.updateObject(user);
	}

	public Object findAllUser() {
		String hql = "FROM User where role.roleId='3'";
		return commonDao.getObjects(hql);
	}

}

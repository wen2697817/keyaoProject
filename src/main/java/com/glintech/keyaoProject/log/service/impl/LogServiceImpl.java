package com.glintech.keyaoProject.log.service.impl;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.glintech.keyaoProject.core.BaseService;
import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.log.service.ILogService;
@Repository("logService")
public class LogServiceImpl extends BaseService implements ILogService {

	public List<Object> loadAllLog(String userName, String pmpCode,String pmpName,
			String beginDate, String endDate, PageValueObject pageVo) {
		String hql = "select l.logId,l.pmpCode,l.userName,l.logName,c.pmpName,"
				+ "l.createTime from Log l,Pmp c where l.pmpCode=c.pmpCode";
		if(!StringUtils.isEmpty(userName)){
			hql = hql + " and l.userName like '%"+userName+"%'";
		}
		if(!StringUtils.isEmpty(pmpCode)){
			hql = hql + " and c.pmpCode like '%"+pmpCode+"%'";
		}
		if(!StringUtils.isEmpty(pmpName)){
			hql = hql + " and c.pmpName like '%"+pmpName+"%'";
		}
		if(!StringUtils.isEmpty(beginDate)){
			hql = hql + " and l.createTime>='"+beginDate+"'";
		}
		if(!StringUtils.isEmpty(endDate)){
			hql = hql + " and l.createTime>='"+endDate+"'";
		}
		hql = hql + " order by l.createTime desc";
		return commonDao.getObjectsByPage(hql, pageVo);
	}

}

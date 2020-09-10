package com.glintech.keyaoProject.pmp.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.glintech.keyaoProject.core.BaseService;
import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.pmp.service.IPmpService;
import com.glintech.keyaoProject.model.Accessory;
import com.glintech.keyaoProject.model.Dynamic;
import com.glintech.keyaoProject.model.Member;
import com.glintech.keyaoProject.model.Pmp;
import com.glintech.keyaoProject.model.Log;
import com.glintech.keyaoProject.model.Project;
import com.glintech.keyaoProject.util.Tools;

@Repository
public class PmpServiceImpl extends BaseService implements
		IPmpService {

	public List<Object> getAllPmp( String pmpCode,
			String pmpName, String customerName, String startDate,
			String endDate, String rateProgress, PageValueObject pageVo) {
		String hql = "select c.user.userId,c.user.name,"
				+ "c.pmpCode,c.pmpId,c.pmpName,c.customerName,c.rateProgress,c.startTime,c.endTime from Pmp c where 1=1 ";
		if (!StringUtils.isEmpty(pmpCode)) {
			hql = hql + "and c.pmpCode like '%" + pmpCode + "%' ";
		}
		if (!StringUtils.isEmpty(pmpName)) {
			hql = hql + "and c.pmpName like '%" + pmpName + "%' ";
		}
		if (!StringUtils.isEmpty(customerName)) {
			hql = hql + "and c.customerName like '%" + customerName + "%' ";
		}
		if (!StringUtils.isEmpty(startDate)) {
			hql = hql + "and c.startTime>='" + startDate + "' ";
		}
		if (!StringUtils.isEmpty(endDate)) {
			endDate = endDate + " 23:59:59";
			hql = hql + "and c.startTime<='" + endDate + "' ";
		}
		if (!StringUtils.isEmpty(rateProgress)) {
			hql = hql + "and c.rateProgress in(" + rateProgress + ") ";
		}
		hql = hql + "order by c.createTime desc";
		return commonDao.getObjectsByPage(hql, pageVo);
	}

	public void downloadfile(String filePath, HttpServletResponse response)
			throws IOException {
	}

	public void addpmp(Pmp pmp, String members,
			Project project, String[] accessorys, String dynamics,String userName) {
		String pmpId = pmp.getPmpId();
		Set<Project> projectSet = new HashSet<Project>(0);
		Set<Member> membersSet = new HashSet<Member>(0);
		Set<Dynamic> dynamicsSet = new HashSet<Dynamic>(0);
		Set<Accessory> accessorySet = new HashSet<Accessory>(0);
		project.setProjectId(null);
		if (Tools.isEmpty(pmpId)) {
			Date d = new Date();
			pmp.setCreateTime(d);
		} else {
			Pmp c = commonDao.getObject(Pmp.class, pmpId);
			pmp.setCreateTime(c.getCreateTime());
		}
		JSONArray json = JSONArray.fromObject(members);
		JSONArray jsondynamics = JSONArray.fromObject(dynamics);
		for (int i = 0; i < json.size(); i++) {
			Member member = new Member();
			member.setUserName(json.getJSONObject(i).getString("username"));
			member.setPost(json.getJSONObject(i).getString("post"));
			member.setAssignment(json.getJSONObject(i).getString("assignment"));
			member.setPmp(pmp);
			membersSet.add(member);
		}
		for (int i = 0; i < jsondynamics.size(); i++) {
			Dynamic dynamic = new Dynamic();
			dynamic.setDynamicTime(jsondynamics.getJSONObject(i).getString(
					"dynamicTime"));
			dynamic.setDynamicEndTime(jsondynamics.getJSONObject(i).getString(
					"dynamicEndTime"));
			dynamic.setUserName(jsondynamics.getJSONObject(i).getString(
					"userName"));
			dynamic.setDescribes(jsondynamics.getJSONObject(i).getString(
					"describe"));
			dynamic.setAccessory(jsondynamics.getJSONObject(i).getString(
					"accessory"));
			dynamic.setPmp(pmp);
			dynamicsSet.add(dynamic);
		}
		project.setPmp(pmp);
		projectSet.add(project);
		pmp.setMembers(membersSet);
		pmp.setDynamics(dynamicsSet);
		if (accessorys != null) {
			for (int j = 0; j < accessorys.length; j++) {
				Accessory accessory = new Accessory();
				accessory.setAccessoryPath(accessorys[j]);
				accessory.setSerialNumber(String.valueOf(j));
				accessory.setProject(project);
				accessorySet.add(accessory);
			}
			project.setAccessorys(accessorySet);
		}
		pmp.setProjects(projectSet);
		commonDao.addObject(pmp);
		if (!Tools.isEmpty(pmpId)) {
			commonDao.delObject(Pmp.class, pmpId);
		}else{
			Log log = new Log();
			log.setPmpCode(pmp.getPmpCode());
			log.setUserName(userName);
			log.setCreateTime(new Date());
			log.setLogName("新增客户信息");
			commonDao.addObject(log);
		}
		
	}

	public Pmp findpmpById(String pmpId, String roleId,
			String userId) {
		// String hql =
		// "select c.pmpId pmpId,c.pmpCode pmpCode,c.pmpName pmpName,c.pmpAddress pmpAddress,c.industry industry,"
		// +
		// "c.enterpriseProperty enterpriseProperty,c.conditionsDemand conditionsDemand,c.user.userId user.userId,c.user.name user.name,c.source source,c.url url,"
		// +
		// "c.createTime createTime,c.remark remark from pmp c where c.pmpId=?";
		Pmp c = commonDao.getObject(Pmp.class, pmpId);
		// pmp c = (pmp) commonDao.getObjects(hql, new
		// Object[]{pmpId});
		return c;
	}

	public String checkpmpCode(String pmpId, String pmpCode) {
		String hql = "";
		List<Pmp> list;
		if (Tools.isEmpty(pmpId)) {// 新增
			hql = "from Pmp c where c.pmpCode=?";
			list = commonDao.getObjects(hql, new Object[] { pmpCode });
		} else {
			hql = "from Pmp c where c.pmpId<>? and c.pmpCode=?";
			list = commonDao.getObjects(hql, new Object[] { pmpId,
					pmpCode });
		}
		return list.size() + "";
	}


	public Pmp findpmpByCode(String pmpCode, String roleId,
			String userId) {
		String hql = "from Pmp where pmpCode=?";
		List<Pmp> cc = commonDao.getObjects(hql, new Object[]{pmpCode});
		Pmp c = cc.get(0);
		return c;
	}

	public void addMember(String pmpId, Member member) {
		// TODO Auto-generated method stub
		Pmp pmp = commonDao.getObject(Pmp.class, pmpId);
		member.setPmp(pmp);
		commonDao.addObject(member);
	}

	public void addDynamic(String pmpId, Dynamic dynamic, String userName) {
		// TODO Auto-generated method stub
		Pmp pmp = commonDao.getObject(Pmp.class, pmpId);
		dynamic.setPmp(pmp);
		commonDao.addObject(dynamic);
		Log log = new Log();
		log.setPmpCode(pmp.getPmpCode());
		log.setUserName(userName);
		log.setCreateTime(new Date());
		log.setLogName("新增项目动态");
		commonDao.addObject(log);
	}

	public List<Object> getAllPmpNoPage() {
		String hql = "select pmpName from Pmp order by pmpName asc";
		return commonDao.getObjects(hql);
	}

}

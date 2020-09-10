package com.glintech.keyaoProject.purchase.service.impl;


import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.glintech.keyaoProject.core.BaseService;
import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.model.Pmp;
import com.glintech.keyaoProject.model.Purchase;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.purchase.service.IPurchaseService;
import com.glintech.keyaoProject.util.Tools;
@Repository
public class PurchaseServiceImpl extends BaseService implements
		IPurchaseService {

	public List<Object> getAllPurchase(String materialName,
			String model, String pmpName, String roleId,
			String userId, PageValueObject pageVo) {
		String hql = "select s.purchaseId,s.user.userName,s.materialName,s.model,s.unit,s.amount,s.price,s.pmpName,s.user.userId from Purchase s where 1=1 ";
		if(!StringUtils.isEmpty(materialName)){
			hql = hql + "and s.materialName like '%" + materialName + "%' ";
		}
		if(!StringUtils.isEmpty(model)){
			hql = hql + "and s.model like '%" + model + "%' ";
		}
		if(!StringUtils.isEmpty(pmpName)){
			hql = hql + "and s.pmpName like '%" + pmpName + "%' ";
		}
//		if(!(roleId.equals("1")||roleId.equals("2"))){
//			hql = hql + " and s.user.userId='"+userId+"'";
//		}
		hql = hql + " order by s.startTime desc";
		return commonDao.getObjectsByPage(hql, pageVo);
	}

	public String checkpmpCode(String purchaseId, String purchaseCode) {
		String hql = "";
		List<Pmp> list;
		if (Tools.isEmpty(purchaseId)) {// 新增
			hql = "from Purchase s where s.purchaseCode=?";
			list = commonDao.getObjects(hql, new Object[] { purchaseCode });
		} else {
			hql = "from Purchase s where s.purchaseId<>? and s.purchaseCode=?";
			list = commonDao.getObjects(hql, new Object[] { purchaseId,
					purchaseCode });
		}
		return list.size() + "";
	}

	public void addPurchase(Purchase purchase, User user) {
		// TODO Auto-generated method stub
		if(Tools.isEmpty(purchase.getPurchaseId())){//新增
			Date d = new Date();
			purchase.setCreateTime(d);
			purchase.setUser(user);
			commonDao.addObject(purchase);
		}else{//修改
			commonDao.updateObject(purchase);
		}
	}

	public Purchase findPurchaseById(String purchaseId) {
		// TODO Auto-generated method stub
		return commonDao.getObject(Purchase.class,purchaseId);
	}

}

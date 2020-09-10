package com.glintech.keyaoProject.supplier.service.impl;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;

import com.glintech.keyaoProject.core.BaseService;
import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.model.Pmp;
import com.glintech.keyaoProject.model.Supplier;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.supplier.service.ISupplierService;
import com.glintech.keyaoProject.util.Tools;
@Repository
public class SupplierServiceImpl extends BaseService implements
		ISupplierService {

	public List<Object> getAllSupplier(String supplierCode,
			String supplierName, String scopeBusiness, String roleId,
			String userId, PageValueObject pageVo) {
		String hql = "select s.supplierId,s.user.userName,s.supplierCode,s.supplierName,s.scopeBusiness,s.linkmanName,s.phoneNumber,s.user.userId from Supplier s where 1=1 ";
		if(!StringUtils.isEmpty(supplierCode)){
			hql = hql + "and s.supplierCode like '%" + supplierCode + "%' ";
		}
		if(!StringUtils.isEmpty(supplierName)){
			hql = hql + "and s.supplierName like '%" + supplierName + "%' ";
		}
		if(!StringUtils.isEmpty(scopeBusiness)){
			hql = hql + "and s.scopeBusiness like '%" + scopeBusiness + "%' ";
		}
		if(!(roleId.equals("1")||roleId.equals("2"))){
			hql = hql + " and s.user.userId='"+userId+"'";
		}
		hql = hql + " order by s.scopeBusiness asc";
		return commonDao.getObjectsByPage(hql, pageVo);
	}

	public String checkpmpCode(String supplierId, String supplierCode) {
		String hql = "";
		List<Pmp> list;
		if (Tools.isEmpty(supplierId)) {// 新增
			hql = "from Supplier s where s.supplierCode=?";
			list = commonDao.getObjects(hql, new Object[] { supplierCode });
		} else {
			hql = "from Supplier s where s.supplierId<>? and s.supplierCode=?";
			list = commonDao.getObjects(hql, new Object[] { supplierId,
					supplierCode });
		}
		return list.size() + "";
	}

	public void addSupplier(Supplier supplier, User user) {
		// TODO Auto-generated method stub
		if(Tools.isEmpty(supplier.getSupplierId())){//新增
			Date d = new Date();
			supplier.setCreateTime(d);
			supplier.setUser(user);
			commonDao.addObject(supplier);
		}else{//修改
			commonDao.updateObject(supplier);
		}
	}

	public Supplier findSupplierById(String supplierId) {
		// TODO Auto-generated method stub
		return commonDao.getObject(Supplier.class,supplierId);
	}

	public List<Object> getAllSupplierNoPage() {
		String hql = "select supplierName from Supplier order by supplierName asc";
		return commonDao.getObjects(hql);
	}

}

package com.glintech.keyaoProject.supplier.service;

import java.util.List;

import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.model.Supplier;
import com.glintech.keyaoProject.model.User;

public interface ISupplierService {
	/**
	 * 获得数据列表
	 * @param supplierCode
	 * @param supplierName
	 * @param scopeBusiness
	 * @param roleId
	 * @param userId
	 * @param pageVo
	 * @return
	 */
	List<Object> getAllSupplier(String supplierCode, String supplierName,
			String scopeBusiness, String roleId, String userId,
			PageValueObject pageVo);
	/**
	 * 验证编号是否重复
	 * @param supplierId
	 * @param replace
	 * @return
	 */
	String checkpmpCode(String supplierId, String replace);
	/**
	 * 新增
	 * @param supplier
	 * @param user
	 */
	void addSupplier(Supplier supplier, User user);
	Supplier findSupplierById(String suplierId);
	List<Object> getAllSupplierNoPage();

}

package com.glintech.keyaoProject.purchase.service;


import java.util.List;

import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.model.Purchase;
import com.glintech.keyaoProject.model.User;

public interface IPurchaseService {
	/**
	 * 获得数据列表
	 * @param purchaseCode
	 * @param purchaseName
	 * @param scopeBusiness
	 * @param roleId
	 * @param userId
	 * @param pageVo
	 * @return
	 */
	List<Object> getAllPurchase(String purchaseCode, String purchaseName,
			String scopeBusiness, String roleId, String userId,
			PageValueObject pageVo);
	/**
	 * 验证编号是否重复
	 * @param purchaseId
	 * @param replace
	 * @return
	 */
	String checkpmpCode(String purchaseId, String replace);
	/**
	 * 新增
	 * @param purchase
	 * @param user
	 */
	void addPurchase(Purchase purchase, User user);
	Purchase findPurchaseById(String suplierId);

}

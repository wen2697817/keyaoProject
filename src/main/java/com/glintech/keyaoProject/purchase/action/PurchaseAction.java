package com.glintech.keyaoProject.purchase.action;

import javax.annotation.Resource;

import com.glintech.keyaoProject.core.BaseAction;
import com.glintech.keyaoProject.model.Purchase;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.purchase.service.IPurchaseService;
import com.glintech.keyaoProject.util.Globals;

public class PurchaseAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("restriction")
	@Resource
	private IPurchaseService purchaseService;
	private Purchase purchase;
	/**
	 * 获取所有的用户
	 * 
	 * @return
	 */
	public String loadAllPurchase() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String materialName = request.getParameter("materialName");
		String model = request.getParameter("model");
		String pmpName = request.getParameter("pmpName");
		String roleId = user.getRole().getRoleId();
		String userId = user.getUserId();
		this.data = new Object[] {
				purchaseService.getAllPurchase(materialName,
						model, pmpName,roleId,userId,pageVo), pageVo };
		return success();
	}

	public String addPurchase() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		purchaseService.addPurchase(purchase,user);
		return success();
	}

	public String findPurchaseById() {
		String purchaseId = request.getParameter("purchaseId");
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		this.data = purchaseService.findPurchaseById(purchaseId);
		return success();
	}
	public String findPurchaseByCode() {
		String pmpCode = request.getParameter("pmpCode");
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		return success();
	}

	public String checkPurchaseCode() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			this.code = "201";
			return failure("登录超时，请重新登录！");
		}
		String purchaseId = request.getParameter("purchaseId");
		String purchaseCode = request.getParameter("purchaseCode");
		this.data = purchaseService.checkpmpCode(purchaseId,
				purchaseCode.replace(" ", ""));
		return success();
	}

	/**
	 * @return the purchase
	 */
	public Purchase getPurchase() {
		return purchase;
	}

	/**
	 * @param purchase the purchase to set
	 */
	public void setPurchase(Purchase purchase) {
		this.purchase = purchase;
	}
	

}

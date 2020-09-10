package com.glintech.keyaoProject.supplier.action;

import javax.annotation.Resource;

import com.glintech.keyaoProject.core.BaseAction;
import com.glintech.keyaoProject.model.Supplier;
import com.glintech.keyaoProject.model.User;
import com.glintech.keyaoProject.supplier.service.ISupplierService;
import com.glintech.keyaoProject.util.Globals;

public class SupplierAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@SuppressWarnings("restriction")
	@Resource
	private ISupplierService supplierService;
	private Supplier supplier;

	/**
	 * 获取所有的用户
	 * 
	 * @return
	 */
	public String loadAllSupplier() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		String supplierCode = request.getParameter("supplierCode");
		String supplierName = request.getParameter("supplierName");
		String scopeBusiness = request.getParameter("scopeBusiness");
		String roleId = user.getRole().getRoleId();
		String userId = user.getUserId();
		this.data = new Object[] {
				supplierService.getAllSupplier(supplierCode, supplierName, scopeBusiness, roleId, userId, pageVo),
				pageVo };
		return success();
	}

	public String loadAllSupplierNoPage() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		this.data = new Object[] {supplierService.getAllSupplierNoPage()};
		return success();
	}

	public String addSupplier() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		supplierService.addSupplier(supplier, user);
		return success();
	}

	public String findSupplierById() {
		String supplierId = request.getParameter("supplierId");
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		this.data = supplierService.findSupplierById(supplierId);
		return success();
	}

	public String findSupplierByCode() {
		String pmpCode = request.getParameter("pmpCode");
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			return failure("登录超时，请重新登录！");
		}
		return success();
	}

	public String checkSupplierCode() {
		User user = Globals.getLoginInfoBean(request.getSession());
		if (user == null) {
			this.code = "201";
			return failure("登录超时，请重新登录！");
		}
		String supplierId = request.getParameter("supplierId");
		String supplierCode = request.getParameter("supplierCode");
		this.data = supplierService.checkpmpCode(supplierId, supplierCode.replace(" ", ""));
		return success();
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

}

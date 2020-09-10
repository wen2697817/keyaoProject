package com.glintech.keyaoProject.pmp.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import com.glintech.keyaoProject.core.PageValueObject;
import com.glintech.keyaoProject.model.Dynamic;
import com.glintech.keyaoProject.model.Member;
import com.glintech.keyaoProject.model.Pmp;
import com.glintech.keyaoProject.model.Project;

public interface IPmpService {
	/**
	 * 获得所有用户信息
	 * 
	 * @param pageVo
	 *            分页
	 * @param endDate
	 *            创建时间结束
	 * @param startDate
	 *            创建时间开始
	 * @param pmpName
	 *            客户名称
	 * @param pmpCode
	 *            客户代号
	 * @return
	 */
	List<Object> getAllPmp( String pmpCode,
			String pmpName, String customerName, String startDate,
			String endDate, String rateProgress, PageValueObject pageVo);

	/**
	 * 下载文件
	 * 
	 * @param filePath
	 *            文件原路径
	 * @param response
	 * @throws IOException
	 */
	void downloadfile(String filePath, HttpServletResponse response)
			throws IOException;

	/**
	 * 新增客户信息
	 * 
	 * @param pmp
	 */
	void addpmp(Pmp pmp, String linkmans, Project project,
			String[] accessorys, String dynamics, String userId);

	/**
	 * 通过主键id 查找客户信息
	 * 
	 * @param pmpId
	 *            主键id
	 */
	Pmp findpmpById(String pmpId, String roleId, String userId);

	/**
	 * 验证客户代号
	 * 
	 * @param pmpId
	 *            客户id
	 * @param pmpCode
	 *            客户编号
	 * @return
	 */
	String checkpmpCode(String pmpId, String pmpCode);


	Pmp findpmpByCode(String pmpCode, String roleId, String userId);
	/**
	 * 添加项目成员
	 * @param pmpId
	 * @param member
	 */
	void addMember(String pmpId, Member member);
	/**
	 * 添加项目动态
	 * @param pmpId
	 * @param dynamic
	 * @param userName
	 */
	void addDynamic(String pmpId, Dynamic dynamic, String userName);

	List<Object> getAllPmpNoPage();

}

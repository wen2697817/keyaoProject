package com.glintech.keyaoProject.log.service;

import java.util.List;

import com.glintech.keyaoProject.core.PageValueObject;

public interface ILogService {

	List<Object> loadAllLog(String userName, String pmpCode,String pmpName, String beginDate,
			String endDate, PageValueObject pageVo);

}

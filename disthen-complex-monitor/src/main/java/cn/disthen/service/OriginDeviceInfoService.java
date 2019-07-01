package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.OriginDeviceInfo;

public interface OriginDeviceInfoService {
	
	
	public void AddOriginDevice(OriginDeviceInfo device);
	
	
	public OriginDeviceInfo findOriginDeviceById(String id);
	
	public List<OriginDeviceInfo> findAllOriginDevice();
	
	//添加操作
	public void bindLogicGroupAndOriginDevice(String logicId,String originId);
	
	
}

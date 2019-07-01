package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.LogicDevice;

public interface LogicDeviceService {
	
	public void AddLogicDevice(LogicDevice device);
	
	public LogicDevice findLogicDeviceById(String id);
	
	public List<LogicDevice> findAllLogicDevice();
	
	public void deleteLogicDeviceById(String id);
	
	public void updateLogicDevice(LogicDevice device);
	
	
}

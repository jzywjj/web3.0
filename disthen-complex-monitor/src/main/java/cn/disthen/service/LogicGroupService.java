package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.MonitorLogicGroup;

public interface LogicGroupService {
	
	public void AddLogicGroup(MonitorLogicGroup group,String pid);
	
	public void deleteLogicGroupById(String id);
	
	public List<MonitorLogicGroup> findAllLogicGroups();
	
	
	public MonitorLogicGroup findLogicGroupById(String id);
	
	public void updateLogicGroup(MonitorLogicGroup group);
}

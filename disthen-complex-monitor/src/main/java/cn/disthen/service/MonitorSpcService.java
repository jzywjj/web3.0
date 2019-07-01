package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.MonitorCard;
import cn.disthen.entity.MonitorSpc;

public interface MonitorSpcService {
	
	public void saveMonitorSpc(MonitorSpc spc);
	
	public void saveMonitorSpcAll(List<MonitorSpc> spcs);
	
	
	public List<MonitorCard> findAllCardsByIds(List<String> ids);

	public List<MonitorSpc> findAllMonitorSpcs();
}

package cn.disthen.service.impl;

import java.util.List;

import cn.disthen.bagdata.entity.EvenInfo;

public interface EventService {
	
public void addEvent(EvenInfo e);
	
	public EvenInfo findEventById(String id);
	
	public List<EvenInfo> findByPage(Long pageNum,Long pageSize);
	
	public EvenInfo findEventByDeviceId(String deviceId);
}

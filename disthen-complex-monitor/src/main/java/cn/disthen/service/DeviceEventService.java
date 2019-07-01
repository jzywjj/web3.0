package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.DeviceEvent;
import cn.disthen.entity.EventLevel;

public interface DeviceEventService {
	
	public void addDeviceEvent(DeviceEvent e);
	
	public void deleteDeviceEventById(String id);
	
	public  void updateDeviceEvent(DeviceEvent e);
	
	public DeviceEvent findDeviceEventById(String id);
	
	public List<DeviceEvent> findAllDeviceEvent();
	
	
	public void addEventLevel(EventLevel el);
	
	public void deleteEventLevelById(String id);
	
	public  void updateEventLevel(EventLevel e);
	
	public EventLevel findEventLevelById(String id);
	
	public List<EventLevel> findAllEventLevel();
	
	
}

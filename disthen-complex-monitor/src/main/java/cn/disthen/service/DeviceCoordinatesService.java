package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.DeviceCoordinates;

public interface DeviceCoordinatesService {
	
	public void AddCoordinates(DeviceCoordinates dc );
	
	public void updateCoordinates(DeviceCoordinates dc);
	
	public void deleteCoordinatesById(String id);
	
	public DeviceCoordinates findCoordinatesByName(String coordinatesName);
	
	public DeviceCoordinates findCoordinatesByLongitudeAndLatitude(String longitude,String latitude);
	
	public List<DeviceCoordinates> findAllDeviceCoordinates();
	
}

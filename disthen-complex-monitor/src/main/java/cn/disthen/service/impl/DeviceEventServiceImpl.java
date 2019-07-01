package cn.disthen.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.disthen.entity.DeviceEvent;
import cn.disthen.entity.EventLevel;
import cn.disthen.repo.DeviceEventRepository;
import cn.disthen.repo.EventLevelRepository;
import cn.disthen.service.DeviceEventService;
@Service
public class DeviceEventServiceImpl implements DeviceEventService {
	
	private final DeviceEventRepository deRepo;
	private final EventLevelRepository elRepo;
	
	
	public DeviceEventServiceImpl(DeviceEventRepository deRepo, EventLevelRepository elRepo) {
		super();
		this.deRepo = deRepo;
		this.elRepo = elRepo;
	}

	@Override
	public void addDeviceEvent(DeviceEvent e) {
		deRepo.save(e);

	}

	@Override
	public void deleteDeviceEventById(String id) {
		
		deRepo.deleteById(id);
	}

	@Override
	public void updateDeviceEvent(DeviceEvent e) {
		deRepo.save(e);

	}

	@Override
	public DeviceEvent findDeviceEventById(String id) {
		// TODO Auto-generated method stub
		return deRepo.findById(id).orElse(null);
	}

	@Override
	public List<DeviceEvent> findAllDeviceEvent() {
		// TODO Auto-generated method stub
		return deRepo.findAll();
	}

	@Override
	public void addEventLevel(EventLevel el) {
		elRepo.save(el);

	}

	@Override
	public void deleteEventLevelById(String id) {
		elRepo.deleteById(id);
	}

	@Override
	public void updateEventLevel(EventLevel e) {
		elRepo.save(e);

	}

	@Override
	public EventLevel findEventLevelById(String id) {
		// TODO Auto-generated method stub
		return elRepo.findById(id).orElse(null);
	}

	@Override
	public List<EventLevel> findAllEventLevel() {
		// TODO Auto-generated method stub
		return elRepo.findAll();
	}

}

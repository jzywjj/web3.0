package cn.disthen.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.disthen.entity.LogicDevice;
import cn.disthen.repo.LogicDeviceRepository;
import cn.disthen.service.LogicDeviceService;
@Service
public class LogicDeviceServiceImpl implements LogicDeviceService {
	
	private final LogicDeviceRepository deviceRepository;
	
	

	public LogicDeviceServiceImpl(LogicDeviceRepository deviceRepository) {
		this.deviceRepository = deviceRepository;
	}

	@Override
	public void AddLogicDevice(LogicDevice device) {
		deviceRepository.save(device);
	}

	@Override
	public LogicDevice findLogicDeviceById(String id) {
		// TODO Auto-generated method stub
		return deviceRepository.findById(id).orElse(null);
	}

	@Override
	public List<LogicDevice> findAllLogicDevice() {
		return deviceRepository.findAll();
	}

	@Override
	public void deleteLogicDeviceById(String id) {
		deviceRepository.deleteById(id);
	}

	@Override
	public void updateLogicDevice(LogicDevice device) {
		deviceRepository.save(device);
	}

}

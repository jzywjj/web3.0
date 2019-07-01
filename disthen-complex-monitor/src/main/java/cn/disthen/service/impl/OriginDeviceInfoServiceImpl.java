package cn.disthen.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.disthen.entity.LogicGroupAndLogicDevice;
import cn.disthen.entity.OriginDeviceInfo;
import cn.disthen.repo.LogicGroupAndOriginDeviceRepository;
import cn.disthen.repo.OriginDeviceInfoRepository;
import cn.disthen.service.OriginDeviceInfoService;
@Service
public class OriginDeviceInfoServiceImpl implements OriginDeviceInfoService {
	
	private final OriginDeviceInfoRepository originRepo;

	private final LogicGroupAndOriginDeviceRepository loRepo;

	

	public OriginDeviceInfoServiceImpl(OriginDeviceInfoRepository originRepo,
			LogicGroupAndOriginDeviceRepository loRepo) {
		super();
		this.originRepo = originRepo;
		this.loRepo = loRepo;
	}

	@Override
	public void AddOriginDevice(OriginDeviceInfo device) {
		originRepo.save(device);
	}

	@Override
	public OriginDeviceInfo findOriginDeviceById(String id) {
		// TODO Auto-generated method stub
		return originRepo.findById(id).orElse(null);
	}

	@Override
	public List<OriginDeviceInfo> findAllOriginDevice() {
		// TODO Auto-generated method stub
		return originRepo.findAll();
	}

	@Override
	public void bindLogicGroupAndOriginDevice(String logicId, String originId) {
		
		loRepo.save(new LogicGroupAndLogicDevice(logicId, originId));
	}
	
}

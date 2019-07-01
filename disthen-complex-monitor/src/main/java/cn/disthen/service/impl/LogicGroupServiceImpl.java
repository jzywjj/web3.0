package cn.disthen.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import cn.disthen.entity.MonitorLogicGroup;
import cn.disthen.repo.MonitorLogicGroupRepo;
import cn.disthen.service.LogicGroupService;
@Service
public class LogicGroupServiceImpl implements LogicGroupService {
	
	private final MonitorLogicGroupRepo lgroupRepo;
	
	
	public LogicGroupServiceImpl(MonitorLogicGroupRepo lgroupRepo) {
		super();
		this.lgroupRepo = lgroupRepo;
	}

	@Override
	public void AddLogicGroup(MonitorLogicGroup group, String pid) {
		Optional<MonitorLogicGroup> pgroup = lgroupRepo.findById(pid);
		if(pgroup.isPresent()) {
			lgroupRepo.save(group.setGroups(pgroup.get()));
		}else {
			lgroupRepo.save(group);
		}
	}

	@Override
	public void deleteLogicGroupById(String id) {
		lgroupRepo.deleteById(id);
	}

	@Override
	public List<MonitorLogicGroup> findAllLogicGroups() {
		// TODO Auto-generated method stub
		return lgroupRepo.findAll();
	}

	@Override
	public MonitorLogicGroup findLogicGroupById(String id) {
		// TODO Auto-generated method stub
		return lgroupRepo.findById(id).orElse(null);
	}

	@Override
	public void updateLogicGroup(MonitorLogicGroup group) {
		lgroupRepo.save(group);
	}

}

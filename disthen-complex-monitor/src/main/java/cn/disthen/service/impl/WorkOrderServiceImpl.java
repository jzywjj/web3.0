package cn.disthen.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.disthen.entity.WorkOrder;
import cn.disthen.repo.WorkOrderRepository;
import cn.disthen.service.WorkOrderService;
@Service
public class WorkOrderServiceImpl implements WorkOrderService {
	
	private final WorkOrderRepository wRepo;

	public WorkOrderServiceImpl(WorkOrderRepository wRepo) {
		super();
		this.wRepo = wRepo;
	}

	@Override
	public void addWorkOrder(WorkOrder workOrder) {
		wRepo.save(workOrder);
		
	}

	@Override
	public void deleteWorkOrderById(String id) {
		wRepo.deleteById(id);
		
	}

	@Override
	public void updateWorkOrder(WorkOrder workOrder) {
		wRepo.save(workOrder);
		
	}

	@Override
	public WorkOrder findWorkOrderByID(String id) {
		// TODO Auto-generated method stub
		return wRepo.findById(id).orElse(null);
	}

	@Override
	public List<WorkOrder> findAllWorkOrder() {
		// TODO Auto-generated method stub
		return wRepo.findAll();
	}
	
	
}

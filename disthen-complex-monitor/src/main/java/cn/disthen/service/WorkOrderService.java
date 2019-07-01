package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.WorkOrder;

public interface WorkOrderService {
	
	public void addWorkOrder(WorkOrder workOrder);
	
	public void deleteWorkOrderById(String id);
	
	public void updateWorkOrder(WorkOrder workOrder);
	
	public WorkOrder findWorkOrderByID(String id);
	
	public List<WorkOrder> findAllWorkOrder();
}

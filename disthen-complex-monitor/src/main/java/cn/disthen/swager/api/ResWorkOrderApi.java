package cn.disthen.swager.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.entity.DeviceEvent;
import cn.disthen.entity.WorkOrder;
import cn.disthen.service.WorkOrderService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/workOrder")
@RestController
public class ResWorkOrderApi {
	
	
	private final WorkOrderService orderService;
	
	
	public ResWorkOrderApi(WorkOrderService orderService) {
		super();
		this.orderService = orderService;
	}

	@ApiOperation(
	        value = "工单对象添加",
	        notes = "工单对象添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
//	@ApiImplicitParams({
//       // @ApiImplicitParam(name = "workOrder", value = "工单对象", required = true, dataType = "Obeject", paramType = "body"),
//       
//	})
	@RequestMapping("/addWorkOrder")
	public Boolean addWorkOrder(WorkOrder workOrder) {
		try {
			orderService.addWorkOrder(workOrder);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	
	@ApiOperation(
	        value = "删除工单对象",
	        notes = "用户信息添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "工单对象id", required = true, dataType = "String", paramType = "query"),
	})
	@RequestMapping("/deleteWorkOrderById")
	public Boolean deleteWorkOrderById(String id) {
		try {
			orderService.deleteWorkOrderById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	@ApiOperation(
	        value = "工单对象修改",
	        notes = "工单对象修改",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
//	@ApiImplicitParams({
//        @ApiImplicitParam(name = "workOrder", value = "工单对象", required = true, dataType = "Obeject", paramType = "body"),
//       
//	})
	@RequestMapping("/updateWorkOrder")
	public Boolean updateWorkOrder(WorkOrder workOrder) {
		try {
			orderService.updateWorkOrder(workOrder);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	
	

	@ApiOperation(
	        value = "根据Id 查询工单对象",
	        notes = "根据Id 查询工单对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = WorkOrder.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "工单ID", required = true, dataType = "String", paramType = "query"),
       
	})
	@RequestMapping("/findWorkOrderByID")
	public WorkOrder findWorkOrderByID(String id) {
		return orderService.findWorkOrderByID(id);
	}
	
	
	

	@ApiOperation(
	        value = "查询所有工单对象",
	        notes = "查询所有工单对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = WorkOrder.class,
	        httpMethod="PUT"
	)
	@RequestMapping("/findAllWorkOrder")
	public List<WorkOrder> findAllWorkOrder(){
		return orderService.findAllWorkOrder();
	}
}

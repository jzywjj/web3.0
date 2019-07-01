package cn.disthen.swager.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.entity.DeviceEvent;
import cn.disthen.entity.EventLevel;
import cn.disthen.service.DeviceEventService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/event")
@RestController
public class ResEventApi {
	
	private final DeviceEventService dService;

	public ResEventApi(DeviceEventService dService) {
		super();
		this.dService = dService;
	}
	
	
	@ApiOperation(
	        value = "事件对象添加",
	        notes = "事件对象添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
//	@ApiImplicitParams({
//        @ApiImplicitParam(name = "deviceEvent", value = "事件对象", required = true, dataType = "Obeject", paramType = "body"),
//       
//	})
	@RequestMapping("/addDeviceEvent")
	public Boolean addDeviceEvent(DeviceEvent deviceEvent) {
		try {
			dService.addDeviceEvent(deviceEvent);
			return Boolean.TRUE;
		} catch (Exception e2) {
			return Boolean.FALSE;
		}
		
	}
	
	
	@ApiOperation(
	        value = "删除事件对象",
	        notes = "删除事件对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "事件id", required = true, dataType = "String", paramType = "query"),
	})
	@RequestMapping("/deleteDeviceEventById")
	public Boolean deleteDeviceEventById(String id) {
		try {
			dService.deleteDeviceEventById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
		
	}
	
	
	@ApiOperation(
	        value = "事件对象修改",
	        notes = "事件对象修改",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
//	@ApiImplicitParams({
//        @ApiImplicitParam(name = "deviceEvent", value = "事件对象", required = true, dataType = "Obeject", paramType = "body"),
//       
//	})
	@RequestMapping("/updateDeviceEvent")
	public  Boolean updateDeviceEvent(DeviceEvent deviceEvent) {
		try {
			dService.updateDeviceEvent(deviceEvent);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	@ApiOperation(
	        value = "根据Id 查询事件对象",
	        notes = "根据Id 查询事件对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = DeviceEvent.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "事件ID", required = true, dataType = "String", paramType = "query"),
       
	})
	@RequestMapping("/findDeviceEventById")
	public DeviceEvent findDeviceEventById(String id) {
		return dService.findDeviceEventById(id);
	}
	
	@ApiOperation(
	        value = "查询所有事件对象",
	        notes = "查询所有事件对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = List.class,
	        httpMethod="PUT"
	)
	
	@RequestMapping("/findAllDeviceEvent")
	public List<DeviceEvent> findAllDeviceEvent(){
		return dService.findAllDeviceEvent();
	}
	
	@ApiOperation(
	        value = "事件级别添加",
	        notes = "事件级别添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
//	@ApiImplicitParams({
//        @ApiImplicitParam(name = "eventLevel", value = "事件级别对象", required = true, dataType = "Obeject", paramType = "body"),
//       
//	})
	@RequestMapping("/addEventLevel")
	public Boolean addEventLevel(EventLevel eventLevel) {
		try {
			dService.addEventLevel(eventLevel);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	@ApiOperation(
	        value = "删除事件级别对象",
	        notes = "删除事件级别对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
//	@ApiImplicitParams({
//        @ApiImplicitParam(name = "id", value = "事件级别id", required = true, dataType = "String", paramType = "query"),
//	})
	@RequestMapping("/deleteEventLevelById")
	public Boolean deleteEventLevelById(String id) {
		try {
			dService.deleteEventLevelById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	@ApiOperation(
	        value = "事件级别修改",
	        notes = "事件级别修改",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "eventLevel", value = "事件级别对象", required = true, dataType = "Obeject", paramType = "body"),
       
	})
	@RequestMapping("/updateEventLevel")
	public  Boolean updateEventLevel(EventLevel eventLevel) {
		try {
			dService.updateEventLevel(eventLevel);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	@ApiOperation(
	        value = "根据Id 查询事件级别对象",
	        notes = "根据Id 查询事件级别对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = EventLevel.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "事件级别ID", required = true, dataType = "String", paramType = "query"),
       
	})
	@RequestMapping("/findEventLevelById")
	public EventLevel findEventLevelById(String id) {
		return dService.findEventLevelById(id);
	}
	
	@ApiOperation(
	        value = "查询所有事件级别对象",
	        notes = "查询所有事件级别对象",
	        produces = "application/json",
	        consumes = "application/json",
	        response = List.class,
	        httpMethod="PUT"
	)
	@RequestMapping("/findAllEventLevel")
	public List<EventLevel> findAllEventLevel(){
		return dService.findAllEventLevel();
	}
	

}

package cn.disthen.swager.api;

import java.util.List;

import org.apache.thrift.transport.TFileTransport.truncableBufferedInputStream;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.entity.LogicDevice;
import cn.disthen.service.LogicDeviceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/logicDevice")
@RestController
public class ResLogicDeviceApi {
	
	private final LogicDeviceService logicDeviceService;
	
	public ResLogicDeviceApi(LogicDeviceService logicDeviceService) {
		super();
		this.logicDeviceService = logicDeviceService;
	}

	@ApiOperation(
	        value = "逻辑设备添加",
	        notes = "逻辑设备添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "device", value = "逻辑设备", required = true, dataType = "Obejct", paramType = "body"),
        
	})
	@RequestMapping("/addLogicDevice")
	public Boolean addLogicDevice(LogicDevice device) {
		try {
			logicDeviceService.AddLogicDevice(device);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
		
	}
	
	
	@ApiOperation(
	        value = "根据id 查询逻辑设备信息",
	        notes = "根据id 查询逻辑设备信息",
	        produces = "application/json",
	        consumes = "application/json",
	        response = LogicDevice.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "逻辑设备id", required = true, dataType = "String", paramType = "query"),
        
	})
	@RequestMapping("/findLogicDeviceById")
	public LogicDevice findLogicDeviceById(@RequestParam("id")String id) {
		return logicDeviceService.findLogicDeviceById(id);
	}
	
	
	@ApiOperation(
	        value = "查询逻辑所有设备信息",
	        notes = "查询逻辑所有设备信息",
	        produces = "application/json",
	        consumes = "application/json",
	        response =  LogicDevice.class,
	        httpMethod="PUT"
	)
	@RequestMapping("/findAllLogicDevice")
	public List<LogicDevice> findAllLogicDevice(){
		return logicDeviceService.findAllLogicDevice();
	}
	
	
	@ApiOperation(
	        value = "根据id 删除逻辑设备信息",
	        notes = "根据id 删除逻辑设备信息",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "逻辑设备id", required = true, dataType = "String", paramType = "query"),
        
	})
	@RequestMapping("/deleteLogicDeviceById")
	public Boolean deleteLogicDeviceById(@RequestParam("id") String id) {
		try {
			logicDeviceService.deleteLogicDeviceById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	@ApiOperation(
	        value = "逻辑设备跟新",
	        notes = "逻辑设备跟新",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "device", value = "逻辑设备", required = true, dataType = "Obejct", paramType = "body"),
        
	})
	@RequestMapping("/updateLogicDevice")
	public Boolean updateLogicDevice(LogicDevice device) {
		try {
			logicDeviceService.updateLogicDevice(device);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
}

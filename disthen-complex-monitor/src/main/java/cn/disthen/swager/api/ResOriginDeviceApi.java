package cn.disthen.swager.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.entity.OriginDeviceInfo;
import cn.disthen.service.OriginDeviceInfoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/originDeviceApi")
@RestController
public class ResOriginDeviceApi {
	
	private final OriginDeviceInfoService originService;

	public ResOriginDeviceApi(OriginDeviceInfoService originService) {
		super();
		this.originService = originService;
	}
	
	
	@ApiOperation(
	        value = "根据id 查询原始spc信息",
	        notes = "物理信息",
	        produces = "application/json",
	        consumes = "application/json",
	        response = OriginDeviceInfo.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "原始spc的ID", required = true, dataType = "String", paramType = "query")
       
	})
	@RequestMapping("/findOriginDeviceById")
	public OriginDeviceInfo findOriginDeviceById(String id) {
		return originService.findOriginDeviceById(id);
	}
	
	@ApiOperation(
	        value = " 查询所有原始spc信息",
	        notes = "物理信息",
	        produces = "application/json",
	        consumes = "application/json",
	        response = OriginDeviceInfo.class,
	        httpMethod="PUT"
	)
	@RequestMapping("/findAllOriginDevice")
	public List<OriginDeviceInfo> findAllOriginDevice(){
		return originService.findAllOriginDevice();
	}
	
	
	@ApiOperation(
	        value = "原始spc信息和逻辑组id绑定",
	        notes = "添加操作",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "logicId", value = "逻辑组id", required = true, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "originId", value = "原始spc的ID", required = true, dataType = "String", paramType = "query")
        
	})
	//添加操作
	@RequestMapping("/bindLogicGroupAndOriginDevice")
	public Boolean bindLogicGroupAndOriginDevice(String logicId,String originId) {
		
		try {
			originService.bindLogicGroupAndOriginDevice(logicId, originId);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
}

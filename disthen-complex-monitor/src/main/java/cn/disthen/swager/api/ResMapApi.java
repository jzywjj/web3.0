package cn.disthen.swager.api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.dto.DeviceCoordinatesDto;
import cn.disthen.entity.DeviceCoordinates;
import cn.disthen.service.DeviceCoordinatesService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/map")
@RestController
public class ResMapApi {
	
	private final DeviceCoordinatesService dcService;
	
	public ResMapApi(DeviceCoordinatesService dcService) {
		this.dcService = dcService;
	}
	@ApiOperation(
	        value = "覆盖物坐标的添加",
	        notes = "覆盖物坐标的添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "dc", value = "覆盖物坐标对象", required = true, dataType = "Obejct", paramType = "body")
       
	})
	@RequestMapping("/AddCoordinates")
	public Boolean AddCoordinates(DeviceCoordinates dc ) {
		try {
			dcService.AddCoordinates(dc);;
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	@ApiOperation(
	        value = "覆盖物坐标的修改",
	        notes = "覆盖物坐标的修改",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "dc", value = "覆盖物坐标对象", required = true, dataType = "Obejct", paramType = "body")
       
	})
	@RequestMapping("/updateCoordinates")
	public Boolean updateCoordinates(DeviceCoordinates dc) {
		try {
			dcService.updateCoordinates(dc);;
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	@ApiOperation(
	        value = "删除覆盖物坐标",
	        notes = "删除覆盖物坐标",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "覆盖物坐标对象的ID", required = true, dataType = "String", paramType = "query")
       
	})
	@RequestMapping("/deleteCoordinatesById")
	public Boolean deleteCoordinatesById(@RequestParam(value ="id",required = true ) String id) {
		try {
			dcService.deleteCoordinatesById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	
	
	
	@ApiOperation(
	        value = "根据name查询覆盖物",
	        notes = "根据name查询覆盖物",
	        produces = "application/json",
	        consumes = "application/json",
	        response = DeviceCoordinates.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "coordinatesName", value = "覆盖物坐标对象的NAME", required = true, dataType = "String", paramType = "query")
       
	})
	@RequestMapping("/findCoordinatesByName")
	public DeviceCoordinates findCoordinatesByName(@RequestParam(value ="coordinatesName",required = true ) String coordinatesName) {
		return dcService.findCoordinatesByName(coordinatesName);
	}
	
	
	
	
	@ApiOperation(
	        value = "根据坐标查询覆盖物",
	        notes = "根据坐标查询覆盖物",
	        produces = "application/json",
	        consumes = "application/json",
	        response = DeviceCoordinates.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "longitude", value = "覆盖物坐标对象的经度", required = true, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "latitude", value = "覆盖物坐标对象的纬度", required = true, dataType = "String", paramType = "query")
       
	})
	@RequestMapping("/findCoordinatesByLongitudeAndLatitude")
	public DeviceCoordinates findCoordinatesByLongitudeAndLatitude(
			@RequestParam(value ="longitude",required = true ) String longitude,
			@RequestParam(value ="latitude",required = true ) String latitude) {
		
		return dcService.findCoordinatesByLongitudeAndLatitude(longitude, latitude);
	}
	
	
	@ApiOperation(
	        value = "查询所有覆盖物",
	        notes = "查询所有覆盖物",
	        produces = "application/json",
	        consumes = "application/json",
	        response = List.class,
	        httpMethod="PUT"
	)
	@RequestMapping("/findAllDeviceCoordinates")
	public List<DeviceCoordinatesDto> findAllDeviceCoordinates(){
		
		List<DeviceCoordinatesDto> collect = dcService.findAllDeviceCoordinates().parallelStream().
		map(x->{ return new DeviceCoordinatesDto(x.getId(),x.getCoordinatesName(),
				new String[] {x.getLongitude(),x.getLatitude()},
				x.getDeviceId());}).collect(Collectors.toList());
		
		
		
		
		return collect;
	}
	
}

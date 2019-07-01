package cn.disthen.swager.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.entity.MonitorCard;
import cn.disthen.entity.MonitorSpc;
import cn.disthen.service.MonitorSpcService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/spc")
@RestController
public class ResSpcApi {
	
	
	private final MonitorSpcService mservice;

	public ResSpcApi(MonitorSpcService mservice) {
		this.mservice = mservice;
	}
	
	
	
	@ApiOperation(
	        value = "逻辑设备添加",
	        notes = "逻辑设备添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "time", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "vendorid", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "session", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "productid", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "spcname", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "hwversion", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "hwtype", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "ip", value = "逻辑设信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "version", value = "逻辑设信息", required = true, paramType = "query")
	})

	@RequestMapping("/saveMonitorSpc")
	public Boolean saveMonitorSpc(
			@RequestParam (value="time") String time		,
			@RequestParam (value="vendorid") String vendorid	,
			@RequestParam (value="session") String session	,
			@RequestParam (value="productid") String productid ,
			@RequestParam (value="spcname") String spcname	,
			@RequestParam (value="hwversion") String hwversion ,
			@RequestParam (value="hwtype") String hwtype	,
			@RequestParam (value="ip") String ip		,
			@RequestParam (value="version") String version,
			@RequestParam(value = "cardIds",required = false) List<String>cardIds
			) {
		try {
			List<MonitorCard> cards=null;
			if(cardIds!=null && cardIds.size()>0) {
				cards = mservice.findAllCardsByIds(cardIds);
			}
			MonitorSpc spc=new MonitorSpc(time, vendorid, session, productid, spcname, hwversion, hwtype, ip, version,cards);
			mservice.saveMonitorSpc(spc);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
		
	}
	@ApiOperation(
	        value = "逻辑设备查询",
	        notes = "逻辑设备查询",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@RequestMapping("/findAllMonitorSpcs")
	public List<MonitorSpc> findAllMonitorSpcs(){
		return mservice.findAllMonitorSpcs();
	}
	
}

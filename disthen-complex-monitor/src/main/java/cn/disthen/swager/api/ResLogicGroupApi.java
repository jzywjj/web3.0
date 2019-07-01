package cn.disthen.swager.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.entity.MonitorLogicGroup;
import cn.disthen.service.LogicGroupService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/logicGroup")
@RestController
public class ResLogicGroupApi {
	private final LogicGroupService logicGroupService;
	
	
	public ResLogicGroupApi(LogicGroupService logicGroupService) {
		super();
		this.logicGroupService = logicGroupService;
	}
	
	@ApiOperation(
	        value = "逻辑组添加",
	        notes = "逻辑组添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "gname", value = "逻辑组名字", required = true, paramType = "query"),
        @ApiImplicitParam(name = "description", value = "逻辑组信息", required = true, paramType = "query"),
        @ApiImplicitParam(name = "pid", value = "逻辑组父ID", required = false, paramType = "query")
        
	})

	@RequestMapping("/addLogicGroup")
	public Boolean addLogicGroup(
			@RequestParam (value="gname") String gname,
			
			@RequestParam (value="description") String description
			
			,@RequestParam(value="pid",required = false)String pid) {
		try {
			logicGroupService.AddLogicGroup(new MonitorLogicGroup(gname, description), pid);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	
	@ApiOperation(
	        value = "逻辑组删除",
	        notes = "逻辑组删除",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "pid", value = "逻辑组ID", required = true, paramType = "query")
        
	})

	@RequestMapping("/deleteLogicGroupById")
	public Boolean deleteLogicGroupById(String id) {
		try {
			logicGroupService.deleteLogicGroupById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	@ApiOperation(
	        value = "查询逻辑组",
	        notes = "查询逻辑组",
	        produces = "application/json",
	        consumes = "application/json",
	        response = List.class,
	        httpMethod="GET"
	)

	@RequestMapping("/findAllLogicGroups")
	public List<MonitorLogicGroup> findAllLogicGroups(){
		
		return logicGroupService.findAllLogicGroups();
	}
	
	
	
	@ApiOperation(
	        value = "逻辑组查询",
	        notes = "逻辑组查询",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
      
        @ApiImplicitParam(name = "id", value = "逻辑组ID", required = false, paramType = "query")
        
	})
	@RequestMapping("/findLogicGroupById")
	public MonitorLogicGroup findLogicGroupById(String id) {
		
		return logicGroupService.findLogicGroupById(id);
	}
	
	@ApiOperation(
	        value = "修改逻辑组",
	        notes = "修改逻辑组",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
      
        @ApiImplicitParam(name = "group", value = "逻辑组ID", required = false, paramType = "body")
        
	})
	public void updateLogicGroup(MonitorLogicGroup group) {
		logicGroupService.updateLogicGroup(group);
	}
	
}

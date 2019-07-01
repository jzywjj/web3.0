package cn.disthen.swager.api;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.disthen.entity.LoginUser;
import cn.disthen.entity.UserRole;
import cn.disthen.service.LoginService;
import cn.disthen.service.UserRoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "API v1.0", protocols = "http")
@RequestMapping("/api/user")
@RestController
public class AppResApi {

	private final LoginService lservice;
	private final UserRoleService roleService;
	public AppResApi(LoginService lservice,UserRoleService roleService) {
		this.lservice = lservice;
		this.roleService=roleService;
	}
	
	/*
	 * <h1>用户添加</h1>
	 * @param user
	 */
	@ApiOperation(
	        value = "用户添加",
	        notes = "用户信息添加",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="PUT"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "name", value = "用户名", required = true, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "pwd", value = "用户密码", required = true, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "description", value = "用户信息描述", required = false, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "roleIds", value = "角色ids", required = false, dataType = "String", paramType = "query"),
	})
	@RequestMapping("/addUser")
	public Boolean addUser(@RequestParam("name") String name,
			@RequestParam(value="pwd",defaultValue = "123456",required = false) String pwd,
			@RequestParam(value = "description",required = false) String description,
			@RequestParam(value="roleIds",required = false) List<String> roleIds
			) {
		try {
			List<UserRole> roles=null;
			if(roleIds!=null&&roleIds.size()>0) {
				roles = roleService.findAllUserRoleByListIds(roleIds);
			}
			
			LoginUser user=new LoginUser(name,pwd,description,roles);
			lservice.addUser(user);
			return Boolean.TRUE;
		} catch (Exception e) {
			e.printStackTrace();
			return Boolean.FALSE;
		}
		
	}
	/**
	 * <h1>根据用户的id删除用户</h1>
	 * @param id
	 */
	@ApiOperation(
	        value = "删除用户",
	        notes = "根基id 删除用户",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiResponses({
        @ApiResponse(code = 100, message = "请求信息有误"),
        @ApiResponse(code = 101, message = "未授权"),
        @ApiResponse(code = 103, message = "禁止访问"),
        @ApiResponse(code = 104, message = "请求路径不存在"),
        @ApiResponse(code = 200, message = "服务器内部错误"),
	})
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "用户id", required = true, dataType = "String", paramType = "query"),
	})
	@RequestMapping("/deleteUserById")
	public Boolean deleteUserById(String id) {
		try {
			lservice.deleteUserById(id);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	/**
	 * <h1>用户更新</h1>
	 * @param user
	 */
	@ApiOperation(
	        value = "用户更新",
	        notes = "用户更新",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiResponses({
        @ApiResponse(code = 100, message = "请求信息有误"),
        @ApiResponse(code = 101, message = "未授权"),
        @ApiResponse(code = 103, message = "禁止访问"),
        @ApiResponse(code = 104, message = "请求路径不存在"),
        @ApiResponse(code = 200, message = "服务器内部错误"),
	})
	@ApiImplicitParams({
        @ApiImplicitParam(name = "user", value = "用户信息", required = true, dataType = "LoginUser", paramType = "body"),
	})
	@RequestMapping("/updateUser")
	public Boolean updateUser(LoginUser user) {
		try {
			lservice.updateUser(user);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	/**
	 * <h1>修改用户的密码</h1>
	 * @param id
	 * @param pwd
	 * @return String Ok is success ,but ERROR is fail
	 */
	@ApiOperation(
	        value = "修改用户密码",
	        notes = "修改用户密码",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "用户id", required = true, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "pwd", value = "用户原来的密码", required = true, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "newpwd", value = "用户新的密码", required = true, dataType = "String", paramType = "query")
	})
	@RequestMapping("/updateUserPwd")
	public String updateUserPwd(String id ,String pwd,String newpwd) {
		
			return lservice.updateUserPwd(id,pwd,newpwd);
	}
	/**
	 * 查询所有的用户
	 * @return
	 */
	@ApiOperation(
	        value = "查询所有的用户",
	        notes = "查询所有的用户",
	        produces = "application/json",
	        consumes = "application/json",
	        response = List.class,
	        httpMethod="GET"
	)
	@ApiResponses({
        @ApiResponse(code = 100, message = "请求信息有误"),
        @ApiResponse(code = 101, message = "未授权"),
        @ApiResponse(code = 103, message = "禁止访问"),
        @ApiResponse(code = 104, message = "请求路径不存在"),
        @ApiResponse(code = 200, message = "服务器内部错误"),
	})
	@RequestMapping("/findAllUser")
	public List<LoginUser> findAllUser(){
		return lservice.findAllUser();
	}
	/**
	 * <h1>根据用户的id查询用户信息</h1>
	 * @param id
	 * @return
	 */
	@ApiOperation(
	        value = "根据id 查询用户信息",
	        notes = "根据id 查询用户信息",
	        produces = "application/json",
	        consumes = "application/json",
	        response = LoginUser.class,
	        httpMethod="GET"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "id", value = "用户id", required = true, dataType = "String", paramType = "query")
	})  
	@RequestMapping("/findLoginUserById")
	public LoginUser findLoginUserById(String id) {
		return lservice.findLoginUserById(id);
	}
	/**
	 * <h1>批量添加用户</h1>
	 * @param user
	 */
	@ApiOperation(
	        value = "批量添加用户",
	        notes = "批量添加用户",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiResponses({
        @ApiResponse(code = 100, message = "请求信息有误"),
        @ApiResponse(code = 101, message = "未授权"),
        @ApiResponse(code = 103, message = "禁止访问"),
        @ApiResponse(code = 104, message = "请求路径不存在"),
        @ApiResponse(code = 200, message = "服务器内部错误"),
	})
	@ApiImplicitParams({
        @ApiImplicitParam(name = "user", value = "user", required = true, dataType = "List<User>", paramType = "body")
	})  
	@RequestMapping("/AddUserList")
	public Boolean AddUserList(List<LoginUser> user) {
		try {
			lservice.AddUserList(user);
			return Boolean.TRUE;
		} catch (Exception e) {
			return Boolean.FALSE;
		}
	}
	/**
	 * <h1>用户登录</h1>
	 * @param username
	 * @param pwd
	 *  @return LoginUser
	 */
	@ApiOperation(
	        value = "用户登录",
	        notes = "用户登录",
	        produces = "application/json",
	        consumes = "application/json",
	        response = Boolean.class,
	        httpMethod="POST"
	)
	@ApiImplicitParams({
        @ApiImplicitParam(name = "username", value = "用户名", required = true, dataType = "String", paramType = "query"),
        @ApiImplicitParam(name = "pwd", value = "用户的密码", required = true, dataType = "String", paramType = "query")
	})
	@RequestMapping("/loginByUserNameAndPwd")
	public LoginUser loginByUserNameAndPwd(String username,String pwd) {
		return lservice.loginByUserNameAndPwd(username, pwd);
	}
	
	 
		@ApiOperation(
		        value = "角色查询",
		        notes = "角色查询",
		        produces = "application/json",
		        //consumes = "application/json",
		        response = Boolean.class,
		        httpMethod="POST"
		)
		@RequestMapping("/findAllRoles")
	public List<UserRole> findAllRoles(){
		
		return lservice.findAllRoles();
	}
	
	

}

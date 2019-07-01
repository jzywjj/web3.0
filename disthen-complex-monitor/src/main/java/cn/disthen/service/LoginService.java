package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.LoginUser;
import cn.disthen.entity.UserRole;

/**
 * 用户管理/用户登陆
 * @author Mk king
 *
 */
public interface LoginService {
	/**
	 * <h1>用户添加</h1>
	 * @param user
	 */
	public void addUser(LoginUser user);
	/**
	 * <h1>根据用户的id删除用户</h1>
	 * @param id
	 */
	public void deleteUserById(String id);
	/**
	 * <h1>用户更新</h1>
	 * @param user
	 */
	public void updateUser(LoginUser user);
	/**
	 * <h1>修改用户的密码</h1>
	 * @param id
	 * @param pwd
	 * @return String Ok is success ,but ERROR is fail
	 */
	public String updateUserPwd(String id ,String pwd,String newpwd);
	/**
	 * 查询所有的用户
	 * @return
	 */
	public List<LoginUser> findAllUser();
	/**
	 * <h1>根据用户的id查询用户信息</h1>
	 * @param id
	 * @return
	 */
	public LoginUser findLoginUserById(String id);
	/**
	 * <h1>批量添加用户</h1>
	 * @param user
	 */
	public void AddUserList(List<LoginUser> user);
	/**
	 * <h1>用户登录</h1>
	 * @param username
	 * @param pwd
	 *  @return LoginUser
	 */
	public LoginUser loginByUserNameAndPwd(String username,String pwd);
	/**
	 * findAllRoles
	 * 
	 * @return List<UserRole>
	 */
	public List<UserRole> findAllRoles();
	
	
}

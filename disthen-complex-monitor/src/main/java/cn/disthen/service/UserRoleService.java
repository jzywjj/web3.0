package cn.disthen.service;

import java.util.List;

import cn.disthen.entity.UserRole;

public interface UserRoleService {
	
	public List<UserRole> findAllUserRoleByListIds(List<String> roleIds);
}

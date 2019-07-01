package cn.disthen.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import cn.disthen.entity.UserRole;
import cn.disthen.repo.UserRoleRepository;
import cn.disthen.service.UserRoleService;
@Service
public class UserRoleServiceImpl implements UserRoleService {
	
	private final UserRoleRepository rRepo;

	public UserRoleServiceImpl(UserRoleRepository rRepo) {
		
		this.rRepo = rRepo;
	}

	@Override
	public List<UserRole> findAllUserRoleByListIds(List<String> roleIds) {
		List<UserRole> roles = rRepo.findAllById(roleIds);
		return roles;
	};
	
	
}

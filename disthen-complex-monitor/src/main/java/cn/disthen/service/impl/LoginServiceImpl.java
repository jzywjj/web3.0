package cn.disthen.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.Predicate;

import org.springframework.stereotype.Service;

import cn.disthen.entity.LoginUser;
import cn.disthen.entity.UserRole;
import cn.disthen.repo.LoginUserRepository;
import cn.disthen.repo.UserRoleRepository;
import cn.disthen.service.LoginService;
@Service
public class LoginServiceImpl implements LoginService {
	private final LoginUserRepository userRepo;
	
	private final UserRoleRepository roleRepo;
	
	public LoginServiceImpl(LoginUserRepository userRepo,UserRoleRepository roleRepo) {
		super();
		this.userRepo = userRepo;
		this.roleRepo=roleRepo;
	}

	@Override
	public void addUser(LoginUser user) {
		userRepo.save(user);

	}

	@Override
	public void deleteUserById(String id) {
		userRepo.deleteById(id);

	}

	@Override
	public void updateUser(LoginUser user) {
		userRepo.save(user);

	}

	@Override
	public String updateUserPwd(String id ,String pwd,String newpwd) {
		
		try {
			Optional<LoginUser> LoginUserOp = userRepo.findById(id);
			LoginUserOp.ifPresent(u->{
				if(u.getPwd().equals(pwd)) {
					u.setPwd(newpwd);
					userRepo.save(u);
				}
				
			});
			return "OK";
		} catch (Exception e) {
			
			e.printStackTrace();
			return "ERROR";
		}
		
		
	}

	@Override
	public List<LoginUser> findAllUser() {
		
		return userRepo.findAll();
	}

	@Override
	public LoginUser findLoginUserById(String id) {
		// TODO Auto-generated method stub
		return userRepo.findById(id).orElse(null);
	}

	@Override
	public void AddUserList(List<LoginUser> user) {
		userRepo.saveAll(user);
		
	}

	@Override
	public LoginUser loginByUserNameAndPwd(String username, String pwd)  {
		LoginUser loginUser = userRepo.findOne((r,q,b)->{
			List<Predicate> pds=new ArrayList<>();
			Predicate names = b.equal(r.get("name").as(String.class), username);
			pds.add(names);
			Predicate pwds = b.equal(r.get("pwd").as(String.class), pwd);
			pds.add(pwds);
			
			Predicate[] p= new Predicate[pds.size()];
			 
			return b.and(pds.toArray(p));
		}).orElse(null);
		return loginUser;
	}

	@Override
	public List<UserRole> findAllRoles() {
		// TODO Auto-generated method stub
		return roleRepo.findAll();
	}

}

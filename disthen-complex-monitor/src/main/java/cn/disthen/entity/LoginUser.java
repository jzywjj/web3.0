package cn.disthen.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Data
@Table(name="LOGIN_USER")
@Entity
@ApiModel(value = "User得实体",reference = "我是参考")
public class  LoginUser{
	@Id
	private String id =UUID.randomUUID().toString().replace("-", "");
	@ApiParam(value = "姓名",required = true)
	@Column(unique = true)
	private String name;
	@ApiParam(value = "用户密码",required = true)
	private String pwd;
	@ApiParam(value = "用户描述",required = true)
	private String description;
	
	@JoinTable(name = "USER_ROLE",joinColumns = @JoinColumn(name = "USER_ID"),
		    inverseJoinColumns = @JoinColumn(name = "ROLE_ID") )
	@ManyToMany
	private List<UserRole> roles=new ArrayList<>();

	public LoginUser(String name, String pwd, String description, List<UserRole> roles) {
		this.name = name;
		this.pwd = pwd;
		this.description = description;
		this.roles = roles;
	}

	public LoginUser(String name, String pwd) {
		super();
		this.name = name;
		this.pwd = pwd;
	}
	
	

	
	
	
}

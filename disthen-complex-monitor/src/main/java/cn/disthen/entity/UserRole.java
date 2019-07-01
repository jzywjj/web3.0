package cn.disthen.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Data
@Table(name="USER_ROLE")
@Entity
public class UserRole {
	
	@Id
	private String id =UUID.randomUUID().toString().replace("-", "");
	
	private String roleName;
	
	private String roleDescription;
	
	@ManyToMany(mappedBy = "roles",fetch = FetchType.LAZY)
	private List<LoginUser> users=new ArrayList<>();
	
	@ManyToMany(mappedBy = "roles",fetch = FetchType.LAZY)
	private List<UserPemission> pemissions=new ArrayList<>();
}

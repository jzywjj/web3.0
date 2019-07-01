package cn.disthen.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
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
@Table(name="USER_PEMISSION")
@Entity
public class UserPemission {
	
	@Id
	private String id =UUID.randomUUID().toString().replace("-", "");
	
	private String pemissionName;
	
	private String url;
	
	private String icon;
	
	private String pid="as01";
	
	@JoinTable(name = "ROLE_PEMISSION",joinColumns = @JoinColumn(name = "PEMISSION_ID"),
		    inverseJoinColumns = @JoinColumn(name = "ROLE_ID") )
	@ManyToMany
	private List<UserRole> roles=new ArrayList<>();
	
}

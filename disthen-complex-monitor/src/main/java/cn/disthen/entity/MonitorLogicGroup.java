package cn.disthen.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
/**
 * 逻辑分组  和真是的spc对应，
 * 此实体是一颗树的结构
 * @author apple
 *
 */
@Entity
@Table(name="MONITOR_LOGIC_GROUP")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class MonitorLogicGroup {
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	
	private String gname;
	
	private String description;
	//父类跟子类  多个子类对应一个父类 @ManyToOne的关系
	@ManyToOne
	@JoinColumn(name="pid")
	private MonitorLogicGroup groups;
	public MonitorLogicGroup(String gname, String description) {
		super();
		this.gname = gname;
		this.description = description;
	}
	
	
}

package cn.disthen.entity;

import java.util.List;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
/**
 * 关联表，用于存放在逻辑分组
 * 和真实逻辑设备做关联时存放两张表的id
 * @author apple
 *
 */
@Entity
@Table(name="MONITOR_SPC_LOGIC_GROUP")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class MonitorSpcLogicGroup {
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	
	private String logicGroupId;
	
	private String spcId;
	
}

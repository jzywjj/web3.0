package cn.disthen.entity;

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
 * 事件和逻辑分组  关联表，
 * @author apple
 *
 */
@Entity
@Table(name="MONITOR_EVENT_LOGIC_GROUP")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class MonitorEventLogicGroup {
	
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	
	private String eventId;
	
	private String logicGroupId;
	
}

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

@Entity
@Table(name="MONITOR_EVENT_TYPE")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class MonitorEventType {
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	
	private String eventName;
	
	private String eventLevel;//事件级别
	
	private String isSms="0";//是否发送短信
	
	private String description;//事件描述
	
	
	
	
}

package cn.disthen.bagdata.entity;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Data
public class EvenInfo {
	
	private String id =UUID.randomUUID().toString().replace("-", "");
	
	private String eventName;
	
	private String EventType;
	
	private String eventData;
	
	private String deviceId;
	
	private String eventLevel;

	public EvenInfo(String eventName, String eventType, String eventData, String deviceId, String eventLevel) {
		this.eventName = eventName;
		EventType = eventType;
		this.eventData = eventData;
		this.deviceId = deviceId;
		this.eventLevel = eventLevel;
	}
	
	
}

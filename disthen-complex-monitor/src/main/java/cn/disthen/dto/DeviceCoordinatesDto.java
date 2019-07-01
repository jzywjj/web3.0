package cn.disthen.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeviceCoordinatesDto {
	
	private String id;
	private String name;
	
	private String[] value;
	
	private String deviceId;
	
	
	
}

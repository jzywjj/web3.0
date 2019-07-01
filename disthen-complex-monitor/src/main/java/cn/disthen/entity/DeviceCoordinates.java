package cn.disthen.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
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
@Table(name="DEVICE_COORDINATES")
@Entity
@ApiModel(value = "设备坐标",reference = "我是参考")
public class DeviceCoordinates {
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	
	@ApiParam(value = "经度",required = true)
	private String longitude;//经度
	
	@ApiParam(value = "纬度",required = true)
	private String latitude;//纬度
	
	@ApiParam(value = "坐标的名字",required = true)
	@Column(unique = true)
	private String coordinatesName;
	
	@ApiParam(value = "设备id",required = true)
	private String deviceId;
	
}

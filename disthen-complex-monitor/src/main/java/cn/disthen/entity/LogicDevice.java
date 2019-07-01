package cn.disthen.entity;

import java.util.UUID;

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
@Table(name="LOGIC_DEVICE")
@Entity
@ApiModel(value = "LogicDevice得实体",reference = "我是参考")
public class LogicDevice {
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	@ApiParam(value = "逻辑设备名",required = true)
	private String deviceName;
	@ApiParam(value = "逻辑设备编号",required = true)
	private String deviceNo;
	@ApiParam(value = "逻辑设备地址",required = true)
	private String deviceAddress;
	@ApiParam(value = "操作时间",required = true)
	private String opTime;
	@ApiParam(value = "设备的坐标 id",required = false)
	private String coordinatesId;//设备的坐标
	
	
	
}

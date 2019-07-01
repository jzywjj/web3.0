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
@Table(name="DEVICE_EVENT")
@Entity
@ApiModel(value = "DeviceEvent得实体",reference = "我是参考")
public class DeviceEvent {
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	@ApiParam(value = "事件名",required = true)
	private String eventName;
	
	@ApiParam(value = "事件描述",required = true)
	private String eventDec;
	
	@ApiParam(value = "事件级别id",required = false)
	private String eventLevelId;
	
	@ApiParam(value = "逻辑设备id",required = false)
	private String logicDeviceId;
}

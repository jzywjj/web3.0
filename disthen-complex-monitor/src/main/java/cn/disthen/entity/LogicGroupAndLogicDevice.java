package cn.disthen.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
/**
 * 逻辑设备和真实设备关联表
 * @author Mk king
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Data
@Table(name="LOGIC_GROUP_ORIGIN_DEVICE")
@Entity
public class LogicGroupAndLogicDevice {
	@Id
	private String id =UUID.randomUUID().toString().replace("-", "");
	
	private String logicId;
	
	private String deviceId;

	public LogicGroupAndLogicDevice(String logicId, String deviceId) {
		super();
		this.logicId = logicId;
		this.deviceId = deviceId;
	}

	
	
	

}

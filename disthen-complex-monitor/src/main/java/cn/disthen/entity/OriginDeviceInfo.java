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
@Table(name="ORIGIN_DEVICE_INFO")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class OriginDeviceInfo {
	
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	
	private String name;
}

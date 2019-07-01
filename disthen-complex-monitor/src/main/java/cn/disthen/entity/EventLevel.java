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

/**
 * 事件级别管理
 * @author Mk king
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Data
@Table(name="EVENT_LEVEL")
@Entity
@ApiModel(value = "EventLevel得实体",reference = "我是参考")
public class EventLevel {
	@Id
	private  String id =UUID.randomUUID().toString().replace("-", "");
	@ApiParam(value = "事件级别 0-警告 1-一般事件,2报警",required = true)
	private String eLevel;
	@ApiParam(value = "事件名",required = true)
	private String levelName;
	@ApiParam(value = "事件级别描述",required = true)
	private String levelDesc;
	
}

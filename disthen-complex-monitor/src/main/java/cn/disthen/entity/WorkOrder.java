package cn.disthen.entity;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
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
@Table(name="WORK_ORDER")
@Entity
@ApiModel(value = "WorkOrder得实体",reference = "我是参考")
public class WorkOrder {
	@Id
	private String id =UUID.randomUUID().toString().replace("-", "");
	
	@ApiParam(value = "工单名",required = true)
	private String workOrderName;
	
	@ApiParam(value = "工单编号",required = true)
	private String  workOrderNo;
	
	@ApiParam(value = "工单创建事件",required = true)
	private String createDateTime;
	
	@ApiParam(value = "工单处理时间",required = false)
	private String handDateTime;
	
	@ApiParam(value = "工单处状态 0未处理 1处理中2 处理完成",required = true)
	private String handType="0";
	
	@ApiParam(value = "工单类型",required = true)
	private String workOrderType;
	
	@ApiParam(value = "处理人用户id",required = false)
	private String userId;
	
	@ApiParam(value = "事件id",required = false)
	private String deviceEventId;
	
	@ApiParam(value = "图片1",required = false)
	@Lob
	private String imgOne;
	@ApiParam(value = "图片1",required = false)
	
	@Lob
	private String imgTwo;
	
	@ApiParam(value = "图片1",required = false)
	@Lob
	private String imgThree;
	
	
}

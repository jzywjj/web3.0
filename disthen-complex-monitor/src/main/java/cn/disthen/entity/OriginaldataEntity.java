package cn.disthen.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain=true)
public class OriginaldataEntity {
	/** ID */
    private String id;
    
    /** 名称 */
    private String name;
    
    /** 是否可用 */
    private String model_available;
    
    /** 创建时间 */
    private String created_at;
    
    /** 最后更新时间 */
    private String last_update;
    
    /** 父节点编号ID */
    private String parentId;
    
    /** 类型 */
    private String type;
    
    /** 在线状态 on or off */
    private String status;
    
    /** 设备路径 */
    private String device_structure;
    
    /** 注册的原始编号 */
    private String cable_id;
    
    /** 注册的原始类型标识 */
    private String cable_type;
    
    /** 注册的设备类型 */
    private String hardware_type;
    
    /** 注册的硬件版本 */
    private String hardware_version;
    
    /** 生产编号 */
    private String product_id;
}

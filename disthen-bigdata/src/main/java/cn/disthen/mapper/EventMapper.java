package cn.disthen.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import cn.disthen.bagdata.entity.EvenInfo;

@Mapper
public interface EventMapper {
	
	public void addEvent(EvenInfo e);
	
	public EvenInfo findEventById(String id);
	
	public List<EvenInfo> findByPage(Long pageNum,Long pageSize);
	
	public EvenInfo findEventByDeviceId(String deviceId);
}

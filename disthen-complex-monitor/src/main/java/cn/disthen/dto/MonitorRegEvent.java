package cn.disthen.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
/**
 * 此表里面的数据需要放到hbase中，在此久不久建立mysql数据库表
 * 此对象实体仅用于接送对象的映射，或者xml对象的映射
 * @author apple
 *
 *
 CREATE TABLE mom.MONITOR_REG_EVENT(
   	id not null primary key,
   	time varchar,
   	spcname varchar,
   	event VARCHAR[],
   )
   
   
 *
 */
//@Entity
//@Table(name="MONITOR_REG_EVENT")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class MonitorRegEvent {
	/**
	 * "time": "2018-05-23 16:13:10.003",
	"event": [{
		"cardId": 2,
		"cable": [{
			"id": 3,
			"list": [{
				"id": 1,
				"value": "alarm"
			}]
		}]
	}],
	"spcname": "test"
	 */
	private String id=UUID.randomUUID().toString().replace("-", "");
	private  String time;
	private String spcname;
	private List<Event> event=new ArrayList<>();
	
	@Data
	@AllArgsConstructor
	@NoArgsConstructor
	@ToString
	@Accessors(chain=true)
	public static class Event{
		private String cardId;
		private List<Cable>cable=new ArrayList<>();
		
		@Data
		@AllArgsConstructor
		@NoArgsConstructor
		@ToString
		@Accessors(chain=true)
		public static class Cable{
			private String id;
			
			@JsonProperty(value="list")
			private List<ValueData>data=new ArrayList<>();
			
			@Data
			@AllArgsConstructor
			@NoArgsConstructor
			@ToString
			@Accessors(chain=true)
			public static class ValueData{
				private String id;
				private String value;
			}
		}
	}
	
}

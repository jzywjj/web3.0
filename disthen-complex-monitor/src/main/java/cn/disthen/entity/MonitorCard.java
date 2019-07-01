package cn.disthen.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;
import springfox.documentation.annotations.ApiIgnore;

@Entity
@Table(name="MONITOR_CARD")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class MonitorCard {
	
	@Id
	private String cardId		;
	private String vendorid	;
	private String address	;
	private String productid	;
	private String hwversion	;
	private String hwtype		;
	private String stat		;
	private String version	;
	@JsonProperty(value="cable")
	@OneToMany(cascade=CascadeType.PERSIST,fetch=FetchType.EAGER)
	@JoinColumn(name="cardId")
	private List<MonitorCable> cables=new ArrayList<>();
}

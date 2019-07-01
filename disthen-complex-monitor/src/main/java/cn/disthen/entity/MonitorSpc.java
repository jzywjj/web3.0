package cn.disthen.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Table(name="MONITOR_SPC")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Accessors(chain=true)
public class MonitorSpc {
	@Id
	private String id=UUID.randomUUID().toString().replace("-", "");
	private String time		; 
	private String vendorid	; 
	private String session	; 
	private String productid	; 
	private String spcname	; 
	private String hwversion	; 
	private String hwtype		; 
	private String ip			; 
	private String version	;
	
	@JsonProperty(value="reg")
	@OneToMany(cascade=CascadeType.PERSIST,fetch=FetchType.EAGER)
	@JoinColumn(name="spcId")
	private List<MonitorCard> cards=new ArrayList<>();

	public MonitorSpc(String time, String vendorid, String session, String productid, String spcname, String hwversion,
			String hwtype, String ip, String version, List<MonitorCard> cards) {
		super();
		this.time = time;
		this.vendorid = vendorid;
		this.session = session;
		this.productid = productid;
		this.spcname = spcname;
		this.hwversion = hwversion;
		this.hwtype = hwtype;
		this.ip = ip;
		this.version = version;
		this.cards = cards;
	}

	
	
}

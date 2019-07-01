package cn.disthen.phoenix.cfg;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
/**
 * 配置HikariDataSource properties
 * @author apple
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@ConfigurationProperties(prefix = "spring.phoenix.datasource")
public class PhonenixDatasourceProperties {
	/**
	 * "jdbc:phoenix:node5,node6,node7";
	 */
	private String jdbcUrl="";
	private Boolean autoCommit	 =true        	;		//自动提交从池中返回的连接	true	true	-
	private Long connectionTimeout=30000L		;		//等待来自池的连接的最大毫秒数	SECONDS.toMillis(30) = 30000	30000	如果小于250毫秒，则被重置回30秒
	private Long idleTimeout	=	600000L		;		//连接允许在池中闲置的最长时间	MINUTES.toMillis(10) = 600000	600000	如果idleTimeout+1秒>maxLifetime 且 maxLifetime>0，则会被重置为0（代表永远不会退出）；如果idleTimeout!=0且小于10秒，则会被重置为10秒
	private String connectionTestQuery=""		;		//如果您的驱动程序支持JDBC4，我们强烈建议您不要设置此属性	null	null	-
	private Long minimumIdle	=10L			;		//池中维护的最小空闲连接数	-1	10	minIdle<0或者minIdle>maxPoolSize,则被重置为maxPoolSize
	private Long maximumPoolSize	=30L		;		//池中最大连接数，包括闲置和使用中的连接	-1	10	如果maxPoolSize小于1，则会被重置。当minIdle<=0被重置为DEFAULT_POOL_SIZE则为10;如果minIdle>0则重置为minIdle的值
	private String driverClassName	=""		;        //HikariCP将尝试通过仅基于jdbcUrl的DriverManager解析驱动程序，但对于一些较旧的驱动程序，还必须指定driverClassName	null	null	-
	private Long validationTimeout=300000L	    ;        //连接将被测试活动的最大时间量	SECONDS.toMillis(5) = 5000	5000	如果小于250毫秒，则会被重置回5秒
}

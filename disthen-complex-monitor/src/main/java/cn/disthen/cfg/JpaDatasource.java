package cn.disthen.cfg;

import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import com.zaxxer.hikari.HikariDataSource;


@ConditionalOnClass(HikariDataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
@Configuration
public class JpaDatasource {
	@Primary
	@Bean(name="jpaDataSource",destroyMethod="close")
	public HikariDataSource jpaDataSource(DataSourceProperties properties) {
		HikariDataSource dataSource=properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
		return dataSource;
	} 
}

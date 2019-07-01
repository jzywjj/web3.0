package cn.disthen.phoenix.cfg;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@ConditionalOnClass(HikariDataSource.class)
//@ConditionalOnMissingBean(DataSource.class)
@ConditionalOnProperty(name = "spring.phoenix.datasource.type", havingValue = "com.zaxxer.hikari.HikariDataSource", matchIfMissing = true)
@EnableConfigurationProperties(PhonenixDatasourceProperties.class)
@Configuration
public class PhoenixDatasourceAutoConfiguration {
	
	@Bean(name="hikariDataSource",destroyMethod="close")
	public HikariDataSource hikariDataSource(PhonenixDatasourceProperties properties) {
		ObjectMapper m=new ObjectMapper();
		Properties prop = m.convertValue(properties, Properties.class);
		HikariConfig config=new HikariConfig(prop);
		HikariDataSource dataSource=new HikariDataSource(config);
		return dataSource;
	}
	
	
}

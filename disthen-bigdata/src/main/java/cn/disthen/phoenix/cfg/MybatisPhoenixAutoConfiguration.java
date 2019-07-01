package cn.disthen.phoenix.cfg;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.mapping.DatabaseIdProvider;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.mybatis.spring.boot.autoconfigure.MybatisProperties;
import org.mybatis.spring.boot.autoconfigure.SpringBootVFS;
import org.mybatis.spring.mapper.ClassPathMapperScanner;
import org.mybatis.spring.mapper.MapperFactoryBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.boot.autoconfigure.AutoConfigurationPackages;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.type.AnnotationMetadata;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
/**
 * phonenix 整合mybatis
 * @author apple
 *
 */
@org.springframework.context.annotation.Configuration
@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class })
@ConditionalOnBean(DataSource.class)
@EnableConfigurationProperties(MybatisProperties.class)
@AutoConfigureAfter(PhoenixDatasourceAutoConfiguration.class)

public class MybatisPhoenixAutoConfiguration {
	 private static final Logger logger = LoggerFactory.getLogger(MybatisPhoenixAutoConfiguration.class);
	 private final MybatisProperties properties;

	  private final Interceptor[] interceptors;

	  private final ResourceLoader resourceLoader;

	  private final DatabaseIdProvider databaseIdProvider;

	  private final List<ConfigurationCustomizer> configurationCustomizers;

	  public MybatisPhoenixAutoConfiguration(MybatisProperties properties,
	                                  ObjectProvider<Interceptor[]> interceptorsProvider,
	                                  ResourceLoader resourceLoader,
	                                  ObjectProvider<DatabaseIdProvider> databaseIdProvider,
	                                  ObjectProvider<List<ConfigurationCustomizer>> configurationCustomizersProvider) {
	    this.properties = properties;
	    this.interceptors = interceptorsProvider.getIfAvailable();
	    this.resourceLoader = resourceLoader;
	    this.databaseIdProvider = databaseIdProvider.getIfAvailable();
	    this.configurationCustomizers = configurationCustomizersProvider.getIfAvailable();
	  }

	  @PostConstruct
	  public void checkConfigFileExists() {
	    if (this.properties.isCheckConfigLocation() && StringUtils.hasText(this.properties.getConfigLocation())) {
	      Resource resource = this.resourceLoader.getResource(this.properties.getConfigLocation());
	      Assert.state(resource.exists(), "Cannot find config location: " + resource
	          + " (please add config file or check your Mybatis configuration)");
	    }
	  }

	  @Bean
	  @ConditionalOnMissingBean
	  public SqlSessionFactory sqlSessionFactory(@Qualifier("hikariDataSource") DataSource dataSource) throws Exception {
	    SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
	    factory.setDataSource(dataSource);
	    factory.setVfs(SpringBootVFS.class);
	    if (StringUtils.hasText(this.properties.getConfigLocation())) {
	      factory.setConfigLocation(this.resourceLoader.getResource(this.properties.getConfigLocation()));
	    }
	    Configuration configuration = this.properties.getConfiguration();
	    if (configuration == null && !StringUtils.hasText(this.properties.getConfigLocation())) {
	      configuration = new Configuration();
	    }
	    if (configuration != null && !CollectionUtils.isEmpty(this.configurationCustomizers)) {
	      for (ConfigurationCustomizer customizer : this.configurationCustomizers) {
	        customizer.customize(configuration);
	      }
	    }
	    factory.setConfiguration(configuration);
	    if (this.properties.getConfigurationProperties() != null) {
	      factory.setConfigurationProperties(this.properties.getConfigurationProperties());
	    }
	    if (!ObjectUtils.isEmpty(this.interceptors)) {
	      factory.setPlugins(this.interceptors);
	    }
	    if (this.databaseIdProvider != null) {
	      factory.setDatabaseIdProvider(this.databaseIdProvider);
	    }
	    if (StringUtils.hasLength(this.properties.getTypeAliasesPackage())) {
	      factory.setTypeAliasesPackage(this.properties.getTypeAliasesPackage());
	    }
	    if (StringUtils.hasLength(this.properties.getTypeHandlersPackage())) {
	      factory.setTypeHandlersPackage(this.properties.getTypeHandlersPackage());
	    }
	    if (!ObjectUtils.isEmpty(this.properties.resolveMapperLocations())) {
	      factory.setMapperLocations(this.properties.resolveMapperLocations());
	    }

	    return factory.getObject();
	  }

	  @Bean
	  @ConditionalOnMissingBean
	  public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
	    ExecutorType executorType = this.properties.getExecutorType();
	    if (executorType != null) {
	      return new SqlSessionTemplate(sqlSessionFactory, executorType);
	    } else {
	      return new SqlSessionTemplate(sqlSessionFactory);
	    }
	  }

	  public static class AutoConfiguredMapperScannerRegistrar
	      implements BeanFactoryAware, ImportBeanDefinitionRegistrar, ResourceLoaderAware {

	    private BeanFactory beanFactory;

	    private ResourceLoader resourceLoader;

	    @Override
	    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {

	      logger.debug("Searching for mappers annotated with @Mapper");

	      ClassPathMapperScanner scanner = new ClassPathMapperScanner(registry);

	      try {
	        if (this.resourceLoader != null) {
	          scanner.setResourceLoader(this.resourceLoader);
	        }

	        List<String> packages = AutoConfigurationPackages.get(this.beanFactory);
	        if (logger.isDebugEnabled()) {
	          for (String pkg : packages) {
	            logger.debug("Using auto-configuration base package '{}'", pkg);
	          }
	        }

	        scanner.setAnnotationClass(Mapper.class);
	        scanner.registerFilters();
	        scanner.doScan(StringUtils.toStringArray(packages));
	      } catch (IllegalStateException ex) {
	        logger.debug("Could not determine auto-configuration package, automatic mapper scanning disabled.", ex);
	      }
	    }

	    @Override
	    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
	      this.beanFactory = beanFactory;
	    }

	    @Override
	    public void setResourceLoader(ResourceLoader resourceLoader) {
	      this.resourceLoader = resourceLoader;
	    }
	  }

	  @org.springframework.context.annotation.Configuration
	  @Import({ AutoConfiguredMapperScannerRegistrar.class })
	  @ConditionalOnMissingBean(MapperFactoryBean.class)
	  public static class MapperScannerRegistrarNotFoundConfiguration {

	    @PostConstruct
	    public void afterPropertiesSet() {
	      logger.debug("No {} found.", MapperFactoryBean.class.getName());
	    }
	  }
}

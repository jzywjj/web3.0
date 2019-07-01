package cn.disthen.cfg;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import cn.disthen.entity.MonitorCard;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	 @Bean
	    public Docket api() { 
	        return new Docket(DocumentationType.SWAGGER_2)
	          .apiInfo(apiInfo())
	          .select()                                  
	          .apis(RequestHandlerSelectors.basePackage("cn.disthen.swager.api"))              
	          .paths(PathSelectors.any()) 
	          
	          .build();                                           
	    }
	    
	    private ApiInfo apiInfo() {
	        return new ApiInfoBuilder()
	                .title("迪森App")
	                .description("迪森App API 1.0 操作文档")
	                //服务条款网址
	                .termsOfServiceUrl("https://github.com/jzywjj/")
	                .version("1.0")
	                .contact(new Contact("迪森App 开发小组", "https://github.com/jzywjj/", "zhiyong.jin@aliyun.com"))
	                .build();
	    }
	
}

package cn.disthen.jaxb;

import java.io.StringReader;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

/**
 * xml和Java对象的相互转换
 * @author apple
 *
 */

public class JaxbUtils {
	
	/**
     * pojo转换成xml
     *
     * @param obj 待转化的对象
     * @param encoding 编码
     * @return xml格式字符串
     * @throws Exception JAXBException
     */
    public static String convertToXml(Object obj) throws Exception {
        
    	JAXBContext context = JAXBContext.newInstance(obj.getClass());
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
        marshaller.setProperty(Marshaller.JAXB_ENCODING, StandardCharsets.UTF_8);

        StringWriter writer = new StringWriter();
        marshaller.marshal(obj, writer);

        return  writer.toString();
    }
	/**
     * xml转换成JavaBean
     *
     * @param xml xml格式字符串
     * @param t 待转化的对象
     * @return 转化后的对象
     * @throws Exception JAXBException
     */
    @SuppressWarnings("unchecked")
    public static <T> T convertToJavaBean(String xml, Class<T> t) throws Exception {
       
        JAXBContext context = JAXBContext.newInstance(t);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        return (T) unmarshaller.unmarshal(new StringReader(xml));
    }
		
}

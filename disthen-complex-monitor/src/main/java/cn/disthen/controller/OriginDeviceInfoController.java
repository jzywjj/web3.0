package cn.disthen.controller;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.LongStream;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.disthen.bagdata.entity.EvenInfo;
import cn.disthen.mapper.EventMapper;
import cn.disthen.service.OriginDeviceInfoService;
@Controller
@RequestMapping("/remote")
public class OriginDeviceInfoController {
	
	private final OriginDeviceInfoService originService;
	
	private final EventMapper m;
	
	ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
	public OriginDeviceInfoController(OriginDeviceInfoService originService, EventMapper m) {
		super();
		this.originService = originService;
		this.m = m;
	}

	@RequestMapping("m")
	@ResponseBody
	@Async
	public String t() {
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("lk第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 12000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("hj第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 13000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("34第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 14000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("op第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 15000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("yt第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 16000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("tr第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 17000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("qw第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 18000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("dd第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 18000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("s第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 110000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("yt第"+x+"条数据插入成功");
			});
		});
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("xc第"+x+"条数据插入成功");
			});
		});
		
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("xc第"+x+"条数据插入成功");
			});
		});
		
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("xc第"+x+"条数据插入成功");
			});
		});
		
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("xc第"+x+"条数据插入成功");
			});
		});
		
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("xc第"+x+"条数据插入成功");
			});
		});
		
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("xc第"+x+"条数据插入成功");
			});
		});
		
		cachedThreadPool.execute(()->{
			LongStream.rangeClosed(10000000, 11000000).parallel().forEach(x->{
				EvenInfo e=new EvenInfo("mg"+x, "EventType"+x, x+"EventTypeEventTypeEventType", "a"+x, "fsds"+x);
				System.out.println(e);
						m.addEvent(e);
						System.out.println("xc第"+x+"条数据插入成功");
			});
		});
		
		
		
		return "kjh";
	}
	
}

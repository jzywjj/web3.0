package cn.disthen.service.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.disthen.entity.MonitorCard;
import cn.disthen.entity.MonitorSpc;
import cn.disthen.repo.MonitorCableRepo;
import cn.disthen.repo.MonitorCardRepo;
import cn.disthen.repo.MonitorSpcRepo;
import cn.disthen.service.MonitorSpcService;
@Service
@Transactional
public class MonitorSpcServiceImpl implements MonitorSpcService {
	
	private final MonitorSpcRepo spcRepo;
	private final MonitorCableRepo cableRepo;
	private final MonitorCardRepo cardRepo;
	

	public MonitorSpcServiceImpl(MonitorSpcRepo spcRepo, MonitorCableRepo cableRepo, final MonitorCardRepo cardRepo) {
		this.spcRepo = spcRepo;
		this.cableRepo = cableRepo;
		this.cardRepo = cardRepo;
	}
	/**
	 * <h1>保存顺序不能乱，不然会报错</h1>
	 * @see EntityManager
	 * {@link EntityManager persist and merge}
	 */
	@Transactional
	@Override
	public void saveMonitorSpc(MonitorSpc spc) {
		spc.getCards().parallelStream().forEach(x->{
			cableRepo.saveAll(x.getCables());
		});
		cardRepo.saveAll(spc.getCards());
		spcRepo.save(spc);
	}
	/**
	 * <h1>保存顺序不能乱，不然会报错</h1>
	 * @see EntityManager
	 * {@link EntityManager persist and merge}
	 */
	@Transactional
	@Override
	public void saveMonitorSpcAll(List<MonitorSpc> spcs) {
		spcs.parallelStream().forEach(x->{
			x.getCards().forEach(o->{
				cableRepo.saveAll(o.getCables());
			});
			cardRepo.saveAll(x.getCards());
		});
		spcRepo.saveAll(spcs);
	}
	@Override
	public List<MonitorCard> findAllCardsByIds(List<String> ids) {
		
		return cardRepo.findAll();
	}
	@Override
	public List<MonitorSpc> findAllMonitorSpcs() {
		// TODO Auto-generated method stub
		return spcRepo.findAll();
	}

}

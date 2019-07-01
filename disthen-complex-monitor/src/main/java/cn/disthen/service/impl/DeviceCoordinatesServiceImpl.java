package cn.disthen.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.Predicate;

import org.springframework.stereotype.Service;

import cn.disthen.entity.DeviceCoordinates;
import cn.disthen.repo.DeviceCoordinatesRepository;
import cn.disthen.service.DeviceCoordinatesService;
@Service
public class DeviceCoordinatesServiceImpl implements DeviceCoordinatesService {
	
	
	private final DeviceCoordinatesRepository dcRepo;
	
	
	public DeviceCoordinatesServiceImpl(DeviceCoordinatesRepository dcRepo) {
		super();
		this.dcRepo = dcRepo;
	}


	@Override
	public void AddCoordinates(DeviceCoordinates dc) {
		
		dcRepo.save(dc);
	}


	@Override
	public void updateCoordinates(DeviceCoordinates dc) {
		dcRepo.save(dc);
	}


	@Override
	public void deleteCoordinatesById(String id) {
		dcRepo.deleteById(id);
	}


	@Override
	public DeviceCoordinates findCoordinatesByName(String coordinatesName) {
		DeviceCoordinates dc = dcRepo.findOne((r,q,b)->{
			List<Predicate> pds=new ArrayList<>();
			Predicate names = b.equal(r.get("coordinatesName").as(String.class), coordinatesName);
			pds.add(names);
			
			Predicate[] p= new Predicate[pds.size()];
			 
			return b.and(pds.toArray(p));
			
		}).orElse(null);
		return dc;
		
	}


	@Override
	public DeviceCoordinates findCoordinatesByLongitudeAndLatitude(String longitude, String latitude) {
		DeviceCoordinates dc = dcRepo.findOne((r,q,b)->{
			List<Predicate> pds=new ArrayList<>();
			Predicate longitudePredicate = b.equal(r.get("longitude").as(String.class), longitude);
			pds.add(longitudePredicate);
			Predicate latitudePredicate = b.equal(r.get("latitude").as(String.class), latitude);
			pds.add(latitudePredicate);
			
			Predicate[] p= new Predicate[pds.size()];
			 
			return b.and(pds.toArray(p));
			
		}).orElse(null);
		return dc;
	}


	@Override
	public List<DeviceCoordinates> findAllDeviceCoordinates() {
		// TODO Auto-generated method stub
		return dcRepo.findAll();
	}

}

package <%=packageName%>.services.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;

import <%=packageName%>.services.VanillaCoreService;

@Component
@Service(value = VanillaCoreService.class)
public class VanillaCoreServiceImpl implements VanillaCoreService {

	@Reference
	ResourceResolverFactory resolverFactory;
	
	@Override
	public ResourceResolver getJCRWriterService() throws LoginException {
		Map<String, Object> params = new HashMap<>();
		params.put(ResourceResolverFactory.SUBSERVICE, "writeuser");
		ResourceResolver writeService = resolverFactory.getServiceResourceResolver(params);
		return writeService;
	}

	@Override
	public ResourceResolver getJCRReadService() throws LoginException {
		Map<String, Object> params = new HashMap<>();
		params.put(ResourceResolverFactory.SUBSERVICE, "readuser");
		ResourceResolver readService = resolverFactory.getServiceResourceResolver(params);
		return readService;
	}

}

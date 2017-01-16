package <%=packageName%>.services;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;

public interface VanillaCoreService {
	ResourceResolver getJCRWriterService() throws LoginException;
	ResourceResolver getJCRReadService() throws LoginException;
}

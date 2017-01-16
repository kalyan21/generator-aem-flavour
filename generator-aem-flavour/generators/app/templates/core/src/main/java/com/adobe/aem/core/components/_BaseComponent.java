package <%=packageName%>.components;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.scripting.SlingScriptHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;

/**
 * Base component is an abstract class that all the component classes has to extend so that all
 * basic functionality will be included
 * 
 * @author Kalyan
 */
public abstract class BaseComponent extends WCMUsePojo {

	private static final Logger LOG = LoggerFactory.getLogger(BaseComponent.class);
	
	protected Page currentPage;
	protected ValueMap properties;
	protected SlingScriptHelper slingScriptHelper;
	protected ResourceResolver resourceResolver;
	protected SlingHttpServletRequest request;
	
	protected abstract void activated() throws Exception;

	@Override
	public void activate() throws Exception {
		LOG.debug("inside abstract base component");
		currentPage = getCurrentPage();
		properties = getProperties();
		slingScriptHelper = getSlingScriptHelper();
		resourceResolver = getResourceResolver();
		request = getRequest();
		this.activated();

	}

}

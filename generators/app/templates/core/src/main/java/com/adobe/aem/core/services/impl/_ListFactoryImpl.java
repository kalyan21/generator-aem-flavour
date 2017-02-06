package <%=packageName%>.services.impl;

import java.util.HashMap;
import java.util.Map;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.ReferenceCardinality;
import org.apache.felix.scr.annotations.ReferencePolicy;
import org.apache.felix.scr.annotations.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import <%=packageName%>.services.AbstractPageList;
import <%=packageName%>.services.ListFactory;

@Component(immediate=true)
@Service(value=ListFactory.class)
public class ListFactoryImpl implements ListFactory {

	@Reference(bind = "bind", unbind = "unbind", cardinality = ReferenceCardinality.OPTIONAL_MULTIPLE, policy = ReferencePolicy.DYNAMIC)
	AbstractPageList abstractPageList;

	Map<String, AbstractPageList> abstractPageListMap = new HashMap<>();

	private static final Logger LOG = LoggerFactory.getLogger(ListFactoryImpl.class);

	protected void bind(AbstractPageList abstractPageList) {
		LOG.info(":::::::::::::::Inside ListFactoryImpl bind method:::::::::::::::");
		abstractPageListMap.put(abstractPageList.getClass().getSimpleName(), abstractPageList);
	}

	protected void unbind(AbstractPageList abstractPageList) {
		abstractPageListMap.remove(abstractPageList.getClass().getSimpleName());
	}

	@Override
	public AbstractPageList getPageList(String viewName) {
		return abstractPageListMap.get(viewName);
	}

}

package <%=packageName%>.list.views;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;

import <%=packageName%>.services.AbstractPageList;
import <%=packageName%>.utils.VanillaUtils;

@Component
@Service(value = AbstractPageList.class)
public class SingleViewCarousal extends AbstractPageList {

	@Override
	public List<?> display() {
		return super.pages.stream()
				.map(e -> VanillaUtils.constructPageImageModel(e))
				.collect(Collectors.toList());
	}

}

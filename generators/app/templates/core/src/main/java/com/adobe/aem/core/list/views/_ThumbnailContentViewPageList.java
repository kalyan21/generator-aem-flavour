package <%=packageName%>.list.views;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;

import <%=packageName%>.models.ThumbnailContentViewModel;
import <%=packageName%>.services.AbstractPageList;
import <%=packageName%>.utils.VanillaUtils;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

@Component
@Service(value = AbstractPageList.class)
public class ThumbnailContentViewPageList extends AbstractPageList {

	
	@Override
	public List<?> display() {
		return super.pages.stream()
				.map(e-> buildThumbnailModel(e))
				.collect(Collectors.toList());
	}

	private ThumbnailContentViewModel buildThumbnailModel(Page page) {
		ThumbnailContentViewModel thumbnailContentViewModel = new ThumbnailContentViewModel();
		thumbnailContentViewModel.setLinkModel(VanillaUtils.constructPageLinkModel(page));
		thumbnailContentViewModel.setImageModel(VanillaUtils.constructPageImageModel(page));
		String pageDescription = page.getProperties().get(JcrConstants.JCR_DESCRIPTION, String.class);
		thumbnailContentViewModel.setDescription(pageDescription);
		return thumbnailContentViewModel;
	}

}

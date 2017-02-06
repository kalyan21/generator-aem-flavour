package <%=packageName%>.services.impl;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;

import <%=packageName%>.models.LanguagesModel;
import <%=packageName%>.models.LinkModel;
import <%=packageName%>.services.NavigationService;
import <%=packageName%>.utils.VanillaUtils;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;
import com.day.cq.wcm.foundation.Navigation;

@Component
@Service(value = NavigationService.class)
public class NavigationServiceImpl implements NavigationService {

	/**
	 * This methods builds a HTML that contains ul and li elements to construct
	 * navigation
	 * 
	 * @return {@link String} HTML
	 */
	@Override
	public String buildTopNavigation(Page currentPage, int absoulteParent, PageFilter filter, int depth) {
		Navigation navigation = new Navigation(currentPage, absoulteParent, filter, depth);
		Iterator<Navigation.Element> iterator = navigation.iterator();
		StringBuilder stringBuilder = new StringBuilder();
		while (iterator.hasNext()) {
			Navigation.Element element = (Navigation.Element) iterator.next();
			switch (element.getType()) {
			case NODE_OPEN:
				if (element.hasChildren())
					stringBuilder.append("<ul class='dropdown-menu'>");
				else
					stringBuilder.append("<ul>");
				break;
			case ITEM_BEGIN:
				String linkTitle = element.getRawTitle() != null ? element.getRawTitle() : element.getTitle();
				String linkPath = element.getPath() + ".html";
				String link = null;
				if (element.hasChildren()) {
					stringBuilder.append("<li class='dropdown'>");
					link = "<a class='dropdown-toggle' data-toggle='dropdown' href='#'>" + linkTitle
							+ "<span class='caret'></span></a>";
				} else {
					stringBuilder.append("<li>");
					link = "<a href=" + linkPath + ">" + linkTitle + "</a>";
				}
				stringBuilder.append(link);
				break;
			case ITEM_END:
				stringBuilder.append("</li>");
				break;
			case NODE_CLOSE:
				stringBuilder.append("</ul>");
				break;
			default:
				break;
			}
		}
		return stringBuilder.toString();
	}

	/**
	 * This method prepares the list of available languages inside application
	 * 
	 * @param page
	 *            {@link Page}
	 * @return languageModel {@link LanguagesModel}
	 */
	@Override
	public LanguagesModel getSupportedLanguages(Page currentPage) {
		LanguagesModel supportedLanguages = new LanguagesModel();
		Page parent = VanillaUtils.getFirstLevelAbsoluteParent(currentPage);
		supportedLanguages.setCurrentLanguage(
				VanillaUtils.constructPageLinkModel((VanillaUtils.getSecondLevelAbsoluteParent(currentPage))));
		List<LinkModel> availableLanguages = VanillaUtils.asStream(parent.listChildren())
				.filter(e -> !e.getPath().equalsIgnoreCase(supportedLanguages.getCurrentLanguage().getPath()))
				.map(e -> VanillaUtils.constructPageLinkModel(e)).collect(Collectors.toList());
		supportedLanguages.setAvailableLanguages(availableLanguages);
		return supportedLanguages;
	}

}

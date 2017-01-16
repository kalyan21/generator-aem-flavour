package <%=packageName%>.components;


import org.apache.commons.lang.StringUtils;

import <%=packageName%>.models.LanguagesModel;
import <%=packageName%>.services.NavigationService;
import <%=packageName%>.utils.VanillaUtils;
import com.day.cq.wcm.api.PageFilter;

public class HeaderComponent extends BaseComponent {

	private String navigationHTML;
	private String parentPageTitle;
	private LanguagesModel supportedLanguages;

	private static final String DEFAULT_DEPTH = "1";

	@Override
	protected void activated() throws Exception {
		String navigationDepth = properties.get("depthLevel", String.class);
		navigationDepth = StringUtils.isEmpty(navigationDepth) ? DEFAULT_DEPTH : navigationDepth;
		PageFilter pageFilter = new PageFilter(getRequest());
		NavigationService abstractNavigation = getSlingScriptHelper().getService(NavigationService.class);
		navigationHTML = abstractNavigation.buildTopNavigation(currentPage, 2, pageFilter, Integer.parseInt(navigationDepth));
		supportedLanguages = abstractNavigation.getSupportedLanguages(currentPage);
	}

	public String getNavigationHTML() {
		return navigationHTML;
	}

	public LanguagesModel getSupportedLanguages() {
		return supportedLanguages;
	}

	public String getParentPageTitle() {
		this.parentPageTitle = VanillaUtils.getFirstLevelAbsoluteParent(currentPage).getTitle();
		return parentPageTitle;
	}

}

package <%=packageName%>.services;

import <%=packageName%>.models.LanguagesModel;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;

public interface NavigationService {
	String buildTopNavigation(Page currentPage, int absoulteParent, PageFilter filter, int depth);
	LanguagesModel getSupportedLanguages(Page currentPage);
}

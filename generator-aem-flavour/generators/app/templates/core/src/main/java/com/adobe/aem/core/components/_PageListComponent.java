package <%=packageName%>.components;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.jcr.Property;
import javax.jcr.RepositoryException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import <%=packageName%>.constants.VanillaConstants;
import <%=packageName%>.services.AbstractPageList;
import <%=packageName%>.services.ListFactory;
import <%=packageName%>.utils.VanillaUtils;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.QueryBuilder;

public class PageListComponent extends BaseComponent {

	private static final Logger LOG = LoggerFactory.getLogger(PageListComponent.class);
	
	private AbstractPageList abstractPageList;
	private QueryBuilder queryBuilder;
	private List<?> filteredList = new ArrayList<>();
	
	@Override
	protected void activated() throws Exception {
		ListFactory listFactory = slingScriptHelper.getService(ListFactory.class);
		queryBuilder = slingScriptHelper.getService(QueryBuilder.class);
		Optional<String> listFrom = Optional.ofNullable(properties.get(VanillaConstants.List.LIST_FROM, String.class));
		String displayAs = properties.get(VanillaConstants.List.DISPLAY_AS, String.class);
		Optional<String> orderBy = Optional.ofNullable(properties.get(VanillaConstants.List.ORDER_BY, String.class));
		Optional<String> limit = Optional.ofNullable(properties.get(VanillaConstants.List.LIMIT, String.class));
		abstractPageList = listFactory.getPageList(displayAs);
		if(listFrom.isPresent()){
			buildListFrom(listFrom.get());
			filteredList = abstractPageList.orderPagesBy(orderBy.orElse(JcrConstants.JCR_TITLE))
										   .limitPages(Long.parseLong(limit.orElse("0")))
										   .display();
		}
	}

	/**
	 * This method returns AbstractPageList object with injected list of pages based in selection
	 * without filters
	 * @param listFrom
	 * @throws RepositoryException
	 */
	private void buildListFrom(String listFrom) throws RepositoryException {

		switch (listFrom) {
		case VanillaConstants.List.LIST_CHILDREN:
			Optional<String> parentPagePath = Optional.ofNullable(properties.get(VanillaConstants.List.PARENT_PAGE, String.class));
			abstractPageList.getChildPages(parentPagePath.orElse(currentPage.getPath()), resourceResolver);
			break;
		case VanillaConstants.List.LIST_STATIC:
			Property pages = properties.get(VanillaConstants.List.PAGES, Property.class);
			List<String> pagePaths = VanillaUtils.getPropertyValuesAsList(pages);
			abstractPageList.getFixedPages(pagePaths, resourceResolver);
			break;
		case VanillaConstants.List.LIST_TAGS:
			Optional<String> tagsSearchRoot = Optional.ofNullable(properties.get(VanillaConstants.List.TAGS_SEARCH_ROOT, String.class));
			String tagMatch =properties.get(VanillaConstants.List.TAG_MATCH, String.class);
			Property tags = properties.get(VanillaConstants.List.LIST_TAGS, Property.class);
			List<String> selectedTagsList = VanillaUtils.getPropertyValuesAsList(tags);
			abstractPageList.getTaggedPages(tagsSearchRoot.orElse(currentPage.getPath()), selectedTagsList, tagMatch, request);
			break;
		case VanillaConstants.List.LIST_SEARCH:
			String query = properties.get(VanillaConstants.List.SEARCH_QUERY, String.class);
			Optional<String> searchIn = Optional.ofNullable(properties.get(VanillaConstants.List.SEARCH_IN, String.class));
			abstractPageList.getPagesBySearch(searchIn.orElse(VanillaUtils.getFirstLevelAbsoluteParent(currentPage).getPath()), query, request);
			break;
		case VanillaConstants.List.LIST_ADV_SEARCH:
			String savedQuery = properties.get(VanillaConstants.List.SAVED_QUERY, String.class);
			abstractPageList.getPagesByAdvSearch(savedQuery, queryBuilder, request);
			break;
		default:
			LOG.error("Invalid list from option");
			break;
		}
	}
	/**
	 * This method is used in HTL component
	 * @return
	 */
	public List<?> getFilteredList() {
		return filteredList;
	}

}

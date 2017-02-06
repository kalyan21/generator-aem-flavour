package <%=packageName%>.services;

import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import <%=packageName%>.utils.VanillaUtils;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.SearchResult;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageFilter;

public abstract class AbstractPageList {

	private static final String TAG_MATCH_ALL = "all";
	private static final String TAG_MATCH_ANY = "any";
	private static final Logger LOG = LoggerFactory.getLogger(AbstractPageList.class);

	protected List<Page> pages;

	public abstract List<?> display();

	/**
	 * This method takes parent path and returns list of page objects
	 * 
	 * @param parentPage
	 * @param resourceResolver
	 * @return
	 */
	public AbstractPageList getChildPages(String parentPage, ResourceResolver resourceResolver) {
		Page pageResource = resourceResolver.getResource(parentPage).adaptTo(Page.class);
		this.pages = VanillaUtils.asStream(pageResource.listChildren())
								 .collect(Collectors.toList());
		return this;
	}

	/**
	 * This method takes list of fixed paths and updates page object objects
	 * 
	 * @param fixedPaths
	 * @param resourceResolver
	 * @return
	 */
	public AbstractPageList getFixedPages(List<String> fixedPaths, ResourceResolver resourceResolver) {
		this.pages = fixedPaths.stream()
							   .map(e -> resourceResolver.getResource(e).adaptTo(Page.class))
							   .collect(Collectors.toList());
		return this;
	}

	/**
	 * This method takes the input params and updates page object which are
	 * associated to passed tags
	 * 
	 * @param parentPath
	 * @param tags
	 * @param tagMatch
	 * @param resourceResolver
	 * @return
	 */
	public AbstractPageList getTaggedPages(String parentPath, List<String> selectedTags, String tagMatch,
			SlingHttpServletRequest request) {
		Page parentPage = request.getResourceResolver().getResource(parentPath).adaptTo(Page.class);
		Stream<Page> pageStream = VanillaUtils.asStream(parentPage.listChildren(new PageFilter(false, true), true));
		if (tagMatch.equalsIgnoreCase(TAG_MATCH_ALL))
			this.pages = pageStream.filter(e -> pageHasAllTags(e, selectedTags))
								   .collect(Collectors.toList());
		else if (tagMatch.equalsIgnoreCase(TAG_MATCH_ANY))
			this.pages = pageStream.filter(e -> pageHasAnyTag(e, selectedTags))
								   .collect(Collectors.toList());
		return this;
	}

	private boolean pageHasAllTags(Page page, List<String> selectedTags) {
		List<String> pageTags = VanillaUtils.extractPageTagsAsList(page);
		if (!pageTags.isEmpty())
			return CollectionUtils.containsAll(pageTags, selectedTags);
		return false;
	}

	private boolean pageHasAnyTag(Page page, List<String> selectedTags) {
		List<String> pageTags = VanillaUtils.extractPageTagsAsList(page);
		if (!pageTags.isEmpty())
			return CollectionUtils.containsAny(pageTags, selectedTags);
		return false;
	}

	/**
	 * This method takes the input params and updates page object by performing
	 * search query
	 * 
	 * @param searchIn
	 * @param searchQuery
	 * @param request
	 * @return
	 * @throws RepositoryException
	 */
	public AbstractPageList getPagesBySearch(String searchIn, String searchQuery, SlingHttpServletRequest request)
			throws RepositoryException {
		String query = "SELECT * FROM [cq:Page] AS s WHERE ISDESCENDANTNODE([" + searchIn + "]) and CONTAINS(s.*, '"
				+ searchQuery + "')";
		Iterator<Resource> results = request.getResourceResolver().findResources(query, javax.jcr.query.Query.JCR_SQL2);
		this.pages = VanillaUtils.asStream(results)
								 .map(e -> e.adaptTo(Page.class))
								 .collect(Collectors.toList());
		return this;
	}

	/**
	 * This method takes the input params and updates page object by performing
	 * advanced search query which works on query builder with predicate mapping
	 * 
	 * @param predicates
	 * @param queryBuilder
	 * @param request
	 * @return
	 */
	public AbstractPageList getPagesByAdvSearch(String predicates, QueryBuilder queryBuilder, SlingHttpServletRequest request){
		List<String> predicateList = Arrays.asList(predicates.split("\\r?\\n"));
		Map<String, String> predicateMap = new HashMap<>();
		predicateList.forEach(e -> {
			String nameValues[] = e.split("=");
			predicateMap.put(nameValues[0], nameValues[1]);
		});
		Session session = request.getResourceResolver().adaptTo(Session.class);
		Query query = queryBuilder.createQuery(PredicateGroup.create(predicateMap), session);
		SearchResult result = query.getResult();
		this.pages = result.getHits().stream().map(e -> {
			try {
				return e.getResource().adaptTo(Page.class);
			} catch (RepositoryException exception) {
				LOG.error("exception so returning null", exception);
			}
			return null;
		}).collect(Collectors.toList());
		
		return this;
	}

	/**
	 * This method takes limitTo as parameter and limits the mutated page object
	 * 
	 * @param resources
	 * @param limitTo
	 * @return
	 */
	public AbstractPageList limitPages(long limitTo) {
		if (limitTo > 0)
			this.pages = pages.stream()
							  .limit(limitTo)
							  .collect(Collectors.toList());
		return this;
	}

	/**
	 * This method takes the list of page objects and orders them based on
	 * orderBy parameter
	 * 
	 * @param resources
	 * @param orderBy
	 * @return
	 */
	public AbstractPageList orderPagesBy(String orderBy) {
		switch (orderBy) {
		case JcrConstants.JCR_TITLE:
			this.pages = pages.stream()
							  .sorted((p1, p2) -> p1.getTitle().compareTo(p2.getTitle()))
					     	  .collect(Collectors.toList());
			return this;
		case JcrConstants.JCR_CREATED:
			this.pages = pages.stream()
							  .sorted((p1, p2) -> p1.getProperties().get(JcrConstants.JCR_CREATED, Calendar.class)
							  .compareTo(p2.getProperties().get(JcrConstants.JCR_CREATED, Calendar.class)))
							  .collect(Collectors.toList());
			return this;
		case NameConstants.PN_PAGE_LAST_MOD:
			this.pages = pages.stream()
							  .sorted((p1, p2) -> p1.getLastModified().compareTo(p2.getLastModified()))
							  .collect(Collectors.toList());
			return this;
		case NameConstants.PN_TEMPLATE:
			this.pages = pages.stream()
							  .sorted((p1, p2) -> p1.getTemplate().getTitle().compareTo(p2.getTemplate().getTitle()))
							  .collect(Collectors.toList());
			return this;
		default:
			LOG.warn("Invalid order by parameter.");
			return this;
		}
	}

	/**
	 * This method is used to get mutated page object
	 * 
	 * @return
	 */
	public List<Page> getPages() {
		return pages;
	}

}

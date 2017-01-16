package <%=packageName%>.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.StringJoiner;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.jcr.Property;
import javax.jcr.RepositoryException;
import javax.jcr.Value;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;

import <%=packageName%>.models.ImageModel;
import <%=packageName%>.models.LinkModel;
import com.day.cq.tagging.Tag;
import com.day.cq.wcm.api.Page;

public class VanillaUtils {

	public static final String HTML_EXT = ".html";
	public static final String FILE_REFERENCE = "fileReference";
	public static final String IMAGE_PATH = "image";

	/**
	 * Use this to get Level 1 absolute parent
	 * @param currentPage {@link Page}
	 * @return Page {@link Page}
	 */
	public static Page getFirstLevelAbsoluteParent(Page currentPage) {
		return currentPage.getAbsoluteParent(1);
	}

	/**
	 * Use this to get Level 2 absolute parent
	 * @param currentPage {@link Page}
	 * @return Page {@link Page}
	 */
	public static Page getSecondLevelAbsoluteParent(Page currentPage) {
		return currentPage.getAbsoluteParent(2);
	}

	/**
	 * This method is used to create LinkModel object from Page object which
	 * contains link and title of the page. Navigation title will take
	 * precedence if present 
	 * @param page {@link Page}
	 * @return LinkModel {@link LinkModel}
	 */
	public static LinkModel constructPageLinkModel(Page page) {
		LinkModel linkModel = new LinkModel();
		linkModel.setTitle(StringUtils.isEmpty(page.getNavigationTitle()) ? page.getTitle() : page.getNavigationTitle());
		linkModel.setLink(page.getPath() + HTML_EXT);
		linkModel.setPath(page.getPath());
		return linkModel;
	}

	/**
	 * This method is used to create ImageModel object from Page's image object ( available page properties as
	 * image in classic UI and as thumbnail in touch UI) which contains image source and altText 
	 * @param page {@link Page}
	 * @return LinkModel {@link ImageModel}
	 */
	public static ImageModel constructPageImageModel(Page page) {
		ImageModel  imageModel = new ImageModel();
		Optional<Resource> imageResource = Optional.ofNullable(page.getContentResource().getChild(IMAGE_PATH));
		if(imageResource.isPresent()){
			imageModel.setImageSrc(imageResource.get().adaptTo(ValueMap.class).get(FILE_REFERENCE, String.class));
			imageModel.setAltText("altText");
		}
		return imageModel;
	}

	/**
	 * This method is used to get property values of a node in List object.This
	 * comes handy if a property has multiple values.
	 * @param page {@link Page}
	 * @return valuesList {@link List}
	 */
	public static List<String> getPropertyValuesAsList(Property property) throws RepositoryException {
		List<String> valuesList = new ArrayList<>();
		if (property.isMultiple()) {
			Value[] values = property.getValues();
			for (Value value : values) {
				valuesList.add(value.getString());
			}
		} else {
			valuesList.add(property.getValue().getString());
		}
		return valuesList;
	}

	/**
	 * This method is used concat string with delimiter. If delimiter is empty
	 * it takes ',' as default
	 * @param iterator   {@link Iterator}
	 * @return delimiter {@link String}
	 */
	public static String concat(Iterator<String> iterator, String delimiter) {
		delimiter = StringUtils.isNotEmpty(delimiter) ? delimiter : ",";
		StringJoiner joiner = new StringJoiner(delimiter);
		while (iterator.hasNext()) {
			joiner.add(iterator.next());
		}
		return joiner.toString();

	}

	/**
	 * This method is used to convert iterator to java8 Stream object
	 * @param iterator {@link Iterator}
	 * @return {@link Stream}
	 */
	public static <T> Stream<T> asStream(Iterator<T> sourceIterator) {
		return asStream(sourceIterator, false);
	}

	/**
	 * This method is used to convert iterator to java8 Stream object with
	 * parallel execution
	 * @param iterator {@link Iterator}
	 * @param parallel
	 * @return {@link Stream}
	 */
	public static <T> Stream<T> asStream(Iterator<T> sourceIterator, boolean parallel) {
		Iterable<T> iterable = () -> sourceIterator;
		return StreamSupport.stream(iterable.spliterator(), parallel);
	}
	
	/**
	 * This method extracts the tags of page and creates a list with tag id's
	 * @param page
	 * @return
	 */
	public static List<String> extractPageTagsAsList(Page page){
		Tag[] tags = page.getTags();
		List<String> pageTags = Arrays.asList(tags)
									  .stream()
									  .map(e-> e.getTagID())
									  .collect(Collectors.toList());
		return pageTags;
		
	}
}

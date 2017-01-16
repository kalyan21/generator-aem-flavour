package <%=packageName%>.models;

public class ThumbnailContentViewModel {

	private ImageModel imageModel;
	private String description;
	private LinkModel linkModel;

	public ImageModel getImageModel() {
		return imageModel;
	}

	public void setImageModel(ImageModel imageModel) {
		this.imageModel = imageModel;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LinkModel getLinkModel() {
		return linkModel;
	}

	public void setLinkModel(LinkModel linkModel) {
		this.linkModel = linkModel;
	}
}

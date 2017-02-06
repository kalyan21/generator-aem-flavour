package <%=packageName%>.models;

import java.util.List;

public class LanguagesModel {
	private LinkModel currentLanguage;
	private List<LinkModel> availableLanguages;

	public LinkModel getCurrentLanguage() {
		return currentLanguage;
	}

	public void setCurrentLanguage(LinkModel currentLanguage) {
		this.currentLanguage = currentLanguage;
	}

	public List<LinkModel> getAvailableLanguages() {
		return availableLanguages;
	}

	public void setAvailableLanguages(List<LinkModel> availableLanguages) {
		this.availableLanguages = availableLanguages;
	}
}

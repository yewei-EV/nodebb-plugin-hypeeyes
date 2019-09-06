export class Config {

  static convert(config): Config {
    const newConfig: any = {};
    newConfig.relativePath = config.relative_path;
    newConfig.allowRegistration = config.registrationType === 'normal';
    newConfig.brandLogo = config['brand:logo'];
    newConfig.brandLogoAlt = config['brand:logo:alt'];
    newConfig.brandLogoUrl = config['brand:logo:url'];
    newConfig.siteTitleUrl = config['title:url'];

    newConfig.searchEnabled = config.searchEnabled;
    newConfig.siteTitle = config.siteTitle;
    newConfig.menuInHeader = config.menuInHeader;
    newConfig.showSiteTitle = config.showSiteTitle;
    newConfig.removeCategoriesAnimation = config.removeCategoriesAnimation;
    newConfig.searchEnabled = config.searchEnabled;
    newConfig.disableChat = config.disableChat;
    newConfig.showModMenu = config.showModMenu;
    newConfig.csrfToken = config.csrfToken;
    return newConfig;
  }
}

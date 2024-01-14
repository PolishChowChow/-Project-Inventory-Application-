function clickController(event){
    const target = event.target;
    const IS_LINK = target.hasAttribute("data-header-link")
    const IS_NAV_BTN = target.hasAttribute("data-nav-btn")
    
    switch(true){
        case IS_LINK:
            handleLinkClick(target)
            break;
        case IS_NAV_BTN:
            handleMobileNav()
            break;
    }
}
document.body.addEventListener("click", clickController)
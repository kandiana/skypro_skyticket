import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { DropdownItem, DropdownMenu, Dropdown, DropdownToggle } from 'reactstrap';

// import images
import logodarkImg from '../../assets/images/logo-dark.png';
import logosmImg from '../../assets/images/logo-sm.png';
import logolightImg from '../../assets/images/logo-light.png';

// Import other Dropdown

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchOpen: false,
    };

    this.toggleRightbar = this.toggleRightbar.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  /**
   * Toggle Search
   */
  toggleSearch() {
    this.setState({ isSearchOpen: !this.state.isSearchOpen });
  }

  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.toggleMenuCallback();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }

  /**
   * Toggle full screen
   */
  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/dashboard" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logosmImg} alt="" height="45" />
                  </span>
                  <span className="logo-lg">
                    <img src={logodarkImg} alt="" height="45" />
                  </span>
                </Link>

                <Link to="/dashboard" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logosmImg} alt="" height="12" />
                  </span>
                  <span className="logo-lg">
                    <img src={logolightImg} alt="" height="45" />
                  </span>
                </Link>
              </div>

              <div className="d-none d-sm-block">
                <Dropdown
                  isOpen={this.state.createMenu}
                  toggle={() => this.setState({ createMenu: !this.state.createMenu })}
                  className="pt-3 d-inline-block"
                >
                  <DropdownToggle className="btn btn-secondary" tag="button">
                    Действие <i className="mdi mdi-chevron-down"></i>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag="a" href="#">
                      Создать мероприятие
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                      Another action
                    </DropdownItem>
                    <DropdownItem tag="a" href="#">
                      Another action
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div className="d-flex">
              <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                  <input type="text" className="form-control" placeholder="Search..." />
                  <span className="fa fa-search"></span>
                </div>
              </form>

              <div className="dropdown d-inline-block d-lg-none ml-2">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  id="page-header-search-dropdown"
                  onClick={this.toggleSearch}
                >
                  <i className="mdi mdi-magnify"></i>
                </button>
                <div
                  className={
                    this.state.isSearchOpen
                      ? 'dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show'
                      : 'dropdown-menu dropdown-menu-lg dropdown-menu-right p-0'
                  }
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default TopBar;

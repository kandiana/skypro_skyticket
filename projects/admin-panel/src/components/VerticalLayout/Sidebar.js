import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import MetisMenu from 'metismenujs';

import SimpleBar from 'simplebar-react';

const SidebarContent = (props) => {
  return (
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li className="menu-title">Main</li>

        <li>
          <Link to="/dashboard" className="waves-effect">
            <i className="ti-home"></i>
            <span>Главная страница</span>
          </Link>
        </li>

        {/* <li>
          <Link to="/calendar" className=" waves-effect">
            <i className="ti-calendar"></i>
            <span>Календарь</span>
          </Link>
        </li> */}

        <li>
          <Link to="/archive" className=" waves-effect">
            <i className="ti-save"></i>
            <span>Архив</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.initMenu();
  }

  componentDidUpdate(prevProps) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    if (this.props.type !== 'condensed' || this.props.isMobile) {
      new MetisMenu('#side-menu');

      var matchingMenuItem = null;
      var ul = document.getElementById('side-menu');
      var items = ul.getElementsByTagName('a');
      for (var i = 0; i < items.length; ++i) {
        if (this.props.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  activateParentDropdown = (item) => {
    item.classList.add('mm-active');
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add('mm-active'); // li
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show');

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add('mm-active');
          }
        }
      }
      return false;
    }
    return false;
  };

  render() {
    return (
      <React.Fragment>
        {this.props.type !== 'condensed' ? (
          <SimpleBar style={{ maxHeight: '100%' }}>
            <SidebarContent />
          </SimpleBar>
        ) : (
          <SidebarContent />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);

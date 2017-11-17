import classnames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OnClickOutside from 'react-onclickoutside';
import { breakpoints } from 'helpers/breakpoints';

export class DrawerContainer extends Component {
  static defaultProps = {
    isOpen: false,
    overlay: breakpoints.smallScreen > $(document).outerWidth() ? true : false,
    drawerWidth: breakpoints.smallScreen > $(document).outerWidth() ? '100%' : '300px',
    options: {
      duration: 500,
      queue: false,
      easing: 'easeInOutSine'
    }
  };

  constructor(props) {
    super(props);
    this.instance = null;
  }

  openDrawer = () => {
    const {
      options,
      drawerWidth,
      contentWidth,
      overlay
    } = this.props;
    const instance = $(this.instance);
    const drawer = instance.find('.drawer');
    const drawerContent = instance.find('.drawer-content');
    drawer.animate({
      width: drawerWidth
    }, options);
    if (!overlay) {
      drawerContent.animate({
        width: `-=${drawerWidth}`
      }, options);
    }
  }
  closeDrawer = () => {
    const {
      options,
    } = this.props;
    const instance = $(this.instance);
    const drawer = instance.find('.drawer');
    const drawerContent = instance.find('.drawer-content');
    drawer.animate({
      width: '0%'
    }, options);
    drawerContent.animate({
      width: '100%'
    }, options);
  }

  componentDidMount() {
    const {
      drawerWidth
    } = this.props;
    const instance = $(this.instance);
    const drawer = instance.find('.drawer');
    drawer.children().css('width', drawerWidth);
  }

  componentDidUpdate(oldProps) {
    if (this.props.isOpen && !oldProps.isOpen) {
      this.openDrawer();
    }
    if (!this.props.isOpen && oldProps.isOpen) {
      this.closeDrawer();
    }
  }

  render() {
    const {
      isOpen, className, children, overlay
    } = this.props;

    const classes = classnames(
      {
        open: isOpen,
        closed: !isOpen,
        overlay: overlay
      },
      'drawer-container',
      className
    );

    return (
      <div
        ref={ref => this.instance = ref}
        className={classes}>{children}</div>
    );
  }
}

class Drawer extends Component {
  handleClickOutside = () => {
    this.props.onClickOutside();
  }

  render() {
    const {className, children, onClickOutside} = this.props;
    const classes = classnames(
      'drawer',
      className
    );

    return (
      <div className={classes}>{children}</div>
    );
  }
}

const WrappedDrawer = OnClickOutside(Drawer);
export {WrappedDrawer as Drawer};

export function DrawerContent ({className, children}) {
  const classes = classnames(
    'drawer-content',
    className
  );

  return (
    <div className={classes}>{children}</div>
  );
}

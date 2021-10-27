import React, { Component } from "react";
import PropTypes from "prop-types";

class Tab1 extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;

    let className = "tab-list-item1";

    if (activeTab === label) {
      className += " tab-list-active1";
    }

    return (
      <li className={className}  style={{width:"50%",textAlign:"center",}} onClick={onClick}>
        {label}
      </li>
      
      
    );
  }
}

export default Tab1;
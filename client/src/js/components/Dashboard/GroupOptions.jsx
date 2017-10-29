import React, { Component } from 'react'

import AppActions from '../../actions/AppActions'

/**
 * @description Component for displaying list of group options to GroupOptions
 * 
 * @class GroupOptions
 * 
 * @extends {Component}
 */
const GroupOptions = (props) => ({
    render() {
        return (
            <option>
                {this.props.keyName.groupName}
            </option>
        );
    }
});

export default GroupOptions;
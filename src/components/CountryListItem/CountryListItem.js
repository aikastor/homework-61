import React, {PureComponent} from 'react';
import ListItem from "@material-ui/core/ListItem";

class CountryListItem extends PureComponent {
    render() {
        return (
            <ListItem className={this.props.className}
                      onClick={this.props.onClick}
            >
                {this.props.name}
            </ListItem>
        );
    }
}

export default CountryListItem;
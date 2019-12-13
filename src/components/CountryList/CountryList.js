import React from 'react';
import List from "@material-ui/core/List";
import CountryListItem from "../CountryListItem/CountryListItem";
import {makeStyles} from "@material-ui/styles";

const CountryList = (props) => {
    const useStyles = makeStyles( {
        root: {
            width: '100%',
            maxWidth: 360,
            position: 'relative',
            overflow: 'auto',
            height: '100vh'
        },
        listItem: {
            '&:hover': {
                backgroundColor: 'red',
                cursor: 'pointer'
            }
        }
    });
    const classes = useStyles();
    return (
        <List className={classes.root}>
            {props.countries.map((item, index) => (
                <CountryListItem
                    className={classes.listItem}
                    name={item}
                    key={'item' + index}
                    onClick={()=>props.onClick(item)}/>
            ))}
        </List>
    );
};

export default CountryList;
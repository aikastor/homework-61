import React, {Component, Fragment} from 'react';
import axios from 'axios';
import CountryList from "../../components/CountryList/CountryList";
import CountryDetails from "../../components/CountryDetails/CountryDetails";
import Grid from "@material-ui/core/Grid";

class CountryInfo extends Component {
    state = {
      countries: [],
        selectedCountry: '',
        showCountryDetails: false
    };
    async componentDidMount() {
        const  response = await axios.get('all?fields=name');

        const countries = response.data.map(item=> {
           return item.name;
        });
        this.setState({countries})
    }

    handleSelectedCountry = name => {
      this.setState({selectedCountry: name})
    };
    render() {
        return (
            <Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <CountryList
                            countries={this.state.countries}
                            onClick={this.handleSelectedCountry}/>
                    </Grid>
                    <Grid item xs={8}>
                        <CountryDetails
                            name={this.state.selectedCountry}/>
                    </Grid>
                </Grid>
            </Fragment>

        );
    }
}

export default CountryInfo;
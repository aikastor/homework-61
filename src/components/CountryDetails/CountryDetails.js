import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import  axios from 'axios';

class CountryDetails extends Component {
    state = {
        loadedCountry: null
    };
    async componentDidUpdate (prevProps){
            if(this.props.name && this.props.name !== prevProps.name) {
                const response = await axios.get(`name/${this.props.name}?fields=name;capital;languages;flag;borders;population`);

                const data = response.data[0];

                Promise.all(data.borders.map(async border => {
                        const response =  await axios.get(`alpha/${border}?fields=name`);
                        return response.data.name;
                })).then(result=>{
                        data.borders = result;
                        this.setState({loadedCountry: data});
                });
            }
        }

    render() {
        let languages = null;

        if(this.state.loadedCountry) {
            languages = this.state.loadedCountry.languages.map(item=>(
                item.name
            ));
        }

        return  this.state.loadedCountry &&(
                <div>
                    <Paper style={{padding: '20px'}}>
                    <Grid container>
                        <Grid container>
                            <Grid item xs={8}>
                                <h3>{this.state.loadedCountry.name}</h3>
                                <p><b>Capital:</b> {this.state.loadedCountry.capital}</p>
                                <p><b>Population:</b> {this.state.loadedCountry.population}</p>
                                <b>languages:</b>
                                    <ul>
                                        {languages.map((item,i) => (
                                            <li key={item+i}>{item}</li>))
                                        }
                                    </ul>
                            </Grid>
                            <Grid item xs={4}>
                                <div style={{marginTop: '20px'}}>
                                    <img  style={{height: '80px', width: '200px'}}
                                          src={this.state.loadedCountry.flag}
                                          alt={this.state.loadedCountry.name}/>
                                </div>
                                </Grid>
                            <Grid item xs={12}>
                                <p><b>Borders:</b></p>
                                { this.state.loadedCountry.borders.length > 0 ?
                                    this.state.loadedCountry.borders.map((item, i)=>(
                                        <p key={item+i}>{item}</p>
                                    ))
                                    : <p>No borders</p>
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                </div>
        );
    }
}

export default CountryDetails;
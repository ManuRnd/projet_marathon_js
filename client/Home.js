import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Markdown from 'react-markdown';

import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants';


let uploadedImage=null;

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
        this.handleSubmit = this.handleSubmit.bind(this);
       // this.uploadedImage=null;
    }

    render() {

        const divStyle = {
            padding: '20px'
        };

        let index = 0;

        if (this.state === null){
            return <div>Loading...</div>;
        }

        return (

            <main className="container row">

                <h1>My Cities... The places to be!</h1>
                <p> You can find in this website many cities with beautiful places, events (festivals, concerts and so on).
                    Please, join us, and you will have the possibilities to participate to this new social network. <br />
                    Enjoy!!
                </p>
                <h3>Current City</h3>

                { this.state.cities.map(function(city, index, arr) {

                    return (
                        <div className="col l4 m6 s12">
                            <div className="card hoverable">
                                <div className="card-image">
                                    <img src={ city.picture } />
                                    <span className="card-title"><a className="white-text" href={"#/city/" + city._id}>{ city.name }</a></span>
                                    <a href={"#/city/" + city._id} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                                </div>
                                <div className="card-content">
                                    <p><Markdown source={ city.description } escapeHtml={false}/></p>
                                </div>
                            </div>
                        </div>
                    );

                })}

                <div className="col s12">
                    <h2 className="center-align">Insert a new city</h2>
                    <form onSubmit={this.handleSubmit} className="card col s12 offset-m3 m6" style={divStyle}>
                        <div className="input-field">
                            <input id="name" name="name" type="text" className="validate" required/>
                            <label>Name of the City</label>
                        </div>
                        <div className="input-field">
                            <textarea id="description" name="description" type="text" className="validate" required></textarea>
                            <label>Description</label>
                        </div>

                        <div className="input-field">
                            <input id="lat" name="lat" type="number" className="validate" required/>
                            <label>Latitude</label>
                        </div>

                        <div className="input-field">
                            <input id="long" name="long" type="number" className="validate" required/>
                            <label>Longitude</label>
                        </div>

                        <ImagesUploader
                            url="/images"
                            optimisticPreviews
                            multiple={false}
                            onLoadEnd={(err, pictureFileName) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    uploadedImage = pictureFileName;
                                }
                            }}
                            label="Upload a picture"
                        />

                        <button className="btn right" type="submit">Send</button>
                    </form>
                </div>

            </main>
        );
    }


    handleSubmit(event){
        event.preventDefault();

        let content = JSON.stringify(
            {
                name: event.target.name.value,
                description: event.target.description.value,
                long: event.target.long.value,
                lat: event.target.lat.value,
                picture: uploadedImage,
                activities: []
            });

        fetch('/city/add', {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: content
        }).then( (res) => {
            if(!res.ok) throw new Error("error");
        }).then( () => {
            this.loadData();
        });
    }

    componentDidMount () {
        this.loadData();
    }

    loadData() {
        // utiliser fetch()
        fetch('/cities')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({cities: responseJson});
            })
    }
}

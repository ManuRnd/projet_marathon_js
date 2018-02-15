

import React from 'react';
import {Link} from 'react-router';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import Markdown from 'react-markdown';
import {HTTP_SERVER_PORT_IMAGES} from '../server/constants';

import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

let uploadedImage = [];

export default class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        if(this.state===null){
            return(
                <p>Loading Data</p>
            )
        }

        const divStyle = {
            padding: '20px'
        };
        return (
            <main className="container row">
                <div className="row d-flex">
                    <div className="col m4 s12 d-flex">
                    <div className="card medium">
                        <img width="100%" height="100%" src={this.state.picture} />
                    </div>
                </div>
                    <div className="col m8 s12 d-flex">
                        <div className="card" >
                        <div className="card-content">
                            <span className="card-title">{ this.state.name }</span>
                            <p><Markdown source={ this.state.description } escapeHtml={false}/></p>
                        </div>
                        </div>
                    </div>
                </div>
                <h5 className="col s12">Places</h5>
                { this.state.activities
                    .filter(function(activity)
                    { return activity.nature === 'place'; })
                    .map(
                        (activity) => (
                            <div className="col l4 m6 s12">
                                <div className="card small hoverable">
                                    <div className="card-image">
                                        <img width="100%" height="100%" src={ activity.picture } />
                                    </div>
                                    <div className="card-content">
                                        <h5 className="center"><a className="black-text" href={"#/activity/" + activity._id}>{ activity.name }</a></h5>
                                        <a href={"#/activity/" + activity._id} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                    <h5 className="col s12">Events</h5>
                { this.state.activities
                    .filter(function(activity)
                    { return activity.nature === 'event'; })
                    .map(
                        (activity) => (
                            <div className="col l4 m6 s12">
                                <div className="card small hoverable">
                                    <div className="card-image">
                                        <img width="100%" height="100%" src={ activity.picture } />
                                    </div>
                                    <div className="card-content">
                                        <h5 className="center">
                                            <a className="black-text" href={"#/activity/" + activity._id}>{ activity.name }</a>
                                        </h5>
                                        <a href={"#/activity/" + activity._id} className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons">add</i></a>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                    <div className="col s12">
                        <h2 className="center-align">Insert a new activity</h2>
                        <form onSubmit={this.handleSubmit} className="card col s12 offset-m3 m6" style={divStyle}>
                            <div className="input-field">
                                <input id="name" name="name" type="text" className="validate" required/>
                                <label>Name of the Activity</label>
                            </div>
                            <select id="nature" name="nature">
                                <option value="place">Place</option>
                                <option value="event">Event</option>
                            </select>
                            <div className="input-field">
                                <textarea id="description" name="description" className="materialize-textarea" required></textarea>
                                <label>Description</label>
                            </div>
                            <div className="input-field">
                                <input id="url" name="url" type="text" className="validate" required/>
                                <label>URL</label>
                            </div>
                            <ImagesUploader
                                url="/images"
                                optimisticPreviews
                                // multiple={false}
                                onLoadEnd={(err, pictureFileName) => {
                                    if (err) {
                                        console.error(err);
                                    } else {
                                        uploadedImage.push(pictureFileName);
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
    handleSubmit(event) {

        event.preventDefault();
        console.log(event.target.name.value);
        fetch('/activity/add/' + this.props.params.id, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    name: event.target.name.value,
                    nature: event.target.nature.value,
                    description: event.target.description.value,
                    url: event.target.url.value,
                    pictures: uploadedImage
                })
        }).then((res) => {
            if (!res.ok) throw new Error("error");
        }).then( () => {
            this.loadData();
        });
    }

componentDidMount () {
    this.loadData();
}
loadData() {
    // utiliser fetch()
     fetch('/api/city/' + this.props.params.id)
         .then((response) => response.json())
         .then((responseJson) => {
             this.setState(responseJson);
         })
    }
}


import React from 'react';
import {Link} from 'react-router';

import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

import {HTTP_SERVER_PORT_IMAGES} from '../server/constants';



export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLikerSubmit = this.handleLikerSubmit.bind(this);
    }

    render() {

        if(this.state===null){
            return(
                <p>Loading Data</p>
            )
        }

        const divStyle = { padding: '20px'};

        return (
            <main className="container row">
                <h5>{ this.state.nature } : { this.state.name }</h5>

                <form onSubmit={this.handleLikerSubmit}>
                    <button name="check" type="submit" className="btn">Like ({this.state.likers.length})</button>
                </form>


                { this.state.pictures
                    .map(
                        (picture) => (
                            <div className="card small col l4 m6 s12">
                                <img width="100%" height="100%" src={ picture } />
                            </div>
                        ))
                }
                <div className="card col s12">
                    <div className="card-content">
                        <p>{this.state.description}</p>
                        <p className="right">Creer par {this.state.editor.email}</p> <br/>
                        <p className="left">Website: <a href={this.state.url}>{this.state.url}</a></p>
                    </div>
                </div>

                <div className="card col s12">
                    <h5 className="col s12">Comments</h5>
                    <div className="card-content">
                        { this.state.comments
                         .map(
                            (comment) => (
                                <div>
                                    <div>{ comment.user.email }: { comment.text } </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="col s12">
                    <h2>Add your comment</h2>
                    <div className="container">
                        <form onSubmit={this.handleSubmit} className="card col s12 offset-m4 m6" style={divStyle}>
                            <textarea name="textarea" required></textarea>
                            <button className="btn right" type="submit">Send</button>
                        </form>
                    </div>
                </div>

            </main>
        );
    }

    handleLikerSubmit(event) {
        event.preventDefault();

        let content = JSON.stringify(
            {
                liker: 'toto'
            });
        fetch('/like/add/' + this.props.params.id, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: content
        }).then((res)=>{
            console.log(res);

            if(!res.ok)throw new Error("error");
        });
            this.loadData();

    }

    onHandle(event){
       this.setState(this.addComm(event));
    }

    addComm(event){
        this.state.comments.push({
            user:{
                _id:'moi',
                email:'toto@gmail.com'
            },
            date: new Date(),
            text: event.target.textarea.value
        }
    )}


    handleSubmit(event){
        this.setState(this.addComm(event));
        //this.onHandle(event);
        event.preventDefault();

        let content = JSON.stringify(
            {
                text: event.target.textarea.value
            });

        fetch('/comment/add/' + this.props.params.id, {
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body: content
        }).then((res)=>{
            if(!res.ok)throw new Error("error");
        });
    }



    componentDidMount () {
        this.loadData();
    }

    loadData() {
        // utiliser fetch()
        fetch('/api/activity/' + this.props.params.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(responseJson);
            })
    }
}

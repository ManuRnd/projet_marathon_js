import React from 'react';

export default class CustomFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <footer className="page-footer blue">
                <div className="container">
                    <div className="row">
                        <div className="col s6 center">
                            <h5>Visiting Cities</h5>
                        </div>
                        <div className="col s6 push-l2 push-s1">
                            Manuel RENAUDINEAU<br/>
                            Quentin GEERAERT<br/>
                            Valentin PAPIN
                        </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container center">
                        © 2018 &mdash; Groupe 6
                    </div>
                </div>
            </footer>

        );
    }
}

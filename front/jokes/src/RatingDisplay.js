import React, { Component } from 'react';
import './common.css';
import './RatingDisplay.css';


class RatingDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    getRateBar() {
        const total = this.props.combinedJoke.upvotes + this.props.combinedJoke.downvotes;
        const ratio = total ? this.props.combinedJoke.upvotes / (total) : 0.5;
        const height = (ratio * 100).toFixed(0) + "%";
        return (
            <div className="rate-bar">
                <div 
                    className="rate-bar-overlay"
                    style={{height: height}}>
                </div>
            </div>
        )
    }

    async upvote() {
        const pk = this.props.combinedJoke.pk
        await this.props.api.reactCombinedJoke(pk, true);
        return this.props.refreshCb();
    }

    async downvote() {
        const pk = this.props.combinedJoke.pk
        await this.props.api.reactCombinedJoke(pk, false);
        return this.props.refreshCb();
    }

    render() {
        return (
            <div className="column bar-container">
                <div className="rate-button" onClick={e => this.upvote()}>
                    <strong>+</strong>
                </div>
                <div>{this.props.combinedJoke.upvotes}</div>
                {this.getRateBar()}
                <div>{this.props.combinedJoke.downvotes}</div>
                <div className="rate-button" onClick={e => this.downvote()}>
                    <strong>-</strong>
                </div>
            </div>
        )
    }
}
export default RatingDisplay;
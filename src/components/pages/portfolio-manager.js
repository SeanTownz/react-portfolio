import React, { Component } from "react";
import axios from "axios";

import PortfolioSidebarList from "../portfolio/portfolio-sidebar";
import PortfolioForm from "../portfolio/portfolio-form";

// To Do Speak with mentors about fine tuning Portfolio
// When uploading new posts it goe tot he bottom not the top
// Artwork selection is non responsive.

export default class PortfolioManager extends Component {
    constructor() {
        super();

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        };

     
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
        this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        });
    }


    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    handleDeleteClick(portfolioItem) {
        axios
            .delete(
                `https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`,
                { withCredentials: true }

            )
            .then(response => {
                this.setState({
                    portfolioItems: this.state.portfolioItems.filter(item => {
                        return item.id !== portfolioItem.id;
                    })
                });

                return response.data;
            })
            .catch(error => {
                console.log("handleDeleteClick error", error);
            })

    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleNewFormSubmission(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })

    }

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError error", error);
    }

    getPortfolioItems() {
        axios.get("https://seantownz.devcamp.space/portfolio/portfolio_items", {
            withCredentials: true
        })
            .then(response => {
                this.setState({
                    portfolioItems: [...response.data.portfolio_items]
                })
            })
            .catch(error => {
                console.log("error in getPortfolioItems", error)
            });
    }
    componentDidMount() {
        this.getPortfolioItems();

    }

    render() {
        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                       handleNewFormSubmission={this.handleNewFormSubmission}
                       handleEditFormSubmission={this.handleEditFormSubmissionS}
                        handleFormSubmissionError={this.handleFormSubmissionError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList
                        handleDeleteClick={this.handleDeleteClick}
                        data={this.state.portfolioItems}
                        handleEditClick={this.handleEditClick}
                    />
                </div>
            </div>
        )
    }
}
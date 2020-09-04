import React, { useState, useEffect } from "react";
import "../assets/App.css";
import { Grid, Icon } from "semantic-ui-react";
import HomeSearchBar from "../components/HomeSearchBar";
import HomeReviewCard from "../components/HomeReviewCard";
import firebase from "../config/firebase";

export default function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("reviews")
      .onSnapshot((snapshot) => {
        const newReviews = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(newReviews);
      });
  }, []);

  return (
    <div className="default">
      <h1 class="ui center aligned header">Online Shops Reviews</h1>
      <HomeSearchBar />
      <h2 class="ui header">Latest Reviews</h2>
      <Grid columns="equal">
        <Grid.Row>
          {reviews.map((review) => (
            <Grid.Column>
              <HomeReviewCard reviewContent={review} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <h2 class="ui header">Most Reviewed Shops</h2>
      <div class="ui raised segments">
        <div class="ui segment">
          <p>
            <img
              class="ui avatar image"
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
            <span className="shop-name">shop name</span>
            <span className="category-tag">
              <a class="ui teal tag label">Featured</a>
            </span>
            <span className="comments-no">
              <Icon name="comments outline" />
              123 comments
            </span>
          </p>
        </div>
        <div class="ui segment">
          <p>Middle</p>
        </div>
        <div class="ui segment">
          <p>Bottom</p>
        </div>
      </div>
    </div>
  );
}

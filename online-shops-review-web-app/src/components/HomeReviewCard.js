import React from "react";
import Moment from "react-moment";
import "../assets/App.css";
import { Card, Icon, Image } from "semantic-ui-react";
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

export default function HomeReviewCard({ reviewContent }) {
  return (
    // TODO: adjust card margins
    <Card>
      <Card.Content extra>
        <Icon name="user" />
        {reviewContent.authorID}
        <Card.Meta>
          <Moment fromNow>{reviewContent.publishedDate.toDate()}</Moment>
        </Card.Meta>
      </Card.Content>
      {/* <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      /> */}
      <Card.Content>
        <Card.Header>{reviewContent.title}</Card.Header>
        <Card.Description>
          <HTMLEllipsis
            unsafeHTML={reviewContent.content}
            maxLine="5"
            ellipsis="..."
            basedOn="letters"
          />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="thumbs up outline" />
        {reviewContent.likes}
      </Card.Content>
    </Card>
  );
}

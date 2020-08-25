import React from "react";
import Moment from "react-moment";
import "../assets/App.css";
import { Card, Icon, Image } from "semantic-ui-react";

export default function HomeReviewCard({ reviewContent }) {
  return (
    <Card>
      <Card.Content extra>
        <Icon name="user" />
        {reviewContent.authorID}
        <Card.Meta>
          {/* TODO: format date */}
          {/* {reviewContent.publishedDate.toDate().format('YYYY/MM/DD')} */}
          <Moment toNow>1976-04-19T12:59-0500</Moment>
        </Card.Meta>
      </Card.Content>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{reviewContent.title}</Card.Header>
        {/* TODO: convert rtf to plain text */}
        <Card.Description>{reviewContent.content}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="thumbs up outline" />
        {reviewContent.likes}
      </Card.Content>
    </Card>
  );
}

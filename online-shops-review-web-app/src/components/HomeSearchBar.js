import React from "react";
import "../assets/App.css";

export default function HomeSearchBar() {
  return (
    <div class="ui padded center aligned basic segment">
      <div class="ui action input fluid big">
        <input type="text" placeholder="Search..."/>
        <select class="ui compact selection dropdown">
          <option value="all">All</option>
          <option selected="" value="articles">Articles</option>
          <option value="products">Products</option>
        </select>
        <div class="ui button">Search</div>
      </div>
    </div>
  );
}

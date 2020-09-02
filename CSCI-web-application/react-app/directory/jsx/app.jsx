//Yeung Man Wai 1155126854

const activities = [
    { img_url: "assets/dog.jpg", time: "A hour ago", content: "Have lunch.", comments: [] },
    { img_url: "assets/dog.jpg", time: "5 hours ago", content: "Have breakfast.", comments: [] },
    { img_url: "assets/dog.jpg", time: "6 hours ago", content: "Get up.", comments: [] }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: activities,
            filteredActivities: activities,
            showSearchBar: false,
            showGrid: false,
            image: "assets/dog.jpg"
        };
        this.fileUploader = React.createRef();
    }

    filteredActivity = (searchText) => {
        return this.state.activities.filter(activity => {
            if (activity.content.toLowerCase().includes(
                searchText.toLowerCase())) {
                return true;
            }
            return false;
        });
    }

    handleSearchChange = (event) => {
        this.setState({
            filteredActivities: this.filteredActivity(event.target.value)
        });
    }

    showSearchBar = () => {
        this.setState({ showSearchBar: !this.state.showSearchBar });
    }

    showGrid = () => {
        this.setState({ showGrid: !this.state.showGrid });
    }

    addActivity = (content, time, image) => {
        this.state.activities.unshift({
            img_url: image,
            // img_url: "assets/dog.jpg",
            time: time,
            // time: time + " hours ago",
            content: content,
            comments: []
        });
        return this.state.activities;
    }

    addContent = () => {
        var content = prompt("Enter content:");
        var d = new Date();
        var time = d.toLocaleString();
        // var time = prompt("Enter time");

        if (content != null && time != null) {
            this.setState({
                filteredActivities: this.addActivity(content, time, this.state.image)
            });
        }
    };

    delActivity = (index) => {
        this.state.activities.splice(index, 1);
        this.setState({
            filteredActivities: this.state.activities
        });
    }

    onImageChange = (event) => {
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        });
        this.addContent();
    }


    render() {
        return (
            <div className="notificationsFrame">
                <input type="file" onChange={this.onImageChange} ref={this.fileUploader} style={{ display: 'none' }} />
                <div className="panel">
                    <Header
                        name={this.props.name}
                        showSearchBar={this.showSearchBar}
                        addContent={() => this.fileUploader.current.click()}
                        // addContent={this.addContent}
                        menuClick={this.showGrid}
                    />
                    {this.state.showSearchBar
                        ? <SearchBar onChange={this.handleSearchChange} />
                        : null
                    }
                    <Content
                        activities={this.state.filteredActivities}
                        delActivity={this.delActivity}
                        showGrid={this.state.showGrid}
                    />
                </div>
            </div>
        );
    }
}

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="header">
                <div onClick={this.props.menuClick}>
                    <MenuIcon menuClick={this.menuClick} />
                </div>
                <div onClick={this.props.addContent}>
                    <Title name={this.props.name} addContent={this.addContent} />
                </div>
                <div onClick={this.props.showSearchBar}>
                    <SearchIcon clickHandler={this.showSearchBar} />
                </div>
            </div>
        );
    }
}

class SearchIcon extends React.Component {
    render() {
        return (
            <div className="fa fa-search searchIcon"
                onClick={this.props.clickHandler}>
            </div>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="search-bar">
                <input type="text" onChange={this.props.onChange} />
            </div>
        );
    }
}

class MenuIcon extends React.Component {
    render() {
        return (
            <div className="menuIcon" onClick={this.props.menuClick}>
                <div className="dashTop"></div>
                <div className="dashBottom"></div>
                <div className="circle"></div>
            </div>
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <span className="title">
                {this.props.name}
            </span>
        );
    }
}

class Content extends React.Component {
    rightClick = (index) => {
        this.props.delActivity(index);
    }
    render() {
        return (
            <div>
                {this.props.showGrid
                    ? <div className="contentGrid" rightClick={this.props.rightClick}>
                        {this.props.activities.map((activity, index) =>
                            <GridActivityItem
                                img_url={activity.img_url}
                                time={activity.time}
                                content={activity.content}
                                comments={activity.comments}
                                rightClick={this.rightClick}
                                index={index}
                            />
                        )}
                    </div>
                    : <div className="content" rightClick={this.props.rightClick}>
                        <div className="line"></div>
                        {this.props.activities.map((activity, index) =>
                            <ActivityItem
                                img_url={activity.img_url}
                                time={activity.time}
                                content={activity.content}
                                comments={activity.comments}
                                rightClick={this.rightClick}
                                index={index}
                            />
                        )}
                    </div>
                }
            </div>
        );
    }
}

// TO-FIX-BUG: comments not stored respectively
class ActivityItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
        };
    }
    handleRightClick = (e) => {
        e.preventDefault();
        var index = this.props.index;
        var del = confirm("Are you sure to delete this activity?");
        if (del == true) {
            this.props.rightClick(index);
        }
    }
    handleAddComment = (e) => {
        e.preventDefault();
        var d = new Date();
        var time = d.toLocaleString();
        var comment = time + ': ' + prompt("Enter comment:");
        this.props.comments = this.props.comments.concat(comment)
        this.setState({
            comments: this.state.comments.concat(comment),
        });
    }
    render() {
        return (
            <div className="item" onContextMenu={this.handleRightClick} onClick={this.handleAddComment}>
                <div className="avatar">
                    <img src={this.props.img_url} />
                </div>

                <span className="time">
                    {this.props.time}
                </span>
                <p>
                    {this.props.content}
                </p>
                <p>(Click to add comment)</p>
                <ul style={{ listStyle: 'none' }}>
                    {this.state.comments.map(cm => (
                        <li key={cm}>{cm}</li>
                    ))}
                </ul>
                <div className="commentCount">
                    {/* {this.props.comment_count} */}
                    {this.state.comments.length}
                </div>
            </div>
        );
    }
}

class GridActivityItem extends React.Component {
    handleRightClick = (e) => {
        e.preventDefault();
        var index = this.props.index;
        var del = confirm("Are you sure to delete this activity?");
        if (del == true) {
            this.props.rightClick(index);
        }
    }
    render() {
        return (
            <div className="itemGrid" onContextMenu={this.handleRightClick}>
                <div className="avatarGrid">
                    <img src={this.props.img_url} />
                </div>
                <p>
                    {this.props.content}
                </p>
                <span className="timeGrid">
                    {this.props.time}
                </span>
            </div>
        );
    }
}

ReactDOM.render(<App name="Timeline" />, document.querySelector('#app'));
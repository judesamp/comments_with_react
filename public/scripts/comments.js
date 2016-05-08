// The Comment Box
var CommentBox = React.createClass({

  loadCommentsFromServer: function() {
    console.log('running');
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ data: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    })
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return { data: [] }
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return  (

      <div className='commentBox' >
        Hello world! I am a comment box.
        <CommentList data={ this.state.data } />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }

});

// The Comment List
var CommentList = React.createClass({

  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={ comment.author } key={ comment.id } >
          { comment.text }
        </Comment>
      );
    });

    return (
      <div className='commentList'>
        { commentNodes }
      </div>
    )
  }

});

// The Comment
var Comment = React.createClass({

  rawMarkup: function() {
    var rawMarkup = marked( this.props.children.toString(), { santize: true } );
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className='Comment'>
        <h2 className='CommentAuthor'>
          { this.props.author }
        </h2>
        <span dangerouslySetInnerHTML={ this.rawMarkup() } />
      </div>
    )
  }

});

// The Comment Form
var CommentForm = React.createClass({

  getInitialState: function() {
    return { author: '', text: '' }
  },

  handleAuthorChange: function(e) {
    this.setState({ author: e.target.value });
  },

  handleTextChange: function(e) {
    this.setState({ text: e.target.value });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({ author: '', text: ''});
  },

  render: function() {
    return (
      <form className='commentForm' onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    )
  }

});

// The actual render
ReactDOM.render(

  <CommentBox url='/api/comments' pollInterval={20000}/>,
  document.getElementById('content')

)

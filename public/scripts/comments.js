// The Comment Box
var CommentBox = React.createClass({

  render: function() {
    return  (

      <div className='commentBox'>
        Hello world! I am a comment box.
        <CommentList />
        <CommentForm />
      </div>

    )

  }

});

// The Comment List
var CommentList = React.createClass({

  render: function() {

    return (

      <div className='commentList'>
        <Comment author='Pete Hunt'>This is one comment</Comment>
        <Comment author='Jordan Walker'>This is *another* comment</Comment>
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

  render: function() {

    return (

      <div className='commentForm'>
        Hello world! I am a comment form.
      </div>

    )

  }

});


// The actual render
ReactDOM.render(

  <CommentBox />,
  document.getElementById('content')

)

import React from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import Modal from 'react-modal'

Modal.setAppElement(document.getElementById('example'))
Modal.injectCSS()

var PICTURES = [
  { id: 0, src: 'http://placekitten.com/601/601' },
  { id: 1, src: 'http://placekitten.com/610/610' },
  { id: 2, src: 'http://placekitten.com/620/620' }
];

var App = React.createClass({

  componentWillReceiveProps (nextProps) {
    // if we changed routes...
    if ((
      nextProps.location.key !== this.props.location.key &&
      nextProps.location.state &&
      nextProps.location.state.modal
    )) {
      // save the old children (just like animation)
      this.previousChildren = this.props.children
    }
  },

  render() {
    var { location } = this.props

    var isModal = (
      location.state &&
      location.state.modal &&
      this.previousChildren
    )

    return (
      <div>
        <h1>Pinterest Style Routes</h1>

        <div>
          {isModal ?
            this.previousChildren :
            this.props.children
          }

          {isModal && (
            <Modal isOpen={true}>
              {this.props.children}
            </Modal>
          )}
        </div>
      </div>
    );
  }
});

var Index = React.createClass({
  render () {
    return (
      <div>
        <p>
          The url `/pictures/:id` can be rendered anywhere in the app as a modal.
          Simply put `modal: true` in the `state` prop of links.
        </p>

        <p>
          Click on an item and see its rendered as a modal, then copy/paste the
          url into a different browser window (with a different session, like
          Chrome -> Firefox), and see that the image does not render inside the
          overlay. One URL, two session dependent screens :D
        </p>

        <div>
          {PICTURES.map(picture => (
            <Link key={picture.id} to={`/pictures/${picture.id}`} state={{ modal: true }}>
              <img style={{ margin: 10 }} src={picture.src} height="100" />
            </Link>
          ))}
        </div>

        <p><Link to="/some/123/deep/456/route">Go to some deep route</Link></p>

      </div>
    )
  }
})

var Deep = React.createClass({
  render () {
    return (
      <div>
        <p>You can link from anywhere really deep too</p>
        <p>Params stick around: {this.props.params.one} {this.props.params.two}</p>
        <p>
          <Link to={`/pictures/0`} state={{ modal: true }}>
            Link to picture with Modal
          </Link><br/>
          <Link to={`/pictures/0`}>
            Without modal
          </Link>
        </p>
      </div>
    )
  }
})

var Picture = React.createClass({
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <p>
          <img src={PICTURES[this.props.params.id].src} />
        </p>
      </div>
    );
  }
});

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/pictures/:id" component={Picture}/>
      <Route path="/some/:one/deep/:two/route" component={Deep}/>
    </Route>
  </Router>
), document.getElementById('example'))


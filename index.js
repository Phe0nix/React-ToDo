class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        input: '',
        post: JSON.parse(localStorage.getItem('posts'))
      }
      this.makePost = this.makePost.bind(this)
      this.onChange = this.onChange.bind(this)
    }
    componentWillMount() {
      console.clear();
      localStorage.getItem('posts') === null ? localStorage.setItem('posts', JSON.stringify([])) :
        JSON.parse(localStorage.getItem('posts'));
    }

    onChange(e) {
      this.setState({
        input: e.target.value
      })
    }

    makePost() {
      var g = this.state.post;
      this.setState({
        post: this.state.input.trim().match(/([\w\d\W\D])/ig) ? JSON.parse(localStorage.getItem('posts')).concat(this.state.input) : (alert('No input'), this.state.post)
      }, () => localStorage.setItem('posts', JSON.stringify(g.concat(this.state.input))))

    }

    deletePost(item) {
      let localItem = JSON.parse(localStorage.getItem('posts'));
      let g = localItem.splice(localItem.indexOf(item), 1);
      localStorage.setItem('posts', JSON.stringify(localItem));
      this.setState({
        post: localItem
      })
    }

    editPost(item, e) {
      let f = e.target.parentNode.querySelector('.postTitle');
      var localItem = JSON.parse(localStorage.getItem('posts'));
      console.log(localItem);
      e.target.innerHTML === 'Update' ? (e.target.innerHTML = 'Edit', f.contentEditable = false) : (e.target.innerHTML = 'Update', f.contentEditable = true);
      var g = localItem.splice(localItem.indexOf(item), 1, f.innerHTML);
      localStorage.setItem('posts', JSON.stringify(localItem))
      this.setState({
        post: localItem
      });
    }

    render() {
        return ( <
            div className = "container" >
            <
            input type = 'text'
            onChange = {
              this.onChange
            }
            /> <
            button className = 'makePost'
            onClick = {
              this.makePost
            } > Post < /button> <
            div className = 'posts' >
            <
            ul className = 'postList' > {
              this.state.post.map((d, i) => ( < li key = {
                    i
                  } >
                  <
                  span className = 'postTitle' > {
                    d
                  } < /span> <button className='del' onClick={this.deletePost.bind(this, d)}>x</button >
                  <
                  button className = 'edit'
                  onClick = {
                    this.editPost.bind(this, d)
                  } > Edit < /button> <
                  /li>))} <
                  /ul> <
                  /div> <
                  /div>
                )
              }
            }

            ReactDOM.render( < App / > ,
              document.querySelector('.root'));

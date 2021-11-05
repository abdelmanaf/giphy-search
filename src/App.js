import './App.css';
import React, { Component } from 'react'

class App extends Component {
  constructor (props) {
      super(props)

      this.state = {
        baseURL: 'https://api.giphy.com/v1/gifs/search?',
        apikey: 'api_key=SFW7z8A1bPMbS3lZYeV6Nl9Y7G4CpUGH',
        query: '&q=',
        giphyTitle: '',
        searchURL: '',
        limit: '&limit=2&offset=0&rating=g&lang=en'
      }
  }

  handleChange = (event)=> {
    this.setState({ [event.target.id]: event.target.value })
  }
  handleSubmit = (event)=> {
    event.preventDefault()
    this.setState({
      searchURL: this.state.baseURL + this.state.apikey + this.state.query +  this.state.giphyTitle + this.state.limit
    }
    , () => {
      fetch(this.state.searchURL)
        .then(res => res.json())
        .then(json => this.setState({
          giph: json,
          giphyTitle: ''
        }))
        .catch(err => console.error(err))
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            id='giphyTitle'
            type='text'
            value={this.state.giphyTitle}
            onChange={this.handleChange}
          />
          <input
            type='submit'
            value='Find Giphy'
          />
        </form>
        {/* <a href={this.state.searchURL}>{this.state.searchURL}</a> */}
        
        {
          (this.state.giph) ? <GiphyInfo giph={this.state.giph.data} />  : ''
        }
      </>
    );
  } 
}

class GiphyInfo extends Component {
  render () {
    return  (
      <div>
      {this.props.giph.map((gif, idx) => (
          <img key={idx} src={gif.images.original.url} alt=''/>
        ))
      }
      </div>
    )
  }
}

export default App;
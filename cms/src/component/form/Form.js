import React from 'react';
import axios from 'axios';
// import '../../App.css';


class Form extends React.Component {
  state = {
    detailSize: {
      size: null,
      bust: null,
      shoulderWidth: null,
      armLength: null,
      wirst: null,
      height: null,
      waist: null
    },
    sizes: [],
    loading: false
  }

  send() {
    const body = new FormData(this.form);
    body.append('size', JSON.stringify(this.state.sizes))
    this.setState({loading: true})
    axios.post('http://localhost:5000/api/items', body)
          .then(res => {
            this.setState({loading: false})
            alert(res.data.message)
          })
          .catch(err => alert(err.message))
  }

  onHandleSizeChange = (e) => {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      detailSize: {...this.state.detailSize, [name]: value}
    })
  }

  onHandleSizeSubmit = (e) => {
    e.preventDefault()
    this.setState({sizes: [...this.state.sizes, this.state.detailSize]})
    console.log(this.state.sizes)
  }

  deleteSize = (e) => {
    this.setState({sizes: this.state.sizes.filter((size) => { 
        return size.size !== e 
    })});
  }

  render() {
    const { sizes } = this.state
    return (
      <div>
        <h1>Add Product</h1>
        <form ref={el => (this.form = el)}>
          <label>Product Pict:
            <input type="file" name="pict" />
          </label>
          
          <label>name:
            <input type="text" name="name" />
          </label>

          <label>price:
            <input type="number" name="price" />
          </label>

          <label>color:
            <input type="text" name="color" placeholder="Green, Yellow"/>
          </label>

          <label>detail:</label>
          <input type="text" name="detail" />
        </form>

        <form className="box" onSubmit={this.onHandleSizeSubmit}>
          <p>Size (cm)</p>

          <label>Size Name:
          <input onChange={this.onHandleSizeChange} type="text" name="size" placeholder="L" />
          </label>

          <label>Lingkar Dada:
          <input onChange={this.onHandleSizeChange} type="number" name="bust" placeholder="100" />
          </label>

          <label>Lebar Bahu:
          <input onChange={this.onHandleSizeChange} type="number" name="shoulderWidth" placeholder="100" />
          </label>

          <label>Panjang Lengan:
          <input onChange={this.onHandleSizeChange} type="number" name="armLength" placeholder="100" />
          </label>

          <label>Lebar Tangan:
          <input onChange={this.onHandleSizeChange} type="number" name="wirst" placeholder="100" />
          </label>

          <label>Tinggi:
          <input onChange={this.onHandleSizeChange} type="number" name="height" placeholder="100" />
          </label>

          <label>Lebar Pinggang:
          <input onChange={this.onHandleSizeChange} type="number" name="waist" placeholder="100" />
          </label>
          <input type="submit" value="add size"/>
        </form>
        {sizes.map(size => (
          <div className="normal" key={size.size}>Size: {size.size}<button onClick={this.deleteSize.bind(this, size.size)} style={{marginLeft:10}}>x</button></div>
        ))}
        <button onClick={() => this.send()}>Add Product</button>
        {this.state.loading ? 'Loading...' : null}
      </div>
    );
  }
}

export default Form;
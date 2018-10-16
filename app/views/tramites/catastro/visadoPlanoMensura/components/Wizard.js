import React, { Component } from 'react';
import WizardFormFirstPage from './WizardFormFirstPage';
import WizardFormSecondPage from './WizardFormSecondPage';
import WizardFormThirdPage from './WizardFormThirdPage';

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      page: 1,
      rerender:false
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  onSubmit(values){
    console.log('values onSubmit',values)
  }

  render() {
    var onSubmit = this.onSubmit;
    const { page,fileList } = this.state
    return (
      <div>
        {page === 1 && <WizardFormFirstPage 
                          onSubmit={this.nextPage} 
                          subirArchivo={this.subirArchivo}
                          rerender={this.rerender}
                          fileList={fileList} 
                          />}
        {page === 2 &&
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />}
      </div>
    )
  }
}

export default WizardForm;
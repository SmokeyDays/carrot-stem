import React from "react";

export interface FormState {
  value: Record<string,string>;
}

export interface FormProps {
  formName: string,
  buttonName: string,
  formVariables: Record<string,string>
  formClassName: string,
  formButtonOnClick: (info: Record<string,string>) => void
}

export class BasicInfoForm extends React.Component<FormProps,FormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: this.props.formVariables,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this)
  }

  handleInputChange(event: any) {
    const target = event.target;

    const value:string = target.value;
    const name = target.name;

    const nowValue = this.state.value;
    nowValue[name] = value;
    this.setState({
      value: nowValue
    } as any);
  }

  buttonClick() {
    this.props.formButtonOnClick(this.state.value);
  }

  inputGenerator(val: Record<string,string>) {
    const inputs = [];
    for(const i in val) {
      inputs.push(<input
        className= 'basic-info-input'
        name = {i}
        type = "text"
        value = {val[i]}
        onChange={this.handleInputChange}/>);
    }
    return inputs;
  }

  render() {
    return (
      <div>
        <form className="basic-info-form">
          <label>
            {this.props.formName}
            {this.inputGenerator(this.state.value)}
          </label>
        </form>
        <div className="basic-info-button" onClick={this.buttonClick}>{this.props.buttonName}</div>
      </div>
    );
  }
}

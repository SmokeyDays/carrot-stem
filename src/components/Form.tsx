import React, { ReactNode } from "react";

export interface FormState {
  value: Record<string,string>;
}

export interface FormProps {
  buttonName: string,
  formVariables: Record<string,string>
  formClassName: string,
  formButtonOnClick: (info: Record<string,string>) => void
}

export class InfoForm extends React.Component<FormProps,FormState> {
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
        className= {this.props.formClassName + "-input"}
        name = {i}
        type = "text"
        value = {val[i]}
        onChange={this.handleInputChange}/>);
    }
    return inputs;
  }

  render() {
    return (
      <div className={this.props.formClassName + "-form-box"}>
        <form className={this.props.formClassName + "-form"}>
          <label>
            {this.inputGenerator(this.state.value)}
          </label>
        </form>
        <div className={this.props.formClassName + "-submit-btn"} onClick={this.buttonClick}>{this.props.buttonName}</div>
      </div>
    );
  }
}


interface EditableFormProps {
  val: string,
  formClassName: string,
  submit: (val: string) => void
  editable: boolean,
}

interface EditableFormStates {
  editing: boolean,
}

export class EditableForm extends React.Component<EditableFormProps, EditableFormStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      editing: false,
    }
  }
  render(): React.ReactNode {
    let container: ReactNode = <div
      className = {this.props.formClassName + "-display"}
      onClick={() => this.setState({editing: true})}
    >
      {(this.props.val === "" && this.props.editable)? "+": this.props.val}
    </div>;
    if(this.state.editing && this.props.editable) {
      container = <InfoForm
        buttonName="确认"
        formVariables={{val: this.props.val}}
        formClassName = {this.props.formClassName + "-edit"}
        formButtonOnClick = {((info: Record<string, string>) => {
          this.props.submit(info.val);
          this.setState({editing: false})
        })}
      />
    }
    return container;
  }
}
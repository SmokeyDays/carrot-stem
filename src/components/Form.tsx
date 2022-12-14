import React, { ReactNode } from "react";

export interface FormState {
  value: Record<string,string>;
}

export interface FormProps {
  buttonName: string,
  formVariables: Record<string,string>
  specialType?: Record<string, string>
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
        type = {this.props.specialType === undefined || this.props.specialType[i] === undefined? "text": this.props.specialType[i] }
        value = {val[i]}
        onChange={this.handleInputChange}
        />);
    }
    return inputs;
  }

  render() {
    return (
      <div className={this.props.formClassName + "-form-box"}>
        <form className={this.props.formClassName + "-form"} onKeyDown = {
          (event) => {
            if(event.key === "Enter") {
              this.buttonClick();
            }
          }
        }>
          <label className={this.props.formClassName + "-label"}>
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
  inputType?: string,
  children?: React.ReactNode
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
      {this.props.children === undefined
        ? (this.props.val === "" && this.props.editable)? "???": this.props.val
        : this.props.children}
    </div>;
    if(this.state.editing && this.props.editable) {
      container = <InfoForm
        buttonName="??????"
        formVariables={{val: this.props.val}}
        specialType={this.props.inputType === undefined? {}: {val: this.props.inputType}}
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
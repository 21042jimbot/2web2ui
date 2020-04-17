import React from 'react';
import { shallow } from 'enzyme';
import ConfirmationModal from '../ConfirmationModal';
jest.mock('src/context/HibanaContext', () => ({
  useHibana: jest.fn().mockReturnValue([{ isHibanaEnabled: false }]),
}));

describe('Component: ConfirmationModal', () => {
  let onCancelMock;
  let onConfirmMock;

  beforeEach(() => {
    onCancelMock = jest.fn();
    onConfirmMock = jest.fn();
  });

  it('should render correctly with basic props', () => {
    const wrapper = shallow(
      <ConfirmationModal onCancel={onCancelMock} onConfirm={onConfirmMock} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with open, content, title and custom verb', () => {
    const wrapper = shallow(
      <ConfirmationModal
        open={true}
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
        title="Confirmation Modal Test Title"
        content={<p>Some JSX content for the modal</p>}
        confirmVerb="DESTROY"
      />,
    );
    expect(wrapper).toHaveTextContent('Confirmation Modal Test Title');
    expect(wrapper.find('p')).toHaveTextContent('Some JSX content for the modal');
    expect(
      wrapper
        .find('Button')
        .at(0)
        .prop('children'),
    ).toEqual('DESTROY');
  });

  it('should cancel', () => {
    const wrapper = shallow(
      <ConfirmationModal
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
        title="Confirmation Modal Test Title"
        content={<p>Some JSX content for the modal</p>}
        confirmVerb="DESTROY"
      />,
    );
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    expect(onCancelMock).toHaveBeenCalledTimes(1);
    expect(onConfirmMock).not.toHaveBeenCalled();
  });

  it('should confirm', () => {
    const wrapper = shallow(
      <ConfirmationModal
        onCancel={onCancelMock}
        onConfirm={onConfirmMock}
        title="Confirmation Modal Test Title"
        content={<p>Some JSX content for the modal</p>}
        confirmVerb="DESTROY"
      />,
    );
    wrapper
      .find('Button')
      .at(0)
      .simulate('click');
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(onCancelMock).not.toHaveBeenCalled();
  });

  it('should disable confirmation button', () => {
    const wrapper = shallow(
      <ConfirmationModal confirming={true} onCancel={onCancelMock} onConfirm={onConfirmMock} />,
    );
    expect(wrapper.find('Button').at(0)).toHaveProp('disabled');
  });

  it('should allow overriding confirm verb', () => {
    const text = 'I am sure about it';
    const wrapper = shallow(
      <ConfirmationModal confirmVerb={text} onCancel={onCancelMock} onConfirm={onConfirmMock} />,
    );
    expect(
      wrapper
        .find('Button')
        .at(0)
        .prop('children'),
    ).toEqual(text);
  });

  it('should allow overriding cancel verb', () => {
    const text = 'Do not Cancel';
    const wrapper = shallow(
      <ConfirmationModal cancelVerb={text} onCancel={onCancelMock} onConfirm={onConfirmMock} />,
    );
    expect(
      wrapper
        .find('Button')
        .at(1)
        .prop('children'),
    ).toEqual(text);
  });
});

import React from 'react';
import EmbedID from '../EmbedID';
import renderer from 'react-test-renderer';
import TruliooForm from './TruliooForm';

it('EmbedID did not change', () => {
  const embedID = renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => { }} />).toJSON();
  expect(embedID).toMatchSnapshot();
});


it('Renders custom input field', () => {
  const customFields = {
    field1: {
        title: "What is your name?",
        type: "string"
    }
  }
  const rendererObj = renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => {}} customFields={customFields} />); 
  const instance = rendererObj.root
  const nameInput = instance.find(
    (e) => e.type == 'input' 
    && e.props 
    && e.props.id == 'root_field1'
    )
    expect(nameInput.props.required).toEqual(false)
});


it('Renders custom select field', () => {
  const customFields = {
    field1: {
        title: "What is your favourite color?",
        type: "string",
          enum: ["red", "yellow", "blue"]
    }
  }
  const rendererObj = renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => {}} customFields={customFields} />); 
  const instance = rendererObj.root
  const colorSelect = instance.find(
    (e) => e.type == 'select' 
    && e.props 
    && e.props.id == 'root_field1'
    )
    expect(colorSelect.props.required).toEqual(false)
    expect(colorSelect.children).toHaveLength(4)
});


it('Renders custom required fields', () => {
  const customFields = {
    rootObj: {
      title: "Keeper's Questions",
      type: "object", 
      required: ["name", "color"],
      properties: {
        name: {
          title: "What is your name?",
          type: "string"
        }, 
        quest: {
            title: "What is your quest?", 
            type: "string",
        },
        color: {
            title: "What is your favourite color?", 
            type: "string",
            enum: ["red", "yellow", "blue"]
        }, 
        speed: {
          title: "What is the air-speed velocity of an unladen swallow?", 
          type: "number",
        }
      }
    }
  }
  const rendererObj = renderer.create(<EmbedID url='http://localhost:3111' handleResponse={(e) => {}} customFields={customFields} />); 
  const instance = rendererObj.root
  const name = instance.find(
    (e) => e.type == 'input' 
    && e.props 
    && e.props.id == 'root_rootObj_name'
  )

  const quest = instance.find(
    (e) => e.type == 'input' 
    && e.props 
    && e.props.id == 'root_rootObj_quest'
  )

  const color = instance.find(
    (e) => e.type == 'select' 
    && e.props 
    && e.props.id == 'root_rootObj_color'
  )

  const speed = instance.find(
    (e) => e.type == 'input' 
    && e.props 
    && e.props.id == 'root_rootObj_speed'
  )

  expect(name.props.required).toEqual(true)
  expect(quest.props.required).toEqual(false)
  expect(color.props.required).toEqual(true)
  expect(speed.props.required).toEqual(false)
});

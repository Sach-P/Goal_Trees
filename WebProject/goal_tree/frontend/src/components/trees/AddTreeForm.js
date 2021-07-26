import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTree } from '../../actions/trees';
import CreateConfirmation from '../layout/CreateConfirmation';

export function AddTreeForm(props) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function onTitleChange(e) {
        setTitle(e.target.value);
    }
    function onDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function onSubmit() {
        const tree = { title, description };
        props.createTree(tree).then(() => {
            setTitle('');
            setDescription('');
            props.hideModal();
        });
    }

    const createTreeForm = (
        <div>
            <form id="tree-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        name="title"
                        onChange={onTitleChange}
                        value={title}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        type="text"
                        name="description"
                        onChange={onDescriptionChange}
                        value={description}
                    />
                </div>
            </form>
        </div>
    );

    return (
        <CreateConfirmation form='tree-form' showModal={props.showModal} hideModal={props.hideModal} confirmModal={onSubmit} content={createTreeForm} title={'Create Tree'} />
    )
}

export default connect(null, { createTree })(AddTreeForm);

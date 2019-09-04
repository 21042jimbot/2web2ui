import React, { useState } from 'react';
import {
  Modal,
  Panel,
  TextField,
  Button
} from '@sparkpost/matchbox';
import { showAlert } from 'src/actions/globalAlert';
import ButtonWrapper from 'src/components/buttonWrapper';
import useEditorContext from '../../hooks/useEditorContext';

const DuplicateTemplateModal = (props) => {
  const {
    open,
    onClose,
    onSubmitCallback
  } = props;
  const { draft, createTemplate } = useEditorContext();
  const initialDraftName = draft.name;
  const initialDraftId = draft.id;
  const [draftName, setDraftName] = useState(`${initialDraftName} (COPY)`);
  const [draftId, setDraftId] = useState(`${initialDraftId}-copy`);
  const [hasNameError, setNameError] = useState(false);
  const [hasDraftError, setDraftError] = useState(false);
  const handleSubmit = (e, callback) => {
    e.preventDefault();

    if (!draftName) {
      setNameError(true);
    }

    if (!draftId) {
      setDraftError(true);
    }

    if (draftName && draftId) {
      setNameError(false);
      setDraftError(false);

      createTemplate({
        ...draft,
        name: draftName,
        id: draftId
      })
        .then(() => {
          // Not currently working - lacking accessing to store?
          showAlert({
            message: 'Template duplicated',
            type: 'success'
          });
        });

      if (callback) {
        callback();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      showCloseButton={true}
    >
      <Panel
        title="Duplicate Template"
        sectioned
      >
        <form onSubmit={(e) => handleSubmit(e, onSubmitCallback)}>
          <TextField
            id="template-name"
            name="templateName"
            label="Template Name"
            required // not working as I would expect...
            value={draftName}
            error={hasNameError ? 'Please enter a template name.' : null}
            onChange={(e) => setDraftName(e.target.value)}
          />

          <TextField
            id="template-id"
            name="templateId"
            label="Template ID"
            required // not working as I would expect...
            value={draftId}
            error={hasDraftError ? 'Please enter a unique template ID.' : null}
            onChange={(e) => setDraftId(e.target.value)}
          />

          <ButtonWrapper>
            <Button color="orange" submit>
              Duplicate
            </Button>
          </ButtonWrapper>
        </form>
      </Panel>
    </Modal>
  );
};

export default DuplicateTemplateModal;

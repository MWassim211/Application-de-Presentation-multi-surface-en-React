/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

function FormPostitDialog(props) {
  // eslint-disable-next-line react/prop-types
  const { open, onFormClose, locationPathName } = props;
  const {
    boardName, boardsTitle, postitDesc, postitTitle,
  } = props;
  const {
    handleBNameOnChange, handleBNotesOnChange, handlePdescOnchange, handlePTitleOnChange,
  } = props;
  return (
    <div>
      <Dialog open={open} onClose={onFormClose} aria-labelledby="form-dialog-title">
        { locationPathName === '/' ? (
          <div>
            <DialogTitle id="form-dialog-title">Nouveau Board</DialogTitle>
            <DialogContent>
              <DialogContentText />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={boardName}
                onChange={(e) => handleBNameOnChange(e)}
                fullWidth
              />
              <TextField
                margin="dense"
                id="boardTitle"
                label="Title"
                type="text"
                value={boardsTitle}
                onChange={(e) => handleBNotesOnChange(e)}
                fullWidth
              />
            </DialogContent>
          </div>
        )
          : (
            <div>
              <DialogTitle id="form-dialog-title">Nouveau Postit</DialogTitle>
              <DialogContent>
                <DialogContentText />
                <TextField
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  value={postitTitle}
                  onChange={(e) => handlePTitleOnChange(e)}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="postittext"
                  label="Description"
                  type="text"
                  value={postitDesc}
                  onChange={(e) => handlePdescOnchange(e)}
                  fullWidth
                />

              </DialogContent>
            </div>
          )}
        <DialogActions>
          <Button onClick={onFormClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FormPostitDialog.propType = {
  open: PropTypes.bool.isRequired,
  onFormClose: PropTypes.func.isRequired,
  locationPathName: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
  boardsTitle: PropTypes.string.isRequired,
  postitDesc: PropTypes.string.isRequired,
  postitTitle: PropTypes.string.isRequired,
  handleBNameOnChange: PropTypes.func.isRequired,
  handleBNotesOnChange: PropTypes.func.isRequired,
  handlePdescOnchange: PropTypes.func.isRequired,
  handlePTitleOnChange: PropTypes.func.isRequired,
};

export default FormPostitDialog;

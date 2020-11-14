/* eslint-disable */
import React from 'react';
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
  const { open, onFormClose,onCloseNoAction } = props;
  const {
    boardName, boardsTitle, postitDesc, postitTitle, action, postitVisible, postitColor,
    onPostitFormClose,
    handleVisibleOnChange, handleColorOnChange,
  } = props;
  const {
    handleBNameOnChange, handleBNotesOnChange, handlePdescOnchange, handlePTitleOnChange,
  } = props;
  return (
    <div>
      <Dialog open={open} onClose={onFormClose} aria-labelledby="form-dialog-title">
        { action === 'Create Board' ? (
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
            <DialogActions>
            <Button onClick={onCloseNoAction} color="primary">
                Annuler
              </Button>
              <Button onClick={onFormClose} color="primary">
                Create
              </Button>
            </DialogActions>
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
                <TextField
                  margin="dense"
                  id="postitvisible"
                  label="Visible"
                  type="text"
                  value={postitVisible}
                  onChange={(e) => handleVisibleOnChange(e)}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="postitvisible"
                  label="Visible"
                  type="text"
                  value={postitColor}
                  onChange={(e) => handleColorOnChange(e)}
                  fullWidth
                />

              </DialogContent>
              <DialogActions>
              <Button onClick={onCloseNoAction} color="primary">
                  Annuler
                </Button>
                <Button onClick={onPostitFormClose} color="primary">
                  Create
                </Button>
              </DialogActions>
            </div>
          )}
      </Dialog>
    </div>
  );
}

FormPostitDialog.propType = {
  open: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  onFormClose: PropTypes.func,
  boardName: PropTypes.string,
  boardsTitle: PropTypes.string,
  postitDesc: PropTypes.string,
  postitTitle: PropTypes.string,
  handleBNameOnChange: PropTypes.func,
  handleBNotesOnChange: PropTypes.func,
  handlePdescOnchange: PropTypes.func,
  handlePTitleOnChange: PropTypes.func,
  handleVisibleOnChange: PropTypes.func,
  handleColorOnChange: PropTypes.func,
  postitVisible: PropTypes.string,
  postitColor: PropTypes.string,
  onPostitFormClose: PropTypes.func,
  onCloseNoAction: PropTypes.func,
};
FormPostitDialog.defaultProps = {
  // handleBNotesOnChange: null,
  // handlePTitleOnChange: null,
  // handleVisibleOnChange: null,
  // handleColorOnChange: null,
  // handlePdescOnchange: null,
  // handleBNameOnChange: null,
  // postitVisible: '',
  // postitColor: '',
  // onPostitFormClose: null,
  // onFormClose: null,
  // boardName: null,
  // boardsTitle: null,
  // postitDesc: null,
  // postitTitle: null,
};

export default FormPostitDialog;

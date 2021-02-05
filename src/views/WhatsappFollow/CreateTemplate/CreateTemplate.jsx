import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers"
import * as yup from "yup";

const SchemaValidation = yup.object().shape({
	title: yup.string().required("Judul Template harus diisi"),
	text: yup.string().required("Isi Template harus diisi"),
})

const CreateTemplate = props => {
	const {
		open,
		handleClose,
		onAdd,
		formState,
		handleChange
	} = props

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(SchemaValidation)
	});

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Buat Template Baru</DialogTitle>
				<form onSubmit={handleSubmit(onAdd)}>
					<DialogContent>
						<DialogContentText>
							Masukan data dengan benar, data tersebut akan menjadi template Whatsapp Follow Up anda.
						</DialogContentText>
						<TextField
							autoFocus
							fullWidth
							margin="dense"
							label="Judul Template"
							name="title"
							value={formState.values.title || ''}
							onChange={handleChange}
							helperText={
								errors.title && errors.title.message
							}
							error={errors.title && true}
							inputRef={register}
						/>
						<TextField
							margin="dense"
							label="Isi Template"
							name="text"
							multiline
							rows={5}
							fullWidth
							value={formState.values.text || ''}
							onChange={handleChange}
							helperText={
								errors.text && errors.text.message
							}
							error={errors.text && true}
							inputRef={register}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary">
							Buat
						</Button>
					</DialogActions>
				</form>
      </Dialog>
    </div>
  );
}

export default CreateTemplate